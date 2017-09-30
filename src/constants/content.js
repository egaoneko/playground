//noinspection JSUnresolvedVariable
import contents from "../data/content.json";

const contentMap = new Map();

contents.forEach(content => {
  if (!contentMap.has(content.category)) {
    contentMap.set(content.category, []);
  }

  const contents = contentMap.get(content.category);
  contents.push(content);
});

export default {
  contents, contentMap
}
