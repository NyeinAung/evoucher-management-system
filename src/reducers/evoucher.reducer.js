const initialState = { 
    evoucher: [],
    paymentmethods: [],
    id: "",
    title: "",
    description: "",
    expiry_date: "",
    image: "",
    old_image: "",
    amount: "",
    quantity: "",
    payment_method: "",
    buy_type: "",
    name: "",
    phone_no: "",
    maximum_gift_limit: 0,
    maximum_limit: "",
    is_active: 1
};

export function evoucher(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_EVOUCHER':
            return {
                ...state,
                evoucher: action.evoucher
            };
        case 'FETECHED_ALL_PAYMENTMETHOD':
            return {
                ...state,
                paymentmethods: action.paymentmethods
            }
        case "EVOUCHER_DETAIL":
            return {
                ...state,
                id: action.id,
                title: action.title,
                description: action.description,
                expiry_date: action.expiry_date,
                image: action.image,
                old_image: action.image,
                amount: action.amount,
                quantity: action.quantity,
                payment_method: action.payment_method,
                buy_type: action.buy_type,
                name: action.name,
                phone_no: action.phone_no,
                maximum_gift_limit: action.maximum_gift_limit,
                maximum_limit: action.maximum_limit,
                is_active: 1
            };
        case "EVOUCHER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state
     }
}