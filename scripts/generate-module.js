import fs from 'fs';
import path from 'path';
import { envs } from '#core/config/envs.js';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const moduleName = process.argv[2];
if (!moduleName) {
  console.error(
    'You must provide a module name. Example: node generate-module.js employee',
  );
  process.exit(1);
}

const modulePath = path.join('src/features', moduleName);
const folders = [
  'api',
  'controllers',
  'dto',
  'migrations',
  'repositories',
  'services',
  'validations',
];
const testFolder = `tests/${moduleName}`;

if (!fs.existsSync('src/features')) {
  fs.mkdirSync('src/features', { recursive: true });
}

if (!fs.existsSync(testFolder)) {
  fs.mkdirSync(testFolder, { recursive: true });
  console.log(`📂 Created folder: ${testFolder}`);
}

folders.forEach((folder) => {
  const folderPath = path.join(modulePath, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📂 Created folder: ${folderPath}`);
  }
});

const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const migrationFileName = `${timestamp}_create_${moduleName}_table.js`;

const files = {
  [`api/${moduleName}-routes.js`]: `import { Router } from 'express';
import { authenticate, authorize } from '#core/middlewares/auth-middleware.js';
import { envs } from '#core/config/envs.js';
import ${moduleName}Controller from '../controllers/${moduleName}-controller.js';

const router = Router();

router.get(
  '/', 
  authenticate, 
  authorize([envs.ROLE_ADMIN]), 
  ${moduleName}Controller.getAll
);
router.get(
  '/:id', 
  authenticate, 
  authorize([envs.ROLE_ADMIN]), 
  ${moduleName}Controller.getById
);
router.post(
  '/', 
  authenticate, 
  authorize([envs.ROLE_ADMIN]), 
  ${moduleName}Controller.create
);
router.patch(
  '/:id', 
  authenticate, 
  authorize([envs.ROLE_ADMIN]), 
  ${moduleName}Controller.update
);
router.delete(
  '/:id', authenticate, 
  authorize([envs.ROLE_ADMIN]), 
  ${moduleName}Controller.delete
);

export default router;`,

  [`controllers/${moduleName}-controller.js`]: `import BaseController from '#core/base/base-controller.js';
import ${moduleName}Service from '../services/${moduleName}-service.js';

/**
 * Controller for managing ${moduleName}s.
 * @class ${capitalize(moduleName)}Controller
 * @extends BaseController
 */
class ${capitalize(moduleName)}Controller extends BaseController {
  constructor() {
    super(${moduleName}Service, '${capitalize(moduleName)}');
  }
}

export default new ${capitalize(moduleName)}Controller();`,

  [`dto/${moduleName}-dto.js`]: `
/**
 * Transforms the validated ${moduleName} data into a DTO for creation.
 * @param {Object} data - The validated ${moduleName} data.
 * @returns {Object} A DTO containing only the necessary properties.
 */
export const create${capitalize(moduleName)}Dto = (data) => data;

/**
 * Transforms the validated ${moduleName} data into a DTO for updating.
 * @param {Object} data - The validated ${moduleName} data.
 * @returns {Object} A DTO containing only the properties that can be updated.
 */
export const update${capitalize(moduleName)}Dto = (data) => data;

/**
 * Transforms the validated search criteria into a DTO for filtering ${moduleName}.
 * @param {Object} params - The validated query parameters.
 * @returns {Object} A DTO with the standardized search criteria.
 */
export const search${capitalize(moduleName)}Dto = (data) => data;`,

  [`migrations/${migrationFileName}`]: `export const up = async (knex) => {
  await knex.schema.createTable('${moduleName}s', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('${moduleName}s');
};`,

  [`repositories/${moduleName}-repository.js`]: `import BaseRepository from '#core/base/base-repository.js';

/**
 * Repository for managing ${moduleName} data.
 * @class ${capitalize(moduleName)}Repository
 * @extends BaseRepository
 */
class ${capitalize(moduleName)}Repository extends BaseRepository {
  constructor() {
    super('${moduleName}s');
  }
}

export default new ${capitalize(moduleName)}Repository();`,

  [`services/${moduleName}-service.js`]: `import { AppError } from '#core/utils/response/error-handler.js';
import { getLogger } from '#core/utils/logger/logger.js';
import GenericCriteria from '#core/filters/criteria/generic-criteria.js';
import ${moduleName}Repository from '../repositories/${moduleName}-repository.js';
import { validate${capitalize(moduleName)} } from '../validations/${moduleName}-validation.js';
import { validate${capitalize(moduleName)}Criteria } from '../validations/${moduleName}-criteria-validation.js';
import { create${capitalize(moduleName)}Dto, update${capitalize(moduleName)}Dto, search${capitalize(moduleName)}Dto } from '../dto/${moduleName}-dto.js';

/**
 * Service class for handling employee-related business logic.
 * @class ${capitalize(moduleName)}Service
 */
class ${capitalize(moduleName)}Service {
  /**
   * Retrieves all ${moduleName}s.
   * @param {Object} params - Query parameters.
   * @returns {Promise<Object[]>} List of ${moduleName}s.
   */
  async getAll(params) {
    try {
      const validatedParams = validate${capitalize(moduleName)}Criteria(params);
      const dto = search${capitalize(moduleName)}Dto(validatedParams);
      
      const criteria = new GenericCriteria(dto, { 
        name: { column: 'name', operator: 'like' } 
      });

      return await ${moduleName}Repository.getAll(criteria);
    } catch (error) {
      getLogger().error(\`Error getAll ${moduleName}s: \${error.message}\`);
      throw new AppError(
        error.message || 'Database error while retrieving ${moduleName}s', 
        error.statusCode || 500
      );
    }
  }

  /**
   * Retrieves a single ${moduleName} by ID.
   * @param {number} id - ${capitalize(moduleName)} ID.
   * @returns {Promise<Object>} ${capitalize(moduleName)} data.
   */
  async getById(id) {
    try {
      const item = await ${moduleName}Repository.getById(id);
      if (!item) 
        throw new AppError(\`${capitalize(moduleName)} with ID \${id} not found\`, 404);
      return item;
    } catch (error) {
      getLogger().error(\`Error getById ${moduleName}: \${error.message}\`);
      throw new AppError(
        error.message || 'Database error while retrieving ${moduleName}', 
        error.statusCode || 500
      );
    }
  }

  /**
   * Creates a new ${moduleName}.
   * @param {Object} data - ${capitalize(moduleName)} details.
   * @returns {Promise<Object>} Created ${moduleName} data.
   */
  async create(data) {
    try {
      validate${capitalize(moduleName)}(data);
      const dto = create${capitalize(moduleName)}Dto(data);
      return await ${moduleName}Repository.create(dto);
    } catch (error) {
      getLogger().error(\`Error create ${moduleName}: \${error.message}\`);
      throw new AppError(
        error.message || 'Database error while creating ${moduleName}', 
        error.statusCode || 500
      );
    }
  }

  /**
   * Updates an existing ${moduleName}.
   * @param {number} id - ${capitalize(moduleName)} ID.
   * @param {Object} data - Updated ${capitalize(moduleName)} details.
   * @returns {Promise<Object>} Updated ${moduleName} data.
   */
  async update(id, data) {
    try {
      const item = await this.getById(id);
      validate${capitalize(moduleName)}(data);
      const dto = update${capitalize(moduleName)}Dto(data);
      return await ${moduleName}Repository.update(item.id, dto);
    } catch (error) {
      getLogger().error(\`Error update ${moduleName}: \${error.message}\`);
      throw new AppError(
        error.message || 'Database error while updating ${moduleName}', 
        error.statusCode || 500
      );
    }
  }

  /**
   * Deletes a ${moduleName} by ID.
   * @param {number} id - ${capitalize(moduleName)} ID.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   */
  async delete(id) {
    try {
      const item = await this.getById(id);
      return await ${moduleName}Repository.delete(item.id);
    } catch (error) {
      getLogger().error(\`Error delete ${moduleName}: \${error.message}\`);
      throw new AppError(
        error.message || 'Database error while deleting ${moduleName}', 
        error.statusCode || 500
      );
    }
  }
}

export default new ${capitalize(moduleName)}Service();`,

  [`validations/${moduleName}-validation.js`]: `import Joi from 'joi';
import { AppError } from '#core/utils/response/error-handler.js';

/**
 * Schema definition for ${moduleName} validation.
 * @constant {Joi.ObjectSchema}
 */
const ${moduleName}Schema = Joi.object({ name: Joi.string().max(50).required() });

/**
 * Validates ${moduleName} data against the schema.
 * @param {Object} ${moduleName}Data - ${moduleName} data to be validated.
 * @throws {Error} If validation fails.
 */
export const validate${capitalize(moduleName)} = (data) => {
  const { error } = ${moduleName}Schema.validate(data);
  if (error) throw new AppError(error.details[0].message, 400);
  return data;
};`,

  [`validations/${moduleName}-criteria-validation.js`]: `import Joi from 'joi';
import { AppError } from '#core/utils/response/error-handler.js';

/**
 * Schema definition for validating ${moduleName} search criteria.
 * @constant {Joi.ObjectSchema}
 */
const ${moduleName}CriteriaSchema = Joi.object({ name: Joi.string().max(50).optional() });

/**
 * Validates the ${moduleName} search criteria using the defined schema.
 *
 * @param {Object} criteria - The search criteria object containing query parameters.
 * @returns {Object} The validated and possibly transformed criteria.
 * @throws {AppError} Throws an AppError with a 400 status code if validation fails.
 */
export const validate${capitalize(moduleName)}Criteria = (criteria) => {
  const { error, value } = ${moduleName}CriteriaSchema.validate(criteria);
  if (error) throw new AppError(error.details[0].message, 400);
  return value;
};`,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(modulePath, filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`📄 Created file: ${fullPath}`);
  }
});

const testFilePath = path.join(testFolder, `${moduleName}.spec.js`);
if (!fs.existsSync(testFilePath)) {
  fs.writeFileSync(
    testFilePath,
    `import app from '../../src/server.js';
import request from 'supertest';

describe('${capitalize(moduleName)} API', () => {
  it('should return 200 for GET /${moduleName}', async () => {
    const response = await request(app).get('/${moduleName}/');
    expect(response.status).toBe(200);
  });

  it('should return 404 for non-existing route', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
  });
});`,
    'utf8',
  );
  console.log(`📄 Created test file: ${testFilePath}`);
}

console.log(`✅ Module '${moduleName}' generated successfully!`);
