import { useState } from 'react'
import EndScreen from './end-screen'
import TriviaItem from './trivia-item'
import Stats from './stats'
import triviaData from './trivia-data'
import useSound from 'use-sound'
import correctSound from '../sounds/correct-sound.wav'
import incorrectSound from '../sounds/wrong.wav'
import { FadeWrapper, FadeTransition } from './fade-transition'

/**
 * The Game is responsible for orchestrating the flow of the quiz
 */

function Game() {
  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    difficultyNum: 0,
    elapsedTime: new Date(),
    isGameOver: false,
  })

  // use-sound API
  const [playCorrectSound] = useSound(correctSound, {
    soundEnabled: true,
  })
  const [playIncorrectSound] = useSound(incorrectSound, {
    soundEnabled: true,
  })

  const { score, triviaIndex, difficultyNum, isGameOver, elapsedTime } = gameState
  const questionNumber = triviaIndex + 1
  const numQuestions = triviaData.length

  const RestartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      elapsedTime: new Date(),
      isGameOver: false,
    })
  }

  const LoadNextQuestion = () => {
    triviaIndex >= triviaData.length - 1
      ? setGameState({
          ...gameState,
          elapsedTime: new Date() - elapsedTime,
          isGameOver: true,
        })
      : setGameState({ ...gameState, triviaIndex: triviaIndex + 1 })
  }

  const onAnswerSelected = (wasPlayerCorrect, scoreIncrement) => {
    if (wasPlayerCorrect) {
      playCorrectSound()

      setGameState({
        ...gameState,
        score: score + scoreIncrement,
        difficultyNum: scoreIncrement,
      })
    } else playIncorrectSound()
  }

  let pageContent
  let pageKey
  const triviaQuestion = triviaData[triviaIndex]
  const { correct_answer, incorrect_answers, question, difficulty } = triviaQuestion
  if (isGameOver) {
    pageKey = 'EndScreen'
    pageContent = (
      <EndScreen
        score={score}
        bestScore={0}
        elapsedTime={elapsedTime}
        onRetryClick={RestartGame}
      />
    )
  } else {
    pageKey = triviaIndex
    pageContent = (
      <TriviaItem
        key={triviaIndex}
        question={question}
        correctAnswer={correct_answer}
        incorrectAnswers={incorrect_answers}
        difficulty={difficulty}
        onNextClick={LoadNextQuestion}
        onAnswerSelected={onAnswerSelected}
      />
    )
  }

  return (
    <>
      <Stats
        score={score}
        difficultyNum={difficultyNum}
        questionNumber={questionNumber}
        totalQuestions={numQuestions}
      />
      <FadeWrapper>
        <FadeTransition key={pageKey}>{pageContent}</FadeTransition>
      </FadeWrapper>
    </>
  )
}

export default Game
