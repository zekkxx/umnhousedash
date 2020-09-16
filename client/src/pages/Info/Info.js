import React, {Component} from "react";

class Info extends Component {
    render(){
        return(
            <div className="container-fluid">
                <h1 className="title">About the House Cup</h1>
                <p>
                    Created by Hannah A. Patellis and Cj Jordan for the August 2018 Georgia Institute of Technology Web Application Development Coding Bootcamp.
                    The house cup is a way to compete with other students for points during a bootcamp by doing things that will assist you in your learning.
                    Below are a sample set of ideas for how to earn points. Additional points can be earned from the instructional staff based off of their whims.
                </p>
                <h2>How To Earn Points</h2>
                <ul>
                    <li><h3>+5 Points</h3> Volunteer to answer something in class</li>
                    <li><h3>+3 Points</h3> Respond to someone's question in Ask-The-Class</li>
                    <li><h3>+1 Points</h3> Call Out Dan for not having his screen displayed</li>
                    <li><h3>+2 Points</h3> Catch a bug in an instructor or TA's code!</li>
                    <li><h3>+5 Points (Per Person)</h3> Join an after hours study session! Get a picture for the group~</li>
                    <li><h3>+1 Points (Per Day)</h3> Complete a Code Streak on Github! (Always Be Coding)</li>
                    <li><h3>+10 Points</h3> Have your ENTIRE House log in properly to bootcampspot!</li>
                </ul>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <Link to="/"><button type="button" className="btn btn-light mr-3">Scoreboard</button></Link>
                </nav>
            </div>
        )
    }
}

export default Info;