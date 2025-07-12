import express, { Router } from 'express';

interface Props {
  port: number;
  routes: Router;
}

export class Server {
  public app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor({ port, routes }: Props) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
