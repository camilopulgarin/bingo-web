/* import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UserSettingsForm() {
  const [originalUser, setOriginalUser] = useState({
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

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: originalUser.username,
      email: originalUser.email,
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    },
  });

  const watchUsername = watch("username");
  const watchEmail = watch("email");

  useEffect(() => {
    reset({
      username: originalUser.username,
      email: originalUser.email,
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    });
  }, [originalUser, reset]);

  const onSubmit = (data) => {
    const usernameChanged = data.username !== originalUser.username;
    const emailChanged = data.email !== originalUser.email;
    const passwordChanged = changePassword;

    if (!usernameChanged && !emailChanged && !passwordChanged) {
      toast.info("No se hicieron cambios.");
      return;
    }

    toast.success("Cambios guardados exitosamente.");
    setOriginalUser({
      username: data.username,
      email: data.email,
    });
    setIsEditing(false);
    setChangePassword(false);
    reset({
      ...data,
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setChangePassword(false);
    reset({
      username: originalUser.username,
      email: originalUser.email,
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre de Usuario"
              fullWidth
              variant="outlined"
              margin="normal"
              disabled={!isEditing}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo Electrónico"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {isEditing && (watchUsername !== originalUser.username || watchEmail !== originalUser.email) && (
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña Actual"
                fullWidth
                type="password"
                variant="outlined"
                margin="normal"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            )}
          />
        )}

        {isEditing && !changePassword && (
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setChangePassword(true);
              setValue("changePassword", true); // marcar para yup
            }}
            style={{ marginBottom: "1rem" }}
          >
            Cambiar Contraseña
          </Button>
        )}

        {isEditing && changePassword && (
          <>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña Anterior"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nueva Contraseña"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirmar Nueva Contraseña"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </>
        )}

        <div className="space-x-4 mt-4">
          {isEditing ? (
            <>
              <Button type="submit" variant="contained" color="primary">
                Guardar Cambios
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
        </div>
      </form>

      
      <ToastContainer />
    </>
  );
}
 */

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/slices/authSlice";

export default function UserSettingsForm() {
  // Acceder a los datos del usuario desde Redux
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Estado para gestionar la edición del perfil y la contraseña
  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    currentPassword: Yup.string().when(["username", "email"], {
      is: (username, email) =>
        isEditing &&
        (username !== user?.username || email !== user?.email),
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

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    },
  });

  const watchUsername = watch("username");
  const watchEmail = watch("email");

  // Efecto para cargar el perfil del usuario autenticado desde Redux
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  // Efecto para resetear los valores del formulario cuando los datos de usuario cambian
  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        currentPassword: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
        changePassword: false,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const usernameChanged = data.username !== user?.username;
    const emailChanged = data.email !== user?.email;
    const passwordChanged = changePassword;

    if (!usernameChanged && !emailChanged && !passwordChanged) {
      toast.info("No se hicieron cambios.");
      return;
    }

    toast.success("Cambios guardados exitosamente.");
    // Aquí puedes despachar una acción para actualizar el perfil en el backend
    // dispatch(updateUserProfile(data));
    setIsEditing(false);
    setChangePassword(false);
    reset({
      ...data,
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setChangePassword(false);
    reset({
      username: user?.username || "",
      email: user?.email || "",
      currentPassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre de Usuario"
              fullWidth
              variant="outlined"
              margin="normal"
              disabled={!isEditing}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo Electrónico"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {isEditing && (watchUsername !== user?.username || watchEmail !== user?.email) && (
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña Actual"
                fullWidth
                type="password"
                variant="outlined"
                margin="normal"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            )}
          />
        )}

        {isEditing && !changePassword && (
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setChangePassword(true);
              setValue("changePassword", true); // marcar para yup
            }}
            style={{ marginBottom: "1rem" }}
          >
            Cambiar Contraseña
          </Button>
        )}

        {isEditing && changePassword && (
          <>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña Anterior"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nueva Contraseña"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirmar Nueva Contraseña"
                  fullWidth
                  type="password"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </>
        )}

        <div className="space-x-4 mt-4">
          {isEditing ? (
            <>
              <Button type="submit" variant="contained" color="primary">
                Guardar Cambios
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
