// import logo from './logo.svg';
import { Router, Switch, Route} from 'react-router-dom';
import  { Login } from './login/';
import { Home } from './home/';
import { history } from './helpers';
import { PrivateRoute } from './components';

import { eVoucher } from './evoucher';
import { AddeVoucher } from './evoucher/addevoucher.component'

import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router history={history}>
          <div>
              <Switch>
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path='/evoucher' component={eVoucher} />
                <PrivateRoute exact path='/add-evoucher' component={AddeVoucher} />
                <PrivateRoute exact path='/edit-evoucher/:id' component={AddeVoucher} />
                <Route exact path='/' component={Login} />
              </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
