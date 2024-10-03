import Axios from "axios";

export const stats = async () => {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  
  try {
    const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/PartnerStatistics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
  } catch (error) {
    return "error";
  }
};  
export const registrationStats = async () => {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  
  try {
    const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/RegisterationStatistics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
  } catch (error) {
    return "error";
  }
};   
export const invoiceStats = async () => {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  
  try {
    const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/InvoiceStatistics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
  } catch (error) {
    return "error";
  }
};  
 
export const notificationsList = async () => {
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  
  try {
    const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Notification/List`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
  } catch (error) {
    return "error";
  }
};   
