export const promptCategories = [
  {
    id: "writing",
    name: "Writing",
    prompts: [
      { title: "Blog Post Intro", instruction: "Write a catchy introduction for a blog post about [Topic]." },
      { title: "Grammar Check", instruction: "Check this text for grammar and spelling errors, and suggest improvements: [Paste Text]" },
      { title: "Email Draft", instruction: "Draft a professional email to [Recipient] regarding [Subject]." },
      { title: "Summarize Article", instruction: "Summarize the following article into 3 concise bullet points: [Paste Article]" },
      { title: "Rewrite for Clarity", instruction: "Rewrite this paragraph to make it clearer and more engaging: [Paste Text]" },
      { title: "Catchy Headline", instruction: "Generate 5 catchy headlines for an article about [Topic]." },
      { title: "Social Media Caption", instruction: "Write an engaging Instagram caption for a photo of [Subject]." },
      { title: "Persuasive Pitch", instruction: "Write a short persuasive pitch for [Product/Idea]." },
      { title: "Tone Adjustment", instruction: "Change the tone of this text to be more [Formal/Casual/Humorous]: [Paste Text]" },
      { title: "Conclusion Paragraph", instruction: "Write a strong concluding paragraph for an essay about [Topic]." }
    ]
  },
  {
    id: "study",
    name: "Study",
    prompts: [
      { title: "Explain Like I'm 5", instruction: "Explain the concept of [Topic] simply, as if I were a 5-year-old." },
      { title: "Study Plan", instruction: "Create a 7-day study schedule to prepare for a [Subject] exam." },
      { title: "Flashcard Generator", instruction: "Create 10 question-and-answer flashcards for [Topic]." },
      { title: "Math Problem Solver", instruction: "Explain step-by-step how to solve this math problem: [Insert Problem]" },
      { title: "Historical Event", instruction: "Give a brief overview of [Historical Event], including key dates and figures." },
      { title: "Concept Comparison", instruction: "Compare and contrast [Concept A] and [Concept B]." },
      { title: "Generate Quiz", instruction: "Create a multiple-choice quiz with 5 questions about [Topic]." },
      { title: "Mnemonic Device", instruction: "Create a mnemonic device to help me remember [List/Concept]." },
      { title: "Literature Theme", instruction: "Analyze the main themes in the book [Book Title]." },
      { title: "Scientific Method", instruction: "Help me design a simple experiment to test [Hypothesis]." }
    ]
  },
  {
    id: "business",
    name: "Business",
    prompts: [
      { title: "Meeting Agenda", instruction: "Draft an agenda for a 30-minute meeting about [Topic]." },
      { title: "SWOT Analysis", instruction: "Perform a SWOT analysis for a new business in the [Industry] sector." },
      { title: "Marketing Strategy", instruction: "Outline a basic digital marketing strategy for a [Product/Service]." },
      { title: "Customer Persona", instruction: "Create a detailed customer persona for a [Type of Business]." },
      { title: "Value Proposition", instruction: "Help me write a compelling value proposition for [Product/Service]." },
      { title: "Competitor Analysis", instruction: "What are the key factors to look for when analyzing competitors in [Industry]?" },
      { title: "Sales Script", instruction: "Write a cold-call sales script for selling [Product/Service]." },
      { title: "Business Name Ideas", instruction: "Generate 10 creative business names for a company that does [Activity]." },
      { title: "Press Release", instruction: "Draft a short press release announcing [New Product/Event]." },
      { title: "Feedback Request", instruction: "Write a polite email asking a client for feedback on our recent project." }
    ]
  },
  {
    id: "coding",
    name: "Coding",
    prompts: [
      { title: "Code Explanation", instruction: "Explain what this snippet of [Language] code does: [Paste Code]" },
      { title: "Debug Code", instruction: "Find and fix the error in this [Language] code: [Paste Code]" },
      { title: "Write Function", instruction: "Write a [Language] function that [Describe Action]." },
      { title: "Code Optimization", instruction: "How can I make this [Language] code more efficient? [Paste Code]" },
      { title: "Regex Generator", instruction: "Write a Regular Expression that matches [Specific Pattern]." },
      { title: "Database Query", instruction: "Write a SQL query to select [Data] from [Table] where [Condition]." },
      { title: "Unit Test Writer", instruction: "Write unit tests for this [Language] function: [Paste Code]" },
      { title: "API Fetch Example", instruction: "Show me an example of how to fetch data from an API using React and Axios." },
      { title: "CSS Styling", instruction: "Provide Tailwind CSS classes to create a [Describe UI Element]." },
      { title: "Concept: Promises", instruction: "Explain how Promises/Async Await works in JavaScript." }
    ]
  },
  {
    id: "creative",
    name: "Creative",
    prompts: [
      { title: "Story Prompt", instruction: "Give me a creative writing prompt about [Subject/Genre]." },
      { title: "Character Backstory", instruction: "Generate a detailed backstory for a character who is a [Profession/Role]." },
      { title: "Poem Generator", instruction: "Write a short poem about [Topic] in the style of [Author/Style]." },
      { title: "Song Lyrics", instruction: "Write a chorus and one verse for a song about [Topic]." },
      { title: "World Building", instruction: "Describe the political system of a fictional sci-fi planet." },
      { title: "Plot Twist Ideas", instruction: "Give me 3 unexpected plot twists for a story where [Brief Setup]." },
      { title: "Dialogue Generator", instruction: "Write a dialogue scene between two people arguing about [Topic]." },
      { title: "Art Prompt", instruction: "Describe a vivid scene for me to paint/draw featuring [Subject]." },
      { title: "Joke Writer", instruction: "Write a clean joke about [Topic]." },
      { title: "Roleplay Scenario", instruction: "Set up a roleplay scenario where I am a [Role] and you are a [Role]." }
    ]
  },
  {
    id: "health",
    name: "Health & Fitness",
    prompts: [
      { title: "Workout Routine", instruction: "Create a 30-minute bodyweight workout routine for beginners." },
      { title: "Meal Prep Ideas", instruction: "Suggest 5 healthy, high-protein lunch ideas for meal prep." },
      { title: "Stretching Guide", instruction: "List 5 essential stretches for someone who sits at a desk all day." },
      { title: "Calorie Estimate", instruction: "Estimate the calories and macros for a meal consisting of [Food Items]." },
      { title: "Sleep Hygiene", instruction: "Give me tips on how to improve my sleep quality." },
      { title: "Motivation Boost", instruction: "Write a short, motivating paragraph to get me to the gym today." },
      { title: "Running Plan", instruction: "Create a 4-week plan to help me run my first 5K." },
      { title: "Healthy Snack Alternative", instruction: "What is a healthy alternative to eating [Junk Food]?" },
      { title: "Mindfulness Exercise", instruction: "Guide me through a 2-minute breathing or mindfulness exercise." },
      { title: "Hydration Tips", instruction: "Give me creative ways to ensure I drink enough water daily." }
    ]
  },
  {
    id: "career",
    name: "Career",
    prompts: [
      { title: "Resume Summary", instruction: "Write a professional summary for a resume of a [Job Title]." },
      { title: "Interview Prep", instruction: "What are 5 common interview questions for a [Job Title] role, and how should I answer them?" },
      { title: "Cover Letter", instruction: "Draft a basic cover letter applying for a [Job Title] position at [Company]." },
      { title: "Salary Negotiation", instruction: "Give me a script for negotiating a higher salary after a job offer." },
      { title: "LinkedIn Headline", instruction: "Generate 3 professional LinkedIn headlines for a [Job Title]." },
      { title: "Career Change", instruction: "What skills are transferable from [Current Job] to [Desired Job]?" },
      { title: "Resignation Letter", instruction: "Write a polite resignation letter giving two weeks' notice." },
      { title: "Networking Email", instruction: "Draft a cold outreach message on LinkedIn to connect with someone in [Industry]." },
      { title: "Skill Development", instruction: "What are the top 3 skills I need to learn to become a [Job Title]?" },
      { title: "Performance Review", instruction: "Help me write a self-evaluation for my annual performance review as a [Job Title]." }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    prompts: [
      { title: "Tech Trend", instruction: "Explain the current trend of [Tech Trend, e.g., Web3, AI] and its future impact." },
      { title: "Gadget Comparison", instruction: "Compare [Device A] and [Device B] for a potential buyer." },
      { title: "Software Suggestion", instruction: "Recommend 3 software tools for [Task, e.g., Video Editing, Project Management]." },
      { title: "Troubleshooting", instruction: "How do I troubleshoot a device that is [Describe Problem]?" },
      { title: "Cybersecurity Basics", instruction: "What are 5 basic steps to secure my personal online accounts?" },
      { title: "Cloud Computing", instruction: "Explain the difference between IaaS, PaaS, and SaaS." },
      { title: "Smart Home Setup", instruction: "What is a good beginner setup for a smart home system?" },
      { title: "Explain Blockchain", instruction: "Explain how blockchain technology works without using overly technical jargon." },
      { title: "Future of Tech", instruction: "What might the technology landscape look like in 10 years?" },
      { title: "Tech History", instruction: "Give a brief history of the development of the [Invention, e.g., Smartphone]." }
    ]
  },
  {
    id: "dailylife",
    name: "Daily Life",
    prompts: [
      { title: "Recipe Idea", instruction: "Give me a recipe using these ingredients: [List Ingredients]." },
      { title: "Travel Itinerary", instruction: "Create a 3-day travel itinerary for a trip to [City/Location]." },
      { title: "Budgeting Tips", instruction: "What is the 50/30/20 rule in personal budgeting?" },
      { title: "Gift Idea", instruction: "Suggest 5 gift ideas for a [Age]-year-old who likes [Interests]." },
      { title: "Decluttering Plan", instruction: "Create a step-by-step plan for decluttering my [Room/Area]." },
      { title: "Movie Recommendation", instruction: "Recommend 3 movies similar to [Movie Title]." },
      { title: "Time Management", instruction: "Explain the Pomodoro technique and how to implement it." },
      { title: "Hobby Suggestion", instruction: "Suggest a low-cost hobby I can pick up indoors." },
      { title: "Plant Care", instruction: "How do I properly care for a [Plant Name]?" },
      { title: "DIY Project", instruction: "Give me a simple weekend DIY project idea for home improvement." }
    ]
  }
];