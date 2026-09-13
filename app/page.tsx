"use client"

import { useState } from "react"
import { ArrowUpRight, CircleDollarSign, FileText, Gauge, HelpCircle, LayoutDashboard, Settings, ShieldCheck, Wallet } from "lucide-react"
import { limits, formatDollars } from "@/lib/config"

const offers = [
  { id: "WG-1048", customer: "Northstar Tools", amount: 18400, date: "Today, 9:42 AM", status: "Ready" },
  { id: "WG-1047", customer: "Oakline Supply", amount: 7200, date: "Today, 8:15 AM", status: "Held" },
  { id: "WG-1046", customer: "Mason & Co.", amount: 31500, date: "Yesterday", status: "Review" },
]

export default function Home() {
  const [offer, setOffer] = useState(12000)
  const [held, setHeld] = useState(8500)
  const [message, setMessage] = useState("")

  const createOffer = () => {
    if (offer < limits.minOffer || offer > limits.maxOffer) {
      setMessage(`Offer must be between ${formatDollars(limits.minOffer)} and ${formatDollars(limits.maxOffer)}.`)
      return
    }
    setMessage(`Offer created for ${formatDollars(offer)}. It is ready for review.`)
  }

  const reviewHeld = () => {
    if (held < limits.minHeld || held > limits.maxHeld) {
      setMessage(`Held amount must be between ${formatDollars(limits.minHeld)} and ${formatDollars(limits.maxHeld)}.`)
      return
    }
    setMessage(`Held balance of ${formatDollars(held)} opened for review.`)
  }

  return <div className="shell">
    <aside className="rail">
      <div className="brand"><div className="brand-mark"><WrenchIcon /></div><span>Wrench Green</span></div>
      <nav className="nav" aria-label="Main navigation">
        <button className="active"><LayoutDashboard /><span>Overview</span></button>
        <button><FileText /><span>Offers</span></button>
        <button><Wallet /><span>Held funds</span></button>
        <button><CircleDollarSign /><span>Payouts</span></button>
      </nav>
      <nav className="nav" aria-label="Support navigation">
        <button><Settings /><span>Settings</span></button>
        <button><HelpCircle /><span>Help center</span></button>
      </nav>
      <div className="rail-bottom">Workspace · Production</div>
    </aside>
    <main className="main">
      <header className="topbar"><div><div className="eyebrow">Tuesday, September 13, 2026</div><h1>Good morning, Alex</h1></div><div className="avatar" aria-label="Alex profile">AC</div></header>
      <div className="content">
        <section className="balance"><div><div className="balance-label">Available to payout</div><div className="balance-value">$42,500.00</div><p className="balance-note">Updated just now · No pending holds</p></div><button className="primary" onClick={() => setMessage("Payout request started. Your balance is within the payout limit.")}>Initiate payout <ArrowUpRight data-icon="inline-end" /></button></section>
        <div className="section-head"><h2>Today at a glance</h2><button className="link">View report <ArrowUpRight data-icon="inline-end" /></button></div>
        <section className="grid" aria-label="Account summary"><Stat icon={<Gauge />} label="Active offers" value="12" meta="+3 this week" /><Stat icon={<ShieldCheck />} label="Held funds" value="$8,500" meta="Within limits" /><Stat icon={<CircleDollarSign />} label="Keeps this month" value="$4,280" meta="+12.4% vs. last month" /><Stat icon={<Wallet />} label="Next payout" value="Sep 15" meta="2 days away" /></section>
        <div className="section-head"><h2>Offer activity</h2><button className="link">See all offers <ArrowUpRight data-icon="inline-end" /></button></div>
        <section className="layout"><div className="card table-card"><table><thead><tr><th>Offer</th><th>Customer</th><th>Amount</th><th className="hide-mobile">Created</th><th>Status</th></tr></thead><tbody>{offers.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.customer}</td><td>{formatDollars(item.amount)}</td><td className="hide-mobile">{item.date}</td><td><span className="status">{item.status}</span></td></tr>)}</tbody></table></div><section className="action-card"><h3>Make a new offer</h3><p>Set an amount within your workspace limits and send it to your customer for review.</p><div className="field"><label htmlFor="offer">Offer amount</label><input id="offer" type="number" min={limits.minOffer} max={limits.maxOffer} value={offer} onChange={(event) => setOffer(Number(event.target.value))} /></div><button className="primary" onClick={createOffer}>Create offer <ArrowUpRight data-icon="inline-end" /></button><div className="limit"><span>Offer range</span><strong>{formatDollars(limits.minOffer)} – {formatDollars(limits.maxOffer)}</strong></div><div className="field" style={{ marginTop: 20 }}><label htmlFor="held">Held amount to review</label><input id="held" type="number" min={limits.minHeld} max={limits.maxHeld} value={held} onChange={(event) => setHeld(Number(event.target.value))} /></div><button className="primary" onClick={reviewHeld}>Review held funds</button>{message && <p className="feedback" role="status">{message}</p>}</section></section>
      </div>
    </main>
  </div>
}

function WrenchIcon() { return <span style={{ fontSize: 18, lineHeight: 1 }}>W</span> }
function Stat({ icon, label, value, meta }: { icon: React.ReactNode, label: string, value: string, meta: string }) { return <div className="card"><div style={{ color: "var(--green)" }}>{icon}</div><div className="card-label">{label}</div><div className="card-value">{value}</div><div className="card-meta">{meta}</div></div> }
