import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const HomePageIndex = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page w-full min-h-[calc(100%-76px)] flex flex-col items-center justify-center">
        <h2>Welcome</h2>
        <p>Get started with monitoring your company</p>
      </div>
    </PageRouteWrapper>
  );
};

export default HomePageIndex;
