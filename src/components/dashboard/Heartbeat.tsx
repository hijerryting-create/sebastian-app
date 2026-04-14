import { useEffect, useRef } from 'react'

interface HeartbeatProps {
  agentCount: number
}

export function Heartbeat({ agentCount }: HeartbeatProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const W = 280
    const H = 120

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    let t = 0
    let animId: number

    function ekg(x: number): number {
      // Simulate EKG waveform
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

      // Draw EKG trace
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

      // Glow trail behind the leading edge
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

      // Leading dot
      const leadProgress = (1) * 2.5 + t
      const leadY = midY - ekg(leadProgress)
      ctx.beginPath()
      ctx.fillStyle = '#4700DE'
      ctx.arc(W - 2, leadY, 3, 0, Math.PI * 2)
      ctx.fill()

      // Outer glow on dot
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
    <div className="flex flex-col items-center gap-4">
      {/* Central orb */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center animate-[pulse-glow_3s_ease-in-out_infinite]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_rgba(71,0,222,0.4)]">
              <span className="text-[18px] font-bold text-white">{agentCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EKG trace */}
      <canvas ref={canvasRef} className="opacity-80" />

      {/* Label */}
      <div className="text-center">
        <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.08em]">Hive Heartbeat</div>
        <div className="text-[12px] text-text-3 mt-0.5">All systems operational</div>
      </div>
    </div>
  )
}
