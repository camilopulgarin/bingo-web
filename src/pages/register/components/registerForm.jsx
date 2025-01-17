import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { regiterSchema } from '../validations';
import { Link } from 'react-router-dom';


const RegisterForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regiterSchema)
  });

  console.log("errors: ", errors)
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
            sx={{
              input: {
                color: '#111'
              },
              fieldset: {
                borderColor: '#333' 
              },
              '& .MuiInputLabel-root': {
                color: '#111' 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2' 
              }
            }}
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
            sx={{
              input: {
                color: '#111'
              },
              fieldset: {
                borderColor: '#333' 
              },
              '& .MuiInputLabel-root': {
                color: '#111' 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2' 
              }
            }}
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
            sx={{
              input: {
                color: '#111'
              },
              fieldset: {
                borderColor: '#333' 
              },
              '& .MuiInputLabel-root': {
                color: '#111' 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2' 
              }
            }}
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
            sx={{
              input: {
                color: '#111'
              },
              fieldset: {
                borderColor: '#333' 
              },
              '& .MuiInputLabel-root': {
                color: '#111' 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2' 
              }
            }}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />
     <Controller
        name="terms"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Box textAlign="center" marginTop={2}>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={<Link to="../terms-and-conditions" target="blank" style={{ textDecoration: 'none' }}>
              Términos y condiciones
            </Link>}
            />
            {errors.terms && (
              <Typography color="error" variant="body2">
                {errors.terms.message}
              </Typography>
            )}
          </Box>
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
  </Box>
  );
};
export default RegisterForm;
