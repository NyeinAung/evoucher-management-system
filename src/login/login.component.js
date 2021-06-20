import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CContainer, CCard, CCardHeader, CCardBody, CButton,
    CForm, CFormLabel, CFormControl  } from '@coreui/react';
import { userActions } from '../actions';
import { history } from '../helpers';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            show_password: false,
            validated: false,
        }
    }

    componentDidMount() {
        if(localStorage.getItem('auth')){
            history.push('/home');
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    login = event => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget

        this.setState({validated: true});
        if (form.checkValidity() === true) {

            this.setState({ setValidated: true, submitted: true });
            const { email, password } = this.state;
            const { dispatch } = this.props;
            if (email && password) {
                dispatch(userActions.login(email, password));
            }
        }
    }
    
    render() {
        // const [validated, setValidated] = useState(false)
        return (
            <CContainer sm fluid>
                <div className="login-inner mx-auto" >
                    <CCard>
                        <CCardHeader className="text-center font-weight-bold">Login to eVoucher Management System</CCardHeader>

                        <CCardBody>
                            <CForm
                            noValidate
                            validated={this.state.validated}
                            onSubmit={this.login}>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="InputEmail">Email address</CFormLabel>
                                    <CFormControl
                                    type="email"
                                    id="InputEmail"
                                    aria-describedby="emailHelp"
                                    onChange = {this.handleChange('email')}
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="InputPassword">Password</CFormLabel>
                                    <CFormControl type={this.state.show_password ? 'text' : 'password'} id="InputPassword" onChange={this.handleChange('password')} required/>
                                </div>
                                <CButton type="submit" color="primary">
                                    Login
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </div>
            </CContainer>
         );
     }
}

const mapStateToProps = (state) =>{
    const { loggingIn } = state.authentication;
    return {
       loggingIn
    };
}

const connectedLogin = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(Login));

export { connectedLogin as Login };