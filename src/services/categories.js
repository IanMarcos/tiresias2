import { CategoryDAO, MaterialCategoryDAO } from '../dao/index.js';
import { Category, MaterialCategory } from '../models/index.js';

class CategoriesService {
  #categoryMaterialInstance;

  #categoryInstance;

  constructor(
    categoryMaterialInstance = MaterialCategory,
    categoryInstance = Category
  ) {
    this.#categoryMaterialInstance = categoryMaterialInstance;
    this.#categoryInstance = categoryInstance;
  }

  /**
   * Checks whether a Person exists, if it does, returns its ID.
   * If not, it creates it and returns its ID
   * @param {Object} args - Arguments to perform the queries.
   * @param {Array} args.categories - Array of string containing categories names.
   * @param {Array} args.materialId
   */
  async addCategoriesToMaterial({ categories, materialId }) {
    // Find existing categories Ids
    const foundCategories = await Promise.all(
      categories.map(async (category) => {
        try {
          const foundCategory = await CategoryDAO.getByName(
            this.#categoryInstance,
            { name: category, errCode: 'EDA12' }
          );

          if (foundCategory) {
            return foundCategory.id;
          }
          return category;
        } catch (error) {
          return null;
        }
      })
    );

    if (foundCategories.includes(null)) throw new Error('EDA12');

    // If not create them and get their ids
    const categoriesIds = await Promise.all(
      foundCategories.map(async (category) => {
        if (typeof category === 'number') {
          return category;
        }

        try {
          const newCat = await CategoryDAO.create(this.#categoryInstance, {
            name: category,
          });
          return newCat.id;
        } catch (error) {
          return null;
        }
      })
    );

    if (categoriesIds.includes(null)) throw new Error('EDA12');

    const results = await Promise.all(
      categoriesIds.map(async (categoryId) => {
        try {
          return await MaterialCategoryDAO.create(
            this.#categoryMaterialInstance,
            {
              categoryId,
              materialId,
            }
          );
        } catch (error) {
          return null;
        }
      })
    );
    if (results.includes(null)) throw new Error('EDA12');
  }

  async getAllCategories() {
    try {
      return await CategoryDAO.getAll(this.#categoryInstance, 'EDA12');
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default CategoriesService;
