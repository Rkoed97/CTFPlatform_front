import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="display-4 mb-4">Welcome to CTF Platform</h1>
      <p className="lead mb-4">
        Test your cybersecurity skills with our Capture The Flag challenges.
      </p>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-flag me-2"></i>Challenges
              </h3>
              <p className="card-text">
                Solve various cybersecurity challenges and capture flags to earn points.
              </p>
              <Link to="/challenges" className="btn btn-primary">
                View Challenges
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-users me-2"></i>Teams
              </h3>
              <p className="card-text">
                Form a team with your friends and compete together.
              </p>
              <Link to="/teams" className="btn btn-primary">
                View Teams
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-crown me-2"></i>Leaderboard
              </h3>
              <p className="card-text">
                Check the leaderboard to see how you rank against other participants.
              </p>
              <Link to="/leaderboard" className="btn btn-primary">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;