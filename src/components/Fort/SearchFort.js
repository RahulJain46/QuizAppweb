import React from 'react';
import TextInput from '../common/TextInput';


class SearchFort extends React.Component {
    constructor(props) {
        super(props)
        this.onchange = this.onchange.bind(this)
    }
    onchange() {
        const val = this.refs.filterTextInput.value;
        this.props.filterUpdate(val)
    }

    render() {
        return (

            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    ref="filterTextInput"
                    onChange={this.onchange}
                />
            </div>
        )
    }

}

export default SearchFort;