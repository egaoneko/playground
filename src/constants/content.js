/*global STATIC_URL*/
//noinspection JSUnresolvedVariable
import contents from "../data/content.json";

contents.forEach(content => {
  const prefix = content.isExternal? "" : STATIC_URL;
  content.url = prefix + content.url;
});

const contentMap = getContentMap(contents);

function searchById(id) {
  const searched = contents.filter(content=>content.id === id);
  return searched.length > 0 ? searched[0] : null;
}

function getContentMap(contents) {
  const map = new Map();

  contents.forEach(content => {
    if (!map.has(content.category)) {
      map.set(content.category, []);
    }

    const contents = map.get(content.category);
    contents.push(content);
  });

  return map;
}

function filterByText(contents, text) {
  if (!text) {
    return contents;
  }
  return contents.filter(content => ~content.name.toLowerCase().indexOf(text));
}

export default {
  contents,
  contentMap,
  searchById,
  getContentMap,
  filterByText
}
