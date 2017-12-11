
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo-list',table=>{
    table.increments();
    table.string('description').notNull();
    // table.integer('user_id').unsigned();
    table.integer('user_id').references('users.id');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todo-list');
};
