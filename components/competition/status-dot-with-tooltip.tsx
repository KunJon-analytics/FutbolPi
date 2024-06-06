import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import type { StatusDotProps } from "./status-dot";
import { StatusDot } from "./status-dot";

export interface StatusDotWithTooltipProps extends StatusDotProps {}

export function StatusDotWithTooltip({
  isActive,
  type,
}: StatusDotWithTooltipProps) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>
          <StatusDot {...{ isActive, type }} />
        </TooltipTrigger>
        <TooltipContent>
          {isActive
            ? type === "Cup"
              ? "Competion is in Cup format"
              : "Competion is in League format"
            : "Competition is inactive"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
