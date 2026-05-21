import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const dataFolder = join(process.cwd(), 'data');
const joinUsFile = join(dataFolder, 'join-us.json');

const app = express();
const angularApp = new AngularNodeAppEngine();
app.use(express.json());

app.post('/api/join-us', (req, res) => {
  const { email, password, interests } = req.body ?? {};

  if (!email || !password || !Array.isArray(interests)) {
    res.status(400).json({ message: 'Invalid join us data' });
    return;
  }

  if (!existsSync(dataFolder)) {
    mkdirSync(dataFolder, { recursive: true });
  }

  const currentData = existsSync(joinUsFile)
    ? JSON.parse(readFileSync(joinUsFile, 'utf-8'))
    : [];

  currentData.push({
    email,
    password,
    interests,
    createdAt: new Date().toISOString(),
  });

  writeFileSync(joinUsFile, JSON.stringify(currentData, null, 2));
  res.status(201).json({ message: 'Join us data saved' });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
