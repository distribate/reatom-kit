export type ReatomKitConfig = {
  logging: {
    actions: boolean,
    console: boolean
  },
}

export type ReatomKitConfigInput = {
  logging?: Partial<ReatomKitConfig['logging']>
}

export const config: ReatomKitConfig = {
  logging: {
    actions: false,
    // Console logging is enabled by default in Vite's development mode
    // and disabled otherwise.
    // @ts-ignore
    console: typeof import.meta.env["DEV"] === "boolean" ? import.meta.env["DEV"] : false
  },
}

export function configure(next: ReatomKitConfigInput): void {
  if (next.logging) {
    config.logging = {
      ...config.logging,
      ...next.logging,
    }
  }
}
