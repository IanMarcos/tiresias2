import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';

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
  jest.unstable_mockModule('../../src/services/material.js', () => ({
    default: {
      getMaterials: jest.fn(async () => ({ materials: mockMaterials })),
    },
  }));

  const { getAllMaterials } = await import('../../src/controllers/material.js');
  // mock
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest();
  // const mockMaterialsList = jest.fn(async () => ({ materials: mockMaterials }));
  // mockMaterialService.mockImplementation(mockMaterialsList);
  await getAllMaterials(request, response);
  // expect(mockMaterialService).toHaveBeenCalledTimes(1);
  expect(response.statusCode).toEqual(200);
  // expect(response._isEndCalled()).toBeTruthy();
  // console.log(response);
  expect(response._getJSONData().results.materials.length).toEqual(1);
});
