import { LanguageCode } from "@vendure/common/lib/generated-types";
import {
  Logger,
  PaymentMethodHandler,
  CreatePaymentResult,
} from "@vendure/core";

import { extractMetadataFromTransaction, getGateway } from "./braintree-common";
import { loggerCtx } from "./constants";

/**
 * The handler for Braintree payments.
 */
export const braintreePaymentMethodHandler = new PaymentMethodHandler({
  code: "braintree",
  description: [
    { languageCode: LanguageCode.en, value: "Braintree" },
    { languageCode: LanguageCode.it, value: "Braintree" },
  ],
  args: {
    merchantId: { type: "string" },
    publicKey: { type: "string" },
    privateKey: { type: "string" },
    merchantAccountId: { type: "string" },
    live: { type: "boolean" },
  },

  createPayment: async (
    ctx,
    order,
    amount,
    args,
    metadata
  ): Promise<CreatePaymentResult> => {
    const gateway = getGateway(args);
    try {
      const response = await gateway.transaction.sale({
        amount: (order.totalWithTax / 100).toString(10),
        orderId: order.code,
        paymentMethodNonce: metadata.nonce,
        options: {
          submitForSettlement: false,
        },
      });
      if (!response.success) {
        return {
          amount: order.totalWithTax,
          state: "Declined" as const,
          transactionId: response.transaction.id,
          errorMessage: response.message,
          metadata: extractMetadataFromTransaction(response.transaction),
        };
      }
      return {
        amount: order.totalWithTax,
        state: "Authorized" as const,
        transactionId: response.transaction.id,
        metadata: extractMetadataFromTransaction(response.transaction),
      };
    } catch (e) {
      Logger.error(e, loggerCtx);
      return {
        amount: order.totalWithTax,
        state: "Declined" as const,
        transactionId: "",
        errorMessage: e.toString(),
        metadata: e,
      };
    }
  },

  settlePayment: async (ctx, order, payment, args) => {
    const gateway = getGateway(args);
    try {
      const response = await gateway.transaction.submitForSettlement(
        payment.transactionId
      );
      return {
        success: response.success,
        errorMessage: response.errors ? response.message : undefined,
      };
    } catch (e) {
      Logger.error(e, loggerCtx);
      return { success: false, errorMessage: e.toString() };
    }
  },

  async createRefund(ctx, input, amount, order, payment, args) {
    const gateway = getGateway(args);
    const response = await gateway.transaction.refund(
      payment.transactionId,
      (amount / 100).toString(10)
    );
    if (!response.success) {
      return {
        state: "Failed" as const,
        transactionId: response.transaction.id,
        metadata: response,
      };
    }
    return {
      state: "Settled" as const,
      transactionId: response.transaction.id,
      metadata: response,
    };
  },
});
