import LoginForm from "@/components/forms/LoginForm";
import type { LoginFormValuesType } from "@/components/forms/types";
import { useState } from "react";

const LoginPage = () => {
  const [_, setState] = useState<LoginFormValuesType | null>(null);
  return (
    <div>
      <LoginForm disabled={false} setFormCredentials={setState} />
    </div>
  );
};

export default LoginPage;
