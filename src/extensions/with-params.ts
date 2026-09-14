import type { AsyncAction } from "@reatom/async";
import { atom, type Atom, type Fn } from "@reatom/core";

/**
 * Adds a `callParamsAtom` atom to an async action.
 */
export const withCallParams =
  <T extends AsyncAction & { callParamsAtom?: Atom<any> }>(): Fn<
    [T],
    T & {
      callParamsAtom: Atom<T extends AsyncAction<infer P, any> ? P : []>;
    }
  > =>
  //@ts-ignore
  anAsync => {
    const callParamsAtom = atom([], 'callParamsAtom');
    anAsync.onCall(async (ctx, _, params: any) => {
      callParamsAtom(ctx, params);
    });
    anAsync.callParamsAtom = callParamsAtom;
    return anAsync;
  };
