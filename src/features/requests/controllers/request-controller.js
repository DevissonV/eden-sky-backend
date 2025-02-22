import requestService from '../services/request-service.js';
import {
  successResponse,
  errorResponse,
} from '../../../core/utils/response/response.js';

/**
 * Controller for managing requests.
 * @class RequestController
 */
class RequestController {
  /**
   * Retrieves all requests with optional filters.
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the list of requests.
   */
  async getAll(req, res) {
    try {
      const { limit, page, code, description, summary, employee_id } =
        req.query;
      const filters = { code, description, summary, employee_id };
      const paginatedRequests = await requestService.getAllRequests({
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        filters,
      });
      return successResponse(res, paginatedRequests, 200, true);
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, code: 500, error: error.message });
    }
  }

  /**
   * Retrieves a request by ID.
   * @param {import("express").Request} req - Express request object containing the request ID.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with request data or an error if not found.
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const request = await requestService.getRequestById(id);
      if (!request) {
        return errorResponse(res, 'Request not found', 404);
      }
      return successResponse(res, request);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Creates a new request.
   * @param {import("express").Request} req - Express request object containing request data in the body.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the created request.
   */
  async create(req, res) {
    try {
      const newRequest = await requestService.createRequest(req.body);
      return successResponse(res, newRequest, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Updates an existing request.
   * @param {import("express").Request} req - Express request object containing the request ID and update data.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the updated request data.
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedRequest = await requestService.updateRequest(id, req.body);
      return successResponse(res, updatedRequest);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Deletes a request by ID.
   * @param {import("express").Request} req - Express request object containing the request ID.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response indicating that the request was successfully deleted.
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await requestService.deleteRequest(id);
      return successResponse(res, { message: 'Request deleted successfully' });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

export default new RequestController();
