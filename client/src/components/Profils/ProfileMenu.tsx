import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RedeemIcon from '@mui/icons-material/Redeem';
import StorefrontIcon from "@mui/icons-material/Storefront";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const menuItems = [
    { icon: <PersonOutlineIcon />, label: "Informations personnelles", link: "/account-info" },
    { icon: <RedeemIcon />, label: "Mes commandes", link: "/orders" },
    { icon: <StorefrontIcon />, label: "Ouvrir ma boutique", link: "/boutique" },
  ];

  return (
    <div className="profile-menu-container">
      <h3 className="profile-menu-title">Gestion de votre profil</h3>
      <div className="profile-menu-card">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu;