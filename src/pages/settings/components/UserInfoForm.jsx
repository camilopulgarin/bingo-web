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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserInfoForm() {
  const dispatch = useDispatch();
  const {
    data: user,
    loading,
    error,
    updateStatus,
    updateError,
  } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [originalName, setOriginalName] = useState("");

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user?.user?.name) {
      setName(user.user.name);
      setOriginalName(user.user.name);
    }
  }, [user]);

  const handleSave = () => {
    dispatch(
      updateUserThunk({
        id: user.user.id,
        name,
        email: user.user.email,
        password: user.user.password || "*****", 
      })
    );
  };

  const handleCancel = () => {
    setName(originalName);    
    setEditing(false);         
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      setEditing(false);
      toast.success("¡Nombre actualizado con éxito!");
    }

    if (updateStatus === "failed" && updateError) {
      const message =
        typeof updateError === "string"
          ? updateError
          : updateError.message || "Error al actualizar usuario.";
      toast.error(message);
    }
  }, [updateStatus, updateError]);

  useEffect(() => {
    if (error) {
      const message =
        typeof error === "string"
          ? error
          : error.message || "Error al cargar la información del usuario.";
      toast.error(message);
    }
  }, [error]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
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
          <Button onClick={handleCancel}>Cancelar</Button>
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
}
