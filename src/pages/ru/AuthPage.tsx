import React, { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import AuthModal from "../../components/AuthModal";

const AuthPage = () => {
  const { openModal } = useActions();
  useEffect(() => {
    openModal();
  }, []);
  return (
    <div>
      <AuthModal />
    </div>
  );
};

export default AuthPage;
