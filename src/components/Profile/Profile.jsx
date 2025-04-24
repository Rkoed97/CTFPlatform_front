import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div className="alert alert-warning">Profile not found.</div>;
  }

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title">Profile</h2>
              <Link to="/profile/edit" className="btn btn-primary">
                <i className="fas fa-edit me-2"></i>Edit Profile
              </Link>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Username:</div>
              <div className="col-md-8">{profile.user.username}</div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Display Name:</div>
              <div className="col-md-8">{profile.display_name || 'Not set'}</div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Email:</div>
              <div className="col-md-8">{profile.user.email}</div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Bio:</div>
              <div className="col-md-8">{profile.bio || 'No bio provided'}</div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Score:</div>
              <div className="col-md-8">{profile.score}</div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4 fw-bold">Team:</div>
              <div className="col-md-8">
                {profile.team ? (
                  <Link to={`/teams/${profile.team}`}>View Team</Link>
                ) : (
                  <div>
                    <span className="text-muted">No team</span>
                    <div className="mt-2">
                      <Link to="/teams/create" className="btn btn-sm btn-outline-primary me-2">
                        Create Team
                      </Link>
                      <Link to="/teams/join" className="btn btn-sm btn-outline-secondary">
                        Join Team
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;