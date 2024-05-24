"use client"

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import "@solana/wallet-adapter-react-ui/styles.css"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect } from "react"

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (res) => res.WalletMultiButton
    ),
  { ssr: false }
)

export default function Home() {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const { data } = useQuery({
    queryKey: ["balance", wallet],
    queryFn: async () => {
      if (!wallet || !wallet.publicKey) return 0
      return await connection.getBalance(wallet.publicKey)
    },
  })

  return (
    <div className="flex items-center flex-col space-y-4 w-full mt-[100px]">
      <WalletMultiButton />
      <div className="flex flex-col items-center space-y-4 rounded-md !mt-[50px] px-8 py-4 bg-slate-800 text-slate-100 shadow-[gray_3px_3px_5px_1px]">
        <div>{wallet?.publicKey.toBase58()}</div>
        <div>{(data ?? 0) / LAMPORTS_PER_SOL} SOL</div>
      </div>
    </div>
  )
}
