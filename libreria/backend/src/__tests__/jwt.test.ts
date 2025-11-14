const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test-secret';

describe('JWT Token Utilities', () => {
  describe('jwt.sign and jwt.verify', () => {
    test('should create a valid JWT token', () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    test('should verify and decode a valid token', () => {
      const payload = { userId: '456', email: 'user@test.com' };
      const token = jwt.sign(payload, JWT_SECRET);
      
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
    });

    test('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => {
        jwt.verify(invalidToken, JWT_SECRET);
      }).toThrow();
    });

    test('should throw error for expired token', () => {
      const payload = { userId: '789' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '0s' }); // Token inmediatamente expirado
      
      // Esperar un momento para que expire
      setTimeout(() => {
        expect(() => {
          jwt.verify(token, JWT_SECRET);
        }).toThrow();
      }, 100);
    });
  });
});
