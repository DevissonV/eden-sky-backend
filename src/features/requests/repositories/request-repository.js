import BaseRepository from '../../../core/base/base-repository.js';

/**
 * Repository for managing request data.
 * @class RequestRepository
 * @extends BaseRepository
 */
class RequestRepository extends BaseRepository {
  constructor() {
    super('requests'); // Se pasa el nombre de la tabla
  }
}

export default new RequestRepository();
