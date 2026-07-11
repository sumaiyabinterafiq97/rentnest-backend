import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RentNest API',
      version: '1.0.0',
      description: 'Backend API for RentNest - A Property Rental Platform',
    },
    servers: [
      { url: 'https://rentnest-api-avz8.onrender.com', description: 'Production' },
      { url: 'http://localhost:5001', description: 'Local Development' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Properties', description: 'Property listing endpoints' },
      { name: 'Categories', description: 'Property category endpoints' },
      { name: 'Rentals', description: 'Rental request endpoints (Tenant)' },
      { name: 'Landlord', description: 'Landlord management endpoints' },
      { name: 'Admin', description: 'Admin management endpoints' },
      { name: 'Payments', description: 'Payment endpoints (Stripe)' },
      { name: 'Reviews', description: 'Property review endpoints' },
    ],
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'role'],
                  properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' },
                    role: { type: 'string', enum: ['TENANT', 'LANDLORD'], example: 'TENANT' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user and get JWT token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'admin@rentnest.com' },
                    password: { type: 'string', example: 'admin123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful, returns JWT token' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/api/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current logged-in user profile',
          security: [{ BearerAuth: [] }],
          responses: {
            200: { description: 'User profile returned' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Get all property categories',
          responses: { 200: { description: 'List of categories' } },
        },
      },
      '/api/properties': {
        get: {
          tags: ['Properties'],
          summary: 'Get all properties (with optional filters)',
          parameters: [
            { in: 'query', name: 'location', schema: { type: 'string' } },
            { in: 'query', name: 'minPrice', schema: { type: 'number' } },
            { in: 'query', name: 'maxPrice', schema: { type: 'number' } },
            { in: 'query', name: 'categoryId', schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'List of properties' } },
        },
      },
      '/api/properties/{id}': {
        get: {
          tags: ['Properties'],
          summary: 'Get a single property by ID',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Property details' }, 404: { description: 'Not found' } },
        },
      },
      '/api/rentals': {
        post: {
          tags: ['Rentals'],
          summary: 'Submit a rental request (Tenant only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { propertyId: { type: 'string' } },
                },
              },
            },
          },
          responses: { 201: { description: 'Rental request submitted' } },
        },
        get: {
          tags: ['Rentals'],
          summary: 'Get my rental requests (Tenant only)',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'List of rental requests' } },
        },
      },
      '/api/rentals/{id}': {
        get: {
          tags: ['Rentals'],
          summary: 'Get rental request by ID',
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Rental request details' } },
        },
      },
      '/api/landlord/properties': {
        post: {
          tags: ['Landlord'],
          summary: 'Create a new property listing (Landlord only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string', example: 'Beautiful Apartment' },
                    description: { type: 'string', example: 'Spacious 2 bedroom' },
                    price: { type: 'number', example: 1200 },
                    location: { type: 'string', example: 'Dhaka' },
                    categoryId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Property created' } },
        },
      },
      '/api/landlord/properties/{id}': {
        put: {
          tags: ['Landlord'],
          summary: 'Update a property (Landlord only)',
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: { 'application/json': { schema: { type: 'object', properties: { price: { type: 'number' } } } } },
          },
          responses: { 200: { description: 'Property updated' } },
        },
        delete: {
          tags: ['Landlord'],
          summary: 'Delete a property (Landlord only)',
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Property deleted' } },
        },
      },
      '/api/landlord/requests': {
        get: {
          tags: ['Landlord'],
          summary: 'Get rental requests for landlord properties',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'List of rental requests' } },
        },
      },
      '/api/landlord/requests/{id}': {
        patch: {
          tags: ['Landlord'],
          summary: 'Approve or reject a rental request',
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: { type: 'object', properties: { status: { type: 'string', enum: ['APPROVED', 'REJECTED'] } } },
              },
            },
          },
          responses: { 200: { description: 'Status updated' } },
        },
      },
      '/api/admin/users': {
        get: {
          tags: ['Admin'],
          summary: 'Get all users (Admin only)',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'List of all users' } },
        },
      },
      '/api/admin/users/{id}': {
        patch: {
          tags: ['Admin'],
          summary: 'Ban or activate a user (Admin only)',
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: { type: 'object', properties: { status: { type: 'string', enum: ['ACTIVE', 'BANNED'] } } },
              },
            },
          },
          responses: { 200: { description: 'User status updated' } },
        },
      },
      '/api/admin/properties': {
        get: {
          tags: ['Admin'],
          summary: 'Get all properties (Admin only)',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'All properties' } },
        },
      },
      '/api/admin/rentals': {
        get: {
          tags: ['Admin'],
          summary: 'Get all rental requests (Admin only)',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'All rental requests' } },
        },
      },
      '/api/payments/create': {
        post: {
          tags: ['Payments'],
          summary: 'Create Stripe payment intent (Tenant only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: { type: 'object', properties: { rentalRequestId: { type: 'string' } } },
              },
            },
          },
          responses: { 200: { description: 'Returns Stripe clientSecret' } },
        },
      },
      '/api/payments/confirm': {
        post: {
          tags: ['Payments'],
          summary: 'Confirm payment after Stripe success (Tenant only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    transactionId: { type: 'string' },
                    rentalRequestId: { type: 'string' },
                    method: { type: 'string', example: 'Stripe' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Payment confirmed' } },
        },
      },
      '/api/payments': {
        get: {
          tags: ['Payments'],
          summary: 'Get payment history (Tenant only)',
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'Payment history' } },
        },
      },
      '/api/reviews': {
        post: {
          tags: ['Reviews'],
          summary: 'Submit a property review (Tenant only, after completed rental)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    propertyId: { type: 'string' },
                    rating: { type: 'number', minimum: 1, maximum: 5 },
                    comment: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Review submitted' } },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
