import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockMaterials from '../fixtures/materials.json';
import materialPostMock from '../fixtures/materialPost.json';

// jest.mock('../../src/services/material.js', () => ({
//   getAllMaterials: jest.fn(),
// }));

// const mockMaterialService = jest.spyOn(materialService, 'getAllMaterials');

describe('Material Controller', () => {
  // Arrange
  jest.unstable_mockModule('../../src/services/material.js', () => ({
    default: {
      getMaterials: jest.fn(async () => ({ materials: mockMaterials })),
      createMaterial: jest.fn(async () => ({ id: 1 })),
    },
  }));

  it('should get all materials', async () => {
    // Arrange
    const { getAllMaterials } = await import(
      '../../src/controllers/material.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    await getAllMaterials(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.materials.length).toEqual(1);
  });

  it('should create a new material', async () => {
    // Arrange
    const { createMaterial } = await import(
      '../../src/controllers/material.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest(materialPostMock);
    await createMaterial(request, response);

    // Assert
    expect(response.statusCode).toEqual(201);
    expect(response._getJSONData().results.id).toEqual(1);
  });
});
