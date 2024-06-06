"use client";

import { useFormStatus } from "react-dom";

import { Button } from "./ui/button";
import { LoadingAnimation } from "./loading-animation";
import { Icons, ValidIcon } from "./icons";

type SubmitButtonProps = { buttonText: string; icon: ValidIcon };

export function SubmitButton({ buttonText, icon }: SubmitButtonProps) {
  const Icon = Icons[icon];
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={pending}
      type="submit"
    >
      {buttonText}{" "}
      {pending ? (
        <LoadingAnimation className="ml-2" />
      ) : (
        <Icon className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
