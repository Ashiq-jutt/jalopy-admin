import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/admin/Dashboard";
import Restaurants from "./components/adminComponents/restaurants/Restaurants";
//import Driver from "./components/adminComponents/driver/Restaurants"; 
import RidePartner from "./components/adminComponents/RidePartner/RidePartner"
import Requests from "./components/adminComponents/Requests/Requests";
import Reject from "./components/adminComponents/request/Reject";
//import RestaurantDetail from "./components/adminComponents/restaurants/RestaurantDetail";
import CustomResponse from "./components/adminComponents/request/CustomResponce";
import PricingModel from "./components/adminComponents/pricingModel/PricingModel";
import Reports from "./pages/admin/Reports";
import Sales from "./pages/admin/Sales";
import Invoice from "./pages/admin/Invoice";
import Billing from "./pages/admin/Billing";
import CampainPerformance from "./pages/admin/CampainPerformance";
import ChateWithPartner from "./pages/admin/ChateWithPartner";
import AppSetting from "./pages/admin/AppSetting";
import DashboardSeller from "./pages/seller/DashboardSeller";
import OrderSeller from "./pages/seller/OrderSeller";
import Customers from "./pages/seller/Customers";
import MenuCatalogue from "./pages/seller/MenuCatalogue";
import MenuList from "./pages/seller/MenuList";
import AddMenu from "./pages/seller/AddMenu";
import MenuDetail from "./pages/seller/MenuDetail";
import Promotion from "./pages/seller/Promotion";
import ShowAllNotifications from "./pages/admin/AllNotification";
import Signup from "./pages/Signup";
import Driver from "./components/adminComponents/driver/Driver";
import DriverDahboard from "./pages/driver/Dashboard";
import DriverReports from "./pages/driver/Reports";
import ChatWithAdmin from "./pages/driver/ChatWithAdmin";
import DriverAccountProfile from "./pages/driver/Account.jsx";
import CarList from "./pages/driver/Car-List/Car-List";
import AddNewDriver from "./pages/driver/Car-List/pages/Add-New-Driver";
import Ride from "./pages/driver/Car-List/pages/Ride";
import PartnerForm from "./pages/seller/PartnerForm";
import SellerDeliveryPickupFreeRide from "./pages/seller/FreeRide";
import DeliveryPickup from "./pages/seller/DeliveryPickup";
import SellerPayments from "./pages/seller/Payments";
import SellerAccount from "./pages/seller/Settings";
import SellerReports from "./pages/seller/SellerReports";
import SellerReviews from "./pages/seller/Reviews";
import SellerChatWithAdmin from "./pages/seller/SellerChatWithAdmin";
import SellerTopRanking from "./pages/seller/SellerTopRanking";
import BecomeSeller from "./pages/BecomeSeller";
import BecomeRider from "./pages/BecomeRider";
import Cars from "./components/adminComponents/Car/Car";
import { useEffect, useState } from "react";
import TopRankingNav from "./components/adminComponents/topranking-nav/Top-Ranking.jsx";
import SupportTicketNav from "./components/adminComponents/supportticketnav/SupportTicket.jsx";
import WebsiteMain from "./pages/Website/Website-Main.jsx";

const App = () => {
  const [showUserPanel, setShowUserPanel] = useState(false)
  let user = localStorage.getItem("typeOfUser")
  const [isGerman, setIsGerman] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for managing notification list visibility
  useEffect(() => {
    document.addEventListener("click", () => {

      setIsNotificationOpen(false)

      setShowUserPanel(false)


    }, false)
  }, [])
  return (
    <Routes>

      <Route path="/" element={<WebsiteMain isGerman={isGerman} />} />
      <Route path="/Login" element={<Login isGerman={isGerman} />} />

      <Route path="signup" element={<Signup />} />
      <Route path="BecomeSeller" element={<BecomeSeller />} />
      <Route path="BecomeRider" element={<BecomeRider />} />
      <Route path="sidebar" element={<SideBar showUserPanel={showUserPanel} setShowUserPanel={setShowUserPanel} isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="RidePartner" element={<RidePartner />} />
        <Route path="Free-Ride" element={<SellerDeliveryPickupFreeRide />} />
        <Route path="partner-form" element={<PartnerForm />} />
        <Route path="drivers" element={<Driver />} />
        <Route path="Car" element={<Cars />} />
        <Route path="requests" element={<Requests />} />
        <Route path="AllNotifications" element={<ShowAllNotifications />} />
        <Route path="requests/reject" element={<Reject />} />
        {/* <Route
          path="requests/restaurantdetail"
          element={<RestaurantDetail />}
        />   */}
        <Route
          path="requests/reject/customresponce"
          element={<CustomResponse />}
        />

        <Route path="pricingmodel" element={<PricingModel />} />
        <Route path="report" element={<Reports />} />
        <Route path="topranking" element={<TopRankingNav />} />
        <Route path="Delivery-Pickup" element={<DeliveryPickup />} />
        <Route path="supporttickets" element={<SupportTicketNav />} />
        <Route path="sales" element={<Sales />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="billing" element={<Billing />} />
        <Route path="campain" element={<CampainPerformance />} />
        <Route path="chatwithpartner" element={<ChateWithPartner />} />
        <Route path="appsetting" element={<AppSetting />} />
        <Route path="seller-reports" element={<SellerReports />} />
        <Route path="DashboardSeller" element={<DashboardSeller />} />
        <Route path="OrderSeller" element={<OrderSeller />} />
        <Route path="Customers" element={<Customers />} />
        <Route path="MenuCatalogue" element={<MenuCatalogue />} />
        <Route path="menulist" element={<MenuList />} />
        <Route path="addmenu" element={<AddMenu />} />
        <Route path="menudetail" element={<MenuDetail />} />
        <Route path="PromotionOffer" element={<Promotion />} />
        <Route path="dashboardDriver" element={<DriverDahboard />} />
        <Route path="DriverReports" element={<DriverReports />} />
        <Route path="Driver-Chat-With-Admin" element={<ChatWithAdmin />} />
        <Route path="Driver-Account" element={<DriverAccountProfile isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />} />
        <Route path='Seller-TopRanking' element={<SellerTopRanking />} />
        <Route path="Car-Lists" element={<CarList />} />
        <Route path="Add-New-Driver" element={<AddNewDriver />} />
        <Route path="Ride" element={<Ride />} />
        <Route path="Seller-Payments" element={<SellerPayments />} />
        <Route path="seller-reviews" element={<SellerReviews />} />
        <Route path="sellerchatwithadmin" element={<SellerChatWithAdmin />} />
        <Route path="Seller-Account" element={<SellerAccount setIsNotificationOpen={setIsNotificationOpen} isNotificationOpen={isNotificationOpen} />} />

      </Route>
    </Routes>
  );
};

export default App;
