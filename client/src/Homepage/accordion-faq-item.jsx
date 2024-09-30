import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import * as Icons from './icons';

export function AccordionFAQItem({ fqaItem, onClick, isOpen }) {
  const { answer, id, question } = fqaItem;

  return (
    <div
      key={id}
      className="border-b border-white/30 py-7 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="flex-1 text-base md:text-lg md:font-bold">{question}</span>
        {isOpen ? <Icons.Minus /> : <Icons.Plus />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

AccordionFAQItem.propTypes = {
  fqaItem: PropTypes.shape({
    answer: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
