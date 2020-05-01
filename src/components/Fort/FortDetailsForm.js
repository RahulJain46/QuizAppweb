import React from 'react';
import TextInput from '../common/TextInput';


const FortDetailsForm = ({ fort, onChange, errors, saving, onSave }) => {
    return (
        <form>
            <TextInput
                name="name"
                label="name"
                value={fort.name}
                onChange={onChange}
                error={errors.name}
            />
            <TextInput
                name="state"
                label="state"
                value={fort.state}
                onChange={onChange}
                error={errors.state}
            />

            <TextInput
                name="city"
                label="city"
                value={fort.city}
                onChange={onChange}
                error={errors.city}
            />
            
            <TextInput
                name="country"
                label="country"
                value={fort.country}
                onChange={onChange}
                error={errors.country}
            />
            <TextInput
                name="year"
                label="year"
                value={fort.year}
                onChange={onChange}
                error={errors.year}
            />
            <TextInput
                name="thumbnail"
                label="thumbnail"
                value={fort.thumbnail}
                onChange={onChange}
                error={errors.thumbnail}
            />

            <TextInput
                name="history"
                label="history"
                value={fort.history}
                onChange={onChange}
                error={errors.history}
            />

            <TextInput
                name="description"
                label="description"
                value={fort.description}
                onChange={onChange}
                error={errors.description}
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

export default FortDetailsForm;