import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatLayout from '../components/ChatLayout';
import PromptPanel from '../components/PromptPanel';
import MessageBubble from '../components/MessageBubble';
import { Send, AlertTriangle, Loader2 } from 'lucide-react';
import { getGeminiResponseStream } from '../api/ai'; // Removed generateChatTitle to save quota
import { validateCategoryMatch } from '../utils/validators';
import { 
  createChatSession, 
  addChatMessage, 
  getChatMessages, 
  updateSessionTitle 
} from '../firebase/db';
import { v4 as uuidv4 } from 'uuid';

export default function Chat() {
  const { currentUser } = useAuth();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const messagesEndRef = useRef(null);
  const isLocalSubmission = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const loadMessages = async () => {
      if (isLocalSubmission.current) {
        isLocalSubmission.current = false;
        return; 
      }
      if (sessionId) {
        setIsFetchingHistory(true);
        const history = await getChatMessages(sessionId);
        setMessages(history);
        setIsFetchingHistory(false);
      } else {
        setMessages([]); 
      }
    };
    loadMessages();
  }, [sessionId]);

  const handleSelectPrompt = (instruction, categoryId) => {
    setInputText(instruction);
    setSelectedCategoryId(categoryId);
    setShowWarning(false);
  };

  const processMessage = async (textToProcess) => {
    const userMessage = { text: textToProcess, role: 'user', isFavorite: false };
    const tempUserMsgId = uuidv4();
    
    setMessages(prev => [...prev, { ...userMessage, id: tempUserMsgId }]);
    setInputText("");
    setSelectedCategoryId(null);
    setIsLoading(true); 

    try {
      let activeSessionId = sessionId;

      if (!activeSessionId) {
        isLocalSubmission.current = true;

        // LOCAL TITLE GENERATION (Saves 1 API Call per new chat)
        const localTitle = textToProcess.length > 40 
          ? textToProcess.substring(0, 40).trim() + "..." 
          : textToProcess.trim();

        // Create session with the trimmed text as the title
        activeSessionId = await createChatSession(currentUser.uid, localTitle);
        navigate(`/chat/${activeSessionId}`, { replace: true });
        
        // Removed the API-based generateChatTitle call here to preserve quota
      }

      await addChatMessage(activeSessionId, userMessage);
      
      const aiMessageId = uuidv4();
      setMessages(prev => [...prev, { id: aiMessageId, text: '', role: 'assistant', isFavorite: false }]);
      setIsLoading(false); 

      const stream = await getGeminiResponseStream(messages, textToProcess);
      let fullResponseText = "";

      for await (const chunk of stream) {
        fullResponseText += chunk.text;
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: fullResponseText } : msg
          )
        );
      }

      const finalAiMessage = { text: fullResponseText, role: 'assistant', isFavorite: false };
      await addChatMessage(activeSessionId, finalAiMessage);

    } catch (error) {
      console.error(error);
      alert("Error processing message. Your API quota might be exhausted for now.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const isMatch = validateCategoryMatch(inputText, selectedCategoryId);
    
    if (!isMatch && !pendingSubmit) {
      setShowWarning(true);
      setPendingSubmit(true);
      return; 
    }

    setShowWarning(false);
    setPendingSubmit(false);
    processMessage(inputText);
  };

  const toggleFavorite = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isFavorite: !msg.isFavorite } : msg
    ));
  };

  return (
    <ChatLayout>
      <div className="flex flex-col h-full w-full relative overflow-hidden bg-white dark:bg-gray-950">
        
        {/* Scrollable Message Area */}
        <div className="flex-1 overflow-y-auto pt-4 pb-40 px-4 scrollbar-hide">
          {isFetchingHistory ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <PromptPanel onSelectPrompt={handleSelectPrompt} />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              {messages.map((msg) => (
                <MessageBubble key={msg.id || uuidv4()} message={msg} onToggleFavorite={toggleFavorite} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Warning Toast */}
        {showWarning && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-20">
            <div className="bg-amber-50 dark:bg-amber-900/80 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 backdrop-blur-md">
              <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200 text-sm font-medium">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>This message doesn't fit the selected category. Continue?</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button onClick={() => { setShowWarning(false); setPendingSubmit(false); }} className="px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-xl shadow-lg">Continue</button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area - Pinned to bottom with safe area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:pb-10 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-gray-950 dark:via-gray-950/95 z-10">
          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={handleSubmit} 
              className={`relative flex items-end gap-2 bg-white dark:bg-gray-800 border ${
                showWarning ? 'border-amber-400 ring-4 ring-amber-500/10' : 'border-gray-200 dark:border-gray-700 focus-within:ring-4 focus-within:ring-indigo-500/10'
              } rounded-2xl shadow-2xl p-1.5 transition-all`}
            >
              <textarea
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); if (showWarning) setShowWarning(false); }}
                disabled={isLoading}
                placeholder="Type a message..."
                className="w-full max-h-40 min-h-[48px] bg-transparent border-none focus:ring-0 resize-none px-3 py-3 text-gray-900 dark:text-white text-base"
                rows="1"
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              />
              <button 
                type="submit" 
                disabled={!inputText.trim() || isLoading} 
                className="p-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 transition-all shrink-0 shadow-lg shadow-indigo-500/20"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}