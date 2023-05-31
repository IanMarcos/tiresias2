import { jest } from '@jest/globals';
import mockMaterials from '../fixtures/materials.json';
import mockRoles from '../fixtures/roles.json';

describe('Material Service', () => {
  
  it('should get all materials', async () => {
    jest.unstable_mockModule('../../src/dao/material.js', () => ({
      default: {
        getAll: jest.fn(async () => mockMaterials),
      },
    }));
    const { default: materialsDAO } = await import('../../src/dao/material.js');
    const mockMaterialDAO = jest.spyOn(materialsDAO, 'getAll');
  
    jest.unstable_mockModule('../../src/dao/roles.js', () => ({
      default: {
        getAllRoles: jest.fn(async () => mockRoles),
      },
    }));
    const { default: rolesDAO } = await import('../../src/dao/roles.js');
    const mockRolesDAO = jest.spyOn(rolesDAO, 'getAllRoles');
    const { default: MaterialService } = await import(
      '../../src/services/material.js'
    );
    const response = await MaterialService.getMaterials();
  
    expect(mockMaterialDAO).toHaveBeenCalledTimes(1);
    expect(mockRolesDAO).toHaveBeenCalledTimes(1);
    expect(response.length).toEqual(1);
  });
});
