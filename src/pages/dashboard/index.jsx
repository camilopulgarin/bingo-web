/* import { animate, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';

const mockStats = [
  { title: "Partidas Jugadas", value: 120 },
  { title: "Partidas Ganadas", value: 45 },
  { title: "Cartones Vendidos", value: 350 },
];

const mockRanking = [
  { name: "Jugador 1", score: 500 },
  { name: "Jugador 2", score: 450 },
  { name: "Jugador 3", score: 400 },
];

const Dashboard = () => {
  const stats = useSelector((state) => state.game?.stats) || mockStats;

  return (
    <Fragment className="flex flex-col items-center justify-center">
            <BingoAnimation />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StatCard title={stat.title} value={stat.value} />
                </motion.div>
              ))}
              <Ranking />
            </motion.div>
    </Fragment>
  );
};

const StatCard = ({ title, value }) => {
  const controls = useAnimation();
  const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
    const controls = animate(count, value, { duration: 1 })
    return () => controls.stop()
}, [])

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color="primary">
          <motion.span 
            initial={{ value: 0 }}
            animate={controls}
          >
            {rounded}
          </motion.span>
        </Typography>
      </CardContent>
    </Card>
  );
};

const Ranking = () => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Ranking de Jugadores</Typography>
        {mockRanking.map((player, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between p-2 border-b last:border-none"
          >
            <Typography>{player.name}</Typography>
            <Typography color="secondary">{player.score} pts</Typography>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

const BingoAnimation = () => {
  const balls = [
    { color: "bg-red-600", letter: "B" },
    { color: "bg-blue-600", letter: "I" },
    { color: "bg-green-600", letter: "N" },
    { color: "bg-yellow-500", letter: "G" },
    { color: "bg-purple-600", letter: "O" },
  ];

  return (
    <motion.div
      className="flex justify-center mt-6 relative h-32 items-center w-full gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          className={w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${ball.color} shadow-lg}
          animate={{ y: [0, -30, 0], x: [0, 100, -100, 0], rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          style={{ top: ${Math.random() * 50}px, left: ${index * 70}px }}
        >
          {ball.letter}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Dashboard;
 */

import { animate, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect } from 'react';

const mockStats = [
  { title: "Partidas Jugadas", value: 120 },
  { title: "Partidas Ganadas", value: 45 },
  { title: "Cartones Vendidos", value: 350 },
];

const mockRanking = [
  { name: "Jugador 1", score: 500 },
  { name: "Jugador 2", score: 450 },
  { name: "Jugador 3", score: 400 },
];

const Dashboard = () => {
  const stats = useSelector((state) => state.game?.stats) || mockStats;

  return (
    <div className="flex flex-col items-center justify-center">
      <BingoAnimation />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-9/10"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="w-full  flex-grow "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard title={stat.title} value={stat.value} />
          </motion.div>
        ))}
        <Ranking />
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  const controls = useAnimation();
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1 });
    return () => controls.stop();
  }, [count, value]);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color="primary">
          <motion.span initial={{ value: 0 }} animate={controls}>
            {rounded}
          </motion.span>
        </Typography>
      </CardContent>
    </Card>
  );
};

const Ranking = () => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Ranking de Jugadores</Typography>
        {mockRanking.map((player, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between p-2 border-b last:border-none"
          >
            <Typography>{player.name}</Typography>
            <Typography color="secondary">{player.score} pts</Typography>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

const BingoAnimation = () => {
  const balls = [
    { color: "bg-red-600", letter: "B" },
    { color: "bg-blue-600", letter: "I" },
    { color: "bg-green-600", letter: "N" },
    { color: "bg-yellow-500", letter: "G" },
    { color: "bg-purple-600", letter: "O" },
  ];

  return (
    <motion.div
      className="flex justify-center mt-6 relative h-32 items-center w-full gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${ball.color} shadow-lg`}
          animate={{ y: [0, -30, 0], x: [0, 100, -100, 0], rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          style={{ top: `${Math.random() * 50}px`, left: `${index * 70}px` }}
        >
          {ball.letter}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Dashboard;
