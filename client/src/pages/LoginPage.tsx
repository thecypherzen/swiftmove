import LoginForm from "@/components/forms/LoginForm";
import type { LoginFormValuesType } from "@/components/forms/types";
import AppLogo from "@/components/utils/Logo";
import { ChartNoAxesCombined, Locate, TruckElectric } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [_, setState] = useState<LoginFormValuesType | null>(null);
  return (
    <main className="flex h-screen over-flow-y-scroll">
      {/* Left side */}
      <section
        id="left-section"
        className="hidden lg:flex lg:w-1/2 relative h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700"></div>
        <img
          src="/delivery-image.jpg"
          alt="Modern logistics Image"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
        />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-6">SwiftMove</h1>
          <p className="text-xl mb-8 opacity-85">
            Streamline your logistics operations with our comprehensive
            management platform
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Locate className="size-6 text-primary-300" />
              <span>Real-time shipment tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <ChartNoAxesCombined className="size-6 text-primary-300" />
              <span>Advanced analytics and reporting</span>
            </div>
            <div className="flex items-center space-x-3">
              <TruckElectric className="size-6 text-primary-300 scale-x-[-1]" />
              <span>Driver and fleet management</span>
            </div>
          </div>
        </div>
      </section>
      {/* Right side Form */}
      <section
        id="form-section"
        className="p-3 w-full lg:w-1/2 lg:p-0 flex flex-col justify-center items-center h-full overflow-y-auto"
      >
        <div
          id="login-form-wrapper"
          className="shadow-lg shadow-neutral-300 p-4 md:p-6 xl:px-10 rounded-md border-[.1px] border-neutral-300 w-full max-w-[400px] md:w-3/5 md:max-w-[480px] lg:w-full space-y-4"
        >
          {/* heading */}
          <div
            id="login-form-heading"
            className="p-2 flex flex-col gap-3 justify-center items-center text-center"
          >
            <AppLogo
              className="size-15 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-2 flex-col justify-center"
              variant="white"
              type="logo"
            />
            <div
              id="form-heading-text"
              className="flex flex-col items-center justify-center"
            >
              <h2 className="text-2xl font-bold text-foreground">
                Welcome Back
              </h2>
              <p className="text-muted-foreground mt-2">
                Sign in to your SwiftMove account
              </p>
            </div>
          </div>
          {/* Form */}
          <LoginForm disabled={false} setFormCredentials={setState} />
        </div>
        {/* Heading */}
      </section>
    </main>
  );
};

export default LoginPage;
