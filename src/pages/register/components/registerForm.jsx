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



const RegisterForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regiterSchema)
  });

  console.log("errors: ", errors)

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
        Al registrarse aceptas los{' '} 
        <Link onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
          Términos y Condiciones
        </Link> de Bingo-web
      </Typography>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Términos y Condiciones</DialogTitle>
        <DialogContent>
        <Typography variant="h4" gutterBottom>
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a nuestro sitio de bingo. A continuación, te presentamos nuestros
          términos y condiciones. Por favor, lee atentamente antes de continuar.
        </Typography>
        <Typography variant="h6" paragraph>
          1. Aceptación de los términos
        </Typography>
        <Typography variant="body1" paragraph>
          Al registrarte o utilizar nuestros servicios, aceptas estos Términos y Condiciones, así como nuestra     Política de Privacidad. Estos términos son aplicables a todos los usuarios del sitio web, ya sean   visitantes o usuarios registrados.
        </Typography>      
        <Typography variant="h6" paragraph>
          2. Uso del sitio
        </Typography>
        <Typography variant="body1" paragraph>
          El acceso y uso del sitio web está permitido solo para personas mayores de 18 años. Si eres menor de 18 años, no debes utilizar nuestros servicios.
        </Typography>
        <Typography variant="body1" paragraph>
          El sitio web proporciona una plataforma para jugar al bingo en línea. Te comprometes a utilizar nuestros     servicios de manera legal, respetuosa y de acuerdo con las leyes locales e internacionales que puedan   ser aplicables.
        </Typography>
        <Typography variant="h6" paragraph>
        3. Cuenta de Usuario
        </Typography>
        <Typography variant="body1" paragraph>
          Para participar en los juegos, es necesario crear una cuenta de usuario. El usuario se compromete a      proporcionar información precisa, actual y completa durante el proceso de registro.
        </Typography>
        <Typography variant="body1" paragraph>
          
          Es tu responsabilidad mantener la confidencialidad de tu cuenta y contraseña. Nos reservamos el derecho      de suspender o cancelar cuentas que sospechemos que están siendo utilizadas de manera fraudulenta o que      infrinjan estos términos.</Typography>
        <Typography variant="h6" paragraph>
          4. Reglas del Juego
        </Typography>
        <Typography variant="body1" paragraph>
        Las reglas del bingo están detalladas en el sitio web y pueden variar en función de la modalidad del juego. Te recomendamos leer y entender las reglas antes de participar en cualquier juego.

        Nos reservamos el derecho de modificar las reglas del juego, las promociones y otros aspectos del sitio en cualquier momento, sin previo aviso.
        </Typography>
        <Typography variant="h6" paragraph>
          5. Pagos y Retiradas
        </Typography>
        <Typography variant="body1" paragraph>
          Para participar en los juegos de bingo, los usuarios deberán realizar depósitos en su cuenta utilizando   uno de los métodos de pago ofrecidos por el sitio. Asegúrate de revisar los métodos de pago disponibles   en el sitio web y las posibles comisiones asociadas.

          Las retiradas de ganancias estarán sujetas a los términos de retiro establecidos en el sitio. Asegúrate   de proporcionar la información correcta para procesar los pagos de manera eficiente.
        </Typography>
        <Typography variant="h6" paragraph>
          6. Privacidad y Protección de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          El uso de tus datos personales está sujeto a nuestra Política de Privacidad. Al registrarte, aceptas que procesemos tus datos personales según lo establecido en esa política.
        </Typography>
        <Typography variant="h6" paragraph>
          7. Comportamiento del Usuario
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho de suspender o cancelar cualquier cuenta que infrinja las reglas del sitio o actúe de manera inapropiada, como acoso, comportamiento abusivo, o trampa en los juegos.

          El sitio web está destinado a fines de entretenimiento. Cualquier comportamiento ilegal o fraudulento será tratado conforme a las leyes aplicables y podría resultar en la cancelación de la cuenta, el bloqueo del acceso y la acción legal correspondiente.
        </Typography>
        <Typography variant="h6" paragraph>
          8. Propiedad Intelectual
        </Typography>
        <Typography variant="body1" paragraph>
          Todo el contenido, incluidos los gráficos, logos, textos, software, y cualquier otro material en el sitio web, está protegido por derechos de autor y es propiedad de [Nombre de la empresa]. No se puede utilizar sin el consentimiento expreso de la empresa.
        </Typography>
        <Typography variant="h6" paragraph>
          9. Modificación de los Términos y Condiciones
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor en el momento en que se publiquen en el sitio web. Te recomendamos que revises periódicamente esta página para estar al tanto de cualquier cambio.
        </Typography>
        <Typography variant="h6" paragraph>
          10. Limitación de Responsabilidad
        </Typography>
        <Typography variant="body1" paragraph>
          [Nombre de la empresa] no será responsable por cualquier pérdida o daño derivado del uso del sitio web, incluidos, pero no limitados a, daños directos, indirectos, incidentales, especiales o consecuentes. No garantizamos que el sitio web esté libre de errores, virus o fallos.
        </Typography>
        <Typography variant="h6" paragraph>
          11. Jurisdicción y Ley Aplicable
        </Typography>
        <Typography variant="body1" paragraph>
          Estos Términos y Condiciones se rigen por las leyes de [País o región]. Cualquier disputa relacionada con estos términos se resolverá en los tribunales competentes de [Ciudad o Región].
        </Typography>
        <Typography variant="h6" paragraph>
          12. Terminación del Servicio
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho de suspender o finalizar tu cuenta en cualquier momento y sin previo aviso si consideramos que has infringido estos Términos y Condiciones o por cualquier otra razón a nuestra discreción.
        </Typography>
        <Typography variant="h6" paragraph>
          13. Contactar con Nosotros
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos a través de [correo electrónico] o por teléfono al [número de teléfono].
        </Typography>
        <Typography variant="h6" paragraph>
          Política de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Te recomendamos revisar nuestra Política de Privacidad para entender cómo manejamos tu información personal.
        </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
  );
};
export default RegisterForm;
