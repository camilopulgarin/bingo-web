import { Container } from "@mui/material";
import UserSettingsHeader from "../../components/UserSettingsHeader";
import UserSettingsForm from "../../components/UserSettingsForm";


export default function UserSettings() {
  return (
    <Container maxWidth="sm">
      <div className="mt-5 p-6  rounded-xl  space-y-6 text-gray-600 bg-transparent shadow-[0_0_20px_2px_#000]" >
        <UserSettingsHeader />
        <UserSettingsForm />
      </div>
    </Container>
  );
}
