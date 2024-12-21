import requestService from '../services/request-service.js';
import { successResponse, errorResponse } from '../utils/response/response.js';

class RequestController {
  async getAll(req, res) {
    try {
      const { limit, page, code, description, summary, employee_id } = req.query; 
      const filters = { code, description, summary, employee_id }; 
  
      const paginatedRequests = await requestService.getAllRequests({
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        filters, 
      });
  
      return successResponse(res, paginatedRequests, 200, true);
    } catch (error) {
      return res.status(500).json({ status: false, code: 500, error: error.message });
    }
  }

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

  async create(req, res) {
    try {
      const newRequest = await requestService.createRequest(req.body);
      return successResponse(res, newRequest, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedRequest = await requestService.updateRequest(id, req.body);
      return successResponse(res, updatedRequest);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

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
