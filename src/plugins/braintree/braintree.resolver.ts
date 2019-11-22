import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Ctx,
    ID,
    InternalServerError,
    Logger,
    OrderService,
    PaymentMethod,
    RequestContext,
} from '@vendure/core';
import { Connection } from 'typeorm';

import { getGateway } from './braintree-common';
import { braintreePaymentMethodHandler } from './braintree-payment-method';
import { loggerCtx } from './constants';
import { PaymentMethodArgsHash } from './types';

@Resolver()
export class BraintreeResolver {
    constructor(@InjectConnection() private connection: Connection, private orderService: OrderService) {}

    @Query()
    async generateBraintreeClientToken(@Ctx() ctx: RequestContext, @Args() orderId: ID) {
        const order = await this.orderService.findOne(ctx, orderId);
        if (order && order.customer) {
            const customerId = order.customer.id.toString();
            const args = await this.getPaymentMethodArgs();
            const gateway = getGateway(args);
            try {
                const result = await gateway.clientToken.generate({
                    customerId,
                });
                return result.clientToken;
            } catch (e) {
                Logger.error(e);
            }
        } else {
            throw new InternalServerError(`[${loggerCtx}] Could not find a Customer for the given Order`);
        }
    }

    private async getPaymentMethodArgs(): Promise<PaymentMethodArgsHash> {
        const method = await this.connection.getRepository(PaymentMethod).findOne({
            where: {
                code: braintreePaymentMethodHandler.code,
            },
        });
        if (!method) {
            throw new InternalServerError(`[${loggerCtx}] Could not find Braintree PaymentMethod`);
        }
        return method.configArgs.reduce((hash, arg) => {
            return {
                ...hash,
                [arg.name]: arg.value,
            };
        }, {} as PaymentMethodArgsHash);
    }
}
