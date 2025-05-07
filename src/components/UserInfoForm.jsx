// UserInfoForm.jsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function UserInfoForm() {
  const [originalUser, setOriginalUser] = useState({
    username: "Usuario123",
    email: "usuario@example.com",
  });
  const [isEditing, setIsEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    currentPassword: Yup.string().when(["username", "email"], {
      is: (username, email) =>
        isEditing && (username !== originalUser.username || email !== originalUser.email),
      then: (schema) => schema.required("Debes ingresar tu contraseña actual"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: originalUser.username,
      email: originalUser.email,
      currentPassword: "",
    },
  });

  const watchUsername = watch("username");
  const watchEmail = watch("email");

  useEffect(() => {
    reset({
      username: originalUser.username,
      email: originalUser.email,
      currentPassword: "",
    });
  }, [originalUser, reset]);

  const onSubmit = (data) => {
    const usernameChanged = data.username !== originalUser.username;
    const emailChanged = data.email !== originalUser.email;

    if (!usernameChanged && !emailChanged) {
      toast.info("No se hicieron cambios.");
      return;
    }

    toast.success("Datos de usuario actualizados.");
    setOriginalUser({
      username: data.username,
      email: data.email,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Información del Usuario</h3>

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
  );
}
