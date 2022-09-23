const singleError = {
  type: 'object',
  properties: {
    results: {
      type: 'object',
      properties: {
        err: {
          type: 'string',
        },
      },
    },
  },
};

const errorArray = {
  type: 'object',
  properties: {
    results: {
      type: 'object',
      properties: {
        err: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
              },
              param: {
                type: 'string',
              },
              location: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

export default { singleError, errorArray };
