import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../services/api';

interface Member {
  id: number;
  display_name: string;
  score: number;
}

interface Captain {
  display_name: string;
}

interface Team {
  id: number;
  name: string;
  captain?: Captain;
  members: Member[];
  score?: number;
}

const Leaderboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();
        setTeams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Leaderboard</h2>
      
      {teams.length === 0 ? (
        <div className="alert alert-info">
          No teams on the leaderboard yet. Be the first to score points!
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team</th>
                    <th scope="col">Captain</th>
                    <th scope="col">Members</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{team.name}</td>
                      <td>{team.captain?.display_name || 'No captain'}</td>
                      <td>{team.members.length}</td>
                      <td>
                        <span className="badge bg-primary">{calculateTeamScore(team)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate team score
const calculateTeamScore = (team: Team): number => {
  // If the team has a score property, use it
  if (team.score !== undefined) {
    return team.score;
  }
  
  // Otherwise, calculate from members
  return team.members.reduce((total, member) => total + member.score, 0);
};

export default Leaderboard;