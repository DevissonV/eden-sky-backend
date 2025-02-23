import BaseController from '../../../core/base/base-controller.js';
import requestService from '../services/request-service.js';

/**
 * Controller for managing requests.
 * @class RequestController
 * @extends BaseController
 */
class RequestController extends BaseController {
  constructor() {
    super(requestService, 'Request');
  }
}

export default new RequestController();
