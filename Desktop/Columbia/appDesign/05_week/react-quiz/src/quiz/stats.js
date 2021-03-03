import './stats.css'
import { AnimatePresence, motion } from 'framer-motion'

function Stat({ label, value }) {
  return (
    <li className="stats__stat-container">
      <div className="stats__stat-label">{label}</div>
      <div className="stats__stat-value">{value}</div>
    </li>
  )
}

/**
 * Stats component renders score and question number
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.difficultyNum
 * @param {number} props.questionNumber
 * @param {number} props.totalQuestions
 */

function Stats({ score, difficultyNum, questionNumber, totalQuestions }) {
  return (
    <ul className="stats">
      <div class="relative">
        <Stat label="Score" value={score} />
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            initial={{ opacity: 0, y: 10, transition: { ease: 'easeOut' } }}
            animate={{ opacity: [0, 1, 0], y: -20 }}
            exit={{ opacity: 0, y: -20, transition: { ease: 'easeIn' } }}
            transition={{ duration: 2.5, times: [0, 0.5, 1] }}
            class="absolute bottom-9 left-8 "
          >
            <span class="text-blue-400 text-xs z-0">+ {difficultyNum}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <Stat label="Question" value={`${questionNumber} / ${totalQuestions}`} />
    </ul>
  )
}

export default Stats
