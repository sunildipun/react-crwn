import React from "react";

import './sign-up.style.scss';
import FormInput from './../form-input/form-input.component';
import ButtonComponent from './../button/button.component';
import { auth, createUserProfileDocuments } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        console.log(password === confirmPassword);
        if (password !== confirmPassword) {
            alert('Password dont match');
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocuments(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.log('Error sign up', error)
        }

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with Email and Password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <FormInput label="Name" name="displayName" type="text" value={displayName} handleChange={this.handleChange}/>
                <FormInput label="Email" name="email" type="email" value={email} handleChange={this.handleChange}/>
                <FormInput label="Password" name="password" type="password" value={password} handleChange={this.handleChange}/>
                <FormInput label="Confirm Password" name="confirmPassword" type="password" value={confirmPassword} handleChange={this.handleChange}/>
                <ButtonComponent type="submit"> Sign Up </ButtonComponent>
                </form>
            </div>
        )
    }

};

export default SignUp;