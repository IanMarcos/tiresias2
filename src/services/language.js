import { Language } from '../models/index.js';
import { LanguageDAO } from '../dao/index.js';

class LanguageService {
  #modelInstance;

  constructor(languageInstance = Language) {
    this.#modelInstance = languageInstance;
  }

  /**
   * Checks whether a language exists, if it does, returns its code.
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.language - May be a name or a two characters code.
   */
  async getLanguageCode({ language }) {
    try {
      if (language.length === 2) {
        // Buscar por código
        const exists = await LanguageDAO.doesExist(this.#modelInstance, {
          code: language,
        });
        if (exists) {
          return language.toUpperCase();
        }
      } else {
        // Busca por nombre
        const result = await LanguageDAO.getByName(this.#modelInstance, {
          name: language,
          errCode: 'EDA10',
        });
        if (result) return result.codigo;
      }
      throw new Error('Idioma no encontrado/404');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default LanguageService;
