import LinkButton from "../components/ListButton";

const NotFound = () => {
  return (
    <div className="flex hfull flex-center text-center">
      <div>
        <h1 className="my-2">404 - Page Not Found</h1>
        <p className="my-2">
          К сожалению, страница, которую вы ищете, не существует.
        </p>
        <div>
          <LinkButton route="/">Вернуться на гравную страницу</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
