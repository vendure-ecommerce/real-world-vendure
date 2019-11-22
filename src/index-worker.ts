import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';

bootstrapWorker(config).catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
