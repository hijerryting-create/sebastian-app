import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Agent } from '@/types'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface HeartbeatProps {
  agents: Agent[]
}

const CARD_POSITIONS = [
  'top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+32px)]',       // top center
  'top-1/2 right-0 translate-x-[calc(100%+32px)] -translate-y-1/2',        // right
  'bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+32px)]',      // bottom center
  'top-1/2 left-0 -translate-x-[calc(100%+32px)] -translate-y-1/2',        // left
  'top-0 right-0 translate-x-[calc(100%+16px)] -translate-y-[calc(100%-16px)]', // top-right
]

const STATUS_COLORS: Record<string, string> = {
  deployed: 'bg-success',
  draft: 'bg-accent',
  paused: 'bg-warning',
  error: 'bg-danger',
}

export function Heartbeat({ agents }: HeartbeatProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const deployedAgents = agents.filter(a => a.status === 'deployed')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const W = 260
    const H = 80

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    let t = 0
    let animId: number

    function ekg(x: number): number {
      const cycle = x % 1
      if (cycle < 0.1) return 0
      if (cycle < 0.15) return -8
      if (cycle < 0.2) return 30
      if (cycle < 0.25) return -12
      if (cycle < 0.3) return 4
      if (cycle < 0.35) return 0
      if (cycle < 0.6) return 0
      if (cycle < 0.65) return 6
      if (cycle < 0.72) return 3
      if (cycle < 0.78) return 0
      return 0
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const midY = H / 2

      ctx.beginPath()
      ctx.strokeStyle = '#4700DE'
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      for (let i = 0; i < W; i++) {
        const progress = (i / W) * 2.5 + t
        const y = midY - ekg(progress)
        if (i === 0) ctx.moveTo(i, y)
        else ctx.lineTo(i, y)
      }
      ctx.stroke()

      const gradient = ctx.createLinearGradient(W - 60, 0, W, 0)
      gradient.addColorStop(0, 'rgba(71, 0, 222, 0)')
      gradient.addColorStop(1, 'rgba(71, 0, 222, 0.4)')
      ctx.beginPath()
      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      for (let i = W - 60; i < W; i++) {
        const progress = (i / W) * 2.5 + t
        const y = midY - ekg(progress)
        if (i === W - 60) ctx.moveTo(i, y)
        else ctx.lineTo(i, y)
      }
      ctx.stroke()

      const leadProgress = 2.5 + t
      const leadY = midY - ekg(leadProgress)
      ctx.beginPath()
      ctx.fillStyle = '#4700DE'
      ctx.arc(W - 2, leadY, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = 'rgba(71, 0, 222, 0.15)'
      ctx.arc(W - 2, leadY, 8, 0, Math.PI * 2)
      ctx.fill()

      t += 0.008
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative">
      {/* Agent cards positioned around the heartbeat */}
      {deployedAgents.map((agent, i) => (
        <button
          key={agent.id}
          onClick={() => navigate(`/agents/${agent.id}`)}
          className={cn(
            'absolute w-[180px] pointer-events-auto',
            'bg-surface/95 backdrop-blur-sm border border-border-subtle rounded-xl px-3.5 py-3 shadow-[var(--shadow-card)]',
            'hover:shadow-[var(--shadow-card-hover)] hover:border-accent/20 transition-all duration-300 cursor-pointer text-left group',
            CARD_POSITIONS[i % CARD_POSITIONS.length],
          )}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('w-2 h-2 rounded-full shrink-0', STATUS_COLORS[agent.status])} />
            <span className="text-[12px] font-semibold text-text-1 truncate">{agent.name}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] tabular-nums">
            <div>
              <span className="text-text-3">Runs </span>
              <span className="font-semibold text-text-1">{agent.metrics.totalRuns.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-text-3">OK </span>
              <span className="font-semibold text-success">{formatPercent(agent.metrics.successRate)}</span>
            </div>
          </div>
          <div className="mt-1.5 text-[11px]">
            <span className="text-text-3">Saved </span>
            <span className="font-semibold text-accent">{formatCurrency(agent.metrics.laborSavedUsd)}</span>
          </div>
        </button>
      ))}

      {/* Central orb + EKG */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center animate-[pulse-glow_3s_ease-in-out_infinite]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_rgba(71,0,222,0.4)]">
                <span className="text-[16px] font-bold text-white">{deployedAgents.length}</span>
              </div>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="opacity-80" />

        <div className="text-center">
          <div className="text-[12px] text-text-3">All systems operational</div>
        </div>
      </div>
    </div>
  )
}
