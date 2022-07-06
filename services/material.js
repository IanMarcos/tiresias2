const { transaction } = require('objection');
const { MaterialDAO } = require('../dao');
const {
  Ciudad, Editorial, Material, Productora,
} = require('../models');
const {
  CityService, FormatService, PublisherService, ProductionStateService, ProducerService,
} = require('.');

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
      resumen: req.resume,
    };

    try {
      // TODO Save file in storage
      materialData.urlArchivo = 'api.example/files/1234';
      // TODO Determine file size in MB
      materialData.tamañoFichero = 5;
      const results = await transaction(
        Material,
        Editorial,
        Ciudad,
        Productora,
        async (
          MaterialModel,
          EditorialModel,
          CiudadModel,
          ProductoraModel,
        ) => {
          const formatService = new FormatService();
          const publisherService = new PublisherService(EditorialModel);
          const cityService = new CityService(CiudadModel);
          const producerService = new ProducerService(ProductoraModel);
          const productionStateService = new ProductionStateService();

          // TODO Idioma
          materialData.idiomaCodigo = 'ES';
          const ids = await Promise.all([
            formatService.verifyFormat({ name: req.format }),
            publisherService.verifyPublisher({ name: req.publisher }),
            cityService.verifyCity({ name: req.publishCity, country: req.publishCountry }),
            cityService.verifyCity({ name: req.productionCity, country: req.productionCountry }),
            producerService.verifyProducer({ name: req.producer }),
            productionStateService.verifyProductionState({ name: req.productionState }),
          ]);

          const [formatoAccesibleId, editorialId, ciudadPublicacionId, ciudadProduccionId,
            productoraId, estadoProduccionId] = ids;

          materialData = {
            ...materialData,
            formatoAccesibleId,
            editorialId,
            ciudadPublicacionId,
            ciudadProduccionId,
            productoraId,
            estadoProduccionId,
          };

          const newMaterial = await MaterialDAO.create(MaterialModel, materialData);
          // TODO Verifica/Guarda autores
          // TODO Verifica/Guarda categorias
          // TODO Log de la transacción
          return newMaterial;
        },
      );
      return results;
    } catch (error) {
      return { err: error.message };
    }
  }
}

module.exports = MaterialService;
