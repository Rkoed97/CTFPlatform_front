import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeam, getProfile } from '../../services/api';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team details
        const teamResponse = await getTeam(id);
        setTeam(teamResponse.data);
        
        // Fetch user profile to check if user is captain
        const profileResponse = await getProfile();
        setUserProfile(profileResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load team details. Please try again later.');
        setLoading(false);
        console.error('Error fetching team details:', err);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading team details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!team) {
    return <div className="alert alert-warning">Team not found.</div>;
  }

  // Check if current user is the team captain
  const isTeamCaptain = userProfile && team.captain && userProfile.id === team.captain.id;

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title">{team.name}</h2>
            <Link to="/teams" className="btn btn-secondary">
              <i className="fas fa-arrow-left me-2"></i>Back to Teams
            </Link>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Captain:</div>
            <div className="col-md-9">
              {team.captain ? team.captain.display_name : 'No captain assigned'}
            </div>
          </div>
          
          {isTeamCaptain && (
            <div className="row mb-3">
              <div className="col-md-3 fw-bold">Invite Code:</div>
              <div className="col-md-9">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={team.invite_code || 'No invite code'} 
                    readOnly 
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(team.invite_code);
                      alert('Invite code copied to clipboard!');
                    }}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
                <small className="text-muted">
                  Share this code with others to invite them to your team.
                </small>
              </div>
            </div>
          )}
          
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Registrations:</div>
            <div className="col-md-9">
              {team.registrations ? 'Open' : 'Closed'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Team Members</h3>
          
          {team.members.length === 0 ? (
            <div className="alert alert-info">This team has no members yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Display Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {team.members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.user.username}</td>
                      <td>{member.display_name || '-'}</td>
                      <td>{member.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;