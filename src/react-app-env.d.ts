export default interface WindowChain {
    ethereum?: {
        isMetaMask?: true
        request?: (...args: any[]) => void
    }
}
