import { connect } from 'react-redux';
import { evoucherAction } from '../actions';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { CContainer, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CBadge } from '@coreui/react';
import AppBar from '../components/appbar';
import { withRouter } from 'react-router-dom';
import config from '../config/config';

class eVoucher extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(evoucherAction.geteVoucher());
    }

    handleDelete = (event, id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const { dispatch } = this.props;
            dispatch(evoucherAction.deleteEvoucher(id))
        }
    };

    render() {
        const { evoucher } = this.props.evoucher;
        return (
            <div className="App">
                <AppBar/>
                <CContainer md fluid>
                    <div className="pt-5 mx-auto" >
                        <h4>eVoucher Lists</h4>

                        <div className="d-flex pt-3">
                            <CButton color="primary" href="/add-evoucher">Add eVoucher</CButton>
                        </div>

                        <div className="d-flex pt-2">
                            <CTable>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">No.</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone No.</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {evoucher.map((e, key) => {
                                        return (
                                            <CTableRow key={e.id}>
                                                <CTableHeaderCell scope="row">{key+1}</CTableHeaderCell>
                                                <CTableDataCell><img src={`${config.baseUrl}${e.image}`} className="evoucher-image" alt="eVoucher"/></CTableDataCell>
                                                <CTableDataCell>{e.title}</CTableDataCell>
                                                <CTableDataCell>
                                                    <Moment format="D MMM, YYYY">{e.expiry_date}</Moment>
                                                </CTableDataCell>
                                                <CTableDataCell>{e.name}</CTableDataCell>
                                                <CTableDataCell>{e.phone_no}</CTableDataCell>
                                                <CTableDataCell>{e.quantity}</CTableDataCell>
                                                <CTableDataCell>{e.amount}</CTableDataCell>
                                                <CTableDataCell>
                                                    {e.is_active ? (
                                                        <CBadge color="success">Active</CBadge>
                                                    ) : (
                                                        <CBadge color="danger">Inactive</CBadge>
                                                    )}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton color="warning" className="me-2" href={`/edit-evoucher/${e.id}`}>Edit</CButton>
                                                    <CButton color="danger" variant="outline" onClick={(event) => this.handleDelete(event, e.id)}>Delete</CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        );
                                    })}
                                </CTableBody>
                            </CTable>
                        </div>
                    </div>
                </CContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
       evoucher : state.evoucher
    };
}

const connectedeVoucher = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(eVoucher));

export { connectedeVoucher as eVoucher };