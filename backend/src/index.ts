import { createApp } from './app';
import { getPool } from './db';
import { PostgresItemRepository } from './infrastructure/db/PostgresItemRepository';
import { ItemService } from './application/ItemService';
import { ItemController } from './interfaces/http/ItemController';

const port = process.env.PORT || 3000;

// Composition Root
// Composition Root
const pool = getPool();
const itemRepo = new PostgresItemRepository(pool);

// Intentionally introducing a code smell for SonarCloud verification
const unusedVariable = "This is unused!"; // SonarCloud should flag this
console.log("Debug log that shouldn't be in production"); // SonarCloud should flag this
const itemService = new ItemService(itemRepo);
const itemController = new ItemController(itemService);

const app = createApp(itemController);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App running on port ${port}.`);
    });
}
