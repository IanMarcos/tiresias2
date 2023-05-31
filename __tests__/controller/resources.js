import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockLanguages from '../fixtures/languages.json';

// jest.mock('../../src/services/material.js', () => ({
//   getAllMaterials: jest.fn(),
// }));

// const mockMaterialService = jest.spyOn(materialService, 'getAllMaterials');

describe('Resources Controller', () => {
  // Arrange
  jest.unstable_mockModule('../../src/services/language.js', () => ({
    default: function () {
      return {
        getAllLanguages: jest.fn(async () => mockLanguages),
      };
    },
  }));

  it('should get all languages', async () => {
    // Arrange
    const { getLanguages } = await import(
      '../../src/controllers/resources.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    await getLanguages(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.length).toEqual(8);
  });
});
