import './Home.css';
import React, { Component } from 'react';
import Fort from '../Fort/FortListRaw';
import FortList from '../Fort/FortList';
import forts from '../../data/forts';

class Home extends React.Component {
    render() {
    let fort = {
        'fortImage_url': "http://placehold.it/120",
        'fortName': "Golconda",
        'fortPlace': "Hyderabad - Telangana",
        'fortConstructedYear': 1500
    }
    return <div><FortList {...forts} /></div>;
  }
};

export default Home;





 