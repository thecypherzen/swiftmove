import LoginForm from "@/components/forms/LoginForm";
import type { LoginFormSubmitType } from "@/components/forms/types";
import AuthImageSection from "@/components/sections/RegisterPageImageSection";
import AppLogo from "@/components/utils/Logo";
import Notice from "@/components/utils/Notice";
import ThemeToggle from "@/components/utils/ThemeToggle";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/UseAuth";
import { LoginMutationFn } from "@/lib/RequestLibrary";
import type { UserType } from "@/shared/types";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<LoginFormSubmitType | null>(
    null
  );
  const { cache, user } = useAuth();
  const loginMutation = useMutation({
    mutationFn: LoginMutationFn,
    onSuccess: (data) => {
      cache(data as UserType);
      toast.success("Login successful!", {
        description: "Welcome to SwiftMove",
      });
    },
    onError: (err) => {
      toast.error(err?.name, {
        description: err.message,
      });
    },
  });

  useEffect(() => {
    if (credentials) {
      loginMutation.mutate(credentials);
    }
  }, [credentials]);
  return (
    <main className="flex h-screen relative">
      <ThemeToggle className="absolute top-5 right-5" />
      {/* Left side */}
      <AuthImageSection id="image-section" className="lg:self-start" />
      {/* Right side Form */}
      <section
        id="form-section"
        className="p-3 w-full lg:w-1/2 lg:p-0 flex flex-col justify-center items-center h-full"
      >
        <Notice position="top-center" />
        <div
          id="login-form-wrapper"
          className="shadow-lg shadow-neutral-300 dark:shadow-neutral-950 p-4 md:p-6 xl:px-10 rounded-md border-[.1px] border-neutral-300 dark:border-secondary w-full max-w-[400px] md:w-3/5 md:max-w-[480px] lg:w-full min-h-[50vh] max-h-[90vh] flex flex-col gap-5 @container"
        >
          {/* heading */}
          <div
            id="login-form-heading"
            className="p-2 flex flex-col gap-2 justify-center items-center text-center"
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
              <h2 className="text-3xl font-bold text-foreground">
                Welcome{user && " Back"}
              </h2>
              <p className="text-muted-foreground mt-2">
                Sign in to your SwiftMove account
              </p>
            </div>
          </div>
          <div className="overflow-y-auto px-4">
            {/* Form */}
            <LoginForm disabled={false} setFormCredentials={setCredentials} />
          </div>
        </div>
        {/* Heading */}
      </section>
    </main>
  );
};

export default LoginPage;
