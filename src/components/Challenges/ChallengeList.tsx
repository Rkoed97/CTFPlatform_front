import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getChallenges, submitFlag } from '../../services/api';

interface Challenge {
  id: number;
  name: string;
  description: string;
  category: string;
  current_score: number;
  solve_count: number;
}

interface SubmitResult {
  status: 'correct' | 'incorrect' | 'error';
  points?: number;
  message?: string;
}

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await getChallenges();
        setChallenges(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load challenges. Please try again later.');
        setLoading(false);
        console.error('Error fetching challenges:', err);
      }
    };

    fetchChallenges();
  }, []);

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setFlagInput('');
    setSubmitResult(null);
  };

  const handleFlagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFlagInput(e.target.value);
  };

  const handleSubmitFlag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChallenge || !flagInput.trim()) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await submitFlag(selectedChallenge.id, flagInput);
      setSubmitResult({
        status: response.data.status,
        points: response.data.points,
      });
      
      // If the submission was correct, refresh the challenges to update scores
      if (response.data.status === 'correct') {
        const refreshResponse = await getChallenges();
        setChallenges(refreshResponse.data);
      }
    } catch (err) {
      setSubmitResult({
        status: 'error',
        message: 'Failed to submit flag. Please try again.',
      });
      console.error('Error submitting flag:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading challenges...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Challenges</h2>
      
      {challenges.length === 0 ? (
        <div className="alert alert-info">
          No challenges available at the moment. Check back later!
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              {challenges.map((challenge) => (
                <button
                  key={challenge.id}
                  className={`list-group-item list-group-item-action ${
                    selectedChallenge && selectedChallenge.id === challenge.id ? 'active' : ''
                  }`}
                  onClick={() => handleChallengeSelect(challenge)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{challenge.name}</h5>
                    <span className="badge bg-primary">{challenge.current_score} pts</span>
                  </div>
                  <p className="mb-1">{challenge.category}</p>
                  <small>Solves: {challenge.solve_count}</small>
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-md-8">
            {selectedChallenge ? (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{selectedChallenge.name}</h3>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-secondary">{selectedChallenge.category}</span>
                    <span className="badge bg-primary">{selectedChallenge.current_score} points</span>
                  </div>
                  
                  <div className="card-text mb-4">
                    <p>{selectedChallenge.description}</p>
                  </div>
                  
                  <form onSubmit={handleSubmitFlag}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter flag"
                        value={flagInput}
                        onChange={handleFlagChange}
                        disabled={submitting}
                        required
                      />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting...' : 'Submit Flag'}
                      </button>
                    </div>
                  </form>
                  
                  {submitResult && (
                    <div className={`alert ${
                      submitResult.status === 'correct' ? 'alert-success' : 
                      submitResult.status === 'incorrect' ? 'alert-danger' : 
                      'alert-warning'
                    }`}>
                      {submitResult.status === 'correct' ? (
                        <>
                          <i className="fas fa-check-circle me-2"></i>
                          Correct! You earned {submitResult.points} points.
                        </>
                      ) : submitResult.status === 'incorrect' ? (
                        <>
                          <i className="fas fa-times-circle me-2"></i>
                          Incorrect flag. Try again!
                        </>
                      ) : (
                        <>
                          <i className="fas fa-exclamation-circle me-2"></i>
                          {submitResult.message}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body text-center">
                  <h3 className="card-title">Select a Challenge</h3>
                  <p className="card-text">
                    Choose a challenge from the list to view details and submit a flag.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;