import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeam } from '../../services/api';

interface FormData {
  name: string;
}

const CreateTeam: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createTeam(formData);
      // Navigate to the newly created team's detail page
      navigate(`/teams/${response.data.id}`);
    } catch (err: any) {
      setError(
        err.response?.data?.name || 
        err.response?.data?.non_field_errors || 
        'Failed to create team. Please try again.'
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
              <h2 className="card-title">Create a New Team</h2>
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
                <label htmlFor="name" className="form-label">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <div className="form-text">
                  Choose a unique name for your team.
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;