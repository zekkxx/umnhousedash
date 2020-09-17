import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Home extends Component {
    state = {
        data: []
    };

    getData = () => {
        API.getPoints()
            .then(res => {
                const data = res.data.sort((a,b) => {
                    if (a.points > b.points)
                        return -1;
                    if (a.points < b.points)
                        return 1;
                    return 0;
                });
                this.setState({
                    data: data
                });
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        console.log('STATE: ', this.state);
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title"><span className="mr-2"><img className="school-logo-image" src="https://upload.wikimedia.org/wikipedia/commons/d/df/MinnesotaGoldenGophers.png" alt="University Of Minnesota" /></span> Coding Bootcamp House Points</h1>
                </div>
                <div className="row mx-xl-5 mx-sm-1 mt-6 mb-5 align-items-center">
                    {this.state.data ? this.state.data.map((item, i) => (
                        <div className="col-12 col-md-6 col-xl-3 mb-5" key={item.house}>
                            <div className="card">
                                {i === 0 ? (
                                    <div className="card-header text-center">
                                        <span role="img" aria-label="Trophy">🏆</span> {item.house} is Currently in First Place <span role="img" aria-label="Trophy">🏆</span>
                                    </div>
                                ) : "" }
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src={item.owl ? `img/${item.owlimage}` : `img/${item.image}`} alt={item.house} /></p>
                                    <h5 className="houseName">{item.house}</h5>
                                    <h6 className="houseMaster mb-2 text-muted">House Master: {item.master}</h6>
                                    <h1 className="housePoints">{item.points}</h1>
                                    <hr />
                                    <h2 className="houseWeekPoints">Points this week: <strong>{item.weekpoints}</strong></h2>
                                </div>
                            </div>
                        </div>
                    )) : ""}
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <span className="text-white"><strong><span role="img" aria-label="badge">🎖 How can I earn points for the house cup?</span></strong> <Link to="/info">Click here to find out</Link></span>
                </nav>
            </div>
        );
    }
}

export default Home;
