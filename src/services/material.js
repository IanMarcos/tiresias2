import { transaction } from 'objection';
import { MaterialDAO, RolesDAO } from '../dao/index.js';
import {
  City,
  Publisher,
  Material,
  Producer,
  PersonMaterial,
  Person,
  PersonRole,
} from '../models/index.js';
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
} from '../helpers/formatters.js';

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
    let materialData = {
      titulo: req.title,
      edicion: req.edition,
      isbn: req.isbn,
      añoPublicacion: req.publishYear,
      añoProduccion: req.productionYear,
      destinatarios: req.recipients,
      duracion: req.duration,
      tamañoFichero: req.fileSize,
      resumen: req.resume,
    };

    try {
      // TODO Save file in storage
      materialData.urlArchivo = 'api.example/files/1234';

      const newId = await transaction(
        City,
        Material,
        Person,
        PersonMaterial,
        Producer,
        Publisher,
        async (
          CityModel,
          MaterialModel,
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
          // TODO Verifica/Guarda categorias
          // TODO Log de la transacción
          return newMaterial.id;
        }
      );
      return { id: newId };
    } catch (error) {
      return { err: error.message };
    }
  }

  static async deleteMaterial(id) {
    try {
      // TODO Check if exist first
      const result = await MaterialDAO.delete(Material, id);
      if (result === 0) return { err: 'Material no encontrado' };
      return {};
    } catch (error) {
      return { err: error.message };
    }
  }
}

export default MaterialService;
