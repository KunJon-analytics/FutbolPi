import { OnIncompletePaymentFound } from "@/types";

export const onIncompletePaymentFound: OnIncompletePaymentFound = async (
  payment
) => {
  console.log(payment);
};
