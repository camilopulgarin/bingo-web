import { Container } from "@mui/material";
import UserSettingsHeader from "./components/UserSettingsHeader";
import UserInfoForm from "./components/UserInfoForm";
import ChangePasswordForm from "./components/ChangePasswordForm";


export default function UserSettings() {
  return (
    <Container maxWidth="lg" className="flex flex-col lg:flex-row gap-6 justify-evenly ">
      <div className="flex-1 mt-16 p-6  rounded-xl  space-y-6 text-gray-600  "style={{ backgroundColor: '#e8b647',  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <UserSettingsHeader />
        <UserInfoForm />
      </div>
      <div className="flex-1 mt-15 p-6  rounded-xl  space-y-6 text-gray-600 " style={{ backgroundColor: '#e8b647',  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ChangePasswordForm/>
      </div>
    </Container>
  );
}
