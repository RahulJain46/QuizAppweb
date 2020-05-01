import React from 'react';
import TextInput from '../common/TextInput';


const SignIn = ({ customerInfo, onChange, errors,saving ,onSumit}) => {
    return (
        <form>  
            <TextInput
                name="email"
                label="email"
                value={customerInfo.email}
                onChange={onChange}
                error={errors.email}
            />

            <TextInput
                name="password"
                label="password"
                value={customerInfo.password}
                onChange={onChange}
                error={errors.password}
            />
          
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'not registered' : 'Save'}
                className="btn btn-primary"
                onClick={onSumit} />
        </form>
    );
};

// FortDetailsForm.propTypes = {
//   fort: PropTypes.object.isRequired,
//   errors: PropTypes.object
// };

export default SignIn;