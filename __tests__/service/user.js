import { jest } from '@jest/globals';
import mockUsers from '../fixtures/users.json';

describe('User Service', () => {
  it('should get all users', async () => {
    // Arrange
    jest.unstable_mockModule('../../src/dao/user.js', () => ({
      default: {
        getAll: jest.fn(async () => mockUsers),
      },
    }));

    // Act
    const { default: UserService } = await import('../../src/services/user.js');
    const userService = new UserService();
    const response = await userService.getUsers();

    // Assert
    expect(response.length).toEqual(2);
  });
});
