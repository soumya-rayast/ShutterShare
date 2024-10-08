import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";
import Analytics from "../components/Analytics";
import Orders from "../components/Orders";
import { useSelector } from "react-redux";
import PhotoPurchased from "../components/buyer/Photopurchased";
import Favourites from "../components/Favourites";

const BuyerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab)
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div>
        {
          (() => {
            switch (tab) {
              case "photos-purchased":
                return <PhotoPurchased />;
              case "analytics":
                return <Analytics />;
              case 'orders':
                return <Orders />
                case 'favourites':
                return <Favourites/>
              default:
                return <PhotoPurchased />
            }
          })()
        }
      </div>
    </div>
  );
}

export default BuyerDashboard