import requestService from '../services/request-service.js';
import { responseHandler } from '../../../core/utils/response/response-handler.js';
import { getSuccessMessage } from '../../../core/utils/response/ApiResponseTemplates.js';

/**
 * Controller for managing requests.
 * @class RequestController
 */
class RequestController {
  /**
   * Retrieves all requests.
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async getAll(req, res, next) {
    requestService
      .getAll(req.query)
      .then((requests) =>
        responseHandler.success(
          res,
          requests,
          getSuccessMessage('GET_ALL', 'Requests'),
        ),
      )
      .catch(next);
  }

  /**
   * Retrieves a request by ID.
   * @param {import("express").Request} req - Express request object containing the request ID.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async getById(req, res, next) {
    requestService
      .getById(req.params.id)
      .then((request) =>
        responseHandler.success(
          res,
          request,
          getSuccessMessage('GET_ONE', 'Request'),
        ),
      )
      .catch(next);
  }

  /**
   * Creates a new request.
   * @param {import("express").Request} req - Express request object containing request data in the body.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async create(req, res, next) {
    requestService
      .create(req.body)
      .then((newRequest) =>
        responseHandler.success(
          res,
          newRequest,
          getSuccessMessage('CREATE', 'Request'),
          201,
        ),
      )
      .catch(next);
  }

  /**
   * Updates an existing request.
   * @param {import("express").Request} req - Express request object containing the request ID and update data.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async update(req, res, next) {
    requestService
      .update(req.params.id, req.body)
      .then((updatedRequest) =>
        responseHandler.success(
          res,
          updatedRequest,
          getSuccessMessage('UPDATE', 'Request'),
        ),
      )
      .catch(next);
  }

  /**
   * Deletes a request by ID.
   * @param {import("express").Request} req - Express request object containing the request ID.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async delete(req, res, next) {
    requestService
      .delete(req.params.id)
      .then(() =>
        responseHandler.success(
          res,
          {},
          getSuccessMessage('DELETE', 'Request'),
        ),
      )
      .catch(next);
  }
}

export default new RequestController();
