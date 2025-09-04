import EBWithLoaderComponent from "@/components/utils/EBWithLoaderComponent";
import Spinner from "@/components/utils/Spinner";

const UserDashboard = () => {
  return (
    <EBWithLoaderComponent>
      <section className="route-page">
        <Spinner />
        <h1>Drivers Page</h1>
      </section>
    </EBWithLoaderComponent>
  );
};

export default UserDashboard;
