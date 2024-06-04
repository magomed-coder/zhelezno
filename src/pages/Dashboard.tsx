import Favorites from "../components/Favorites";
import LinkButton from "../components/LinkButton";

const Dashboard = () => {
  return (
    <section className="py-3">
      <h1>Дашборд</h1>
      <p>Добро пожаловать в личный кабинет!</p>
      <div className="py-1">
        <LinkButton route="/list">Список</LinkButton>
      </div>
      <Favorites />
    </section>
  );
};

export default Dashboard;
