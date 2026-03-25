import React, { useState } from 'react';
import { promptCategories } from '../utils/promptCategories';
import { Sparkles, ChevronRight, X, Zap } from 'lucide-react';

export default function PromptPanel({ onSelectPrompt }) {
  const [activeCategoryId, setActiveCategoryId] = useState(promptCategories[0].id);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [formData, setFormData] = useState({});

  const activeCategory = promptCategories.find(c => c.id === activeCategoryId);

  // The Brain: Finds everything inside [ ]
  const getPlaceholders = (text) => {
    const regex = /\[([^\]]+)\]/g;
    const matches = [...text.matchAll(regex)];
    return matches.map(match => match[1]);
  };

  // Opens the modal when a card is clicked
  const handleCardClick = (prompt) => {
    const placeholders = getPlaceholders(prompt.instruction);
    if (placeholders.length > 0) {
      setSelectedPrompt(prompt);
      setFormData({}); // Clear old inputs
    } else {
      // If no [ ], send directly to chat
      onSelectPrompt(prompt.instruction, activeCategory.id);
    }
  };

  const handleInputChange = (label, value) => {
    setFormData(prev => ({ ...prev, [label]: value }));
  };

  const handleFinalSubmit = () => {
    let finalInstruction = selectedPrompt.instruction;
    // Replace all [Label] with the user's input
    Object.keys(formData).forEach(label => {
      finalInstruction = finalInstruction.replace(`[${label}]`, formData[label]);
    });
    
    onSelectPrompt(finalInstruction, activeCategory.id);
    setSelectedPrompt(null); // Close modal
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-950 relative">
      {/* Header & Category Tabs */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prompt Library</h2>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 gap-2 scrollbar-hide">
          {promptCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategoryId === category.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700'}
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Prompts */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-24">
          {activeCategory?.prompts.map((prompt, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(prompt)}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-none cursor-pointer transition-all duration-200 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {prompt.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {prompt.instruction}
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-200">
                Configure prompt <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM INPUT MODAL */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPrompt.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details</p>
              </div>
              <button onClick={() => setSelectedPrompt(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Input Area */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              {getPlaceholders(selectedPrompt.instruction).map((label) => (
                <div key={label} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 ml-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all shadow-inner"
                  />
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={handleFinalSubmit}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap size={20} /> Use Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}