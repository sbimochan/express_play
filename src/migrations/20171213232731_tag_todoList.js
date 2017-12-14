
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags_todoLists',table=>{
    table.integer('todoList_id').references('todoLists.id').onDelete('CASCADE');
    table.integer('tag_id').references('tags.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags_todoLists');
};
