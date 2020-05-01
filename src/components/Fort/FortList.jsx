
import FortListRaw from '../Fort/FortListRaw';
import React from 'react';

const FortList = ({ filterText, forts }) => {
    if (forts[0] == null) {
        return null;
    }
    const fortList = forts;
    const filterFortName = fortList.filter(fort => fort.name.toLowerCase().indexOf(filterText) >= 0);
    const filterFortCity = fortList.filter(fort => fort.city.toLowerCase().indexOf(filterText) >= 0);
    const filterFortState = fortList.filter(fort => fort.state.toLowerCase().indexOf(filterText) >= 0);
    const getFort = (fortDetail, index) => {
        return <tr key={index}><FortListRaw {...fortDetail} /></tr>
    }
    return (
        <div className="FortList">
            {filterText == "" ? '' : <div>
                You are searching for {filterText}
            </div>}
            <table className="table">
                <tbody>
                    <tr id="fortList" className="FortDetail">
                        {fortList == null ? '' : (filterFortName.length != 0 ? filterFortName.map(getFort) : (filterFortCity.map(getFort).length!=0)? filterFortCity.map(getFort):  filterFortState.map(getFort))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default FortList;
