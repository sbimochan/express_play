import bookshelf from '../db';

const TABLE_NAME = 'garage';

/**
 * Garage model.
 */
class Garage extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
}
export default Garage;
