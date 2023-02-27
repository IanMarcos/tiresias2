import { transaction } from 'objection';
import { MaterialDAO, RolesDAO } from '../dao/index.js';
import {
  Category,
  City,
  Publisher,
  Material,
  MaterialCategory,
  Producer,
  PersonMaterial,
  Person,
  PersonRole,
} from '../models/index.js';
import CategoriesService from './categories.js';
import CityService from './city.js';
import FormatService from './format.js';
import PublisherService from './publisher.js';
import ProductionStateService from './production-state.js';
import ProducerService from './producer.js';
import PersonMaterialService from './person-material.js';
import LanguageService from './language.js';
import {
  removeIdFromObj,
  removeIdsFromMaterial,
  replacePeopleWithRoles,
  translateMaterialKeysToSpanish,
} from '../helpers/formatters.js';
import { deleteFile, getFilePath } from '../helpers/file-manager.js';

class MaterialService {
  static async getMaterialById(id) {
    try {
      const foundMaterial = await MaterialDAO.getById(Material, id);

      if (!foundMaterial) throw new Error('Material no encontrado/404');

      removeIdsFromMaterial(foundMaterial);
      removeIdFromObj(foundMaterial.ciudadPublicacion);
      removeIdFromObj(foundMaterial.ciudadProduccion);

      const roles = await RolesDAO.getAllRoles(PersonRole);
      replacePeopleWithRoles(foundMaterial, roles);

      return { material: foundMaterial };
    } catch (error) {
      return { err: error.message };
    }
  }

  static async getMaterialFile(id) {
    try {
      const foundMaterial = await MaterialDAO.getById(Material, id);

      if (!foundMaterial) throw new Error('Material no encontrado/404');

      const { urlArchivo } = foundMaterial;

      return { uri: getFilePath(process.env.PATH_TO_FILES, urlArchivo) };
    } catch (error) {
      return { err: error.message };
    }
  }

  static async getMaterials(limit, page) {
    try {
      const materials = await MaterialDAO.getAll(Material, { limit, page });
      const roles = await RolesDAO.getAllRoles(PersonRole);

      materials.forEach((material) => {
        removeIdsFromMaterial(material);
        removeIdFromObj(material.ciudadPublicacion);
        removeIdFromObj(material.ciudadProduccion);
        replacePeopleWithRoles(material, roles);
      });

      return materials;
    } catch (error) {
      return { err: error.message };
    }
  }

  static async createMaterial(req) {
    let materialData = translateMaterialKeysToSpanish(req);

    try {
      const newId = await transaction(
        Category,
        City,
        Material,
        MaterialCategory,
        Person,
        PersonMaterial,
        Producer,
        Publisher,
        async (
          CategoryModel,
          CityModel,
          MaterialModel,
          MaterialCategoryModel,
          PersonModel,
          PersonMaterialModel,
          ProducerModel,
          PublisherModel
        ) => {
          const cityService = new CityService(CityModel);
          const formatService = new FormatService();
          const languageService = new LanguageService();
          const producerService = new ProducerService(ProducerModel);
          const productionStateService = new ProductionStateService();
          const publisherService = new PublisherService(PublisherModel);
          const personMaterialService = new PersonMaterialService(
            PersonMaterialModel,
            PersonModel
          );
          const categoriesService = new CategoriesService(
            MaterialCategoryModel,
            CategoryModel
          );

          const ids = await Promise.all([
            languageService.getLanguageCode({
              language: req.language,
            }),
            formatService.getFormatId({ name: req.format }),
            publisherService.getPublisherId({
              name: req.publisher,
            }),
            cityService.getCityId({
              name: req.publishCity,
              country: req.publishCountry,
            }),
            cityService.getCityId({
              name: req.productionCity,
              country: req.productionCountry,
            }),
            producerService.getProducerId({ name: req.producer }),
            productionStateService.getProductionStateId({
              name: req.productionState,
            }),
          ]);

          const [
            idiomaCodigo,
            formatoAccesibleId,
            editorialId,
            ciudadPublicacionId,
            ciudadProduccionId,
            productoraId,
            estadoProduccionId,
          ] = ids;

          materialData = {
            ...materialData,
            idiomaCodigo,
            formatoAccesibleId,
            editorialId,
            ciudadPublicacionId,
            ciudadProduccionId,
            productoraId,
            estadoProduccionId,
          };

          const newMaterial = await MaterialDAO.create(
            MaterialModel,
            materialData
          );

          await personMaterialService.savePeopleByRole({
            peopleArray: req.authors,
            materialId: newMaterial.id,
            role: 'Autor',
          });

          await personMaterialService.savePeopleByRole({
            peopleArray: req.contributors,
            materialId: newMaterial.id,
            role: 'Contribuidor',
          });

          if (req.narrator.length > 0) {
            await personMaterialService.savePeopleByRole({
              peopleArray: [req.narrator],
              materialId: newMaterial.id,
              role: 'Narrador',
            });
          }

          if (req.categories.length > 0) {
            await categoriesService.addCategoriesToMaterial({
              categories: req.categories,
              materialId: newMaterial.id,
            });
          }

          // TODO Log de la transacción
          return newMaterial.id;
        }
      );
      return { id: newId };
    } catch (error) {
      deleteFile(process.env.PATH_TO_FILES, req.filePath);
      return { err: error.message };
    }
  }

