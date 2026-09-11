import { type Action, type Atom } from "@reatom/core"
import { config } from '../config'

export function withAtomLog<T extends Atom<any>>() {
  return (atom: T): T => {
    if (!config.logging.console) return atom;

    atom.onChange((_, s) => {
      const name = atom.__reatom.name || 'unnamed'
      console.log(`${name}:`, s)
    })

    return atom
  }
}

export function withActionLog<T extends Action>({
  withParams = true, withCause = false
} = {}): (target: T) => T {
  return (target) => {
    if (!config.logging.actions) return target;

    target.onCall((ctx, __, params) => {
      const name = target.__reatom.name || 'anonymous action';

      const result: {
        cause: typeof ctx.cause | null,
        params?: typeof params,
      } = {
        cause: withCause ? ctx.cause : null,
      };

      if (withParams) {
        result.params = params;
      }

      console.log(`Action called: ${name}`, ...(result ? [result] : []));
    })

    return target;
  };
}
