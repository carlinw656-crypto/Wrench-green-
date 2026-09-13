const numberFromEnv = (key: string, fallback: number) => {
  const value = Number(process.env[key])
  return Number.isFinite(value) ? value : fallback
}

export const limits = {
  maxOffer: numberFromEnv("MAX_OFFER", 50000),
  maxHeld: numberFromEnv("MAX_HELD", 52200),
  maxPayout: numberFromEnv("MAX_PAYOUT", 42500),
  maxKeeps: numberFromEnv("MAX_KEEPS", 9700),
  minOffer: numberFromEnv("MIN_OFFER", 2500),
  minHeld: numberFromEnv("MIN_HELD", 4700),
}

export const formatDollars = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
