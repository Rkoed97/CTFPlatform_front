import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Profile/Profile'
import EditProfile from './components/Profile/EditProfile'
import TeamList from './components/Team/TeamList'
import TeamDetail from './components/Team/TeamDetail'
import CreateTeam from './components/Team/CreateTeam'
import JoinTeam from './components/Team/JoinTeam'
import ChallengeList from './components/Challenges/ChallengeList'
import Leaderboard from './components/Leaderboard/Leaderboard'
import NotFound from './components/Common/NotFound'
import ProtectedRoute from './components/Common/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" /> : <Register setIsAuthenticated={setIsAuthenticated} />
          } />
          <Route path="/profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/edit" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditProfile />
            </ProtectedRoute>
          } />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/teams/create" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateTeam />
            </ProtectedRoute>
          } />
          <Route path="/teams/join" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <JoinTeam />
            </ProtectedRoute>
          } />
          <Route path="/challenges" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChallengeList />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App