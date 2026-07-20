import { Assignment, VideoLecture, ReadingMaterial, Task, StudySession, UserProfile } from './types';

export const initialUserProfile: UserProfile = {
  name: 'Kate',
  email: 'kate.bharath@gmail.com',
  progress: 70,
  weeklyTarget: 10,
  currentCompleted: 7,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVQKb7sa9pQxIA1SmYatKuEyCwx7LDIPRNNXNkhEqHp6sr1fG4vZwaclB1Cgy4ivE7zQHS-gp9psqxLKXlF2H4UiCQ5rc0tP5vfgLIO17S3nxQg6qEOjAc0lKIi5tFLHfnesWz77SL7NMKog2OZJnxlOabADX85c8ZFewpTgeoQ0wCaRaUX8rRalQORsqy2x1nXgnBICiNex9talZbFvBmyxhMcKLYVOibtOcpF_WIA8qxJVQM7OKuFvPjC84H1ZHwGivHI_KoIwk5',
};

export const initialAssignments: Assignment[] = [
  {
    id: '1',
    title: 'English lesson 2',
    course: 'English',
    type: 'Question & Answer',
    status: 'new',
    progress: 0,
    dueDate: '20th Jan 2020',
    iconName: 'atm',
    details: 'This lesson covers Advanced Sentence Structure, Clause analysis, and identifying compound-complex configurations. Complete the questions below to test your understanding.',
    questions: [
      {
        id: 'q1',
        text: 'Identify the independent clause: "Although she was tired, she completed her advanced readings because the exam was tomorrow."',
        type: 'mcq',
        options: [
          'Although she was tired',
          'she completed her advanced readings',
          'because the exam was tomorrow',
          'was tomorrow'
        ],
        correctAnswer: 'she completed her advanced readings'
      },
      {
        id: 'q2',
        text: 'What type of sentence is: "The bell rang, and the students packed their notebooks, but the teacher continued writing on the chalkboard."',
        type: 'mcq',
        options: [
          'Simple sentence',
          'Compound sentence',
          'Complex sentence',
          'Compound-Complex sentence'
        ],
        correctAnswer: 'Compound-Complex sentence'
      },
      {
        id: 'q3',
        text: 'Briefly rewrite this passive sentence in active voice: "The magnificent library was designed by K. Bharath in 1998."',
        type: 'text',
        correctAnswer: 'K. Bharath designed the magnificent library in 1998.'
      }
    ]
  },
  {
    id: '2',
    title: 'Mathematics III',
    course: 'Mathematics',
    type: 'Multiple choice questions',
    status: 'in_progress',
    progress: 35,
    dueDate: '25th Jan 2020',
    iconName: 'science',
    details: 'This set focuses on Mathematical Induction, Combinatorics, and Advanced Probability Distributions. Answer each question to calculate your final grade.',
    questions: [
      {
        id: 'm1',
        text: 'In mathematical induction, what is the first step called where we prove the statement holds for the initial value (typically n = 1)?',
        type: 'mcq',
        options: [
          'Inductive Step',
          'Basis Step (Base Case)',
          'Assumption Step',
          'Recursion Step'
        ],
        correctAnswer: 'Basis Step (Base Case)'
      },
      {
        id: 'm2',
        text: 'How many distinct permutations can be made with the letters of the word "LIMITS"?',
        type: 'mcq',
        options: [
          '720',
          '360',
          '120',
          '240'
        ],
        correctAnswer: '360' // 6! / 2! = 720/2 = 360
      },
      {
        id: 'm3',
        text: 'If a coin is tossed 5 times, what is the probability of getting exactly 3 heads?',
        type: 'mcq',
        options: [
          '1/2',
          '5/16',
          '3/8',
          '5/32'
        ],
        correctAnswer: '5/16' // 10 / 32 = 5/16
      }
    ]
  },
  {
    id: '3',
    title: 'Mideval History',
    course: 'History',
    type: 'Answer writing',
    status: 'in_progress',
    progress: 80,
    dueDate: '29th Jan 2020',
    iconName: 'public',
    details: 'Evaluate the sociopolitical impact of the Black Death on Western European feudalism during the late Medieval era. Please synthesize arguments about labor scarcity and the rise of peasant wages.',
    questions: [
      {
        id: 'h1',
        text: 'Write a thesis statement evaluating the impact of demographic shifts on feudal hierarchies:',
        type: 'text',
        correctAnswer: 'The demographic collapse weakened feudal dependency by creating severe labor shortages, allowing peasants to negotiate wages and buy their freedom.'
      }
    ]
  }
];

