import express, { Router } from 'express';
import { Server } from '../../src/presentation/server';

// Mock swagger setup
jest.mock('swagger-ui-express', () => ({
  serve: jest.fn(),
  setup: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('../../src/config/swagger', () => ({
  swaggerSpec: {},
}));

describe('Server', () => {
  let server: Server;
  let mockRouter: Router;
  let mockPort: number;

  beforeEach(() => {
    mockRouter = Router();
    mockPort = 3000;
    server = new Server({ port: mockPort, routes: mockRouter });
    // Mock console.log to avoid cluttering test output
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    server.close();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create server instance with provided port and routes', () => {
      expect(server).toBeInstanceOf(Server);
      expect(server.app).toBeDefined();
      expect((server as any).port).toBe(mockPort);
      expect((server as any).routes).toBe(mockRouter);
    });
  });

  describe('start', () => {
    it('should configure express middleware', async () => {
      const useSpy = jest.spyOn(server.app, 'use');
      const listenSpy = jest.spyOn(server.app, 'listen').mockImplementation((port, callback) => {
        if (typeof callback === 'function') callback();
        return {} as any;
      });

      await server.start();

      // Check express.json() middleware
      expect(useSpy).toHaveBeenCalledWith(express.json());
      
      // Check swagger documentation route
      expect(useSpy).toHaveBeenCalledWith('/api-docs', expect.any(Function), expect.any(Function));
      
      // Check routes
      expect(useSpy).toHaveBeenCalledWith(mockRouter);
      
      // Check listen was called with correct port
      expect(listenSpy).toHaveBeenCalledWith(mockPort, expect.any(Function));
      
      // Check console.log was called
      expect(console.log).toHaveBeenCalledWith(`Server running on port ${mockPort}`);
    });

    it('should store server listener', async () => {
      const mockListener = { close: jest.fn() };
      jest.spyOn(server.app, 'listen').mockImplementation((port, callback) => {
        if (typeof callback === 'function') callback();
        return mockListener as any;
      });

      await server.start();

      expect((server as any).serverListener).toBe(mockListener);
    });
  });

  describe('close', () => {
    it('should close server listener if it exists', async () => {
      const mockClose = jest.fn();
      const mockListener = { close: mockClose };
      jest.spyOn(server.app, 'listen').mockImplementation((port, callback) => {
        if (typeof callback === 'function') callback();
        return mockListener as any;
      });

      await server.start();
      server.close();

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should handle close when server has not been started', () => {
      expect(() => server.close()).not.toThrow();
    });
  });

  describe('middleware order', () => {
    it('should apply middleware in correct order', async () => {
      const useCallOrder: string[] = [];
      jest.spyOn(server.app, 'use').mockImplementation((arg: any) => {
        if (typeof arg === 'function' && arg.name === 'jsonParser') {
          useCallOrder.push('json');
        } else if (arg === '/api-docs') {
          useCallOrder.push('swagger');
        } else if (arg === mockRouter) {
          useCallOrder.push('routes');
        }
        return server.app;
      });

      jest.spyOn(server.app, 'listen').mockImplementation((port, callback) => {
        if (typeof callback === 'function') callback();
        return {} as any;
      });

      await server.start();

      expect(useCallOrder).toEqual(['json', 'swagger', 'routes']);
    });
  });
});
