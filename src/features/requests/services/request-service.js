import { AppError } from '#core/utils/response/error-handler.js';
import { getLogger } from '#core/utils/logger/logger.js';
import GenericCriteria from '#core/filters/criteria/generic-criteria.js';
import requestRepository from '../repositories/request-repository.js';
import { validateRequest } from '../validations/request-validation.js';
import { validateRequestCriteria } from '../validations/request-criteria-validation.js';
import {
  createRequestDto,
  updateRequestDto,
  searchRequestDto,
} from '../dto/request-dto.js';

/**
 * Service class for handling request-related business logic.
 * @class RequestService
 */
class RequestService {
  /**
   * Retrieves all requests with filtering and pagination.
   * @param {Object} params - Query parameters.
   * @returns {Promise<Object>} Paginated list of requests.
   */
  async getAll(params) {
    try {
      const validatedParams = validateRequestCriteria(params);
      const dto = searchRequestDto(validatedParams);

      const criteria = new GenericCriteria(dto, {
        code: { column: 'code', operator: 'like' },
        description: { column: 'description', operator: 'like' },
        summary: { column: 'summary', operator: 'like' },
        employee_id: { column: 'employee_id', operator: '=' },
      });

      return await requestRepository.getAll(criteria);
    } catch (error) {
      getLogger().error(`Error getAll requests: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while retrieving requests',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Retrieves a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<Object>} Request data.
   */
  async getById(id) {
    try {
      const reqRecord = await requestRepository.getById(id);
      if (!reqRecord)
        throw new AppError(`Request with ID ${id} not found`, 404);
      return reqRecord;
    } catch (error) {
      getLogger().error(`Error getById request: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while retrieving request',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Creates a new request.
   * @param {Object} data - Request details.
   * @returns {Promise<Object>} Created request data.
   */
  async create(data) {
    try {
      validateRequest(data);
      const dto = createRequestDto(data);

      return await requestRepository.create(dto);
    } catch (error) {
      getLogger().error(`Error create request: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while creating request',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Updates an existing request.
   * @param {number} id - Request ID.
   * @param {Object} data - Updated request details.
   * @returns {Promise<Object>} Updated request data.
   */
  async update(id, data) {
    try {
      const reqRecord = await this.getById(id);
      validateRequest(data);
      const dto = updateRequestDto(data);

      return await requestRepository.update(reqRecord.id, dto);
    } catch (error) {
      getLogger().error(`Error update request: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while updating request',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Deletes a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   */
  async delete(id) {
    try {
      const reqRecord = await this.getById(id);
      return await requestRepository.delete(reqRecord.id);
    } catch (error) {
      getLogger().error(`Error delete request: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while deleting request',
        error.statusCode || 500,
      );
    }
  }
}

export default new RequestService();
