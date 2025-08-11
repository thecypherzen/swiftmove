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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cacheData, setCacheData] = useState<boolean>(false);
  const [role, setRole] = useState<string>("user");

  // form action
  const formOnSubmit = (values: LoginFormType) => {
    setFormCredentials({ ...values, role, cacheData });
  };

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
        {/* Account Type */}
        <div className="space-y-1">
          <Label htmlFor="role" className="label mb-2">
            Login As&nbsp;
          </Label>
          <Select
            defaultValue={"user"}
            name="role"
            value={role}
            onValueChange={setRole}
          >
            <SelectTrigger id="role" className="w-full h-6 py-6">
              <SelectValue placeholder="Sign In As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Account Type</SelectLabel>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Remember Me, Forgot Password */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember-me"
              name="cacheData"
              disabled={disabled}
              checked={cacheData}
              onCheckedChange={() => setCacheData(!cacheData)}
            />
            <Label htmlFor="remember-me">Remember Me</Label>
          </div>
          <Button
            id="recover-password"
            variant="link"
            className="px-0 text-normal"
            asChild
          >
            <Link
              className="text-primary-600 hover:underline"
              to="/password/recovery"
            >
              Forgot Password
            </Link>
          </Button>
        </div>
        {/* Submit Button and Extras secton */}
        <div className="flex flex-col items-center mt-5 @md:flex-row @md:justify-between @md:mt-10 gap-5">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-600 disabled:bg-primary-600 py-5 cursor-pointer w-full @md:w-1/3 @lg:w-1/4 flex gap-3"
            disabled={disabled}
          >
            {disabled && (
              <Loader
                size={"4"}
                className="text-neutral-300 fill-neutral-100"
              />
            )}
            Sign In
          </Button>
          <p className="text-muted-600 text-sm text-center @md:text-right">
            Don't have an account?&nbsp;&nbsp;
            <span className="font-semibold text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:cursor-pointer">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
