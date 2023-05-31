import { jest } from '@jest/globals';
import mockSearch from '../fixtures/search.json';
import mockRoles from '../fixtures/roles.json';

describe('Unified Search Service', () => {
  it('should get all requests', async () => {
    // Arrange
    jest.unstable_mockModule('../../src/dao/material.js', () => ({
      default: {
        search: jest.fn(async () => mockSearch.materials),
      },
    }));
    jest.unstable_mockModule('../../src/dao/roles.js', () => ({
      default: {
        getAllRoles: jest.fn(async () => mockRoles),
      },
    }));
    jest.unstable_mockModule('../../src/dao/person-material.js', () => ({
      default: {
        searchPeopleByRol: jest.fn(async () => []),
      },
    }));

    // Act
    const { default: UnifiedSearchService } = await import('../../src/services/unified-search.js');
    const response = await UnifiedSearchService.searchMaterialsandAuthors({
      searchTerm: 'Libro',
    });

    // Assert
    // expect(response.materials).toEqual();
  });
});
