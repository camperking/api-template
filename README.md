# API development and testing template

This is a template for development and testing of APIs. Start by replacing the OpenAPI spec in `static/openapi.json` and run the dev server to get a live `redoc` documentation.

The server uses `dotenv` for configuration. A `mongodb` client is available via `import { db } from './lib/db.js'`. The dev server can be started with `npm run dev`. There is also a test example made with `mocha`.