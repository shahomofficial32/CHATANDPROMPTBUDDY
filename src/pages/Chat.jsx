import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatLayout from '../components/ChatLayout';
import PromptPanel from '../components/PromptPanel';
import MessageBubble from '../components/MessageBubble';
import { Send, AlertTriangle, Loader2 } from 'lucide-react';
import { getGeminiResponseStream, generateChatTitle } from '../api/ai';
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
  
  // FIXED: A secret tracker to prevent the screen from wiping when a new chat URL is created
  const isLocalSubmission = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const loadMessages = async () => {
      // FIXED: If we just created the chat locally, don't wipe the screen!
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
        isLocalSubmission.current = true; // Tell React not to wipe our screen!
        activeSessionId = await createChatSession(currentUser.uid, "New Conversation");
        navigate(`/chat/${activeSessionId}`, { replace: true });
        
        generateChatTitle(textToProcess).then(generatedTitle => {
          updateSessionTitle(activeSessionId, generatedTitle);
        });
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
      alert("Error processing message. Please check your connection or API keys.");
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
      <div className="flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto pb-32">
          {isFetchingHistory ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <PromptPanel onSelectPrompt={handleSelectPrompt} />
          ) : (
            <div className="flex flex-col">
              {messages.map((msg) => (
                <MessageBubble key={msg.id || uuidv4()} message={msg} onToggleFavorite={toggleFavorite} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {showWarning && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-10">
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200 text-sm font-medium">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>This input may not match the selected category.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setShowWarning(false); setPendingSubmit(false); }} className="px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-md transition-colors">Switch</button>
                <button onClick={handleSubmit} className="px-3 py-1.5 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors shadow-sm">Continue</button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className={`relative flex items-end gap-2 bg-white dark:bg-gray-800 border ${showWarning ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-500/20' : 'border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500/50'} rounded-2xl shadow-lg p-2 transition-all`}>
              <textarea
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); if (showWarning) setShowWarning(false); }}
                disabled={isLoading}
                placeholder="Ask anything or select a prompt from above..."
                className="w-full max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 text-base disabled:opacity-50"
                rows="1"
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              />
              <button type="submit" disabled={!inputText.trim() || isLoading} className={`p-3 text-white rounded-xl transition-colors shrink-0 mb-0.5 mr-0.5 ${showWarning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'} disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed`}>
                {isLoading ? <Loader2 size={18} className="animate-spin translate-x-[1px] translate-y-[-1px]" /> : <Send size={18} className="translate-x-[1px] translate-y-[-1px]" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}