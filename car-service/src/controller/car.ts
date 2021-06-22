import { RouterContext } from "koa-router";
import * as CarQueries from '../model/car';
import _ from 'lodash';
import bunyan from "bunyan";
const log = bunyan.createLogger({ name: "CarRouter" });

interface CustomContext extends RouterContext {
    checkParams: (value: string) => any;
    checkQuery: (value: string) => any;
    errors: any;
}

export async function getOneCar(ctx: CustomContext) {
    ctx.checkParams('id').notEmpty().isAlphanumeric();
    if (ctx.errors && ctx.errors.length) {
        ctx.body = ctx.errors[0];
        return;
    }

    const result = await CarQueries.getOne(ctx.params.id);
    if (!result) {
        ctx.status = 404;
        ctx.body = 'no results found';
        return;
    }

    ctx.body = result;
}

export async function getCars(ctx: CustomContext) {
    ctx.checkQuery('make').optional().isAlphanumeric();
    ctx.checkQuery('model').optional().isAlphanumeric();
    ctx.checkQuery('color').optional().isAlpha();
    ctx.checkQuery('category').optional().isAlpha();
    ctx.checkQuery('mileage_gt').optional().isNumeric();
    ctx.checkQuery('mileage_lt').optional().isNumeric();
    ctx.checkQuery('price_cents_gt').optional().isNumeric();
    ctx.checkQuery('price_cents_lt').optional().isNumeric();
    ctx.checkQuery('year').optional().isNumeric();
    if (ctx.errors && ctx.errors.length) {
        ctx.body = ctx.errors[0];
        return;
    }

    const params = ['make', 'model', 'color', 'category', 'mileage_gt', 'mileage_lt', 'price_cents_gt', 'price_cents_lt', 'year'];
    const results = await CarQueries.list(_.pick(ctx.query, params));
    if (!results.length) {
        ctx.status = 404;
    }

    ctx.body = results;
}

export async function handleErrors(ctx: CustomContext, next: any) {
    try {
        await next();
    } catch (err) {
        log.error(err.status);
        err.status = 500;
        ctx.status = 500;
        ctx.body = 'Unexpected system error';
        ctx.app.emit('error', err, ctx);
    }
}
