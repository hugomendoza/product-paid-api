describe('env configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear module cache to re-import the module
    jest.resetModules();
    // Reset process.env
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should load environment variables correctly', () => {
    process.env.PORT = '3000';
    
    const { envs } = require('../../src/config/env');
    
    expect(envs.PORT).toBe(3000);
    expect(typeof envs.PORT).toBe('number');
  });

  it('should throw error when PORT is not defined', () => {
    delete process.env.PORT;
    
    expect(() => {
      require('../../src/config/env');
    }).toThrow();
  });

  it('should throw error when PORT is not a valid number', () => {
    process.env.PORT = 'invalid-port';
    
    expect(() => {
      require('../../src/config/env');
    }).toThrow();
  });
});
