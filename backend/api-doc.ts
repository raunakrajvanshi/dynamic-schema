/**
 * @api {post} /api/schemas Create Schema
 * @apiName CreateSchema
 * @apiGroup Schemas
 * @apiDescription Create a new schema definition
 * 
 * @apiBody {String} name Name of the schema
 * @apiBody {Object} attributes Schema attributes definition
 * 
 * @apiParamExample {json} Request Example:
 * {
 *   "name": "User",
 *   "attributes": {
 *     "firstName": {
 *       "type": "string",
 *       "required": true
 *     },
 *     "lastName": {
 *       "type": "string",
 *       "required": true
 *     },
 *     "age": {
 *       "type": "number",
 *       "required": false
 *     },
 *     "email": {
 *       "type": "string",
 *       "required": true
 *     },
 *     "isActive": {
 *       "type": "boolean",
 *       "required": false
 *     }
 *   }
 * }
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Created schema data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 201 Created
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "User",
 *     "attributes": {
 *       "firstName": {
 *         "type": "string",
 *         "required": true
 *       },
 *       ...
 *     },
 *     "createdAt": "2024-12-22T10:00:00.000Z",
 *     "updatedAt": "2024-12-22T10:00:00.000Z"
 *   }
 * }
 */

/**
 * @api {get} /api/schemas Get All Schemas
 * @apiName GetSchemas
 * @apiGroup Schemas
 * @apiDescription Retrieve all schemas
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Array} data Array of schemas
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "_id": "507f1f77bcf86cd799439011",
 *       "name": "User",
 *       "attributes": {...}
 *     }
 *   ]
 * }
 */

/**
 * @api {get} /api/schemas/:schemaId Get Schema by ID
 * @apiName GetSchema
 * @apiGroup Schemas
 * @apiDescription Retrieve a specific schema by ID
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Schema data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "User",
 *     "attributes": {...}
 *   }
 * }
 */

/**
 * @api {put} /api/schemas/:schemaId Update Schema
 * @apiName UpdateSchema
 * @apiGroup Schemas
 * @apiDescription Update an existing schema
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * 
 * @apiParamExample {json} Request Example:
 * {
 *   "name": "UpdatedUser",
 *   "attributes": {
 *     "firstName": {
 *       "type": "string",
 *       "required": true
 *     },
 *     "lastName": {
 *       "type": "string",
 *       "required": true
 *     },
 *     "phoneNumber": {
 *       "type": "string",
 *       "required": false
 *     }
 *   }
 * }
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Updated schema data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "UpdatedUser",
 *     "attributes": {...}
 *   }
 * }
 */

/**
 * @api {delete} /api/schemas/:schemaId Delete Schema
 * @apiName DeleteSchema
 * @apiGroup Schemas
 * @apiDescription Delete a schema and all its instances
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "message": "Schema deleted successfully"
 * }
 */

/**
 * @api {post} /api/schemas/:schemaId/instances Create Instance
 * @apiName CreateInstance
 * @apiGroup Instances
 * @apiDescription Create a new instance of a schema
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * 
 * @apiParamExample {json} Request Example:
 * {
 *   "name": "john_doe_1",
 *   "data": {
 *     "firstName": "John",
 *     "lastName": "Doe",
 *     "age": 30,
 *     "email": "john@example.com",
 *     "isActive": true
 *   }
 * }
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Created instance data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 201 Created
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439012",
 *     "name": "john_doe_1",
 *     "schemaId": "507f1f77bcf86cd799439011",
 *     "data": {
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "age": 30,
 *       "email": "john@example.com",
 *       "isActive": true
 *     },
 *     "createdAt": "2024-12-22T10:00:00.000Z",
 *     "updatedAt": "2024-12-22T10:00:00.000Z"
 *   }
 * }
 */

/**
 * @api {put} /api/schemas/:schemaId/instances/:instanceId Update Instance
 * @apiName UpdateInstance
 * @apiGroup Instances
 * @apiDescription Update an existing instance
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * @apiParam {String} instanceId Instance's unique ID
 * 
 * @apiParamExample {json} Request Example:
 * {
 *   "name": "john_doe_1_updated",
 *   "data": {
 *     "firstName": "John Updated",
 *     "lastName": "Doe",
 *     "age": 31,
 *     "email": "john@example.com",
 *     "isActive": true
 *   }
 * }
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Updated instance data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439012",
 *     "name": "john_doe_1_updated",
 *     "schemaId": "507f1f77bcf86cd799439011",
 *     "data": {
 *       "firstName": "John Updated",
 *       "lastName": "Doe",
 *       "age": 31,
 *       "email": "john@example.com",
 *       "isActive": true
 *     }
 *   }
 * }
 */
/**
 * @api {get} /api/schemas/:schemaId/instances Get All Instances
 * @apiName GetInstances
 * @apiGroup Instances
 * @apiDescription Retrieve all instances of a schema
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Array} data Array of instances
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "_id": "507f1f77bcf86cd799439012",
 *       "schemaId": "507f1f77bcf86cd799439011",
 *       "data": {...}
 *     }
 *   ]
 * }
 */

/**
 * @api {get} /api/schemas/:schemaId/instances/:instanceId Get Instance by ID
 * @apiName GetInstance
 * @apiGroup Instances
 * @apiDescription Retrieve a specific instance
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * @apiParam {String} instanceId Instance's unique ID
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Instance data
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439012",
 *     "schemaId": "507f1f77bcf86cd799439011",
 *     "data": {...}
 *   }
 * }
 */

/**
 * @api {delete} /api/schemas/:schemaId/instances/:instanceId Delete Instance
 * @apiName DeleteInstance
 * @apiGroup Instances
 * @apiDescription Delete an instance
 * 
 * @apiParam {String} schemaId Schema's unique ID
 * @apiParam {String} instanceId Instance's unique ID
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "message": "Instance deleted successfully"
 * }
 */

export interface ErrorResponse {
    success: false;
    error: string;
  }
  
  export interface SuccessResponse<T> {
    success: true;
    data?: T;
    message?: string;
  }
  
  export interface Schema {
    _id: string;
    name: string;
    attributes: Record<string, SchemaAttribute>;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface SchemaAttribute {
    type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
    required: boolean;
  }
  
  export interface Instance {
    _id: string;
    name: string; 
    schemaId: string;
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
  }