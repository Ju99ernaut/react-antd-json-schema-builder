export const DEFAULT_STATE = {
  type: 'object',
  properties: {
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
      },
    },
    product_name: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    product_object: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
          },
        },
      },
    },
    product_items: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    product_description: {
      type: 'string',
    },
    msrp: {
      type: 'string',
    },
  },
}

export const SIMPLE_STATE = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
    },
  },
}

export const EMPTY_STATE = {
  type: 'object',
  properties: {},
}
