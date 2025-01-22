import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { regiterSchema } from '../validations';
import { Link } from 'react-router-dom';

import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TermsAndConditions from './termsAndConditions';
import PrivacyPolicy from './privacyPolicy';

const RegisterForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regiterSchema)
  });

  console.log("errors: ", errors)

  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);

  const handleOpenTermsModal = () => setOpenTermsModal(true);
  const handleCloseTermsModal = () => setOpenTermsModal(false);

  const handleOpenPrivacyModal = () => setOpenPrivacyModal(true);
  const handleClosePrivacyModal = () => setOpenPrivacyModal(false);

  return (
    < Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate >
      <Controller
        name="user"
        control={control}
        defaultValue=""
        
        render={({ field }) => (
          <TextField 
            {...field}
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.user}
            helperText={errors.user?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'El correo electrónico es requerido' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'La contraseña es requerida' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{ required: 'La contraseña es requerida' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirmar contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />    
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 1 }}
      >
        Registrarse
      </Button>

      <Typography variant="body2" color="textPrimary" align="center" sx={{ mt: 2, fontSize: '1rem' }}>
        ¿Ya estás registrado?&nbsp;  
        <Link to=".//login">
          Acceder
        </Link>.
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center" sx={{ mt: 1 }}>
        Al crear una nueva cuenta, aceptas las{' '} 
        <Link onClick={handleOpenTermsModal} style={{ cursor: 'pointer' }}>
          Condiciones del servicio
        </Link> y {' '}
        <Link onClick={handleOpenPrivacyModal} style={{ cursor: 'pointer' }}>
          Política de Privacidad
        </Link> de Bingo-web
      </Typography>

      <Dialog open={openTermsModal} onClose={handleCloseTermsModal}>
        <DialogTitle>Términos y Condiciones</DialogTitle>
        <DialogContent>
          <TermsAndConditions />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPrivacyModal} onClose={handleClosePrivacyModal}>
        <DialogTitle>Política de Privacidad</DialogTitle>
        <DialogContent>
          <PrivacyPolicy />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacyModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
  );
};
export default RegisterForm;
