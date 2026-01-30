# Knowledge Kingdom — Code Rules

Zero tolerance for violations. All rules are mandatory.

---

## Architecture Layers

```
Resolver (GraphQL) → Use Case (business logic) → Repository (data access)
```

| Layer | Responsibility |
|---|---|
| **Repository** | ONE table, zero business logic, throws EntityNotFoundError |
| **Use Case** | All business logic, returns entities, lets errors bubble up |
| **Resolver** | Zod validation, calls use case, maps entity → DTO, error translation |
| **Module** | Manual DI wiring, connects all dependencies |

---

## Type System — ONLY FOUR Categories

Creating new types is FORBIDDEN unless it is one of:

1. **Native JS** — `string`, `number`, `boolean`, `Date`, `bigint`, `null`
2. **Entity types** — in `modules/*/repository/types.ts`
3. **DTOs** — in `modules/*/types.ts` (resolver input/output)
4. **Schema types** — in `@kk/shared` (Zod-inferred types, shared validation)

Everything else is PROHIBITED.

### Prohibited suffixes

These indicate code smell:
`Info`, `Details`, `Data`, `Result`, `Input`, `Output`, `Request`, `Response`, `Params`, `Wrapper`

### Use case parameters

Use entity types directly. NEVER create `*UseCaseParams` types:

```typescript
// WRONG
type CreateUserUseCaseParams = { firstName: string; email: string; };

// CORRECT — use entity type directly
interface ICreateUserUseCase {
  execute: (data: UserEntityCreate) => Promise<UserEntity>;
}
```

If a use case needs a value that differs from the entity (e.g., plain password vs passwordHash), use individual parameters:

```typescript
interface IUpdateUserUseCase {
  execute: (
    id: string,
    version: number,
    password: string | null,
    updateData: UserEntityUpdate,
  ) => Promise<UserEntity>;
}
```

### Use cases return entities, never DTOs

```typescript
// WRONG
class GetUserUseCase {
  execute(): Promise<UserDTO> { ... }
}

// CORRECT
class GetUserUseCase {
  execute(): Promise<UserEntity> { ... }
}
```

Resolvers map entities to DTOs. Use cases never know about DTOs.

### Multiple return values — use tuples

```typescript
// WRONG
type GetUsersResult = { users: UserEntity[]; count: number; };

// CORRECT
class GetUsersAndCountUseCase {
  execute(): Promise<[UserEntity[], number]> { ... }
}
```

### Null over undefined

Undefined is evil. Always use `null` for missing values:

```typescript
// WRONG
type User = {
  email?: string;
};

// CORRECT
type User = {
  email: string | null;
};
```

### Null over empty string

```typescript
// WRONG
const note = payload.note || '';

// CORRECT
const note = payload.note || null;
```

### DATE vs TIMESTAMP

```typescript
dateOfBirth: string;    // DB DATE column (no time) → 'YYYY-MM-DD'
createdAt: Date;        // DB TIMESTAMP column → Date
```

---

## Repository Rules

Repositories must be DEADLY SIMPLE — zero business logic, one table only.

### Method naming

```
findOne + By + Field1 + And + Field2 + [Null|NotNull]
findMany + By + Field1 + [In] + And + Field2
```

Examples:
- `findOneById(id)`
- `findOneByEmail(email)`
- `findManyByIdIn(ids[])`
- `findManyByRoleAndDeletedAtNull(role)`

### Mutation signatures

```typescript
create(data: CreateData): Promise<Entity>
update(id: string, version: number, data: UpdateData): Promise<Entity>
softDelete(id: string, version: number): Promise<void>
restore(id: string, version: number): Promise<Entity>
```

All updates and deletes MUST include `version` (optimistic locking).

### withDeleted parameter

ALL finder methods on soft-delete entities MUST have `withDeleted`:

```typescript
// WRONG
findOneByEmail = async (email: string): Promise<UserEntity> => { ... };

// CORRECT
findOneByEmail = async (email: string, withDeleted = false): Promise<UserEntity> => { ... };
```

### Single-entry mutations only

No `updateMany`, no `deleteMany`. One entity at a time. Use case loops if needed.

### What does NOT belong in a repository

- Type coherence checks
- Validation
- Conditional logic based on entity state
- Multi-step operations
- Calls to other repositories
- Any `if` that isn't about query building

---

## Use Case Rules

### Naming — starts with verb

```typescript
// WRONG
FormanceTransactionRevertedUseCase

// CORRECT
ProcessFormanceTransactionRevertedUseCase
GetUserUseCase
CreateUserUseCase
SendVerificationEmailUseCase
```

