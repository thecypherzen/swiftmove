import SignupForm from "@/components/forms/SignUpForm";
import type { SignupFormSubmitType } from "@/components/forms/types";
import AuthImageSection from "@/components/sections/RegisterPageImageSection";
import AppLogo from "@/components/utils/Logo";
import { useState } from "react";

const SignUpPage = () => {
  const [credentials, setCredentials] = useState<SignupFormSubmitType | null>(
    null
  );
  console.log("signup page credentials", credentials);
  return (
    <main className="flex h-screen">
      {/* Right side */}
      <AuthImageSection
        id="image-section"
        className="order-last"
        imgUrl="https://images.unsplash.com/photo-1612115958726-9af4b6bd28d1?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=800"
      />
      {/* Right side Form */}
      <section
        id="form-section"
        className="p-3 w-full lg:w-1/2 lg:p-0 flex flex-col justify-center items-center h-full overflow-hidden"
      >
        <div
          id="signup-form-wrapper"
          className="shadow-lg shadow-neutral-300 p-4 md:p-6 xl:px-10 rounded-md border-[.1px] border-neutral-300 w-full max-w-[400px] md:w-3/5 md:max-w-[480px] lg:w-full min-h-[50vh] max-h-[90vh] flex flex-col gap-5 @container"
        >
          {/* heading */}
          <div
            id="signup-form-heading"
            className="h-[150px] p-2 flex flex-col gap-3 justify-center items-center text-center"
          >
            <AppLogo
              className="size-15 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-2 flex-col justify-center"
              variant="white"
              type="logo"
            />
            <div
              id="signup-form-heading-text"
              className="flex flex-col items-center justify-center"
            >
              <h2 className="text-2xl font-bold text-foreground">Welcome</h2>
              <p className="text-muted-foreground mt-2">
                A Few Steps to Creating Your SwiftMove Account
              </p>
            </div>
          </div>
          <div className="overflow-y-auto px-4">
            {/* Form */}
            <SignupForm disabled={false} setFormCredentials={setCredentials} />
          </div>
        </div>
        {/* Heading */}
      </section>
    </main>
  );
};

export default SignUpPage;
