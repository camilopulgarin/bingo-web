import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Create Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const LoginForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError, // To manually set errors if necessary (for login failures)
  } = useForm({
    resolver: yupResolver(schema), // Integrating Yup with React Hook Form
  });

  const [loginError, setLoginError] = React.useState(null);

  // Function to handle form submission
  const handleLogin = (data) => {
    onSubmit(data)
      .then(() => {
        // Reset login error on successful login
        setLoginError(null);
      })
      .catch(() => {
        // Handle login failure (e.g., incorrect credentials)
        setLoginError('Credenciales incorrectas');
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
      {loginError && <Alert severity="error">{loginError}</Alert>} {/* Display error alert */}
      
      <Controller
        name="email"
        control={control}
        defaultValue=""
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
        sx={{ mt: 3, mb: 2, bgcolor:"#358"}}
      >
        Iniciar Sesión
      </Button >
      
      <Typography variant="body2" align="center">
        ¿Olvidaste tu contraseña? <a href="#!">Recupérala aquí</a>
      </Typography>
    </Box>
  );
};

export default LoginForm;

