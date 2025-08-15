import LoginForm from "@/components/forms/LoginForm";
import type { LoginFormSubmitType } from "@/components/forms/types";
import AuthImageSection from "@/components/sections/RegisterPageImageSection";
import AppLogo from "@/components/utils/Logo";
import Notice from "@/components/utils/Notice";
import ThemeToggle from "@/components/utils/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/UseAuth";
import { LoginMutationFn } from "@/lib/RequestLibrary";
import type { APIErrorType, UserType } from "@/shared/types";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<LoginFormSubmitType | null>(
    null
  );
  const { cache, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [showAttempts, setShowAttempts] = useState<boolean>(false);
  const submittedRef = useRef(false);
  const toastIdRef = useRef<undefined | string | number>(undefined);
  const { mutate, isError, error, isSuccess, data, isPending } = useMutation<
    UserType,
    APIErrorType,
    LoginFormSubmitType
  >({ mutationFn: LoginMutationFn });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isPending) {
      toastIdRef.current = toast.loading("Hold on while we log you in...");
    } else if (isSuccess) {
      toast.success("Login successful!", {
        id: toastIdRef.current,
        description: "Taking you to you to your dashboard",
      });
      setTimeout(() => {
        cache(data);
        navigate("/dashboard", { replace: true });
      }, 1200);
    } else if (isError) {
      let description: string,
        title: string = error.name;
      switch (error.errno) {
        case 32:
          description = "An error occured.";
          break;
        case 34:
          description = `Account ${credentials?.email ?? ""} doesn't exist`;
          console.log("description:", description);
          break;
        case 26:
          description = "Sign in method not allowed.";
          break;
        case 25:
          description = "Session expired. Login again.";
          break;
        case 24:
          description = "You're already logged in";
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1000);
          break;
        case 21:
          description = "Invalid account type";
          title = "Denied";
          break;
        case 22:
          title = "Denied";
          description = "Wrong password";
          setAttemptsLeft(() => attemptsLeft - 1);
          if (!showAttempts) {
            setShowAttempts(true);
          }
          break;
        case 50:
          title = "Login failed due to an error on our part";
          description = "Report this or try again later.";
          break;
        default:
          description = error.message;
          console.log("default description:", description);
          break;
      }
      toast.error(title, { description, id: toastIdRef.current });
      submittedRef.current = false;
    }
  }, [isSuccess, isError, isPending]);

  useEffect(() => {
    if (!attemptsLeft) {
      setTimeout(() => {
        navigate("/password-reset", { replace: true });
      }, 1000);
      return;
    }
  }, [attemptsLeft]);
  useEffect(() => {
    if (submittedRef.current) {
      return;
    }
    if (credentials) {
      mutate(credentials);
      submittedRef.current = true;
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
              {showAttempts && (
                <p className="text-desructive-700 dark:text-destructive-600 text-sm">
                  <span className="font-bold">{attemptsLeft}</span>&nbsp;
                  {`attempt${attemptsLeft !== 1 ? "s" : ""}`}&nbsp;left
                </p>
              )}
            </div>
          </div>
          <div className="overflow-y-auto px-4">
            {/* Form */}
            <LoginForm
              disabled={isPending || !attemptsLeft}
              setFormCredentials={setCredentials}
            />
          </div>
        </div>
        {/* Heading */}
      </section>
    </main>
  );
};

export default LoginPage;
