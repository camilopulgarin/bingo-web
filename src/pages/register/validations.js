import * as Yup from 'yup';


export const regiterSchema = Yup.object().shape({
  user: Yup.string().required('El nombre de usuario es requerido'),
  email: Yup.string().email('El correo electrónico debe ser válido').required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida'),
  //terms: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones').required('Debes aceptar los términos y condiciones'),
});