### Caller agnostic

Use cases receive only what they need. Never task payloads:

```typescript
// WRONG
execute = async (payload: SendEmailTaskPayload) => { ... };

// CORRECT
execute = async (userId: string) => { ... };
```

### Error handling — let errors bubble up

Use cases do NOT catch and translate errors. That is the resolver's job:

```typescript
// WRONG — error translation in use case
class GetUserUseCase {
  execute = async (id: string) => {
    try {
      return await this.userRepository.findOneById(id);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError({ id }); // WRONG LAYER
      }
      throw err;
    }
  };
}

// CORRECT — use case lets error bubble up
class GetUserUseCase {
  execute = async (id: string) => {
    return this.userRepository.findOneById(id);
  };
}

// Resolver catches and translates (or formatError handles globally)
```

### DateFactory pattern

Never use `new Date()` directly in use cases:

```typescript
// WRONG
await this.repository.update(id, version, { releasedAt: new Date() });

// CORRECT
class ReleaseUseCase {
  constructor(
    private readonly repository: IRepository,
    private readonly todayDate: DateFactory,
  ) {}

  execute = async (id: string, version: number) => {
    await this.repository.update(id, version, { releasedAt: this.todayDate() });
  };
}

// In module: new ReleaseUseCase(repository, () => new Date())
// In tests: new ReleaseUseCase(repository, () => new Date('2025-01-15'))
```

### Constructor parameter order

Required first, optional last. Logger factory always LAST:

```typescript
constructor(
  private readonly repository: IUserRepository,
  private readonly authProvider: IAuthProvider,
  private readonly todayDate: DateFactory,
  private readonly createLogger: LoggerFactory, // LAST
) {}
```

### Task/event handlers receive IDs, not entities

```typescript
// WRONG — data might be stale
execute = async (afterChange: UserEntity): Promise<void> => { ... };

// CORRECT — fetch fresh data
execute = async (entityId: string): Promise<void> => {
  const user = await this.userRepository.findOneById(entityId);
};
```

### No orchestration layers

If a resolver needs multiple use cases, it composes them directly:

```typescript
// WRONG
class UserOrchestrator {
  constructor(createUseCase, sendEmailUseCase) {}
}

// CORRECT — resolver composes
class SignUpResolver {
  constructor(
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly sendEmailUseCase: ISendVerificationEmailUseCase,
  ) {}
}
```

---

## Resolver Rules

### Responsibilities

1. Validate input with Zod (shared schema)
2. Call use case(s)
3. Map entity → DTO for response
4. Set cookies when needed (auth mutations)

### Error translation

Global `formatError` handles most cases. Resolver-level catch only for specific translation:

```typescript
// Resolver-level catch — only when needed
execute = async (payload: DeleteUserDTO): Promise<void> => {
  try {
    await this.deleteUserUseCase.execute(payload.id, payload.version);
  } catch (err) {
    if (err instanceof EntityVersionMismatchError) {
      throw new ValidationError({
        fields: [{ path: '/version', message: 'Version mismatch' }],
      });
    }
    throw err; // everything else handled by formatError
  }
};
```

### No redundant validation fallbacks

Zod handles defaults:

```typescript
// WRONG
const title = payload.title || null;

// CORRECT — Zod schema has .default(null)
const title = payload.title;
```

---

## Error Handling Rules

### No null checks after repository calls

Repositories throw EntityNotFoundError:

```typescript
// WRONG
const user = await this.userRepository.findOneById(id);
if (!user) throw new Error('User not found');

// CORRECT — repository throws
const user = await this.userRepository.findOneById(id);
```

### Catch specific errors only

```typescript
// WRONG
try {
  await this.repository.findOneById(id);
} catch (err) {
  return null;
}

// CORRECT
try {
  await this.repository.findOneById(id);
} catch (err) {
  if (err instanceof EntityNotFoundError && err.entityName === EntityName.USER) {
    return null;
  }
  throw err;
}
```

### Include identifiers in errors

```typescript
// WRONG
throw new EntityNotFoundError('User not found');

// CORRECT
throw new EntityNotFoundError(EntityName.USER, { id });
```

### Let database handle duplicates

```typescript
// WRONG — redundant check
const existing = await this.repository.findOneByEmail(email);
if (existing) throw new UniqueConstraintViolationError();
await this.repository.create(data);

// CORRECT — let DB throw
await this.repository.create(data);
// UniqueConstraintViolationError thrown automatically if duplicate
```

### No manual field guards to filter entity types

