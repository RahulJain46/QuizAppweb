import React from 'react';
import TextInput from '../common/TextInput';


const SignOut = ({ customerInfo, onChange, errors,saving ,onSave}) => {
    return (
        <form> 
            <TextInput
                name="firstName"
                label="FirstName"
                value={customerInfo.firstName}
                onChange={onChange}
                error={errors.firstName}
            />

            <TextInput
                name="lastName"
                label="lastName"
                value={customerInfo.lastName}
                onChange={onChange}
                error={errors.lastName}
            />
            <TextInput
                name="email"
                label="email"
                value={customerInfo.email}
                onChange={onChange}
                error={errors.email}
            />

            <TextInput
                name="mobileNumber"
                label="mobileNumber"
                value={customerInfo.mobileNumber}
                onChange={onChange}
                error={errors.mobileNumber}
            />

            <TextInput
                name="password"
                label="password"
                value={customerInfo.password}
                onChange={onChange}
                error={errors.password}
            />
            <TextInput
                name="confirmPassword"
                label="confirmPassword"
                value={customerInfo.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword}
            />
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

// FortDetailsForm.propTypes = {
//   fort: PropTypes.object.isRequired,
//   errors: PropTypes.object
// };

export default SignOut;