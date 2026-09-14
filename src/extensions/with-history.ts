import { type Atom, atom, type AtomState } from "@reatom/core"

/**
 * Adds a `history` atom to the target atom, which keeps track of the atom's state over time.
 * @param length
 */
export function withHistory<T extends Atom>(length = 2): (target: T) => T & {
  history: Atom<[current: AtomState<T>, ...past: Array<AtomState<T>>]>
} {
  return (target) =>
    Object.assign(target, {
      history: atom(
        (ctx, state = []) =>
          [ctx.spy(target), ...state.slice(0, length)] as [current: AtomState<T>, ...past: Array<AtomState<T>>],
      ),
    })
}
