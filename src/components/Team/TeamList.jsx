import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../services/api';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load teams. Please try again later.');
        setLoading(false);
        console.error('Error fetching teams:', err);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="text-center">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teams</h2>
        <div>
          <Link to="/teams/create" className="btn btn-primary me-2">
            <i className="fas fa-plus me-2"></i>Create Team
          </Link>
          <Link to="/teams/join" className="btn btn-secondary">
            <i className="fas fa-sign-in-alt me-2"></i>Join Team
          </Link>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info">
          No teams have been created yet. Be the first to create a team!
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>Captain:</strong> {team.captain?.display_name || 'No captain'}
                  </p>
                  <p className="card-text">
                    <strong>Members:</strong> {team.members.length}
                  </p>
                  <Link to={`/teams/${team.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;