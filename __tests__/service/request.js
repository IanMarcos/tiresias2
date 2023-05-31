import { jest } from '@jest/globals';
import mockRequests from '../fixtures/requests.json';

describe('Request Service', () => {
  it('should get all requests', async () => {
    // Arrange
    jest.unstable_mockModule('../../src/dao/request.js', () => ({
      default: {
        getAll: jest.fn(async () => mockRequests),
      },
    }));

    // Act
    const { default: RequestService } = await import('../../src/services/request.js');
    const response = await RequestService.getAllRequests();

    // Assert
    expect(response.length).toEqual(6);
  });
});
