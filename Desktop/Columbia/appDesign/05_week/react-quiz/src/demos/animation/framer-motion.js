import { motion } from 'framer-motion'

function FramerMotion() {
  return (
    <div>
      <motion.div animate={{ x: 100, y: 10 }}>Moving XY</motion.div>
      <motion.div
        animate={{ scale: 0.5 }}
        transition={{ duration: 1, repeat: 2, repeatType: 'reverse' }}
      >
        Scaling
      </motion.div>
      <motion.div
        initial={{ rotate: 180, orignX: 0, orignY: 0 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 2, type: 'spring' }}
      >
        Rotate
      </motion.div>
      <div>
        This is{' '}
        <motion.span
          initial={{ color: 'rgb(0,0,255)' }}
          animate={{ color: 'rgb(0,255,0)' }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        >
          FANCY
        </motion.span>
      </div>
    </div>
  )
}

export default FramerMotion
