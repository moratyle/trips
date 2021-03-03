import { motion } from 'framer-motion'
import './end-screen.css'
import msToTime from '../common/utils/format-time'

function EndStat({ label, value }) {
  return (
    <div className="end-screen__stat">
      <div className="end-screen__stat-label">{label}</div>
      <div className="end-screen__stat-value">{value}</div>
    </div>
  )
}

/**
 * EndScreen renders final game stats
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {number} props.elapsedTime
 * @param {() => void} props.onRetryClick A function to run when retry button is clicked
 */

function EndScreen({ score, bestScore, elapsedTime, onRetryClick }) {
  return (
    <div className="end-screen">
      <h1>Quiz Complete!</h1>
      <motion.div
        className="end-screen__trophy"
        initial={{ rotate: 0, originX: 0.5, originY: 0.5 }}
        animate={{ rotate: 360 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.6 }}
      >
        🏆
      </motion.div>
      <EndStat label="Score" value={score} />
      <EndStat label="Best Score" value={bestScore} />
      <EndStat label="Time" value={`${(elapsedTime / 1000).toFixed(2)}s`} />
      <button className="end-screen__button" onClick={onRetryClick}>
        Retry?
      </button>
    </div>
  )
}

export default EndScreen
