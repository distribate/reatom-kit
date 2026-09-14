import { type Action, type Atom } from "@reatom/core"
import { config } from '../config'

/**
 * Logs atom changes to the console.
 * Note: may be configured via `logging.atoms` in the config.
 */
export function withAtomLog<T extends Atom<any>>() {
  return (target: T): T => {
    if (!config.logging.atoms) return target;

    target.onChange((_, state) => {
      console.log(`${target.__reatom.name}:`, state)
    })

    return target
  }
}

/**
 * Logs action calls to the console.
 * Note: may be configured via `logging.actions` in the config.
 */
export function withActionLog<T extends Action>({
  withParams = true, withCause = false
} = {}): (target: T) => T {
  return (target) => {
    if (!config.logging.actions) return target;

    target.onCall((ctx, __, params) => {
      const name = target.__reatom.name || 'anonymous_action';

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