```typescript
// WRONG — manual guard
const user = await this.userRepository.findOneById(userId);
if (!user.sourceId) return;

// CORRECT — specific repository finder
const user = await this.userRepository.findOneByIdAndScopeIn(userId, [UserScope.MANAGER]);
```

### Error name pattern

`ENTITY_ACTION_ERROR`:
```
USER_NOT_FOUND_ERROR
USER_VERSION_MISMATCH_ERROR
SESSION_EXPIRED_ERROR
```

---

## Code Style Rules

### No type casting

Type casting (`as Type`) is banned. If you need a cast, the design is wrong — fix the types instead.

**Only exception**: ORM/framework generic boundaries in infrastructure code (e.g., `BaseRepository`), where TypeScript cannot express the generic constraint. These casts must be centralized in the base layer, never in business code.

```typescript
// WRONG — casting in repository implementations
protected toEntity(row: Record<string, unknown>): UserEntity {
  return { id: row.id as string, name: row.name as string };
}

// CORRECT — use ORM's inferred types
protected toEntity(row: InferSelectModel<typeof users>): UserEntity {
  return { id: row.id, name: row.name };
}

// WRONG — casting in use cases or resolvers
const user = result as UserEntity;

// CORRECT — proper typing eliminates the need
const user: UserEntity = await this.useCase.execute(id);
```

### No code comments

```typescript
// WRONG
// Calculate the total interest
const totalInterest = calculateInterest(account);

// CORRECT
const totalInterest = calculateInterest(account);
```

### Named imports only

```typescript
// WRONG
import Chance from 'chance';

// CORRECT
import { something } from 'chance';
```

### Import extensions

No file extensions in imports:

```typescript
// WRONG
import { UserRepository } from './userRepository.js';

// CORRECT
import { UserRepository } from './userRepository';
```

### Enums over magic strings

```typescript
// WRONG
if (role === 'ADMIN') { ... }

// CORRECT
if (role === UserRole.ADMIN) { ... }
```

### Enum values are UPPERCASE

```typescript
// WRONG
enum Role { admin = 'admin' }

// CORRECT
enum Role { ADMIN = 'ADMIN' }
```

### Type conversions outside functions

```typescript
// WRONG
async execute(dateString: string) {
  const date = new Date(dateString);
}

// CORRECT
async execute(date: Date) { ... }
// Caller converts: await useCase.execute(new Date(dateString));
```

### Static logger messages

```typescript
// WRONG
logger.info({ userId }, `Processing user ${userId}`);

// CORRECT
logger.info({ userId }, 'Processing user');
```

### No barrel files

```typescript
// WRONG — index.ts with only exports
export { UserRepository } from './user_repository';

// CORRECT — import directly
import { UserRepository } from './repositories/user/userRepository';
```

### Promise.all for independent async operations

```typescript
// WRONG — sequential when independent
const user = await userRepository.findOneById(userId);
const roles = await roleRepository.findManyByUserId(userId);

// CORRECT
const [user, roles] = await Promise.all([
  userRepository.findOneById(userId),
  roleRepository.findManyByUserId(userId),
]);
```

### Mappers are private methods

```typescript
// WRONG — standalone exported function
export function mapToDto(entity: UserEntity): UserDTO { ... }

// CORRECT — private method in resolver
class GetUserResolver {
  private mapToDto(entity: UserEntity): UserDTO { ... }
}
```

---

## Environment Configuration

Never use `process.env` directly. Use Zod-validated config:

```typescript
// WRONG
const port = process.env.PORT || 4000;

// CORRECT
import { env } from '../infra/config/env';
const port = env.PORT;
```

The `env` object is parsed at startup. Missing or invalid vars crash immediately.

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Use cases | Verb + Noun | `CreateUserUseCase` |
| Enum values | UPPERCASE | `ADMIN = 'ADMIN'` |
| Error names | ENTITY_ACTION_ERROR | `USER_NOT_FOUND_ERROR` |
| Variables | camelCase | `depositAccountId` |
| Constants | Name = Value | `SEND_EMAIL_TASK = 'SEND_EMAIL_TASK'` |
| Files | camelCase of class | `createUserUseCase.ts` |
| Mock files | `*.mock.ts` | `userRepository.mock.ts` |
| Test files | `*.test.ts` | `createUserUseCase.test.ts` |
| Repository methods | findOne/findMany + params | `findManyByRoleIn` |
| Parameters | Generic names | `(id, version)` not `(userId, userVersion)` |

### No abbreviations

