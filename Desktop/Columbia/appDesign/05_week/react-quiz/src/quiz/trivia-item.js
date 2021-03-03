import { useState } from 'react'
import './trivia-item.css'
import { motion } from 'framer-motion'
import shuffle from '../common/utils/shuffle'
import capitalize from '../common/utils/capitalize'

/**
 * TriviaItem component renders an individual trivia question and waits for a user's answer
 * @param {object} props
 * @param {string} props.correctAnswer
 * @param {string[]} props.incorrectAnswers
 * @param {string} props.question
 * @param {string} props.difficulty
 * @param {() => void} props.onNextClick
 * @param {(boolean) => void} props.onAnswerSelected
 */

function TriviaItem({
  correctAnswer,
  incorrectAnswers,
  question,
  difficulty,
  onNextClick,
  onAnswerSelected,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const hasPickedAnswer = selectedAnswer != null

  // shufle answers
  const allAnswers = [correctAnswer, ...incorrectAnswers]
  const [shuffledAnswers] = useState(() => shuffle(allAnswers)) // useState can takea fn that is run only when the state is initialized

  // set class names for buttons
  let nextButtonClassName = 'trivia-item__button trivia-item__next-button'
  if (!hasPickedAnswer) nextButtonClassName += ' trivia-item__button--disabled'

  // handle event when user clicks on an answer
  let scoreIncrement
  const onAnswerClick = (e) => {
    setDifficultyColorAndValue(difficulty)
    const playerAnswer = e.target.innerHTML
    setSelectedAnswer(playerAnswer)
    const wasPlayerCorrect = playerAnswer == correctAnswer
    onAnswerSelected(wasPlayerCorrect, scoreIncrement)
  }

  // set difficulty color and value of each trivia item
  const setDifficultyColorAndValue = (difficulty) => {
    let difficultyColor = 'pl-1 font-bold'

    switch (difficulty) {
      case 'easy':
        difficultyColor += ' text-green-500'
        scoreIncrement = 1
        break
      case 'medium':
        difficultyColor += ' text-yellow-500'
        scoreIncrement = 2
        break
      case 'hard':
        difficultyColor += ' text-red-500'
        scoreIncrement = 3
        break
    }
    return difficultyColor
  }

  // staggerChildren
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <div>
      <span class="block text-center">
        Difficulty:
        <span class={setDifficultyColorAndValue(difficulty)}>
          {capitalize(difficulty)}
        </span>
      </span>

      <p className="trivia-item__question">{question}</p>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="trivia-item__answers"
      >
        {shuffledAnswers.map((answer) => {
          let className = 'trivia-item__button'

          if (hasPickedAnswer) {
            const pickedThisAnswer = answer === selectedAnswer
            const isThisCorrect = answer == correctAnswer

            if (pickedThisAnswer && isThisCorrect) {
              className += ' trivia-item__button--correct'
            } else if (pickedThisAnswer && !isThisCorrect) {
              className += ' trivia-item__button--incorrect'
            } else {
              className += ' trivia-item__button--disabled'
            }
          }

          return (
            <motion.li variants={item} key={answer}>
              <button
                className={className}
                onClick={onAnswerClick}
                disabled={hasPickedAnswer}
              >
                {answer}
              </button>
            </motion.li>
          )
        })}
      </motion.ul>
      <button
        className={nextButtonClassName}
        onClick={onNextClick}
        disabled={!hasPickedAnswer}
      >
        Next→
      </button>
    </div>
  )
}

export default TriviaItem
