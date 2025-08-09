import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoginFormSchema, type LoginFormType } from "./schemas";
import { cn } from "@/lib/utils.js";
import { Link } from "react-router-dom";
import Loader from "@/components/utils/Loader";
import type { LoginFormPropsType } from "./types";
import AppFormField from "./AppFormField";
import PasswordToggle from "./ShowPasswordToggle";

/**
 * @component
 * @name LoginForm
 * @param @type {React.props}
 * @description Login form component
 * @returns {React.ReactElement}
 */
const LoginForm: React.FC<LoginFormPropsType> = ({
  disabled,
  setFormCredentials,
  className,
}) => {
  // Form Definition
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form action
  const formOnSubmit = (values: LoginFormType) => {
    setFormCredentials({ ...values });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(formOnSubmit)}
        className={cn("space-y-7 w-full", className)}
      >
        <div>
          <AppFormField<LoginFormType>
            name="email"
            control={loginForm.control}
            placeholder="Enter your email"
            inputType="email"
            label="Email"
            autocomplete="current-email"
            disabled={disabled}
            id="email"
          />
        </div>
        <div>
          <>
            <AppFormField<LoginFormType>
              id="password"
              name="password"
              placeholder="Enter your password"
              inputType={showPassword ? "text" : "password"}
              control={loginForm.control}
              label="Password"
              autocomplete="current-password"
              disabled={disabled}
              withElement={true}
              Element={
                <PasswordToggle show={showPassword} setShow={setShowPassword} />
              }
            />
          </>
        </div>
        <div className="flex flex-col items-center mt-5 md:flex-row md:justify-between md:mt-10 gap-5">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-600 disabled:bg-primary-600 py-5 cursor-pointer w-full md:w-1/3 lg:w-1/4 flex gap-3"
            disabled={disabled}
          >
            {disabled && (
              <Loader
                size={"4"}
                className="text-neutral-300 fill-neutral-100"
              />
            )}
            Login
          </Button>
          <p className="text-muted-600 text-sm text-center md:text-right">
            Don't have an account?&nbsp;&nbsp;
            <span className="font-semibold text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:cursor-pointer">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
