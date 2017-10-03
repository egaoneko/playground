import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Sidebar from "../components/example/sidebar/Sidebar";
import Viewer from "../components/example/viewer/Viewer";
import actions from "../actions";
import content from "../constants/content";

const propTypes = {
  contentMap: PropTypes.instanceOf(Map).isRequired,
  filterText: PropTypes.string,
  selectedContent: PropTypes.object,
  id: PropTypes.string,
  handleSelectContent: PropTypes.func,
  handleFilter: PropTypes.func
};

const defaultProps = {
  id: ""
};

class Example extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.id) {
      this.props.handleSelectContent(content.searchById(this.props.id));
    } else {
      this.props.handleSelectContent(null);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar contentMap={this.props.contentMap}
                 filterText={this.props.filterText}
                 selectedContent={this.props.selectedContent}
                 handleSelectContent={this.props.handleSelectContent}
                 handleFilter={this.props.handleFilter}/>
        <Viewer selectedContent={this.props.selectedContent}
                handleSelectContent={this.props.handleSelectContent}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentMap: state.filter.contentMap,
    filterText: state.filter.filterText,
    selectedContent: state.select.selectedContent
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelectContent: (content) => {
      dispatch(actions.content.select(content));
    },
    handleFilter: (text) => {
      dispatch(actions.content.filter(text));
    }
  };
};

Example.propTypes = propTypes;
Example.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Example);
