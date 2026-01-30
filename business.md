# The Knowledge Kingdom — Business Rules

## 1. Core Concept

A gamified educational platform where knowledge is organized as a medieval kingdom hierarchy. Players learn by conquering houses, earning titles, and competing for leadership of villages and kingdoms.

---

## 2. Hierarchy & Structure

```
World (The Knowledge Kingdom)
  └── Kingdoms (broad subjects: Math, Computer Science, History...)
        └── Villages (focused areas: Algebra, Data Structures...)
              └── Houses (specific topics: Quadratic Equations, Binary Trees...)
                    ├── Content (videos, PDFs, articles, books)
                    └── Questions (easy / medium / hard)
```

---

## 3. Currency: Quills

**Quills** are the in-game currency. Every economic action flows through Quills.

### 3.1 Earning Quills (Faucets)

| Action                                      | Quills Earned           |
|---------------------------------------------|-------------------------|
| Pass a house test (Novice tier — 50%+)      | 10                      |
| Pass a house test (Adept tier — 75%+)       | 25                      |
| Pass a house test (Maestro tier — 90%+)     | 50                      |
| Pass a house test (Archon tier — 100%)      | 100                     |
| First test of the day (daily bonus)         | 5                       |
| Earn a village badge — Pupil               | 50                      |
| Earn a village badge — Scribe              | 100                     |
| Earn a village badge — Scholar             | 200                     |
| Earn a village badge — Sage                | 500                     |
| Earn a kingdom badge — Pilgrim             | 200                     |
| Earn a kingdom badge — Lorekeeper          | 500                     |
| Earn a kingdom badge — Provost             | 1,000                   |
| Earn a kingdom badge — Sovereign           | 2,500                   |
| Earn Grand Archivist (world badge)          | 10,000                  |
| Revenue share from owned paid houses        | 70% of entry fee (to player's wallet) |

### 3.2 Spending Quills (Sinks)

| Action                                      | Quills Cost             |
|---------------------------------------------|-------------------------|
| Create a Kingdom (+ 2 villages + 6 houses)  | 5,000                   |
| Create a Village (in existing kingdom)      | 1,500                   |
| Create a House (in existing village)        | 500                     |
| Retake a test (after cooldown)              | 15 per retake (increases +5 per attempt, caps at 30) |
| Enter a paid house                          | Set by house owner (min 10, max 1,000) |
| Challenge a Chancellor (duel)               | 200                     |
| Challenge a King/Queen (duel)               | 500                     |
| Request private status (kingdom)            | 2,000 + BM approval     |
| Request private status (village)            | 800 + BM approval       |
| Request private status (house)              | 300 + BM approval       |

### 3.3 Revenue Split (Paid House Entries)

When a player pays to enter a house:

| Recipient                  | Share | Destination        |
|----------------------------|-------|--------------------|
| House Owner                | 70%   | Player's wallet    |
| Platform                   | 20%   | Platform           |
| King/Queen of the kingdom  | 7%    | **Kingdom treasury** |
| Chancellor of the village  | 3%    | **Village treasury** |

The 7% and 3% shares go to the **entity treasury**, not to the leader's personal wallet. Leaders manage the treasury but do not own it. If no King/Queen or Chancellor exists, their share goes to the platform.

### 3.4 Entity Treasuries

Every kingdom and village has a **treasury** — a Quill balance managed by its leader.

**Village Treasury (managed by Chancellor):**
- Funded by the 3% share of paid house entries in the village.
- Chancellor can spend treasury Quills to:
  - **Create a house for free** (500 Quills from treasury instead of personal wallet).
  - **Appoint a player as house manager** for treasury-created houses.
- Treasury-created houses belong to the **village**, not the Chancellor personally. If the Chancellor loses the title, the new Chancellor inherits management of those houses.

**Kingdom Treasury (managed by King/Queen):**
- Funded by the 7% share of paid house entries in the kingdom.
- King/Queen can spend treasury Quills to:
  - **Create a village for free** (1,500 Quills from treasury, includes 3 houses).
  - **Create a house for free** in any village of the kingdom (500 Quills from treasury).
  - **Appoint a player as village manager** (acts as Chancellor for that village but title is "Manager", not "Chancellor").
  - **Appoint a player as house manager** for treasury-created houses.
- Treasury-created entities belong to the **kingdom**, not the King/Queen personally. If the King/Queen loses the title, the new ruler inherits management of those entities.

**Important distinctions:**
- Leaders can **also own personal houses** — being a Chancellor or King/Queen does not prevent creating houses with personal Quills. Personal houses earn 70% revenue to the player's wallet as normal.
- Treasury-created houses earn 70% revenue back to the **entity treasury**, not to the appointed manager's wallet.
- Appointed managers have the same content/question management capabilities as house owners, but don't receive the 70% revenue — the treasury does.
- Leaders cannot withdraw treasury Quills to their personal wallet. Treasury funds can only be spent on entity creation and management.

---

## 4. Entity Creation

### 4.1 Kingdom Creation

**By Player:**
1. Player pays 5,000 Quills.
2. Must define: kingdom name, description, 2 villages (names + descriptions), 3 houses per village (names + descriptions).
3. Player must fill ALL 6 houses with content + minimum 20 questions each (10 hard, 5 medium, 5 easy).
4. Kingdom enters **"Pending Review"** status.
5. BM reviews and approves/rejects with feedback.
6. On approval: kingdom goes live, creator becomes King/Queen automatically.

**By Backoffice:**
1. BM creates kingdom directly (no cost, no pending state).
2. No King/Queen initially.
3. A player can claim the throne by becoming **Sage in 70%+ of the kingdom's villages**.

### 4.2 Village Creation

**By Player:**
1. Player pays 1,500 Quills.
2. Must create 3 houses with content + minimum 20 questions each.
3. BM approval required.
4. Creator becomes Chancellor on approval.

**By Backoffice:**
1. BM creates village directly (no cost, no pending state).
2. No Chancellor initially.
3. A player can claim the title by achieving **Sage in 70%+ of the village's houses**.

### 4.3 House Creation

1. Player pays 500 Quills.
2. Chooses a kingdom and village.
3. Fills the house with content + minimum 20 questions (10 hard, 5 medium, 5 easy).
4. Auto-publishes (hybrid moderation: Chancellor does first-pass moderation, BM handles escalations).

---

## 5. Conquest & Progression

### 5.1 House Conquest Tiers

Based on **test score percentage** (correct answers):

| Tier        | Score Required | Quills Earned |
|-------------|---------------|---------------|
| **Novice**  | 50%+          | 10            |
| **Adept**   | 75%+          | 25            |
| **Maestro** | 90%+          | 50            |
| **Archon**  | 100%          | 100           |

A player's tier for a house is their **best ever score**. Achieving Adept doesn't remove Novice — it upgrades. Only the highest tier matters for village/kingdom progression.

**Quill rewards:** Players earn only the **difference** between their new tier reward and what they already earned. Example: a player who earned 10 Quills as Novice and later achieves Adept earns 15 additional Quills (25 - 10), not 25.

### 5.2 Test Mechanics

- Each house has a **question pool**: minimum 20 questions (10 hard, 5 medium, 5 easy).
- Default test: **5 questions** — 2 easy, 1 medium, 2 hard.
- House owner can customize:
  - Total number of questions per test.
  - Difficulty balance (ratio of easy/medium/hard).
- Questions are **randomly selected** from the pool each time.
- Each question has a difficulty tag: `EASY`, `MEDIUM`, `HARD`.

### 5.3 Test Retake Rules

| Attempt | Cooldown  | Cost       |
|---------|-----------|------------|
| 1st     | None      | Free       |
| 2nd     | 1 hour    | 15 Quills  |
| 3rd     | 4 hours   | 20 Quills  |
| 4th     | 12 hours  | 25 Quills  |
| 5th+    | 24 hours  | 30 Quills  |

Cooldown and cost apply **per house**. Different houses have independent retake counters.

### 5.4 House Groups

A village may have multiple houses covering the same topic (e.g., two different "Binary Trees" houses by different owners). To avoid forcing players to repeat equivalent content for badge progression, houses can be **grouped**.

**How it works:**
- The Chancellor (or BM) can group houses that cover the same topic into a **House Group**.
- A House Group counts as **one slot** for badge progression.
- A player only needs to Archon **one house** in the group to complete that slot.
- Ungrouped houses each count as their own slot.
- The player's best result across any house in the group is what counts.

**Example:** A village has 10 houses, but 2 of them are grouped (both cover "Sorting Algorithms"). The village has **9 slots** (8 standalone + 1 group). To become Sage, a player needs Archon in all 9 slots — for the grouped slot, Archon in either house satisfies it.

**Who can group houses:**
- **Chancellor** of the village (first-pass).
- **BM** (can override or create groups directly).
- House owners **cannot** group their own houses — this prevents abuse.

**Benefits:**
- Multiple houses on the same topic can coexist (healthy competition between owners for best content).
- Players aren't penalized for duplicate coverage.
- House owners compete on quality — the house with better content naturally attracts more players.

### 5.5 Village Badge Progression

Based on **Archon (100%) completion** of house **slots** in the village (see House Groups above):

| Badge       | Requirement              |
|-------------|--------------------------|
| **Pupil**   | Archon in 25% of slots   |
| **Scribe**  | Archon in 50% of slots   |
| **Scholar** | Archon in 75% of slots   |
| **Sage**    | Archon in 100% of slots  |

### 5.6 Kingdom Badge Progression

Based on **Sage completion** of villages in the kingdom:

| Badge          | Requirement               |
|----------------|---------------------------|
| **Pilgrim**    | Sage in 25% of villages   |
| **Lorekeeper** | Sage in 50% of villages   |
| **Provost**    | Sage in 75% of villages   |
| **Sovereign**  | Sage in 100% of villages  |

### 5.7 World Badge

| Badge              | Requirement                |
|--------------------|----------------------------|
| **Grand Archivist** | Sovereign in ALL kingdoms |

---

## 6. Leadership System

### 6.1 Titles

There is exactly **ONE** leader per entity. One Chancellor per village, one King/Queen per kingdom. Never more.

| Scope   | Title          | Treasury Income                                      |
|---------|----------------|------------------------------------------------------|
| Village | **Chancellor** | 3% of paid house revenue → village treasury          |
| Kingdom | **King/Queen** | 7% of paid house revenue → kingdom treasury          |

**Role stacking:** A player can be a King/Queen, a Chancellor, and a personal house owner all at the same time. These are not mutually exclusive. Personal houses earn revenue to the player's wallet; leadership titles grant treasury management powers.

### 6.2 How to Become a Leader

**Player-created entities:**
- The creator automatically gets the title (King/Queen or Chancellor).

**Backoffice-created entities:**
- No leader initially.
- A player can **claim** the title by achieving **Sage in 70%+ of the entity's sub-units**:
  - Chancellor: Archon in 70%+ of the village's house slots (see House Groups).
  - King/Queen: Sage in 70%+ of the kingdom's villages.

### 6.3 Leadership Duels

Any eligible player can **challenge** the current Chancellor or King/Queen.

**Eligibility:**
- To challenge a **Chancellor**: Must be **Archon in 30%+ of the house slots** in that village.
- To challenge a **King/Queen**: Must **already be a Chancellor** of a village within that kingdom.

**Duel Mechanics:**
1. Challenger pays the duel cost (200 Quills for Chancellor, 500 for King/Queen).
2. The current title holder can:
   - **Abdicate**: Pass the title peacefully (no test needed).
   - **Defend**: Both take a 50-question test.
3. If defending:
   - Questions are **HARD difficulty only**, randomly pulled from all houses in the scope (village or kingdom).
   - Both players take the same 50 questions.
   - **Higher score wins** the title.
   - **Draw = defender keeps the title.**
4. The loser keeps all their badges and Quills — only the title changes.

**Edge Case:** If a village/kingdom has fewer than 50 hard questions total, the test uses ALL available hard questions + fills the remainder with medium questions.

**Duel Cooldowns:**
- A title holder can only be challenged **once per 15 days** (per challenger).
- After a successful title change, there is a **7-day grace period** where the new leader cannot be challenged.
- Failed challengers must wait **30 days** before challenging the same title again.

### 6.4 Leader Responsibilities

**Chancellor (Village):**
- **Moderation:** First-pass moderation of new houses in their village.
- **Moderation:** Review house reports from players.
- **Moderation:** Can recommend blocking a house (escalates to BM).
- **Moderation:** Can approve/deny access requests for private houses.
- **Treasury:** Create houses using village treasury (no personal cost).
- **Treasury:** Appoint players as managers of treasury-created houses.

**King/Queen (Kingdom):**
- **Moderation:** Decide disputes escalated by Chancellors.
- **Moderation:** Can recommend blocking a village or house (escalates to BM).
- **Moderation:** Can approve/deny access requests for private villages.
- **Moderation:** Visible figurehead on kingdom page.
- **Treasury:** Create villages (with 3 houses) using kingdom treasury (no personal cost).
- **Treasury:** Create houses in any village using kingdom treasury.
- **Treasury:** Appoint players as village managers or house managers for treasury-created entities.

---

## 7. User Types

### 7.1 Backoffice Manager (BM)

**Account management:**
- Cannot self-register. Must be **invited by another BM**.
- Bootstrap: First BM created via CLI seed command.
- Optional **2FA** on their account.

**Permission levels:**

| Level      | Capabilities                              |
|------------|-------------------------------------------|
| **Viewer** | Read all data                             |
| **Editor** | Read + Create + Update                    |
| **Admin**  | Read + Create + Update + Delete + Manage BMs |

**Capabilities:**
- Create/manage kingdoms, villages, houses directly (no Quill cost).
- Approve/reject player-created kingdoms and villages.
- Approve/reject private status requests.
- Block/unblock users, houses, villages, kingdoms (with mandatory reason).
- Nominate leaders for backoffice-created entities.
- View audit logs.

**Audit Trail:**
- Every BM action is logged.
- Fields: `manager_id`, `action_type`, `entity_type`, `entity_id`, `before_state`, `after_state`, `reason`, `timestamp`.
- All entity tables have a `changed_by` field tracking the last BM who modified it.

**Blocking:**
- When anything is blocked, a **reason** is required.
- The reason is visible to the affected user.
- For houses/villages/kingdoms: a **sign** is displayed in-game with the reason.
- Pre-set messages available: "Under investigation, return later", "Violation of community guidelines", custom text.

### 7.2 Player

**Registration:**
- Sign up via frontend app or mobile.
- Required fields: **email** + **game name**.
- Email verification required.

**Capabilities:**
- Browse all public kingdoms, villages, houses.
- Enter houses (free or paid).
- View content, take tests, earn Quills and badges.
- Create kingdoms, villages, houses (by paying Quills).
- Challenge Chancellors and Kings/Queens (if eligible).
- Request private status for owned entities.
- Report houses/content for moderation.

**Every player can also be a house owner** — there is no separate account type. Creating a house is an in-game action available to any player who can afford it.

### 7.3 House Owner (= Player with houses)

Not a separate role. A player who has created one or more houses.

**Additional capabilities when owning a house:**
- Add/edit/remove content (videos, PDFs, articles).
- Create/edit/remove questions (minimum 20: 10 hard, 5 medium, 5 easy).
- Set house as free or paid (set Quill entry price, min 10, max 1,000).
- Customize test configuration (number of questions, difficulty balance).
- Accept/deny player entry requests (for private houses).
- Earn 70% revenue share from paid entries.

---

## 8. Access & Visibility

### 8.1 Public (Default)

- Visible to all players.
- Free houses: anyone can enter, browse content, take tests.
- Paid houses: visible to all, requires Quill payment to enter.

### 8.2 Private (Requires BM Approval)

- **Visible** in search/browse (name + description shown).
- Players can **request access** (apply to join).
- Access approved by: house owner (for houses), Chancellor (for villages), King/Queen (for kingdoms).
- Costs Quills + BM approval to switch to private.
- Only BMs can change visibility (player requests, BM approves).

### 8.3 Blocked

- Blocked by BM with a reason.
- Shows a sign: "This [house/village/kingdom] has been blocked: [reason]".
- All content inaccessible while blocked.
- Owner/leader notified with the reason.

---

## 9. Content & Questions

### 9.1 House Content

House owners can add unlimited content items:
- **Videos** (external URL or uploaded).
- **PDFs** (uploaded).
- **Articles** (rich text or external URL).
- **Books** (external URL or reference).

Each content item has: title, type, URL/body, description, sort order.

### 9.2 Questions

Each question belongs to a house and has:
- **Text**: The question prompt.
- **Type**: Multiple choice (4 options, 1 correct) — primary type for MVP.
- **Difficulty**: `EASY`, `MEDIUM`, `HARD`.
- **Options**: Array of 4 answer options with exactly one marked as correct.
- **Explanation**: Shown after answering (optional, educational value).

**Minimum per house:** 20 questions (10 hard, 5 medium, 5 easy).

**Test generation:** System randomly selects from the question pool based on the house's test configuration. Default: 5 questions (2 easy, 1 medium, 2 hard).

---

## 10. Economy Balance Summary

### 10.1 Quill Flow

```
PLAYER WALLET                        PLAYER WALLET
FAUCETS (earning)                    SINKS (spending)
─────────────────                    ─────────────────
Tests completion ──────┐      ┌──── Create Kingdom (5,000)
Badge rewards ─────────┤      ├──── Create Village (1,500)
Revenue share (owner) ─┘      ├──── Create House (500)
                        QUILLS ├──── Test retakes (15-30)
                              ├──── Paid house entry (10-1,000)
                              ├──── Challenge duel (200-500)
                              └──── Private status requests

ENTITY TREASURIES
─────────────────────────────────────────────────────
Village treasury (3% of paid entries) → Chancellor spends on houses + managers
Kingdom treasury (7% of paid entries) → King/Queen spends on villages, houses + managers
Treasury-created house revenue (70%) → back to entity treasury
```

### 10.2 New Player Onboarding

1. Player signs up (free).
2. All public free houses are immediately accessible.
3. Player takes tests → earns Quills.
4. With enough Quills, player can enter paid houses or create their own.
5. Player progresses through badges → earns more Quills per tier.
6. Eventually can create houses, challenge for leadership, create kingdoms.

**No real-money purchase required for progression.** The entire game can be played for free through public free houses. Paid houses are optional premium content.

---

## 11. Game Loops

### Short Loop (Minutes)
Browse house → Study content → Take test → Earn tier + Quills → Retake for higher tier.

### Medium Loop (Days/Weeks)
Conquer houses → Earn village badges → Become Chancellor candidate → Challenge for title.

### Long Loop (Weeks/Months)
Conquer villages → Earn kingdom badges → Become King/Queen candidate → Rule a kingdom → Earn passive income.

### Creator Loop
Earn Quills → Create house → Add quality content → Attract players → Earn revenue → Create more houses/villages/kingdoms.
