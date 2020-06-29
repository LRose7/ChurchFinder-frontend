import React from 'react';
import axios from 'axios';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    return valid;
};

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'username':
                formErrors.username = value.length < 3 && value.length > 0 ? 'Minimum 3 characters required'
                    : "";
                break;
            case 'password':
                formErrors.password = value.length < 6 && value.length > 0 ? 'Minimum 6 characters required'
                    : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state))
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://localhost:5000/users/login", this.state)
            .then(response => {
                console.log(response)
                this.setState({
                    result: response
                });

            })

        if (formValid(this.state)) {
            console.log(this.state);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        };
    }



    render() {
        const { formErrors } = this.state
        const { username, password } = this.state
        return (

            <form id="login" onSubmit={this.handleSubmit} >
                <h1>Login Page!</h1>
                <div>
                    <label htmlFor="name"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={this.handleChange} required></input>
                </div>
                <div>
                    <label htmlFor="name"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange} required></input>
                </div>
                <div className="clearfix">
                    <button type="submit" className="loginbtn">Login</button>
                </div>
            </form>
        )
    };
}
export default Login;