import { Server } from './presentation/server';

function main() {
  const server = new Server({ port: 3000 });
  server.start();
}

(() => {
  main();
})();
