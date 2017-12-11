/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('garage', table => {
    table.increments();
    table.string('name').notNull();
    table.integer('year');
    // table.string('brand').notNull();
    // table.string('type').notNull();
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('garage');
}
