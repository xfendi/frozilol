import { AuthData } from "@/context/authContext";
import React from "react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const { logout } = AuthData();

  const handleClick = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn-outline !bg-red-800 !border-red-700 hover:!bg-red-900 hover:!border-red-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
