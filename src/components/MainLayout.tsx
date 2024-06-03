import { Outlet } from "react-router-dom";
import Container from "./Container/Container";

const LayoutComponent = () => {
  return (
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default LayoutComponent;
