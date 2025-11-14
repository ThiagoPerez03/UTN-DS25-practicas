/// <reference types="jest" />
const bcrypt = require('bcryptjs');

describe('Password Hashing Utilities', () => {
  describe('bcrypt password hashing', () => {
    test('should hash a password successfully', async () => {
      const password = 'test123';
      const hashed = await bcrypt.hash(password, 10);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    test('should verify correct password', async () => {
      const password = 'mySecretPassword';
      const hashed = await bcrypt.hash(password, 10);
      
      const isValid = await bcrypt.compare(password, hashed);
      expect(isValid).toBe(true);
    });

    test('should reject incorrect password', async () => {
      const password = 'correctPassword';
      const wrongPassword = 'wrongPassword';
      const hashed = await bcrypt.hash(password, 10);
      
      const isValid = await bcrypt.compare(wrongPassword, hashed);
      expect(isValid).toBe(false);
    });
  });
});