import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getUserSessions, deleteChatSession } from '../firebase/db';
import { 
  Plus, MessageSquare, LogOut, Sun, Moon, 
  Trash2, Loader2
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser, logoutUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { sessionId } = useParams(); 
  
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      if (currentUser) {
        setIsLoading(true);
        const userSessions = await getUserSessions(currentUser.uid);
        setSessions(userSessions);
        setIsLoading(false);
      }
    };
    loadSessions();
  }, [currentUser]);

  const handleNewChat = async () => {
    if (!currentUser) return;
    try {
      navigate('/chat');
      if (window.innerWidth < 1024) setIsOpen(false);
    } catch (error) {
      console.error("Failed to start new chat", error);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this chat?")) {
      await deleteChatSession(id);
      setSessions(sessions.filter(s => s.id !== id));
      if (sessionId === id) navigate('/chat');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 
        bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-sm font-medium"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-hide">
          <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Recent Chats
          </p>
          
          {isLoading ? (
            <div className="flex justify-center p-4 text-indigo-500">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="px-3 text-sm text-gray-400 dark:text-gray-500 italic">No recent chats.</p>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => {
                  navigate(`/chat/${session.id}`);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`group w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer
                  ${sessionId === session.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={16} className="shrink-0 opacity-70" />
                  <span className="truncate">{session.title}</span>
                </div>
                
                <button 
                  onClick={(e) => handleDelete(e, session.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded"
                  title="Delete Chat"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </button>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <img 
                src={currentUser?.photoURL || "https://via.placeholder.com/40"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 shrink-0"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {currentUser?.displayName || "User"}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}