  static async updateMaterial(materialId, req) {
    const materialData = translateMaterialKeysToSpanish(req);
    let oldMaterialFile;
    try {
      await transaction(
        City,
        Material,
        Producer,
        Publisher,
        async (
          CityModel,
          MaterialModel,
          ProducerModel,
          PublisherModel
        ) => {
          const cityService = new CityService(CityModel);
          const formatService = new FormatService();
          const languageService = new LanguageService();
          const producerService = new ProducerService(ProducerModel);
          const productionStateService = new ProductionStateService();
          const publisherService = new PublisherService(PublisherModel);

          const idsPromises = [];

          if (req.language) {
            idsPromises.push(languageService.getLanguageCode({ language: req.language })
              .then((id) => { materialData.idiomaCodigo = id })
            );
          }

          if (req.format) {
            idsPromises.push(formatService.getFormatId({ name: req.format })
              .then((id) => { materialData.formatoAccesibleId = id })
            );
          }

          if (req.publisher) {
            idsPromises.push(publisherService.getPublisherId({ name: req.publisher })
              .then((id) => { materialData.editorialId = id })
            );
          }

          if (req.publishCity && req.publishCountry) {
            idsPromises.push(
              cityService.getCityId({
                name: req.publishCity,
                country: req.publishCountry,
              }).then((id) => { materialData.ciudadPublicacionId = id })
            );
          }

          if (req.productionCity && req.productionCountry) {
            idsPromises.push(
              cityService.getCityId({
                name: req.productionCity,
                country: req.productionCountry,
              }).then((id) => { materialData.ciudadProduccionId = id })
            );
          }

          if (req.producer) {
            idsPromises.push(producerService.getProducerId({ name: req.producer })
              .then((id) => { materialData.productoraId = id })
            );
          }

          if (req.productionState) {
            idsPromises.push(productionStateService.getProductionStateId({
              name: req.productionState,
            }).then((id) => { materialData.estadoProduccionId = id })
            );
          }

          if (materialData.urlArchivo) {
            MaterialDAO.getByIdNoJoins(MaterialModel, materialId)
              .then(result => { oldMaterialFile = result.urlArchivo });
          }

          await Promise.all(idsPromises);

          await MaterialDAO.update(
            MaterialModel,
            materialId,
            materialData
          );

          // TODO Log de la transacción
          // TODO Update de autores y colaboradores.
        }
      );
      if (materialData.urlArchivo) {
        deleteFile(process.env.PATH_TO_FILES, oldMaterialFile);
      }
      return {};
    } catch (error) {
      deleteFile(process.env.PATH_TO_FILES, req.filePath);
      return { err: error.message };
    }
  }

  static async deleteMaterial(id) {
    try {
      const result = await MaterialDAO.delete(Material, id);
      if (result === 0) return { err: 'Material no encontrado' };
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default MaterialService;
