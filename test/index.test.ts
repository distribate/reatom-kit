import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { action, atom, createCtx } from '@reatom/core'
import { withActionLog, withAtomLog } from '../src/extensions/with-log'
import { configure, config } from '../src'

const ctx = createCtx();

beforeEach(() => {
  configure(config)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('withActionLog', () => {
  test('does not log when logging is disabled', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const testAction = action(() => 1, 'testAction')
      .pipe(withActionLog())
    testAction(ctx)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('logs action call when logging is enabled', () => {
    configure({
      logging: {
        actions: true,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    configure({
      logging: {
        console: false,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const testAtom = atom(0).pipe(withAtomLog())
    testAtom(ctx, prev => --prev)

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('logs atom update when logging is enabled', () => {
    configure({
      logging: {
        console: true,
      },
    })

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const testAtom = atom(0).pipe(withAtomLog())
    testAtom(ctx, prev => ++prev)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^_atom#\d+:$/),
      1,
    )
  })
})
