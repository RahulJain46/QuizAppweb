import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fortActions from '../../actions/fortActions';
import FortList from './FortList';
import FortDetailsForm from './FortDetailsForm'
import toastr from 'toastr';

class ManageFortDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            fort: Object.assign({}, this.props.fort),
            errors: {},
            saving: false
        }
        this.updateFortState = this.updateFortState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteFort = this.deleteFort.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.fort._id != nextProps.fort._id) {
            this.setState({ fort: Object.assign({}, nextProps.fort) });
        }
    }
    saveCourse(event) {
        event.preventDefault();
        this.setState({ saving: true })
        console.log("this is the response" , this.state.fort)
        this.props.actions.saveFort(this.state.fort).then(() => {
            this.redirect();
        }).catch((error) => {
            toastr.error(error);
            this.setState({ saving: false });
        })
    }

    deleteFort(event) {
        event.preventDefault();
        this.props.actions.deleteFortById(this.state.fort).then(() => {
            this.context.router.push('/');
        }).catch((error) => {
            toastr.error(error);
        })
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Course saved.');
        this.context.router.push('/');
    }

    updateFortState(event) {
        const field = event.target.name;
        const value = event.target.value;
        let fort = Object.assign({}, this.state.fort);
        fort[field] = value;
        this.setState({ fort: fort })
    }
    render() {
        return (
            <div>
               
                <h1>ManageFort</h1>
              <span>
                <input
                type="submit"
                value={'Delete'}
                className="btn btn-primary"
                onClick={this.deleteFort} />
                </span>
                <FortDetailsForm
                    fort={this.state.fort}
                    onChange={this.updateFortState}
                    onSave={this.saveCourse}
                    errors={this.state.errors}
                    // allAuthors={this.props.authors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageFortDetailsPage.contextTypes = {
    router: PropTypes.object
};

function getFortById(forts, id) {
    const fort = forts.filter(fort => fort._id == id);
    if (fort.length) {

        return fort[0];
    }  //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    let fortId = ownProps.params.id;
    let fort = { _id: '', state: '', name: '', city: '', country: '',year:'', thumbnail:'',history:'',description:'',images:''};
    if (fortId && state.forts.length > 0) {
        fort = getFortById(state.forts, fortId);
    }
    return {
        fort: fort
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fortActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageFortDetailsPage);