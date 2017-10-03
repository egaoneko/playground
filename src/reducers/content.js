import * as types from "../constants/ActionTypes";
import content from "../constants/content";

const initialSelectState = {
  selectedContent: null
};

export function select(state = initialSelectState, action) {
  switch (action.type) {
    case types.EXAMPLE_SELECT:
      return {selectedContent: action.selectedContent};
    default:
      return state;
  }
}

const contents = content.contents;
const initialFilterState = {
  filterText: "",
  contentMap: content.getContentMap(contents)
};

export function filter(state = initialFilterState, action) {
  const filterText = action.filterText;
  switch (action.type) {
    case types.EXAMPLE_FILTER:
      return {
        contentMap: content.getContentMap(content.filterByText(contents, filterText.toLowerCase())),
        filterText: filterText
      };
    default:
      return state;
  }
}

