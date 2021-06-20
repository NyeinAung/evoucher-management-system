import React from 'react';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import {CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink} from '@coreui/react';

class AppBar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            setVisible: false,
        }
    }

    toggleVisible = prop => event => {
        this.setState({ visible: prop });
    };

    logout = event =>{
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        return (
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="#">eVoucher Management System</CNavbarBrand>
                    <CNavbarToggler onClick={() => this.state.toggleVisible(!this.state.visible)} />
                    <CCollapse className="navbar-collapse" visible={this.state.visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="/home">Home</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="/evoucher">eVoucher</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#" onClick={(event)=>{this.logout()}}>Log Out</CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        );
    }
}

const mapStateToProps = (state) =>{
    const { loggingIn } = state.authentication;
    return {
       loggingIn
    };
}

export default connect(mapStateToProps)((AppBar));

