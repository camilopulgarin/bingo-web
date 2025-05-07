import { Container } from "@mui/material";
import UserSettingsHeader from "../../components/UserSettingsHeader";
import UserInfoForm from "../../components/UserInfoForm";
import ChangePasswordForm from "../../components/ChangePasswordForm";


export default function UserSettings() {
  return (
    <Container maxWidth="lg" className="flex flex-col lg:flex-row gap-6 justify-evenly">
      <div className="flex-1 mt-15 p-6  rounded-xl  space-y-6 text-gray-600 bg-transparent shadow-[0_0_20px_2px_#000]" >
        <UserSettingsHeader />
        <UserInfoForm />
      </div>
      <div className="flex-1 mt-15 p-6  rounded-xl  space-y-6 text-gray-600 bg-transparent shadow-[0_0_20px_2px_#000]">
        <ChangePasswordForm/>
      </div>
    </Container>
  );
}
