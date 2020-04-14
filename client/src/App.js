import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Profiles from './components/Profiles';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />

          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
