const { transaction } = require('objection');
const { MaterialDAO } = require('../dao');
const {
  Ciudad, Editorial, Material, Productora, PersonaMaterial, Persona,
} = require('../models');
const {
  CityService, FormatService, PublisherService, ProductionStateService,
  ProducerService, PersonMaterialService,
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
        Persona,
        PersonaMaterial,
        async (
          MaterialModel,
          EditorialModel,
          CiudadModel,
          ProductoraModel,
          PersonaModel,
          PersonaMaterialModel,
        ) => {
          const formatService = new FormatService();
          const publisherService = new PublisherService(EditorialModel);
          const cityService = new CityService(CiudadModel);
          const producerService = new ProducerService(ProductoraModel);
          const productionStateService = new ProductionStateService();
          const personMaterialService = new PersonMaterialService(
            PersonaMaterialModel,
            PersonaModel,
          );

          // TODO Idioma
          materialData.idiomaCodigo = 'ES';
          const ids = await Promise.all([
            formatService.getFormatId({ name: req.format }),
            publisherService.getPublisherId({ name: req.publisher }),
            cityService.getCityId({ name: req.publishCity, country: req.publishCountry }),
            cityService.getCityId({ name: req.productionCity, country: req.productionCountry }),
            producerService.getProducerId({ name: req.producer }),
            productionStateService.getProductionStateId({ name: req.productionState }),
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
