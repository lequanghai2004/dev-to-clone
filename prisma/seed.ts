// import { db } from '~/server/db/root';

// try {
//     const table = db.user;
//     const id = 'cl9ebqhxk00003b600tymydho';

//     await table.upsert({
//         // Checks for a record matching the where condition.
//         where: { id },
//         // If no record exists: Inserts a new record.
//         create: { id },
//         // If a record exists: Updates the existing record.
//         update: {},
//     });
// } catch (e) {
//     console.error(e);
//     process.exit(1);
// } finally {
//     await db.$disconnect();
// }
