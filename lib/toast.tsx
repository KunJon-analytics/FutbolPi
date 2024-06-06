import type { ExternalToast } from "sonner";
import { toast } from "sonner";

type ToastType =
  | "default"
  | "description"
  | "success"
  | "warning"
  | "info"
  | "error"
  | "promise";

const config = {
  error: {
    type: "error",
    title: "Something went wrong",
    description: "Please try again",
    // action: {
    //   label: "Discord",
    //   onClick: () => window.open("/discord", "_blank")?.location,
    // },
  },

  success: { type: "success", title: "Success" },
  deleted: { type: "success", title: "Deleted successfully" }, // TODO: we are not informing the user besides the visual changes when an entry has been deleted
  removed: { type: "success", title: "Removed successfully" },
  saved: { type: "success", title: "Saved successfully" },
} as const;

const _config: Record<
  string,
  Pick<ExternalToast, "action" | "description"> & {
    type: ToastType;
    title: string;
  }
> = config;

type ToastAction = keyof typeof config;

export function toastAction(action: ToastAction) {
  const { title, type, ...props } = _config[action];

  if (type === "default") return toast(title, props);
  if (type === "success") return toast.success(title, props);
  if (type === "error") return toast.error(title, props);
  if (type === "warning") return toast.warning(title, props);
  if (type === "description") return toast.message(title, props);
  if (type === "info") return toast.info(title, props);
}

export { toast };
