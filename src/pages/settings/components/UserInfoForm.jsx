import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userInfo, updateUserThunk } from "../../../redux/slices/userInfoSlice";
import {
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
} from "@mui/material";

export default function UserInfoForm() {
  const dispatch = useDispatch();
  const { data: user, loading, error, updateStatus } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user?.user?.name) {
      setName(user.user.name);
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateUserThunk({ id: user.user.id,
    name,
    email: user.user.email,
    password: user.user.password || "*****", })); // Enviamos solo el nuevo nombre
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="body1">
        Error al cargar la información del usuario.
      </Typography>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Información del Usuario
      </Typography>

      <Typography variant="h6" gutterBottom>
        Nombre de Usuario:
      </Typography>

      {editing ? (
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={() => setEditing(false)}>Cancelar</Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Typography variant="body1">{name || "No disponible"}</Typography>
          <Button variant="outlined" size="small" onClick={() => setEditing(true)}>
            Editar
          </Button>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Correo Electrónico:
      </Typography>
      <Typography variant="body1">
        {user?.user.email || "No disponible"}
      </Typography>

      {updateStatus === "loading" && (
        <Typography color="textSecondary">Guardando cambios...</Typography>
      )}
      {updateStatus === "succeeded" && (
        <Typography color="primary">¡Nombre actualizado con éxito!</Typography>
      )}
      {updateStatus === "failed" && (
        <Typography color="error">Error al actualizar el nombre.</Typography>
      )}
    </Box>
  );
}
