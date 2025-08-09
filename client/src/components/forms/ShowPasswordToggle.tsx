import type React from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

/**
 * @component Input Password toggle button
 * @param props @type {React.props}
 * @returns {HTMLButtonElement}
 */
const PasswordToggle: React.FC<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute cursor-pointer right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={() => setShow(!show)}
    >
      {show ? (
        <EyeOff className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Eye className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
};

export default PasswordToggle;
