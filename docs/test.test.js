import { jest } from '@jest/globals';

// test('should sum two numbers', () => {
//   expect(suma(2, 1)).toBe(3);
// });

// test('should return true', () => {
//   expect(sumAandB()).toBe(3);
// });

test('should return true', async () => {
  jest.unstable_mockModule('../getNumbers.js', () => ({
    getNumberA: jest.fn(() => 2),
    getNumberB: jest.fn(() => 3),
  }));
  const { sumAandB } = await import('../suma.js');
  expect(sumAandB()).toBe(5);
});
  