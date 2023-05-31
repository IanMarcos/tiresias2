import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockSearch from '../fixtures/search.json';

describe('Search Controller', () => {
  // Arrange
  jest.unstable_mockModule('../../src/services/unified-search.js', () => ({
    default: {
      searchMaterialsandAuthors: jest.fn(async () => mockSearch),
    },
  }));

  it('should get searched materials', async () => {
    // Arrange
    const { searchMaterialsAndAuthors } = await import(
      '../../src/controllers/search.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      body: {
        searchTerm: 'Libro',
      },
    });
    await searchMaterialsAndAuthors(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.materials.length).toEqual(3);
  });
});
