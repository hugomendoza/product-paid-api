import express, { Router } from 'express';

interface Props {
  port: number;
}

export class Server {
  public app = express();
  private serverListener?: any;
  private readonly port: number;

  constructor({ port = 3000 }: Props) {
    this.port = port;
  }

  async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
