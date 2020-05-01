import React from 'react';
import InputCheckBox from './InputCheckBox'

class FortFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isChecked:''
        }
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this)
    }

    getSortAttibutes() {
        let Rangeyears = [];
        let years = [];
        let states = [];
        let state = [];
        let cities = [];
        let city = [];
        if (this.props.filterFort.length) {
            years = this.props.filterFort.map(fort => fort.year).sort();
            state = this.props.filterFort.map(fort => fort.state).sort();
            states = state.filter((item, pos) => state.indexOf(item) == pos);
            city = this.props.filterFort.map(fort => fort.city).sort();
            cities = city.filter((item, pos) => city.indexOf(item) == pos)
            Rangeyears.push(Math.min(...years))
            Rangeyears.push(Math.max(...years))
            for (let i = 0; i < (Rangeyears[1] - Rangeyears[0]) / 100; i++) {
                Rangeyears.push(Rangeyears[0] + 500 * (i + 1));
            }
            Rangeyears.splice(1, 1)

        }
        
        return {
            Rangeyears,
            states,
            cities
        }
    }
    toggleCheckboxChange(){
      this.setState({
           isChecked:"isSelected"
      });  
    }
    
    render() {
        return (
            <div className="sortFortList">
                <form >
                      <h4>year</h4>
                      {this.getSortAttibutes().Rangeyears.map(year => 
                    <InputCheckBox 
                       name ={year}
                       value ={year}
                       checked ={this.state.isChecked}
                       onChange ={this.toggleCheckboxChange}
                    />)}
                    <h4>state</h4>
                      {this.getSortAttibutes().states.map(state =>
                    <InputCheckBox 
                       name ={state}
                       value ={state}
                       checked ={this.state.isChecked}
                       onChange ={this.toggleCheckboxChange}
                    />)}
                    <h4>city</h4>
                      {this.getSortAttibutes().cities.map(state =>
                    <InputCheckBox 
                       name ={state}
                       value ={state}
                       checked ={this.state.isChecked}
                       onChange ={this.toggleCheckboxChange}
                    />)}
                </form>
            </div>
        )
    }
}
export default FortFilter;