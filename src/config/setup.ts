export type ReatomKitConfig = {
  logging: {
    actions: boolean,
    atoms: boolean
  },
}

export type ReatomKitConfigInput = {
  logging?: Partial<ReatomKitConfig['logging']>
}

/**
 * The default configuration for ReatomKit.
 */
export const config: ReatomKitConfig = {
  logging: {
    actions: false,
    atoms:
      // Console logging is enabled by default in Vite's development mode
      // and disabled otherwise.
      // @ts-ignore
      typeof import.meta.env["DEV"] === "boolean" ? import.meta.env["DEV"] : false
  },
}

/**
 * Configures the ReatomKit logger.
 */
export function configure(next: ReatomKitConfigInput): void {
  if (next.logging) {
    config.logging = {
      ...config.logging,
      ...next.logging,
    }
  }
}
