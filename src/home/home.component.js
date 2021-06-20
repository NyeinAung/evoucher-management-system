import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '../components/appbar';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <AppBar/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedHome = withRouter(connect(mapStateToProps, null, null, {
     pure: false
})(Home));

export { connectedHome as Home };