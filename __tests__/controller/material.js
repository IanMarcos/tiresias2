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
      updateMaterial: jest.fn(async () => ({ id: 1 })),
      getMaterialById: jest.fn(async () => ({ material: mockMaterials[0] })),
      deleteMaterial: jest.fn(async () => ({})),
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

  it('should get a material by id', async () => {
    // Arrange
    const { getMaterial } = await import('../../src/controllers/material.js');

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({ params: { id: 1 } });
    await getMaterial(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().results.material.id).toEqual(1);
  });

  it('should delete a material by id', async () => {
    // Arrange
    const { deleteMaterial } = await import(
      '../../src/controllers/material.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      params: { id: 1 },
      requester: { uid: 1 },
    });
    await deleteMaterial(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
  });

  it('should update material', async () => {
    // Arrange
    const { updateMaterial } = await import(
      '../../src/controllers/material.js'
    );

    // Act
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      params: { id: 1 },
      body: { titulo: 'Libro' },
      requester: { uid: 1 },
    });
    await updateMaterial(request, response);

    // Assert
    expect(response.statusCode).toEqual(200);
  })
});
