import { Toaster } from "../ui/sonner";
import { type ToasterProps } from "sonner";
import Loader from "./Loader";
import { useTheme } from "@/hooks/UseTheme";

const Notice: React.FC<ToasterProps> = ({
  position = "bottom-right",
  expand = true,
}) => {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        richColors
        closeButton
        theme={theme}
        position={position}
        expand={expand}
        icons={{
          loading: <Loader className="size-4 mr-1 fill-muted-foreground" />,
        }}
      />
    </>
  );
};

export default Notice;
