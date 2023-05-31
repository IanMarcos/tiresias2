import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockRequests from '../fixtures/requests.json';
import requestPostMock from '../fixtures/requestPost.json';

describe('Request Controller', () => {
  jest.unstable_mockModule('../../src/services/request.js', () => ({
    // eslint-disable-next-line object-shorthand
    default: {
      getAllRequests: jest.fn(async () => mockRequests),
      createRequest: jest.fn(async () => ({ id: 1 })),
    },
  }));

  it('should get all requests', async () => {
    // Arrange
    const { getAllRequests } = await import('../../src/controllers/request.js');

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    await getAllRequests(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.length).toEqual(6);
  });

  it('should create a new user', async () => {
    // Arrange
    const { createRequest } = await import('../../src/controllers/request.js');

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest(requestPostMock);
    await createRequest(request, response);

    // Assert
    expect(response.statusCode).toEqual(201);
    expect(response._getJSONData().results.id).toEqual(1);
  });
});
