import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import mockMaterials from '../fixtures/materials.json';

// jest.mock('../../src/services/material.js', () => ({
//   getAllMaterials: jest.fn(),
// }));

// const mockMaterialService = jest.spyOn(materialService, 'getAllMaterials');

describe('Material Controller', () => {
  it('should get all materials', async () => {
    jest.unstable_mockModule('../../src/services/material.js', () => ({
      default: {
        getMaterials: jest.fn(async () => ({ materials: mockMaterials })),
      },
    }));

    const { getAllMaterials } = await import(
      '../../src/controllers/material.js'
    );
    // mock
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    // const mockMaterialsList = jest.fn(async () => ({ materials: mockMaterials }));
    // mockMaterialService.mockImplementation(mockMaterialsList);
    await getAllMaterials(request, response);
    // expect(mockMaterialService).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    // expect(response._isEndCalled()).toBeTruthy();
    // console.log(response);
    expect(response._getJSONData().results.materials.length).toEqual(1);
  });
});
