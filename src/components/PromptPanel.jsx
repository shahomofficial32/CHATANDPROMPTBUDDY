import React, { useState } from 'react';
import { promptCategories } from '../utils/promptCategories';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function PromptPanel({ onSelectPrompt }) {
  const [activeCategoryId, setActiveCategoryId] = useState(promptCategories[0].id);
  const activeCategory = promptCategories.find(c => c.id === activeCategoryId);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-950">
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

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-24">
          {activeCategory?.prompts.map((prompt, index) => (
            <div 
              key={index}
              onClick={() => onSelectPrompt(prompt.instruction, activeCategory.id)}
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
                Use this prompt <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}