import { userService } from '../services/';
import { history } from '../helpers';

export const evoucherAction = {
    geteVoucher,
    geteVoucherById,
    getPaymentMethods,
    createEvoucher,
    updateEvoucher,
    deleteEvoucher,
    onChangeProps
};

function geteVoucher(){
    return dispatch => {
        let apiEndpoint = 'evouchers';

        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(changeEvouchersList(response.data));

        }).catch((err)=>{
            console.log(err);
        })
    };
}

function geteVoucherById(id){
    return dispatch => {
        let apiEndpoint = 'evouchers/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editEvouchersDetails(response.data));
        })
    };
}

function getPaymentMethods() {
    return dispatch => {
        let apiEndpoint = 'payment-methods';
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(changePaymentMethodsList(response.data));
        })
    };
}

function createEvoucher(payload){
    return dispatch => {
        let apiEndpoint = 'evouchers/create';
        userService.post(apiEndpoint, payload)
        .then((response)=> {
            dispatch(createEvoucherInfo());
            history.push('/evoucher');
        })
    }
}

function updateEvoucher(id, payload){
    return dispatch => {
        let apiEndpoint = 'evouchers/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedEvoucherInfo());
            history.push('/evoucher');
        })
    }
}

function deleteEvoucher(id){
    return dispatch => {
        let apiEndpoint = 'evouchers/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
             dispatch(deleteEvouchersDetails());
             dispatch(evoucherAction.geteVoucher());
        })
    };
}

function onChangeProps(props, event){
    let value = event.target.value;

    if(props === "image") {
        value = event.target.files[0];
    }

    return dispatch =>{
        dispatch(handleOnChangeProps(props, value));
    }
}

export function handleOnChangeProps(props, value){
    if(props === "is_active") {
        value = (value===1 || value==="1")?0:1;
    }

    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function changePaymentMethodsList(paymentmethods){
    return{
        type: "FETECHED_ALL_PAYMENTMETHOD",
        paymentmethods: paymentmethods
    }
}

export function changeEvouchersList(evoucher){
    return{
        type: "FETECHED_ALL_EVOUCHER",
        evoucher: evoucher
    }
}

export function editEvouchersDetails(evoucher){
    return{
        type: "EVOUCHER_DETAIL",
        id: evoucher.id,
        title: evoucher.title,
        description: evoucher.description,
        expiry_date: evoucher.expiry_date,
        image: evoucher.image,
        quantity: evoucher.quantity,
        amount: evoucher.amount,
        payment_method: evoucher.payment_method,
        buy_type: evoucher.buy_type,
        name: evoucher.name,
        phone_no: evoucher.phone_no,
        maximum_gift_limit: evoucher.maximum_gift_limit,
        maximum_limit: evoucher.maximum_limit,
        is_active: evoucher.is_active,
    }
}

export function updatedEvoucherInfo(){
    return{
        type: "EVOUCHER_UPDATED"
    }
}
export function createEvoucherInfo(){
    return{
        type: "EVOUCHER_CREATED_SUCCESSFULLY"
    }
}
export function deleteEvouchersDetails(){
    return{
        type: "DELETED_EVOUCHER_DETAILS"
    }
}