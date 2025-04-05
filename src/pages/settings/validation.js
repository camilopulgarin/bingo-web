import * as Yup from 'yup';

export const [originalUser, setOriginalUser] = useState({
    username: "Usuario123",
    email: "usuario@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    currentPassword: Yup.string().when(["username", "email"], {
      is: (username, email) =>
        isEditing &&
        (username !== originalUser.username || email !== originalUser.email),
      then: (schema) => schema.required("Debes ingresar tu contraseña actual"),
      otherwise: (schema) => schema.notRequired(),
    }),
    oldPassword: Yup.string().when("changePassword", {
      is: true,
      then: (schema) => schema.required("Debes ingresar tu contraseña anterior"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().when("changePassword", {
      is: true,
      then: (schema) => schema.required("La nueva contraseña es obligatoria").min(6, "Mínimo 6 caracteres"),
      otherwise: (schema) => schema.notRequired(),
    }),
    confirmPassword: Yup.string().when("password", {
      is: (val) => !!val,
      then: (schema) => schema.required("Confirma tu nueva contraseña").oneOf([Yup.ref("password")], "No coinciden"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
