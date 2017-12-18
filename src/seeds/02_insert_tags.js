/**
 * Seed tags table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('tags')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('tags').insert({
          tag_name: 'person',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'nature',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'vehicle',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'building',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'food',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'all',
          created_at: new Date()
        }),
        knex('tags').insert({
          tag_name: 'gadgets',
          created_at: new Date()
        })
      ]);
    });
}
