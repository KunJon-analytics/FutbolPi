import React from "react";
import { useLocale } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const UnstableLocaleFix = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  return <></>;
};

export default UnstableLocaleFix;
