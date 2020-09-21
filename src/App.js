import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Header from './components/header/header.component';

import HomePage from "./pages/homepage/homePage.component";
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import { auth,  createUserProfileDocuments} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action'


class App extends React.Component {

  subscriptionForAuth= null;

  componentDidMount() {
    const {setCurrentUser } = this.props;

    this.subscriptionForAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: user});
      if (userAuth) {
        const userRef = await createUserProfileDocuments(userAuth);
  
        userRef.onSnapshot(snap => {
          setCurrentUser({
            currentUser: {
              id: snap.id,
              ...snap.data()
            }
          });
        });
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.subscriptionForAuth();
  }

  render () {
    return (
      <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/sign-in' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
