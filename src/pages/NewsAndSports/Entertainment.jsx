import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import News from '../../components/TitleCards/News';
const Entertainment = () => {

  const pageTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
};

  return (
    <div>
      <Navbar />
      <motion.div
        className='tv-shows'
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <div className="tv-shows-header">
          <h1>Entertainment</h1>
          <p>Watch the latest entertainment updates</p>
        </div>
        <News category={"entertainment"}/>
      </motion.div>
    </div>
  )
}

export default Entertainment;