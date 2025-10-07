
import { motion, AnimatePresence } from 'framer-motion';

const DrawnBallDisplay = ({ drawn }) => {
  if (!drawn) return null;

  return (
    <div className="relative h-25 w-25 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={drawn.number}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute text-6xl text-yellow-800 font-retro bg-yellow-200 border-4 border-yellow-800 rounded-full h-24 w-24 flex items-center justify-center shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mb-1">
            <div className="text-5xl text-yellow-900 font-retro">{drawn.letter}</div>
            <div className="text-4xl font-bold text-yellow-900">{drawn.number}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DrawnBallDisplay;
