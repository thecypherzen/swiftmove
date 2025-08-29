import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const HomePageIndex = () => {
  return (
    <PageRouteWrapper>
      <div className="w-full h-[calc(100%-80px)] flex flex-col items-center justify-center text-foreground/50 dark:text-foreground/90">
        <h2>Welcome</h2>
        <p>Get started with monitoring your company</p>
      </div>
    </PageRouteWrapper>
  );
};

export default HomePageIndex;