export const initialVideoLectures: VideoLecture[] = [
  {
    id: 'v1',
    title: 'Understanding Compound-Complex Sentences',
    duration: '12:45',
    instructor: 'Dr. Evelyn Carter',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder/rickroll or nice looking embed
    isCompleted: false,
    category: 'English',
    description: 'A deep dive into sentence structures, dependent clauses, coordinating conjunctions, and avoiding run-ons in academic writing.'
  },
  {
    id: 'v2',
    title: 'Introduction to Mathematical Induction',
    duration: '18:20',
    instructor: 'Prof. Marcus Vance',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isCompleted: true,
    category: 'Mathematics',
    description: 'Learn the two key stages of induction proofs with step-by-step examples from summation formulas and divisibility.'
  },
  {
    id: 'v3',
    title: 'The Fall of Feudalism & Rise of Towns',
    duration: '22:15',
    instructor: 'Dr. Alan Hawthorne',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isCompleted: false,
    category: 'History',
    description: 'Explore the shifting economic patterns of late medieval Europe, focusing on the growth of merchant guilds, charter towns, and free markets.'
  },
  {
    id: 'v4',
    title: 'Introduction to Chemistry: Acids & Bases',
    duration: '15:30',
    instructor: 'Prof. Clara Higgins',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isCompleted: false,
    category: 'Chemistry',
    description: 'An introductory guide to pH scales, Arrhenius and Brønsted-Lowry definitions, and neutralizing titration curves.'
  }
];

export const initialReadingMaterials: ReadingMaterial[] = [
  {
    id: 'r1',
    title: 'The Vocabulary of Deep Work',
    category: 'English',
    author: 'Cal Newport (Adapted)',
    readTime: '6 min read',
    content: `Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time. 

Here are the essential focus terms for this unit:
1. **Cognitive Backlog**: The residual mental strain left by multitasking or checking notifications.
2. **Attention Residue**: When you switch from Task A to Task B, your attention doesn't immediately follow; a portion remains stuck thinking about the prior task.
3. **Monastic Scheduling**: An extreme approach where you isolate yourself completely for long blocks of time, shutting out all external communications.
4. **Bimodal Scheduling**: Dividing your calendar into distinct long stretches of deep focus (days or weeks) and leaving the rest for shallow obligations.
5. **Rhythmic Scheduling**: Establishing a solid daily ritual of deep work (e.g., 90 minutes every morning at the exact same time) to build regular habit loops.`,
    isCompleted: false
  },
  {
    id: 'r2',
    title: 'Peasant Wages & The Black Death',
    category: 'History',
    author: 'Dr. Helen Rossi',
    readTime: '10 min read',
    content: `The demographic catastrophe of the Black Death (1347–1351) wiped out between 30% and 60% of Europe’s total population. From an economic standpoint, this instantly transformed Europe from a labor-surplus economy into an extreme labor-scarce economy.

Prior to the plague, land was scarce and labor was abundant, which allowed land-owning lords to extract high feudal rents and offer meager subsistence wages. 

With the sudden shortage of plowmen, weavers, and farmhands:
1. **Peasant Mobility**: Serfs could abandon their lands and walk to neighboring estates where lords, desperate to harvest their rotting crops, offered cash wages.
2. **Statutes of Laborers**: In countries like England, monarchs tried to pass laws (e.g., Statute of Laborers 1351) capped wages at pre-plague rates, but market forces rendered these statutes completely unenforceable.
3. **The Decline of Serfdom**: In order to keep peasants on their land, lords were forced to commute traditional labor obligations into cash tenancies and grant formal personal freedom.`,
    isCompleted: false
  },
  {
    id: 'r3',
    title: 'The Axiom of Choice and Set Theory',
    category: 'Mathematics',
    author: 'Prof. Laura Steiner',
    readTime: '8 min read',
    content: `The Axiom of Choice (AC) is a fundamental axiom of set theory that states that for any collection of non-empty sets, there exists a choice function that can select exactly one element from each set, even if the collection is infinite.

While seemingly intuitive and harmless, AC has deep and counter-intuitive mathematical consequences:
1. **The Banach-Tarski Paradox**: You can decompose a solid 3D sphere into a finite number of pieces, and using only rigid rotations and translations, reassemble those exact pieces into two solid spheres of the exact same size as the original!
2. **The Well-Ordering Theorem**: Every set can be well-ordered, meaning every non-empty subset has a least element. This is easy for natural numbers, but impossible to visualize or write down for real numbers.`,
    isCompleted: false
  }
];

export const initialTasks: Task[] = [
  { id: 't1', title: 'Complete calculus practice set 4', category: 'Mathematics', dueDate: '2026-07-22', priority: 'high', completed: false },
  { id: 't2', title: 'Write introduction draft for History paper', category: 'History', dueDate: '2026-07-24', priority: 'medium', completed: false },
  { id: 't3', title: 'Memorize weekly Focus Words', category: 'English', dueDate: '2026-07-20', priority: 'high', completed: true },
  { id: 't4', title: 'Review chemistry titration video lecture', category: 'Chemistry', dueDate: '2026-07-26', priority: 'low', completed: false }
];

export const initialStudySessions: StudySession[] = [
  { id: 's1', title: 'English Essay Planning', date: '2026-07-20', startTime: '10:00', endTime: '12:00', category: 'English' },
  { id: 's2', title: 'Math Proofs Cram Session', date: '2026-07-22', startTime: '14:00', endTime: '16:30', category: 'Mathematics' },
  { id: 's3', title: 'Medieval Guilds Discussion Group', date: '2026-07-24', startTime: '09:00', endTime: '11:00', category: 'History' }
];
