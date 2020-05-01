
import React from 'react';
import { Link } from 'react-router';

const FortListRaw = ({...fort}) => {
  //  _id, thumbnail, name, city,state,year,history,description,images
    return (
        <table>
            <tbody>
           
                <Link to={'/fort/' + fort._id}>
                    <img src={fort.thumbnail} />
                    <tr>
                        <td>
                            {fort.name}
                        </td>
                        <td>{fort.city}</td>
                        <td>
                            {fort.year}
                        </td>
                        <td>
                            {fort.state}
                        </td>
                    </tr></Link>
            </tbody>
        </table>

    )
};

export default FortListRaw;
// const forts = {
//         fortImage_url: "http://placehold.it/120",
//         fortName: "Golconda",
//         fortPlace: "Hyderabad - Telangana",
//         fortConstructedYear: 1500
// }