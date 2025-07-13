import { CustomError } from '../../../src/domain/errors/custom.error';

describe('CustomError', () => {
  describe('constructor', () => {
    it('should create an instance with statusCode and message', () => {
      const statusCode = 400;
      const message = 'Test error message';
      const error = new CustomError(statusCode, message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(statusCode);
      expect(error.message).toBe(message);
    });
  });

  describe('static methods', () => {
    it('should create a bad request error (400)', () => {
      const message = 'Bad request error';
      const error = CustomError.badRequest(message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe(message);
    });

    it('should create an unauthorized error (401)', () => {
      const message = 'Unauthorized error';
      const error = CustomError.unauthorized(message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe(message);
    });

    it('should create a forbidden error (403)', () => {
      const message = 'Forbidden error';
      const error = CustomError.forbidden(message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe(message);
    });

    it('should create a not found error (404)', () => {
      const message = 'Not found error';
      const error = CustomError.notFound(message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe(message);
    });

    it('should create an internal server error (500)', () => {
      const message = 'Internal server error';
      const error = CustomError.internalServer(message);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(message);
    });
  });
});
