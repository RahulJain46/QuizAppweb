import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as fortActions from '../../actions/fortActions';
import FortList from './FortList';
import SearchFort from './SearchFort';
import FortFilter from './Filter/FortFilter'

class FortPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterText: ''
    }
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.filterUpdate = this.filterUpdate.bind(this);
  }

  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  redirectToAddCoursePage() {
    browserHistory.push('/fort');
  }
  render() {
    return (
      <div>
        <h1>Forts</h1>
        <input
          type="submit"
          value="Add Fort"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        <FortFilter filterFort={this.props.forts}/>
        <SearchFort
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate}
        />

        <FortList forts={this.props.forts} filterText={this.state.filterText} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    forts: state.forts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(fortActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FortPage);