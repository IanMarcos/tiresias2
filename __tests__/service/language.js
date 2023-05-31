import { jest } from '@jest/globals';
import mockLanguages from '../fixtures/languages.json';

describe('Language Service', () => {
  it('should get all languages', async () => {
    // Arrange
    jest.unstable_mockModule('../../src/dao/language.js', () => ({
      default: {
        getAll: jest.fn(async () => mockLanguages),
      },
    }));

    // Act
    const { default: LanguageServce } = await import('../../src/services/language.js');
    const languageService = new LanguageServce();
    const response = await languageService.getAllLanguages();

    // Assert
    expect(response.length).toEqual(8);
  });
});
