import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  const { currentUser } = useAuth();

  // This protects our chat page so only logged-in users can see it
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/chat" replace /> : <Login />} 
      />
      
      {/* Route for a brand new chat */}
      <Route 
        path="/chat" 
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        } 
      />

      {/* Route for an existing chat session */}
      <Route 
        path="/chat/:sessionId" 
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        } 
      />

      {/* Default fallback route */}
      <Route path="*" element={<Navigate to={currentUser ? "/chat" : "/login"} replace />} />
    </Routes>
  );
}

export default App;