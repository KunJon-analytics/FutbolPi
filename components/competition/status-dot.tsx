import { Competition } from "@prisma/client";

export interface StatusDotProps
  extends Pick<Competition, "isActive" | "type"> {}

export function StatusDot({ isActive, type }: StatusDotProps) {
  if (!isActive) {
    return (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-2 w-2 rounded-full bg-orange-500" />
      </span>
    );
  }

  return type === "Cup" ? (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/80 opacity-75 duration-1000" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
    </span>
  ) : (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/80 opacity-75 duration-1000" />
      <span className="absolute inline-flex h-2 w-2 rounded-full bg-blue-500" />
    </span>
  );
}
