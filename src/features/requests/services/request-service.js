import requestRepository from '../repositories/request-repository.js';
import { validateRequest } from '../validations/request-validation.js';
import { validatePagination } from '../../../core/utils/validations/pagination-validation.js';

/**
 * Service class for handling request-related business logic.
 * @class RequestService
 */
class RequestService {
  /**
   * Retrieves all requests with pagination and filters.
   * @param {Object} options - Query options.
   * @param {number} options.limit - Number of requests per page.
   * @param {number} options.page - Page number.
   * @param {Object} options.filters - Filtering options.
   * @returns {Promise<Object>} Paginated list of requests.
   */
  async getAllRequests({ limit, page, filters }) {
    const { limit: validatedLimit, page: validatedPage } = validatePagination({ limit, page });
    const offset = (validatedPage - 1) * validatedLimit;
    const { data, total } = await requestRepository.getAll({
      limit: validatedLimit,
      offset,
      filters,
    });
    const totalPages = Math.ceil(total / validatedLimit);
    return {
      data,
      total,
      page: validatedPage,
      totalPages,
    };
  }

  /**
   * Retrieves a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<Object>} Request data.
   * @throws {Error} If the request is not found.
   */
  async getRequestById(id) {
    const request = await requestRepository.getById(id);
    if (!request) {
      throw new Error(`Request with ID ${id} not found`);
    }
    return request;
  }

  /**
   * Creates a new request.
   * @param {Object} requestData - Request details.
   * @returns {Promise<Object>} Created request data.
   * @throws {Error} If validation fails.
   */
  async createRequest(requestData) {
    validateRequest(requestData);
    return await requestRepository.create(requestData);
  }

  /**
   * Updates an existing request.
   * @param {number} id - Request ID.
   * @param {Object} requestData - Updated request details.
   * @returns {Promise<Object>} Updated request data.
   * @throws {Error} If the request does not exist or validation fails.
   */
  async updateRequest(id, requestData) {
    const existingRequest = await requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }
    validateRequest(requestData);
    return await requestRepository.update(id, requestData);
  }

  /**
   * Deletes a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   * @throws {Error} If the request does not exist.
   */
  async deleteRequest(id) {
    const existingRequest = await requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }
    await requestRepository.delete(id);
  }
}

export default new RequestService();
