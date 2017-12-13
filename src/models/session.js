import  bookshelf  from "../db";

const TABLE_NAME = 'session';

class Session extends bookshelf.Model{
  get tableName(){
    return TABLE_NAME;
  }
  get hasTimestamps(){
    return true;
  }
}
export default Session;