import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const HomePageIndex = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page w-full flex flex-col items-center justify-center">
        <h2>Welcome</h2>
        <p>Get started with monitoring your company</p>
      </div>
    </PageRouteWrapper>
  );
};

export default HomePageIndex;