```typescript
// WRONG
const tx = await this.repository.findOneById(txId);

// CORRECT
const transaction = await this.repository.findOneById(transactionId);
```

### No lazy naming

Avoid: `data`, `result`, `info`, `details`, `manager` (be specific).

### File names match class names

```
CreateUserUseCase → createUserUseCase.ts
UserRepository    → userRepository.ts
SignInResolver    → signInResolver.ts
```

### Constant name matches value

```typescript
// WRONG
export const EMAIL_TASK = 'SEND_VERIFICATION_EMAIL_TASK';

// CORRECT
export const SEND_VERIFICATION_EMAIL_TASK = 'SEND_VERIFICATION_EMAIL_TASK';
```

---

## Testing Rules

### mockImplementation only

```typescript
// WRONG
mock.mockResolvedValue(entity);
mock.mockRejectedValue(new Error());
mock.mockReturnValue(value);

// CORRECT (Vitest)
mock.mockImplementation(async () => entity);
mock.mockImplementation(async () => { throw new Error(); });
mock.mockImplementation(() => value);
```

### Mock only fields the subject uses

```typescript
// WRONG — mocking unused fields
const user = {
  id: 'user-1',
  email: 'test@test.com',
  name: 'John',           // not used by subject
  createdAt: new Date(),   // not used by subject
};

// CORRECT
const user = {
  id: 'user-1',
  email: 'test@test.com',
};
```

### No type casts on mock returns

```typescript
// WRONG
mock.mockImplementation(async () => entity as UserEntity);

// CORRECT
mock.mockImplementation(async () => entity);
```

### Specific dates in tests

```typescript
// WRONG
const date = new Date();

// CORRECT
const date = new Date('2025-01-15');
```

### No random data libraries

No `chance`, `faker`, or similar. Use explicit, deterministic test data.

### Never mock logger

```typescript
// WRONG
const loggerMock = { info: vi.fn() };

// CORRECT
import { createLogger } from '../shared/logger.js';
const logger = createLogger();
```

### Vitest config handles mock cleanup

```typescript
// vitest.config.ts
export default defineConfig({
  test: { clearMocks: true, restoreMocks: true },
});
```

No manual `vi.clearAllMocks()` in tests.

### Required test coverage

Every new file needs tests:
- `*UseCase.ts` → `*UseCase.test.ts`
- `*Resolver.ts` → `*Resolver.test.ts`

Test scenarios:
- Happy path
- Error handling (entity not found, validation)
- Edge cases (null, empty)
- Error propagation from dependencies

---

## Database Rules (Drizzle)

### Schema definitions in TypeScript

Table definitions in `src/infra/database/schema/`. Column names in snake_case:

```typescript
export const users = pgTable('users', {
  id:           uuid('id').defaultRandom().primaryKey(),
  version:      integer('version').default(0).notNull(),
  email:        text('email').unique().notNull(),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
  deletedAt:    timestamp('deleted_at'),
});
```

### Migrations

Generated by `drizzle-kit generate`. SQL files are version-controlled.
Never edit generated migration files manually.

### UNIQUE creates index

Don't add redundant indexes:

```typescript
// WRONG
email: text('email').unique().notNull(),
// + separate index on email — UNIQUE already creates one

// CORRECT
email: text('email').unique().notNull(),
```

### No business logic in database

No triggers, no stored procedures with business rules. Business logic belongs in use cases.

---

## Quick Reference — Most Common Violations

1. **ONLY FOUR TYPE CATEGORIES** — Native JS, Entity, DTO, Schema. Everything else FORBIDDEN.
2. **No `*UseCaseParams` types** — use entity types directly.
3. **Code comments** — remove all from production code.
4. **mockResolvedValue** → use `mockImplementation(async () => value)`.
5. **Type casts on mocks** — remove `as Entity` from mock returns.
6. **process.env** → use Zod-validated `env` config.
7. **Info/Details/Data/Result/Params types** — kill the type, return Entity or null.
8. **Custom result types in use cases** — return Entity or null, NEVER custom types.
9. **Repository with business logic** — move to use case.
10. **Missing version param** — add to all update/delete calls.
11. **Dynamic logger strings** — use static message + object data.
12. **Empty strings** — use null instead.
13. **Undefined** — use null, undefined is evil.
14. **Missing test files** — every use case/resolver needs tests.
15. **Sequential awaits** — use `Promise.all()` for independent async.
16. **Task handlers receiving entities** — receive IDs, fetch fresh data.
17. **Barrel files** — banned. Import directly from source files.
18. **Type casting** — `as Type` is banned. Fix the types. Only allowed in ORM base layer.
