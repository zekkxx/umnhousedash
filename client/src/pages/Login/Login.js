import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
    state = {
        password: "",
        loggedIn: false
    }

    handleSubmit = e => {
        API.authenticateUser(this.state.password).then(res => {
            if(res.data.success){
                sessionStorage.setItem("token", res.data.token);
                this.setState({ loggedIn: true });
            } else {
                alert("That's not the right password");
            }
        });
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    componentWillMount(){
        const tokenFromSS = sessionStorage.getItem("token");
        if(tokenFromSS){
            API.validate(tokenFromSS)
                .then(res => {
                    if(res.data.success === true){
                        this.setState({loggedIn: true});
                    }
                }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            this.state.loggedIn ? (
                <Redirect push to="/dashboard" />
            ) : (
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-xl-5 col-sm-12 mt-5">
                            <div className="card mt-6 mb-5">
                                <div className="card-body">
                                    <span className="d-flex justify-content-center mt-3"><img className="houseImage" height="200" src="img/mern.png" alt="MERNistry of Magic" /></span>
                                    <div className="input-group mb-3 mt-5">
                                        <input type="password" className="form-control" onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} value={this.state.password} name="password" placeholder="Password" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="submit">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Login;
