import React from "react";

import './sign-in.style.scss';

import FormInput from "./../form-input/form-input.component";
import ButtonComponent from "./../button/button.component";

import { auth, signInWithGoogle } from './../../firebase/firebase.utils';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;

        try {
            const login = await auth.signInWithEmailAndPassword(email, password);
            console.log('Login', login)
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput label="Email" name="email" type="email" value={this.state.email} handleChange={this.handleChange}/>

                    <FormInput label="Password" name="password" type="password" value={this.state.password} handleChange={this.handleChange}/>

                    <div className="buttons">
                        <ButtonComponent type="submit"> Sign In </ButtonComponent>
                        <ButtonComponent onClick={ signInWithGoogle } isGoogleSignIn> Sign In With Google</ButtonComponent>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIn;