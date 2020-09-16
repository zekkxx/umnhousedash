import React from "react";
import { Link } from "react-router-dom";

function Info() {
    return(
        <div className="container-fluid p-5">
            <h1 className="title">About the House Cup</h1>
            <p>
                Created by Hannah A. Patellis and Cj Jordan for the August 2018 Georgia Institute of Technology Web Application Development Coding Bootcamp.
                The house cup is a way to compete with other students for points during a bootcamp by doing things that will assist you in your learning.
                Below are a sample set of ideas for how to earn points. Additional points can be earned from the instructional staff based off of their whims.
            </p>
            <h1 className="title">How To Earn Points</h1>
            <ul>
                <li><span>+10 Points</span> Have your ENTIRE House log in properly to bootcampspot!</li>
                <li><span>+5 Points</span> Volunteer to answer something in class</li>
                <li><span>+3 Points</span> Respond to someone's question in Ask-The-Class</li>
                <li><span>+2 Points</span> Catch a bug in an instructor or TA's code!</li>
                <li><span>+1 Points</span> Call Out Dan for not having his screen displayed</li>
                <li><span>+5 Points (Per Person)</span> Join an after hours study session! Get a picture for the group~</li>
                <li><span>+1 Points (Per Day)</span> Complete a Code Streak on Github! (Always Be Coding)</li>
            </ul>
            <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                <Link to="/"><button type="button" className="btn btn-light mr-3">Scoreboard</button></Link>
            </nav>
        </div>
    )
}

export default Info;
