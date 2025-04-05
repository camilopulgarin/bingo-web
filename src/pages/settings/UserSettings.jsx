import { Container } from "@mui/material";
import UserSettingsHeader from "../../components/UserSettingsHeader";
import UserSettingsForm from "../../components/UserSettingsForm";


export default function UserSettings() {
  return (
    <Container maxWidth="sm">
      <div className="mt-2 p-6 bg-white rounded-xl shadow-md space-y-6 text-gray-600">
        <UserSettingsHeader />
        <UserSettingsForm />
      </div>
    </Container>
  );
}
