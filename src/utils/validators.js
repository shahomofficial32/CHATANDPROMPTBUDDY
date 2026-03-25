// A simple heuristic dictionary to check if user input vaguely matches a category
const categoryKeywords = {
  writing: ['write', 'blog', 'essay', 'grammar', 'email', 'summarize', 'rewrite', 'headline', 'caption', 'pitch', 'paragraph', 'text'],
  study: ['explain', 'study', 'flashcard', 'math', 'history', 'compare', 'quiz', 'mnemonic', 'literature', 'science', 'experiment', 'learn'],
  business: ['agenda', 'swot', 'marketing', 'persona', 'value', 'competitor', 'sales', 'business', 'press', 'feedback', 'strategy', 'company'],
  coding: ['code', 'debug', 'function', 'optimize', 'regex', 'sql', 'database', 'test', 'api', 'css', 'javascript', 'python', 'react', 'html'],
  creative: ['story', 'character', 'poem', 'song', 'world', 'plot', 'dialogue', 'art', 'joke', 'roleplay', 'creative', 'imagine'],
  health: ['workout', 'meal', 'stretch', 'calorie', 'sleep', 'motivation', 'run', 'snack', 'mindfulness', 'hydration', 'health', 'fitness', 'gym'],
  career: ['resume', 'interview', 'cover letter', 'salary', 'linkedin', 'career', 'resignation', 'networking', 'skill', 'performance', 'job'],
  technology: ['tech', 'gadget', 'software', 'troubleshoot', 'cybersecurity', 'cloud', 'smart home', 'blockchain', 'future', 'history', 'app', 'device'],
  dailylife: ['recipe', 'travel', 'budget', 'gift', 'declutter', 'movie', 'time', 'hobby', 'plant', 'diy', 'home', 'life', 'routine']
};

export const validateCategoryMatch = (inputText, categoryId) => {
  // If no category was selected, bypass validation
  if (!categoryId) return true;

  const keywords = categoryKeywords[categoryId];
  if (!keywords) return true;

  const lowerInput = inputText.toLowerCase();
  
  // Check if at least one keyword associated with the category exists in the input
  const isMatch = keywords.some(keyword => lowerInput.includes(keyword));
  
  return isMatch;
};