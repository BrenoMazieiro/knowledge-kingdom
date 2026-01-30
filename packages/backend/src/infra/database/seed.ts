/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { db } from './client';
import { backofficeManagers } from './schema/backofficeManagers';
import { kingdoms } from './schema/kingdoms';
import { villages } from './schema/villages';
import { houses } from './schema/houses';
import { contents } from './schema/contents';
import { questions } from './schema/questions';
import { questionOptions } from './schema/questionOptions';
import { users } from './schema/users';
import { wallets } from './schema/wallets';
import { pino } from 'pino';
import { hashSync } from 'bcryptjs';
import { players, kingdomsData } from './seedData';

const logger = pino();

const seed = async () => {
  logger.info('Seeding database...');

  const passwordHash = hashSync('password123', 10);

  // 1. Create backoffice manager
  logger.info('Creating backoffice manager...');
  await db.insert(backofficeManagers).values([
    {
      email: 'admin@theknowledgekingdom.com',
      name: 'System Admin',
      passwordHash,
      permissionLevel: 'ADMIN',
    },
  ]);

  // 2. Create players + wallets
  logger.info('Creating %d players...', players.length);
  const insertedUsers = await db
    .insert(users)
    .values(
      players.map((p) => ({
        email: p.email,
        name: p.name,
        gameName: p.gameName,
        passwordHash,
        emailVerified: true,
      })),
    )
    .returning();

  const userIds = insertedUsers.map((u) => u.id);

  await db.insert(wallets).values(userIds.map((id) => ({ playerId: id })));
  logger.info('Created %d players with wallets', userIds.length);

  // 3. Create kingdoms, villages, houses, contents, questions, options
  for (const kData of kingdomsData) {
    logger.info('Creating kingdom: %s', kData.name);
    const [kingdom] = await db
      .insert(kingdoms)
      .values({
        name: kData.name,
        description: kData.description,
        sortOrder: kingdomsData.indexOf(kData) + 1,
      })
      .returning();

    for (let vi = 0; vi < kData.villages.length; vi++) {
      const vData = kData.villages[vi]!;
      logger.info('  Village: %s', vData.name);
      const [village] = await db
        .insert(villages)
        .values({
          kingdomId: kingdom!.id,
          name: vData.name,
          description: vData.description,
          sortOrder: vi + 1,
        })
        .returning();

      for (let hi = 0; hi < vData.houses.length; hi++) {
        const hData = vData.houses[hi]!;
        const creatorId = userIds[Math.floor(Math.random() * userIds.length)]!;

        const [house] = await db
          .insert(houses)
          .values({
            villageId: village!.id,
            creatorId,
            name: hData.name,
            description: hData.description,
            isFree: hData.isFree,
            entryPrice: hData.entryPrice,
            sortOrder: hi + 1,
          })
          .returning();

        // Contents
        if (hData.contents.length > 0) {
          await db.insert(contents).values(
            hData.contents.map((cData, ci) => ({
              houseId: house!.id,
              creatorId,
              title: cData.title,
              type: cData.type,
              body: cData.body,
              description: cData.description,
              sortOrder: ci + 1,
            })),
          );
        }

        // Questions + Options
        for (let qi = 0; qi < hData.questions.length; qi++) {
          const qData = hData.questions[qi]!;
          const [question] = await db
            .insert(questions)
            .values({
              houseId: house!.id,
              creatorId,
              text: qData.text,
              difficulty: qData.difficulty,
              explanation: qData.explanation,
              sortOrder: qi + 1,
            })
            .returning();

          await db.insert(questionOptions).values(
            qData.options.map((opt, oi) => ({
              questionId: question!.id,
              text: opt.text,
              isCorrect: opt.isCorrect,
              sortOrder: oi + 1,
            })),
          );
        }
      }
    }
  }

  logger.info('Seed completed successfully!');
  logger.info('Summary:');
  logger.info('  - 1 Backoffice Manager (admin@theknowledgekingdom.com / password123)');
  logger.info('  - %d Players (all with password: password123)', players.length);
  logger.info('  - %d Kingdoms', kingdomsData.length);
  logger.info(
    '  - %d Villages',
    kingdomsData.reduce((sum, k) => sum + k.villages.length, 0),
  );
  logger.info(
    '  - %d Houses',
    kingdomsData.reduce((sum, k) => sum + k.villages.reduce((vs, v) => vs + v.houses.length, 0), 0),
  );

  process.exit(0);
};

seed().catch((error) => {
  logger.error(error, 'Seed failed');
  process.exit(1);
});
