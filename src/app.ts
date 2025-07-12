import { envs } from './config/env';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

function main() {
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  server.start();
}

(() => {
  main();
})();
