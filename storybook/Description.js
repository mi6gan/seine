// @flow
import doctrine from 'doctrine';

// eslint-disable-next-line
export default function Description({ of }) {
  const { tags } = doctrine.parse(of.__docgenInfo.description);
  const description = tags.find(({ title }) => title === 'description') || null;
  return description && description.description;
}
