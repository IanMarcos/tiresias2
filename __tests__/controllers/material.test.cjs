import jest from 'jest';
import httpMocks from 'node-mocks-http';
import * as materialService from '../../src/services/material.js';
import * as materialController from '../../src/controllers/material.js';

jest.unstable_mockModule('../../src/services/material.js');
// jest.mock('../../src/services/material.js', () => ({
//   getAllMaterials: jest.fn(),
// }));

// const mockMaterialService = jest.spyOn(materialService, 'getAllMaterials');

const mockMaterials = [
  {
    id: 1,
    titulo: 'Libro',
    edicion: null,
    isbn: 123,
    idiomaCodigo: 'ES',
    anioPublicacion: 2020,
    anioProduccion: 2021,
    destinatarios: null,
    duracion: null,
    tamanioFichero: 33.3,
    resumen: null,
    urlArchivo: '1684597175223',
    formatoAccesible: 'Daisy 2.02 solo audio',
    editorial: 'Planeta',
    productora: 'UdeA',
    estadoProduccion: 'Disponible',
    ciudadPublicacion: {
      nombre: 'Bogota',
      paisCodigo: 'CO',
    },
    ciudadProduccion: {
      nombre: 'Houston',
      paisCodigo: 'US',
    },
    categorias: [],
    autores: [
      {
        id: 1,
        apellido: 'RODAS',
        nombres: 'JUANA',
      },
    ],
    contribuidores: [],
    narrador: {
      id: 2,
      apellido: 'DOE',
      nombres: 'JOHN',
    },
  },
];

it('should get products list', async () => {
  // mock
  // const response = httpMocks.createResponse();
  // const request = httpMocks.createRequest();
  // const mockMaterialsList = jest.fn(async () => ({ materials: mockMaterials }));
  // mockMaterialService.mockImplementation(mockMaterialsList);
  // await materialController.getAllMaterials(request, response);
  // expect(mockMaterialService).toHaveBeenCalledTimes(1);
  // expect(response.statusCode).toEqual(200);
  // expect(response._isEndCalled()).toBeTruthy();
  // expect(response._getJSONData().products.length).toEqual(1);
});
