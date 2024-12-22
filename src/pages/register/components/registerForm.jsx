import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
const RegisterForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
        name="userName"
        control={control}
        defaultValue=""
        rules={{ required: 'El nombre de usuario es requerido' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </Button>
     <Box textAlign="center" >
        <a>Acepto terminos y condiciones</a>
        <input type="checkbox" />
     </Box>
    </Box>
  );
};
export default RegisterForm;