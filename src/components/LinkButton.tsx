import React from "react";
import { useNavigate } from "react-router-dom";

interface LinkButtonProps {
  route: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ route, children }) => {
  const navigate = useNavigate();

  const goToRoute = () => {
    navigate(route);
  };

  return <button onClick={goToRoute}>{children}</button>;
};

export default LinkButton;
