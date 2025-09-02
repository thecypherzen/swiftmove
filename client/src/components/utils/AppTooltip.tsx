import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const AppTooltip = ({
  arrowStyle,
  trigger,
  content,
  className,
}: TooltipPropsType) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost" className={cn(className)}>
          {trigger}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="tooltip-content" arrowStyle={arrowStyle}>
        {content instanceof String ? <p>{content}</p> : content}
      </TooltipContent>
    </Tooltip>
  );
};

type TooltipPropsType = {
  className?: string;
  trigger: string | React.ReactNode;
  content: string | React.ReactNode;
  arrowStyle?: string;
};
export default AppTooltip;
