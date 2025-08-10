import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SignupFormSchema, type SignupFormType } from "./schemas";
import { cn } from "@/lib/utils.js";
import { Link } from "react-router-dom";
import Loader from "@/components/utils/Loader";
import type { SignupFormPropsType } from "./types";
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
const SignupForm: React.FC<SignupFormPropsType> = ({
  disabled,
  setFormCredentials,
  className,
}) => {
  // Form Definition
  const loginForm = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("user");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  // form action
  const formOnSubmit = (values: SignupFormType) => {
    setFormCredentials({ ...values, accountType, acceptTerms });
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(formOnSubmit)}
        className={cn("space-y-7 w-full", className)}
      >
        <div>
          <AppFormField<SignupFormType>
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
            <AppFormField<SignupFormType>
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
        {/* Account Type Select */}
        <div className="space-y-1 space-y-3">
          <Label htmlFor="account-type" className="label mb-2">
            {" "}
            Account Type{" "}
          </Label>
          <Select
            defaultValue={"user"}
            name="accountType"
            value={accountType}
            onValueChange={setAccountType}
          >
            <SelectTrigger className="w-full h-6 py-6">
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
          {accountType === "admin" && (
            <p className="text-xs font-medium italic text-warning px-2">
              Admin accounts require approval and so you won't be able to sign
              in immediately{" "}
            </p>
          )}
        </div>
        {/* Remember Me, Forgot Password */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="accept-terms"
            name="acceptTerms"
            disabled={disabled}
            checked={acceptTerms}
            onCheckedChange={() => setAcceptTerms(!acceptTerms)}
            required={true}
          />
          <Label htmlFor="accept-terms">
            Accept our&nbsp;
            <Link
              to="#"
              className="text-primary-600 font-medium hover:underline cursor-pointer"
            >
              Privacy policy&nbsp;
            </Link>
            and&nbsp;
            <Link
              to="#"
              className="text-primary-600 font-medium hover:underline cursor-pointer"
            >
              Terms
            </Link>
          </Label>
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
            Sign Up
          </Button>
          <p className="text-muted-600 text-sm text-center @md:text-right">
            Already have an account?&nbsp;&nbsp;
            <span className="font-semibold text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:cursor-pointer">
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
