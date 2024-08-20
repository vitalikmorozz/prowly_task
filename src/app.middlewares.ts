import { INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser';

export function applyMiddlewares(app: INestApplication) {
    // Increase the limit to 10MB or another suitable value
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
}
