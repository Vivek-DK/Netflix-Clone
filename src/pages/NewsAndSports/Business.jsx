import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import News from '../../components/TitleCards/News';
import { div } from 'framer-motion/client';
const Business = () => {

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
          <h1>Business</h1>
          <p>Watch the latest business updates</p>
        </div>
        <News category={"business"}/>
      </motion.div>
    </div>
    
  )
}

export default Business;