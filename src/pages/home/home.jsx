import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import Header from './components/header';
import Footer from './components/footer';
import GameRoomModal from './components/gameRoomModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


import UseModal from '../register/useModal';

const Home = () => {

  const { isOpen: openRoomModal, openModal: handleOpenRoomModal, closeModal: handleCloseRoomModal } = UseModal();
  

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: '#000', // Change the text color to make it stand out against the background
        backgroundImage: 'linear-gradient(#eb49, #eeef), url("../src/assets/bg_bingo.jpg")', // Reference the image from the public folder
        backgroundSize: 'cover', // Ensures the background image covers the entire page
        backgroundPosition: 'center', // Centers the image
        backgroundAttachment: 'fixed', // Keeps the background fixed when scrolling
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a semi-transparent overlay on top of the image for readability
      }}
    >
    

      <Header />
      
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ textShadow: '0px 0px 10px  #fff', fontWeight: '400' }}
          >
            ¡Bienvenido a Bingo Web!
          </Typography>
          <Typography sx={{ textShadow: '0px 0px 8px #ccc'  }} variant="h5" paragraph>
            Participa en emocionantes partidas de bingo en línea y gana increíbles premios. Únete ahora para empezar a jugar.
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Button variant="contained" color="primary" size="large" sx={{ bgcolor:"#358c" }}>
                Jugar Ahora
              </Button>
            </Grid>
            <Grid item >
              <Button onClick={handleOpenRoomModal} variant="outlined" color="secondary" size="large">
                Sala privada
              </Button>
              
              <Dialog  open={openRoomModal} onClose={handleCloseRoomModal}
              sx={{ 
                '& .MuiDialog-paper': { background:'Linear-gradient(#7bf , #eee)', color: 'white', borderRadius: '20px' } 
              }}>
              
              <DialogContent >
                <GameRoomModal  />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRoomModal} color="primary">
                  Cerrar 
                </Button>
              </DialogActions>
            </Dialog>

            </Grid>
          </Grid>
        </Box>

        {/* Relleno adicional */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography sx={{ textShadow: '0px 0px 20px #555' }} variant="h6" gutterBottom>
            ¿No sabes cómo jugar? ¡No te preocupes! Te explicamos todo.
          </Typography>
          <Typography sx={{ textShadow: '0px 0px 30px #000' }} paragraph>
            En Bingo Web, el objetivo es completar una figura de números en tu tarjeta de bingo. ¡El primero en completar la figura y gritar "Bingo!" gana!
          </Typography>
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;