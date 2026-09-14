import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { action, atom, createCtx } from '@reatom/core'
import { reatomAsync } from '@reatom/async';
import { withActionLog, withAtomLog, withCallParams } from '../src/extensions'
import { configure, config } from '../src/config'

beforeEach(() => {
  configure(config)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('withActionLog', () => {
  test('does not log when logging is disabled', () => {
    const ctx = createCtx();

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

    const testAction = action(() => 1, 'testAction')
      .pipe(withActionLog())
    testAction(ctx)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('logs action call when logging is enabled', () => {
    const ctx = createCtx();

    configure({
      logging: {
        actions: true,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

    const testAction = action(() => 1, 'testAction')
      .pipe(withActionLog())
    testAction(ctx)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Action called: testAction',
      expect.anything(),
    )
  })
})

describe('withAtomLog', () => {
  test('does not log when logging is disabled', () => {
    const ctx = createCtx();

    configure({
      logging: {
        atoms: false,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

    const testAtom = atom(0).pipe(withAtomLog())
    testAtom(ctx, prev => --prev)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('logs atom update when logging is enabled', () => {
    const ctx = createCtx();

    configure({
      logging: {
        atoms: true,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

    const testAtom = atom(0).pipe(withAtomLog())
    testAtom(ctx, prev => ++prev)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^_atom#\d+:$/),
      1,
    )
  })
})

describe('withCallParams', () => {
  test('stores call params in atom', async () => {
    const ctx = createCtx();

    const actionTarget = 2;
    const actionPayload = "test";

    const testAction = reatomAsync(async (_, target: number, payload: string) => ({ target, payload }), {
      onFulfill: (ctx) => {
        const callParams = ctx.get(testAction.callParamsAtom);
        expect(callParams).toEqual([actionTarget, actionPayload])
      }
    }).pipe(withCallParams())

    await testAction(ctx, actionTarget, actionPayload)
  })
})
