import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";

import Header from './components/header/header.component';

import HomePage from "./pages/homepage/homePage.component";
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import { auth,  createUserProfileDocuments} from './firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  subscriptionForAuth= null;

  componentDidMount() {
    this.subscriptionForAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: user});
      if (userAuth) {
        const userRef = await createUserProfileDocuments(userAuth);
  
        userRef.onSnapshot(snap => {
          this.setState({
            currentUser: {
              id: snap.id,
              ...snap.data()
            }
          });
        });
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount() {
    this.subscriptionForAuth();
  }

  render () {
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
      </div>
    );
  }
}

export default App;
