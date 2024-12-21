import requestRepository from '../repositories/request-repository.js';
import { validateRequest } from '../utils/validations/request-validation.js';
import { validatePagination } from '../utils/validations/pagination-validation.js';

class RequestService {
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

  async getRequestById(id) {
    const request = await requestRepository.getById(id);
    if (!request) {
      throw new Error(`Request with ID ${id} not found`);
    }
    return request;
  }

  async createRequest(requestData) {
    validateRequest(requestData);
    return await requestRepository.create(requestData);
  }

  async updateRequest(id, requestData) {
    const existingRequest = await requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }

    validateRequest(requestData);
    return await requestRepository.update(id, requestData);
  }

  async deleteRequest(id) {
    const existingRequest = await requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }

    await requestRepository.delete(id);
  }
}

export default new RequestService();
