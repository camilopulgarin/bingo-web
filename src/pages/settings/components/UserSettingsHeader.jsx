import { Avatar, Typography } from "@mui/material";

export default function UserSettingsHeader() {
  return (
    <div className="text-center">
      <Typography variant="h4" className="font-bold">Configuración de Usuario
      </Typography>
      <div className="flex justify-center mt-4">
        <Avatar sx={{ width: 80, height: 80, bgcolor: "gray" }} />
      </div>
    </div>
  );
}
