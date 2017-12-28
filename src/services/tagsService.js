import Tag from '../models/tag';

export function tags() {
  return Tag.fetchAll();
}
