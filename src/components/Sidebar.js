import React from "react";
import contents from "../lib/content";
import CategoryContent from "./CategoryContent";

const propTypes = {};

const defaultProps = {};

class Sidebar extends React.Component {
  render() {
    const contentMap = new Map();

    contents.forEach(content => {
      if (!contentMap.has(content.category)) {
        contentMap.set(content.category, []);
      }

      const contents = contentMap.get(content.category);
      contents.push(content);
    });

    const categoryContents = Array.from(contentMap.entries()).map(
      entry => {
        const category = entry[0];
        const contents = entry[1];
        return <CategoryContent key={category} category={category} contents={contents}/>;
      }
    );

    return (
      <div className="sidebar">
        {categoryContents}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
