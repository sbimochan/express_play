import Tag from '../models/tag';
import Boom from 'boom';

export function tags() {
  return Tag.fetchAll();
}
export function todosOfTags(id) {
  return new Tag({ id })
    .fetch({
      withRelated: ['todos']
    })
    .then(tags => {
      if (!tags) {
        throw new Boom.notFound('no tags');
      }

      return tags;
    });
}
