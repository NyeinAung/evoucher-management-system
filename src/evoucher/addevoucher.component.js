import { connect } from 'react-redux';
import { evoucherAction } from '../actions';
import React, { Component } from 'react';
import moment from 'moment';
import config from '../config/config';
import { CContainer, CCard, CCardHeader, CCardBody, 
        CForm, CFormLabel, CFormControl, CFormSelect, CFormCheck, CButton} from '@coreui/react';
import AppBar from '../components/appbar';
import { withRouter } from 'react-router-dom';

class AddeVoucher extends Component {
    constructor(props){
        super(props);
        this.state = {
            validated: false
        }
    }

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(evoucherAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : { params } } = this.props;
        const { dispatch } = this.props;
        dispatch(evoucherAction.getPaymentMethods());
        
        if(params.id){
            dispatch(evoucherAction.geteVoucherById(params.id));
        }
    }

    handleSubmit = event =>{
        event.preventDefault()
        event.stopPropagation();

        const form = event.currentTarget

        this.setState({validated: true});
        if (form.checkValidity() === true) {
            const { match : { params } } = this.props;
            const { dispatch } = this.props;
            
            const formData = new FormData();
            formData.append('title', this.props.evoucher.title);
            formData.append('description', this.props.evoucher.description);
            formData.append('expiry_date', this.props.evoucher.expiry_date);
            formData.append('image', this.props.evoucher.image);
            formData.append('quantity', this.props.evoucher.quantity);
            formData.append('amount', this.props.evoucher.amount);
            formData.append('payment_method', this.props.evoucher.payment_method);
            formData.append('buy_type', this.props.evoucher.buy_type);
            formData.append('name', this.props.evoucher.name);
            formData.append('phone_no', this.props.evoucher.phone_no);
            formData.append('maximum_gift_limit', this.props.evoucher.maximum_gift_limit);
            formData.append('maximum_limit', this.props.evoucher.maximum_limit);
            formData.append('is_active', this.props.evoucher.is_active);
    
            if(params.id){
                dispatch(evoucherAction.updateEvoucher(params.id, formData));
            }else{
                dispatch(evoucherAction.createEvoucher(formData));
            }
        }
    }

    render() {
        const { match : { params } } = this.props;
        const todayDate = moment().format("YYYY-MM-D");
        
        const paymentMethods = <CFormSelect id="InputPaymentMethod" 
                                value={this.props.evoucher.payment_method}
                                onChange = {this.handleChange('payment_method')}>
                                    <option value="">--Select--</option>
                                    {this.props.evoucher.paymentmethods.map(e => {
                                        return <option value={e.id} key={e.id}>{e.name}</option>
                                    })}
                                </CFormSelect>

        function FormTitle() {
            if(params.id){
                return <CCardHeader className="font-weight-bold">Edit eVoucher</CCardHeader>
            }

            return <CCardHeader className="font-weight-bold">Add eVoucher</CCardHeader>
        }

        return (
            <div className="App">
                <AppBar/>
                <CContainer md fluid>
                    <div className="evoucher-form pt-5 pb-5 mx-auto">
                        <CCard>
                            <FormTitle />

                            <CCardBody>
                                <CForm
                                noValidate
                                validated={this.state.validated}
                                onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputTitle">Title</CFormLabel>
                                        <CFormControl
                                        type="text"
                                        id="InputTitle"
                                        value={this.props.evoucher.title}
                                        onChange = {this.handleChange('title')}
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputDesc">Description</CFormLabel>
                                        <CFormControl
                                        component="textarea"
                                        rows="3"
                                        id="InputDesc"
                                        value={this.props.evoucher.description}
                                        onChange = {this.handleChange('description')}
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputExpiryDate">Expiry Date</CFormLabel>
                                        <CFormControl
                                        type="date"
                                        id="InputExpiryDate"
                                        min={todayDate}
                                        value={this.props.evoucher.expiry_date}
                                        onChange = {this.handleChange('expiry_date')}
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputPaymentMethod">Payment Method</CFormLabel>
                                        {paymentMethods}
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputBuyType">Buy Type</CFormLabel>
                                        <CFormSelect id="InputBuyType" 
                                        value={this.props.evoucher.buy_type}
                                        onChange = {this.handleChange('buy_type')}>
                                            <option value="">--Select--</option>
                                            <option value="1">MySelf Only</option>
                                            <option value="2">Gift To Others</option>
                                        </CFormSelect>
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputName">Name</CFormLabel>
                                        <CFormControl
                                        type="text"
                                        id="InputName"
                                        value={this.props.evoucher.name}
                                        onChange = {this.handleChange('name')}
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputPhoneNo">Phone No.</CFormLabel>
                                        <CFormControl
                                        type="text"
                                        id="InputPhoneNo"
                                        value={this.props.evoucher.phone_no}
                                        onChange = {this.handleChange('phone_no')}
                                        required
                                        />
                                    </div>
                                    {this.props.evoucher.buy_type==="2" &&
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="InputMaximumGiftLimit">Maximum Gift Limit</CFormLabel>
                                            <CFormControl
                                            type="number"
                                            id="InputMaximumGiftLimit"
                                            value={this.props.evoucher.maximum_gift_limit}
                                            onChange = {this.handleChange('maximum_gift_limit')}
                                            min="0"
                                            required
                                            />
                                        </div>
                                    }
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputMaximumLimit">Maximum Limit</CFormLabel>
                                        <CFormControl
                                        type="number"
                                        id="InputMaximumLimit"
                                        value={this.props.evoucher.maximum_limit}
                                        onChange = {this.handleChange('maximum_limit')}
                                        min="0"
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputQuantity">Quantity</CFormLabel>
                                        <CFormControl
                                        type="number"
                                        id="InputQuantity"
                                        value={this.props.evoucher.quantity}
                                        onChange = {this.handleChange('quantity')}
                                        min="0"
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputAmount">Amount</CFormLabel>
                                        <CFormControl
                                        type="number"
                                        id="InputAmount"
                                        value={this.props.evoucher.amount}
                                        onChange = {this.handleChange('amount')}
                                        min="0"
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputTitle">eVoucher Image</CFormLabel>
                                        <CFormControl type="file" id="formFile" onChange={this.handleChange('image')}/>
                                        {this.props.evoucher.old_image !== "" &&
                                            <img src={`${config.baseUrl}${this.props.evoucher.old_image}`} className="evoucher-image mt-3" alt="eVoucher"/>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="InputActive">Active</CFormLabel>
                                        <CFormCheck
                                        switch
                                        label=""
                                        id="InputActive"
                                        size="xl"
                                        defaultChecked
                                        value={this.props.evoucher.is_active}
                                        onChange = {this.handleChange('is_active')}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <CButton className="me-2" color="light" href="/evoucher">
                                            Cancel
                                        </CButton>
                                        <CButton type="submit" color="primary">
                                            Save
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </div>
                </CContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return state;
}

const connectedAddEvoucher = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(AddeVoucher));
export { connectedAddEvoucher as AddeVoucher };