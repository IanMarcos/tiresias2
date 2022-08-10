import { transaction } from 'objection';
import { MaterialDAO } from '../dao/index.js';
import {
  City, Publisher, Material, Producer, PersonMaterial, Person,
} from '../models/index.js';
import {
  CityService, FormatService, PublisherService, ProductionStateService,
  ProducerService, PersonMaterialService, LanguageService,
} from './index.js';

class MaterialService {
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

      return await transaction(
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
          PublisherModel,
        ) => {
          const cityService = new CityService(CityModel);
          const formatService = new FormatService();
          const languageService = new LanguageService();
          const producerService = new ProducerService(ProducerModel);
          const productionStateService = new ProductionStateService();
          const publisherService = new PublisherService(PublisherModel);
          const personMaterialService = new PersonMaterialService(
            PersonMaterialModel,
            PersonModel,
          );

          const ids = await Promise.all([
            languageService.getLanguageCode({ language: req.language }),
            formatService.getFormatId({ name: req.format }),
            publisherService.getPublisherId({ name: req.publisher }),
            cityService.getCityId({ name: req.publishCity, country: req.publishCountry }),
            cityService.getCityId({ name: req.productionCity, country: req.productionCountry }),
            producerService.getProducerId({ name: req.producer }),
            productionStateService.getProductionStateId({ name: req.productionState }),
          ]);

          const [idiomaCodigo, formatoAccesibleId, editorialId, ciudadPublicacionId,
            ciudadProduccionId, productoraId, estadoProduccionId] = ids;

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

          const newMaterial = await MaterialDAO.create(MaterialModel, materialData);

          await personMaterialService.joinPeopleToMaterialByRole({
            peopleArray: req.authors,
            materialId: newMaterial.id,
            role: 'Autor',
          });

          await personMaterialService.joinPeopleToMaterialByRole({
            peopleArray: req.contributors,
            materialId: newMaterial.id,
            role: 'Contribuidor',
          });

          if (req.narrator.length > 0) {
            await personMaterialService.joinPeopleToMaterialByRole({
              peopleArray: [req.narrator],
              materialId: newMaterial.id,
              role: 'Narrador',
            });
          }
          // TODO Verifica/Guarda categorias
          // TODO Log de la transacción
          return newMaterial.id;
        },
      );
    } catch (error) {
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
