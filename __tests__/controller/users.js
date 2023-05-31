import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockUsers from '../fixtures/users.json';
import userPostMock from '../fixtures/userPost.json';

describe('Users Controller', () => {
  jest.unstable_mockModule('../../src/services/user.js', () => ({
    // eslint-disable-next-line object-shorthand
    default: function () {
      return {
        getUsers: jest.fn(async () => ({ users: mockUsers })),
        createUser: jest.fn(async () => ({ uid: 1 })),
        getUserById: jest.fn(async () => ({ user: mockUsers[0] })),
        deleteUser: jest.fn(async () => ({})),
      };
    },
  }));

  it('should get all users', async () => {
    // Arrange
    const { getAllUsers } = await import('../../src/controllers/users.js');

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    await getAllUsers(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.users.length).toEqual(2);
  });

  it('should create a new user', async () => {
    // Arrange
    const { createUser } = await import(
      '../../src/controllers/users.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest(userPostMock);
    await createUser(request, response);

    // Assert
    expect(response.statusCode).toEqual(201);
    expect(response._getJSONData().results.user.uid).toEqual(1);
  });

  it('should get a user by id', async () => {
    // Arrange
    const { getUser } = await import(
      '../../src/controllers/users.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      params: {
        id: 1,
      },
    });
    await getUser(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.user.id).toEqual(1);
  });

  it('should delete a user by id', async () => {
    // Arrange
    const { deleteUser } = await import(
      '../../src/controllers/users.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      params: {
        id: 1,
      },
    });
    await deleteUser(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});