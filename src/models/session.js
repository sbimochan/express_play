import bookshelf from '../db';

const TABLE_NAME = 'sessions';

class Session extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  get hasTimestamps() {
    return true;
  }
}
export default Session;
