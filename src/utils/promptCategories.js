export const promptCategories = [
  {
    id: "writing",
    name: "Writing",
    prompts: [
      { 
        title: "Blog Post Intro", 
        instruction: "Act as an expert content strategist. Write a high-engagement introduction for a blog post about [Specific Topic]. The target audience is [Audience], and the desired tone is [Tone: e.g., Authoritative/Witty/Empathetic]. Start with a [Hook Type: e.g., Surprising Statistic/Provocative Question/Personal Anecdote] and ensure the transition to the main value proposition is seamless. Goal length: [Word Count] words." 
      },
      { 
        title: "Grammar & Style Specialist", 
        instruction: "Conduct a comprehensive linguistic audit of the following text: [Paste Text]. Beyond fixing grammar and spelling, please improve the [Flow/Cadence], eliminate [Passive Voice/Jargon], and suggest 3 specific ways to make the writing more [Persuasive/Concise/Professional]. Provide a 'Before' and 'After' comparison for key changes." 
      },
      { 
        title: "Executive Email Draft", 
        instruction: "Draft a professional email to [Recipient Name/Role] regarding [Specific Subject]. The primary objective is to [Call to Action: e.g., Schedule a Meeting/Request Approval/Provide Status Update]. Maintain a [Direct/Soft/Formal] tone and include a brief mention of [Context/Previous Interaction] to build rapport. End with a clear, low-friction next step." 
      },
      { 
        title: "Deep-Dive Summary", 
        instruction: "Analyze the provided article: [Paste Article]. Distill the core thesis into 3 high-impact bullet points. For each point, provide a 'Why it matters' explanation for [Specific Stakeholder/Persona]. Ensure the summary captures the [Nuance/Data Points/Controversial Angles] mentioned in the original text." 
      },
      { 
        title: "Psychological Headline Generator", 
        instruction: "Generate 10 high-CTR (Click-Through Rate) headlines for an article about [Topic]. Use different psychological triggers such as [Triggers: e.g., Curiosity/Urgency/Social Proof/Benefit-Driven]. The headlines should be optimized for [Platform: e.g., LinkedIn/Twitter/Search Engines] and target [Specific Demographic]." 
      }
    ]
  },
  {
    id: "study",
    name: "Study",
    prompts: [
      { 
        title: "Feynman Technique (ELI5)", 
        instruction: "Explain the complex concept of [Topic] using the Feynman Technique. Break it down for a [Level: e.g., 5-year-old/Non-expert/High Schooler]. Use a vivid [Analogy/Metaphor] related to [Familiar Subject] to clarify the most difficult part. Avoid all technical jargon unless you define it first using simple language." 
      },
      { 
        title: "Adaptive Study Architect", 
        instruction: "Create a data-driven 7-day study schedule for a [Subject] exam. I have [Number] hours per day available. Focus [Percentage]% of the time on [Weakest Topic 1] and [Weakest Topic 2]. Include specific [Active Recall/Spaced Repetition] activities for each session and suggest a 'Self-Test' format for the final day." 
      },
      { 
        title: "Socratic Flashcard Set", 
        instruction: "Generate 15 high-quality flashcards for [Detailed Topic]. Format each card as: 'Question: [Probing Question]' and 'Answer: [Detailed yet concise explanation]'. Ensure the cards cover [Foundational Concepts], [Edge Cases], and [Practical Applications]. Include 3 'Challenge' cards that require connecting [Topic] to [Related Field]." 
      },
      { 
        title: "Step-by-Step Logic Tutor", 
        instruction: "Solve the following [Math/Logic/Science] problem: [Insert Problem]. Do not just provide the answer. Act as a patient tutor and walk through the [First Principles/Theorems] required. Highlight common [Mistakes/Pitfalls] students make at step [Specific Step Number] and provide a similar 'Practice Problem' to test my understanding." 
      }
    ]
  },
  {
    id: "business",
    name: "Business",
    prompts: [
      { 
        title: "Strategic Meeting Agenda", 
        instruction: "Design a high-productivity agenda for a [Duration]-minute meeting regarding [Project/Topic]. Include a 'Desired Outcome' for the session. Break the time into segments for [Information Sharing], [Ideation], and [Decision Making]. Assign a [Role/Persona] responsible for each section and include 3 'Pre-read' questions to send to attendees." 
      },
      { 
        title: "Comprehensive SWOT Analysis", 
        instruction: "Perform a deep-dive SWOT analysis for a [Company Type/Product] operating in the [Specific Industry]. Identify 4 items for each category. For the 'Threats' section, consider [Economic/Technological/Regulatory] factors specifically. Conclude with 2 'Strategic Moves' that leverage a Strength to neutralize a Threat." 
      },
      { 
        title: "GTM (Go-To-Market) Strategy", 
        instruction: "Outline a 90-day digital marketing strategy for [Product/Service]. The primary goal is [Goal: e.g., Lead Gen/Brand Awareness]. Define the [Primary Channel: e.g., SEO/Paid Social/Email], the [Key Metric for Success], and a [Budget Allocation] strategy. Include a specific tactic for overcoming the [Common Industry Objection]." 
      },
      { 
        title: "Hyper-Specific Customer Persona", 
        instruction: "Create a detailed 'Buyer Persona' for [Type of Business]. Include [Demographics], [Psychographics], and their 'Day in the Life'. Specifically focus on their [Pain Points/Fears] and their [Desired Gains/Aspirations]. Give this persona a name and list 3 specific 'Value Hooks' that would trigger them to purchase [Product Name]." 
      }
    ]
  },
  {
    id: "coding",
    name: "Coding",
    prompts: [
      { 
        title: "Architectural Code Breakdown", 
        instruction: "Explain the logic and flow of this [Language/Framework] snippet: [Paste Code]. Identify the [Design Patterns] used, explain how it handles [Error Handling/Edge Cases], and describe the Big O [Time/Space Complexity]. Suggest how this code interacts with [Related System: e.g., a REST API/Redux Store]." 
      },
      { 
        title: "Senior Dev Debugger", 
        instruction: "Identify the bug in this [Language] code: [Paste Code]. I am receiving the error: [Paste Error Message]. Explain *why* the error occurred at a system level, provide the corrected code, and suggest a [Unit Test/Best Practice] to prevent this regression in the future. Focus on [Performance/Readability] in your fix." 
      },
      { 
        title: "Scalable Function Writer", 
        instruction: "Write a [Language] function that [Detailed Action]. Constraints: [Constraints: e.g., Must use Recursion/No external libraries/Time complexity < O(n^2)]. Include [JSDoc/Type Hints], comprehensive [Input Validation], and 3 test cases: [Happy Path], [Empty Input], and [Invalid Data Type]." 
      },
      { 
        title: "Performance Optimization Audit", 
        instruction: "Analyze this [Language] code for performance bottlenecks: [Paste Code]. Suggest 3 optimizations to reduce [Memory Usage/CPU Cycles/Network Requests]. For each suggestion, explain the trade-off regarding [Code Maintainability/Readability]. Provide the refactored 'High-Performance' version." 
      }
    ]
  },
  {
    id: "creative",
    name: "Creative",
    prompts: [
      { 
        title: "Multi-Dimensional Story Prompt", 
        instruction: "Generate a high-concept [Genre] story prompt centered on [Object/Concept]. The setting should be [Setting: e.g., Dystopian Underwater City] and the central conflict must involve a [Moral Dilemma]. Include a 'Hook' for the first page and a [Subversion of a Common Trope] to keep it fresh." 
      },
      { 
        title: "Psychological Character Dossier", 
        instruction: "Create a 3-dimensional character backstory for a [Profession/Role]. Define their [Internal Want] vs. their [External Need]. Include a pivotal 'Ghost' (a traumatic or defining past event) that influences their [Flaw/Strength]. Detail their [Speech Patterns/Mannerisms] and how they react under [Specific Stressor]." 
      },
      { 
        title: "Stylistic Verse Generator", 
        instruction: "Write a poem about [Topic] in the distinct style of [Author/Movement: e.g., Sylvia Plath/Beat Generation]. Use [Specific Literary Device: e.g., Enjambment/Consonance] and focus on imagery related to [Sensory Detail: e.g., Metallic smells/Cold textures]. Ensure the rhythm mirrors the [Emotional State: e.g., Anxious/Peaceful] of the piece." 
      }
    ]
  },
  {
    id: "health",
    name: "Health & Fitness",
    prompts: [
      { 
        title: "Precision Workout Architect", 
        instruction: "Act as a world-class personal trainer. Create a [Duration]-minute [Bodyweight/Gym-based] workout routine for a [Fitness Level: e.g., Beginner/Athlete] whose primary goal is [Goal: e.g., Hypertrophy/Explosive Power]. Focus on the [Muscle Group] and include a specific [Warm-up] and [Cool-down] protocol. Provide 'Scaling Options' for every exercise." 
      },
      { 
        title: "Nutritional Meal Plan", 
        instruction: "Act as a certified nutritionist. Suggest 5 healthy, high-protein meal ideas for [Meal Type: e.g., Lunch/Dinner] based on the following dietary restriction: [Restriction: e.g., Vegan/Gluten-Free]. For each meal, provide an estimate of [Calories/Macros] and a 'Time-Saving Hack' for busy professionals." 
      },
      { 
        title: "Sleep Hygiene Protocol", 
        instruction: "Develop a comprehensive sleep optimization plan for someone who struggles with [Specific Issue: e.g., Racing thoughts at night/Waking up at 3 AM]. Include 3 [Behavioral Adjustments], 2 [Environmental Changes to Bedroom], and a [10-minute Pre-Sleep Ritual]. Base the advice on the latest [Circadian Rhythm] research." 
      }
    ]
  },
  {
    id: "career",
    name: "Career",
    prompts: [
      { 
        title: "ATS-Optimized Resume Summary", 
        instruction: "Write a high-impact professional summary for a [Job Title] with [Number] years of experience. Incorporate keywords like [Keywords 1, 2, 3] and focus on [Specific Achievement: e.g., Increased revenue by 20%]. Tailor the language to appeal to [Company Type: e.g., Fast-paced Tech Startup/Fortune 500 Firm]." 
      },
      { 
        title: "Behavioral Interview Simulation", 
        instruction: "Prepare me for a [Job Title] interview at [Company]. Generate 5 behavioral questions based on the [STAR Method]. For each question, provide a 'Winning Response Strategy' and a list of 'Red Flags' to avoid. Focus specifically on the [Core Competency: e.g., Leadership/Technical Depth/Conflict Resolution] required for this role." 
      },
      { 
        title: "Salary Negotiation Script", 
        instruction: "Draft a script for a salary negotiation for the role of [Job Title]. The current offer is [Current Offer] but my target is [Target Offer] based on [Market Data/Specific Value Added]. Include 3 'Pivot Phrases' to use if the Recruiter mentions [Common Objection: e.g., Budget Caps/Internal Equity]." 
      }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    prompts: [
      { 
        title: "Emerging Tech Impact Analysis", 
        instruction: "Analyze the current state of [Tech Trend: e.g., Generative AI/Quantum Computing] and its predicted impact on the [Specific Industry] over the next [Number] years. Discuss the [Top 3 Ethical Concerns] and identify the [Winner/Loser] companies in this space. Conclude with a 'Future-Proofing' strategy for professionals in this field." 
      },
      { 
        title: "IT Troubleshooting Guide", 
        instruction: "Act as a Senior IT Support Specialist. Provide a step-by-step troubleshooting guide for a [Device/Software] that is experiencing [Describe Problem]. Organize the guide from [Simplest Fix] to [Advanced Solution]. Include 3 'Pro-tips' to prevent this issue from recurring." 
      },
      { 
        title: "Cybersecurity Audit", 
        instruction: "Perform a 'Personal Digital Security Audit'. Evaluate the risks associated with [Current Activity: e.g., Working from Public Wi-Fi/Managing 50+ accounts]. Provide 5 actionable steps to secure [Platform: e.g., Mobile Devices/Social Media/Banking] using [Specific Tools: e.g., MFA/Password Managers/VPNs]." 
      }
    ]
  },
  {
    id: "dailylife",
    name: "Daily Life",
    prompts: [
      { 
        title: "Culinary Ingredient Challenge", 
        instruction: "Act as a Michelin-star chef. Create a gourmet [Cuisine Type] recipe using only these ingredients: [List Ingredients]. You may use standard pantry staples like [Oil/Salt/Spices]. Provide a [Step-by-step Instruction] set and a 'Professional Plating Tip' to make the dish look high-end." 
      },
      { 
        title: "Hyper-Curated Travel Itinerary", 
        instruction: "Design a [Number]-day travel itinerary for [City/Location] for a [Traveler Type: e.g., Couple/Solo/Family]. The primary interest is [Interest: e.g., Local Architecture/Hidden Food Gems/Adventure Sports]. Include [Budget Breakdown], 'Best Time of Day' to visit each spot, and 1 'Local Secret' that tourists usually miss." 
      },
      { 
        title: "Personal Finance Architect", 
        instruction: "Explain the [Financial Strategy: e.g., 50/30/20 Rule/Fire Movement] for someone with a monthly income of [Amount]. Create a sample [Budget Spreadsheet Structure] and identify 3 [Common Financial Leaks] for this income bracket. Suggest a [Low-risk Investment] strategy for their first [Timeframe]." 
      }
    ]
  }
];