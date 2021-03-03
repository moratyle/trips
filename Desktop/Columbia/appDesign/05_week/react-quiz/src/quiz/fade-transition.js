import { motion, AnimatePresence } from 'framer-motion'

/**
 * Wraps around a FadeTransition. If you want enter AND exit transitions, be sure that you put your FadeTransition inside of a FadeWrapper
 * @param {objecet} props
 * @param {React.ReactNode} props.children
 */

function FadeWrapper({ children }) {
  return <AnimatePresence exitBeforeEnter={true}>{children}</AnimatePresence>
}

/**
 * Wraps the children in an animated div that fades in/ out. Be sure towrap this in a FadeWrapper and be sure to assign the FadeTransition a uniqu key
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */

function FadeTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 75, transition: { ease: 'easeOut' } }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -75, transition: { ease: 'easeIn' } }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export { FadeWrapper, FadeTransition }
