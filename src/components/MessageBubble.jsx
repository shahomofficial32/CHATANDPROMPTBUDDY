import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Star } from 'lucide-react';

export default function MessageBubble({ message, onToggleFavorite }) {
  const { currentUser } = useAuth();
  const isAI = message.role === 'assistant';

  return (
    <div className={`px-4 py-6 ${isAI ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-950'}`}>
      <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
        
        <div className="shrink-0">
          {isAI ? (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          ) : (
            <img 
              src={currentUser?.photoURL || "https://via.placeholder.com/40"} 
              alt="User" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
            />
          )}
        </div>

        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {isAI ? 'Prompt Buddy' : (currentUser?.displayName || 'You')}
            </span>
            
            {isAI && onToggleFavorite && (
              <button 
                onClick={() => onToggleFavorite(message.id)}
                className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${message.isFavorite ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}
                title="Favorite this response"
              >
                <Star size={18} fill={message.isFavorite ? "currentColor" : "none"} />
              </button>
            )}
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {/* FIXED: Show text, or show a pulsing loading state! */}
            {message.text ? (
              message.text
            ) : (
              <span className="text-indigo-500 animate-pulse font-medium">Generating response...</span>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}