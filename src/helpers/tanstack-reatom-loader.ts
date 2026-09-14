import { action, isAction, type Ctx } from "@reatom/core";
import { abortCauseContext } from "@reatom/effects";
import type { LoaderFnContext } from '@tanstack/react-router'

type RouterContext = {
  reatomCtx: Ctx;
}

/**
 * TanStack React Router loader function that wraps a Reatom async action.
 */
export const tanstackReatomLoader = <
  T extends {
    abortController: AbortController;
    context: RouterContext;
    params: LoaderFnContext['params'];
  },
>(
  cb: (ctx: Ctx, params: T['params']) => any,
  name: undefined | string = isAction(cb)
    ? `${cb.__reatom.name}.loader`
    : undefined,
): ((routerCtx: T) => any) => {
  const target = action((ctx, routerCtx: T) => {
    abortCauseContext.set(ctx.cause, routerCtx.abortController);
    const result = cb(ctx, routerCtx.params);
    if (result instanceof Promise) {
      return result;
    }
  }, `${name}.target`);
  return (routerCtx: T) => target(routerCtx.context.reatomCtx, routerCtx);
};
