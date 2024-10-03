import AddAdminCard from "../../components/adminComponents/appsettings/AddAdminCard";
import AccountDetail from "../../components/adminComponents/appsettings/AccountDetail";
import FeatureAndIntegration from "../../components/adminComponents/appsettings/FeatureAndIntegration";

const AppSetting = () => {
  return (
    <div className="font-poppins mt-[50px] p-10">
      <p className="text-[21px] text-main-color font-bold">Settings</p>
      <AddAdminCard />
      <AccountDetail />
      <FeatureAndIntegration />
    </div>
  );
};

export default AppSetting;
