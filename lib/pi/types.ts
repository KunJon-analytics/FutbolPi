import type { AxiosResponse } from "axios";

import { $Enums } from "@prisma/client";
import { PaymentDTO } from "@/types";

export type PaymentDTOMemo = {
  type: $Enums.PiTransactionType;
  purpose: string;
};

export type OnIncompletePaymentFound = (
  payment: PaymentDTO<PaymentDTOMemo>
) => Promise<void>;

export interface PiCallbacks<T> {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => Promise<AxiosResponse<any, any>>;
  onError: (error: Error, payment?: PaymentDTO<T>) => void;
}
