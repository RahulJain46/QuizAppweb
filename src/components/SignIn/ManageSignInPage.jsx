import React, { Component } from 'react';
import SignIn from './SignIn';
import SignOut from '../SignOut/SignOut';
import PropTypes from 'prop-types';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';

class ManageSignInPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            customerInfo: Object.assign({}, this.props.customerInfo),
            errors: {},
            saving: false,
            pageName: this.props.pageName,
            message: false
        };
        this.SaveForm = this.SaveForm.bind(this);
        this.updateForForm = this.updateForForm.bind(this);
        this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    checkAuthentication(event) {
        event.preventDefault();
        this.setState({saving: true});
        console.log(this.props.actions.checkAuthentication(this.state.customerInfo,this.state.message));
        this.props.actions.checkAuthentication(this.state.customerInfo,this.state.message).then((saving) => {
            debugger;
            return saving
        }).then((d)=>{
            console.log(d)
        }).catch((error) => {
            toastr.error(error);
            this.setState({ saving: false });
        });
       }


    SaveForm(event) {
        event.preventDefault();
        this.setState({saving: true});
        debugger;
        console.log(this.state.customerInfo);
        this.props.actions.saveCustomerInfo(this.state.customerInfo).then(() => {
            this.redirect();
        }).catch((error) => {
            toastr.error(error);
            this.setState({ saving: false });
        });
    }

  
  
    redirect() {
        this.setState({ saving: false });
        toastr.success('customer Info saved.');
        this.context.router.push('/');
    }
  
    updateForForm(event) {
        let field = event.target.name;
        let value = event.target.value;
        let customerInfo = Object.assign({}, this.state.customerInfo)
        customerInfo[field] = value;
        this.setState({ customerInfo: customerInfo })
    }
    render() {
        return (
            <div className="login">
                {this.state.pageName == 'SignIn' ?
                    <SignIn
                        customerInfo={this.state.customerInfo}
                        onSumit={this.checkAuthentication}
                        onChange={this.updateForForm}
                        errors={this.state.errors}
                        saving={this.state.saving}
                       

                    /> :
                    <SignOut
                        customerInfo={this.state.customerInfo}
                        onSave={this.SaveForm}
                        onChange={this.updateForForm}
                        errors={this.state.errors}
                        saving={this.state.saving}

                    />}
            </div>
        );
    }

}

ManageSignInPage.contextTypes = {
    router: PropTypes.object
  };

function mapStateToProps(state, ownProps) {
    let customerInfo = { _id:'', firstName: '', lastName: '', mobileNumber: '', password: '', confirmPassword: '', email: '' }
    let pageName = ownProps.PageName;
    return {
        customerInfo: customerInfo,
        pageName: pageName
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSignInPage);
