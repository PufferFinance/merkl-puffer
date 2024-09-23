export const chains = {
    1: {
        label: "Ethereum",
        short: "eth",
        asset: (await import('../assets/chains/eth.svg?url')).default
    }
}

export type ChainId = keyof typeof chains;