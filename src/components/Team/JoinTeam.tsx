import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { joinTeam } from '../../services/api';

const JoinTeam: React.FC = () => {
  const [inviteCode, setInviteCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await joinTeam(inviteCode);
      // Navigate back to teams list after joining
      navigate('/teams');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        'Failed to join team. Please check the invite code and try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title">Join a Team</h2>
              <Link to="/teams" className="btn btn-secondary">
                <i className="fas fa-arrow-left me-2"></i>Back to Teams
              </Link>
            </div>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inviteCode" className="form-label">Invite Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={handleChange}
                  required
                />
                <div className="form-text">
                  Enter the invite code provided by the team captain.
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;