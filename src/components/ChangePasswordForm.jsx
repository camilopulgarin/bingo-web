// ChangePasswordForm.jsx
/* import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Debes ingresar tu contraseña actual"),
  password: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("Confirma tu nueva contraseña")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    toast.success("Contraseña actualizada correctamente.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "2rem" }}>
      <h3>Cambiar Contraseña</h3>

      <Controller
        name="oldPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contraseña Actual"
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

      <Button type="submit" variant="contained" color="warning" style={{ marginTop: "1rem" }}>
        Cambiar Contraseña
      </Button>
    </form>
  );
} */

  import { useForm, Controller } from "react-hook-form";
  import { TextField, Button } from "@mui/material";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as Yup from "yup";
  import { toast, ToastContainer } from "react-toastify";
  import { useDispatch, useSelector } from "react-redux";
  import { changePassword, clearAuthMessages } from "../redux/slices/authSlice";
  import { useEffect } from "react";
  import "react-toastify/dist/ReactToastify.css";
  
  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Debes ingresar tu contraseña actual"),
    password: Yup.string()
      .required("La nueva contraseña es obligatoria")
      .min(6, "Debe tener al menos 6 caracteres"),
    confirmPassword: Yup.string()
      .required("Confirma tu nueva contraseña")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });
  
  export default function ChangePasswordForm() {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
    });
  
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.auth);
  
    const onSubmit = (data) => {
      const { oldPassword, password } = data;
  
      dispatch(changePassword({ oldPassword, newPassword: password }))
        .unwrap()
        .then(() => {
          toast.success("Contraseña actualizada correctamente.");
          reset();
        })
        .catch((err) => {
          toast.error(err || "Error al cambiar la contraseña");
        });
    };
  
    useEffect(() => {
      if (successMessage || error) {
        const timer = setTimeout(() => {
          dispatch(clearAuthMessages());
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, [successMessage, error, dispatch]);
  
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "2rem" }}>
          <h3>Cambiar Contraseña</h3>
  
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña Actual"
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
  
          <Button type="submit" variant="contained" color="warning" style={{ marginTop: "1rem" }} disabled={isLoading}>
            {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
          </Button>
        </form>
  
        {/* Contenedor de los toasts */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </>
    );
  }
  
  
