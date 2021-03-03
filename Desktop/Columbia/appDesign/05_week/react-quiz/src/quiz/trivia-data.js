import he from 'he'

// This will eventually come from a server!
let triviaData = [
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which actor played the main character in the 1990 film &quot;Edward Scissorhands&quot;?',
    correct_answer: 'Johnny Depp',
    incorrect_answers: [' Clint Eastwood', 'Leonardo DiCaprio', 'Ben Stiller'],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'Pac-Man was invented by the designer Toru Iwatani while he was eating pizza.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'In Team Fortress 2, being disguised as a scout or medic results in a speed boost.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Entertai>nment: Video Games',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What name does the little headcrab in &quot;Half Life 2&quot; have?',
    correct_answer: 'Lamarr',
    incorrect_answers: ['Jumperr', 'Drett', 'Jerry'],
  },
  {
    category: 'Mythology',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Nidhogg is a mythical creature from what mythology?',
    correct_answer: 'Norse',
    incorrect_answers: ['Egyptian', 'Greek', 'Hindu'],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What was the name of the protagonist in the movie Commando (1985)?',
    correct_answer: 'John Matrix',
    incorrect_answers: ['Ben Richards', 'Douglas Quaid', 'Harry Tasker'],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'In which movie does Robin Williams&#039; character have to disguise themselves into a woman?',
    correct_answer: 'Mrs. Doubtfire',
    incorrect_answers: ['Old Dogs', 'Jumanji', 'Awakenings'],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'What was the name of the cold-war singer who has a song in Grand Theft Auto IV, and a wall landmark in Moscow for his memorial?',
    correct_answer: 'Viktor Tsoi',
    incorrect_answers: ['Jimi Hendrix', 'Brian Jones', 'Vladimir Vysotsky'],
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question: 'When did the Crisis of the Third Century begin?',
    correct_answer: '235 AD',
    incorrect_answers: ['235 BC', '242 AD', '210 AD'],
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which U.S. president was said to have been too honest to lie to his father about chopping down a cherry tree?',
    correct_answer: 'George Washington',
    incorrect_answers: ['Abraham Lincoln', 'Thomas Jefferson', 'James Monroe'],
  },
]

triviaData = triviaData.map((item) => {
  return {
    ...item,
    question: he.decode(item.question),
    correct_answer: he.decode(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map((incorrect) => he.decode(incorrect)),
  }
})

export default triviaData
