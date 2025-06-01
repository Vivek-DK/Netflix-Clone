import './TvShows.css'
import TitleCards from '../../components/TitleCards/TitleCards'
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
const TvShows = () => {

  const pageTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
};
  return (

  <motion.div
    className='tv-shows'
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
  >
    <Navbar />
      <div className="tv-shows-header">
        <h1>TV Shows</h1>
        <p>Watch the latest TV shows and series</p>
        </div>
        <TitleCards title="Popular TV Shows" genre="tv" category="popular" />
        <TitleCards title="Top Rated TV Shows" genre="tv" category="top_rated" />
        <TitleCards title="On The Air" genre="tv" category="on_the_air" />
        <TitleCards title="Airing Today" genre="tv" category="airing_today" />
        <TitleCards title="Trending" genre="trending" category="tv" day="day" />
    </motion.div>
  )
}

export default TvShows;