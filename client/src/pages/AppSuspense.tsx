import Spinner from "@/components/utils/Spinner";

const AppSuspense = () => {
  return (
    <div className="w-full h-9/10 bg-background text-foreground flex flex-col items-center justify-center">
      <Spinner size={8} />
    </div>
  );
};

export default AppSuspense;
