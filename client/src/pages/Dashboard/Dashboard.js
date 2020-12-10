import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

class Dashboard extends Component {
    state = {
        data: [],
        loggedIn: true,
        Githufflepuff: 0,
        Ravenclosure: 0,
        Slytherindent: 0,
        GryffinDOM: 0
    };

    getData = () => {
        API.getPoints()
            .then(res => 
                this.setState({
                    data: res.data
                })
            )
            .catch(err => console.log(err));
    }

    handlePointChange = (house, amount) => {
        this.setState({ [house]: 0 });
        API.addPoint(house, amount, sessionStorage.getItem("token"))
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    handleReset = house => {
        API.resetWeekPoints(house, sessionStorage.getItem("token"))
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    handleOwl = house => {
        API.giveOwl(house, sessionStorage.getItem("token"))
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    handlePointsInputChange = e => {
        if(isNaN(e.target.value)) {
            alert("Your input needs to be a number.\nDon't break the system with that NaN stuff! 🤨");
            this.setState({ [e.target.name]: 0 });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    logout = () => {
        sessionStorage.removeItem("token");
        this.setState({ loggedIn: false });
    }

    componentWillMount() {
        const tokenFromSS = sessionStorage.getItem("token");
        if (tokenFromSS) {
            API.validate(tokenFromSS)
                .then(res => {
                    if (res.data.success === true) {
                        this.setState({ loggedIn: true });
                        this.getData();
                    } else {
                        this.setState({ loggedIn: false});
                    }
                }).catch(err => console.log(err));
        } else {
            this.setState({loggedIn: false});
        }
    }

    render() {
        return (
            this.state.loggedIn ? (
                <div className="container-fluid">
                    <div className="row mx-5 my-5 align-items-start">
                        <h1 className="title"><span className="mr-2"><img className="school-logo-image" src="https://upload.wikimedia.org/wikipedia/commons/d/df/MinnesotaGoldenGophers.png" alt="University Of Minnesota" /></span> House Points Dashboard</h1>
                    </div>
                    <div className="row mx-xl-5 mx-sm-1 mt-5 align-items-center">
                        {this.state.data ? this.state.data.map(item => (
                            <div className="col-12 col-md-6 col-xl-3 mb-5" key={item.house}>
                                <div className="card">
                                    <div className="card-body">
                                        <p><img className="houseImage" height="200" src={item.owl ? `img/${item.owlimage}` : `img/${item.image}`} alt={item.house} /></p>
                                        <h5 className="houseName">{item.house}</h5>
                                        <h1 className="housePoints">{item.points}</h1>
                                        <div className="center-this">
                                            <div className="btn-group btn-group-lg">
                                                <button type="button" className="btn btn-secondary" onClick={() => this.handlePointChange(item.house, -1)}>-</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.handlePointChange(item.house, 1)}>+</button>
                                            </div>
                                        </div>
                                        <div className="center-this">
                                            <div className="row">
                                                <div className="col-8 offset-2">
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control" placeholder="Points" name={item.house} onChange={this.handlePointsInputChange} value={this.state[item.house]} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-secondary" type="button" onClick={() => this.handlePointChange(item.house, this.state[item.house])}>Give</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <p>Points this week</p>
                                                <div className="input-group input-group-md">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">{item.weekpoints}</span>
                                                    </div>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-secondary" type="button" onClick={() => this.handleReset(item.house)}>Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <p>Give the owl</p>
                                                <div className="center-this">
                                                    <button className={item.owl ? "btn btn-secondary" : "btn btn-outline-secondary"} type="button" onClick={() => this.handleOwl(item.house)}>{item.owl ? "Has owl" : "Give owl"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ""}
                    </div>
                    <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                        <button type="button" onClick={this.logout} className="btn btn-outline-light">Logout</button>
                        <span className="ml-3 text-white">You're logged in!</span>
                    </nav>
                </div>
            ) : (
                <Redirect push to="/login" />
            )
        );
    }
}

export default Dashboard;
