import { useEffect, useRef } from 'react'
import type { Agent } from '@/types'

interface SwarmCanvasProps {
  agents: Agent[]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
  alpha: number
  color: string
  label: string
  pulsePhase: number
}

const AGENT_COLORS = ['#4700DE', '#5235FF', '#8B5CF6', '#3B82F6', '#22C55E', '#F59E0B']

export function SwarmCanvas({ agents }: SwarmCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const ambientRef = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; size: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      canvas!.style.width = `${rect.width}px`
      canvas!.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Init agent particles in orbital positions
    const cx = canvas.width / dpr / 2
    const cy = canvas.height / dpr / 2

    particlesRef.current = agents.map((agent, i) => {
      const orbitRadius = 160 + Math.random() * 120
      const orbitAngle = (i / agents.length) * Math.PI * 2 + Math.random() * 0.5
      return {
        x: cx + Math.cos(orbitAngle) * orbitRadius,
        y: cy + Math.sin(orbitAngle) * orbitRadius,
        vx: 0,
        vy: 0,
        radius: 6 + agent.metrics.totalRuns / 4000,
        orbitRadius,
        orbitSpeed: 0.002 + Math.random() * 0.003,
        orbitAngle,
        alpha: 0.7 + Math.random() * 0.3,
        color: AGENT_COLORS[i % AGENT_COLORS.length],
        label: agent.name.split(' ').map(w => w[0]).join(''),
        pulsePhase: Math.random() * Math.PI * 2,
      }
    })

    // Ambient floating particles (data packets)
    ambientRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * (canvas.width / dpr),
      y: Math.random() * (canvas.height / dpr),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 2 + 0.5,
    }))

    let animId: number
    let t = 0

    function draw() {
      const w = canvas!.width / dpr
      const h = canvas!.height / dpr
      ctx.clearRect(0, 0, w, h)

      const centerX = w / 2
      const centerY = h / 2
      t += 0.016

      // Draw ambient particles
      for (const p of ambientRef.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.fillStyle = `rgba(71, 0, 222, ${p.alpha})`
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw orbit rings (faint)
      const orbits = [160, 210, 270]
      for (const r of orbits) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(71, 0, 222, 0.04)'
        ctx.lineWidth = 1
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw connection lines from agents to center
      for (const p of particlesRef.current) {
        const pulse = Math.sin(t * 2 + p.pulsePhase) * 0.5 + 0.5

        // Data flow line
        ctx.beginPath()
        const grad = ctx.createLinearGradient(centerX, centerY, p.x, p.y)
        grad.addColorStop(0, `rgba(71, 0, 222, ${0.08 + pulse * 0.06})`)
        grad.addColorStop(1, `rgba(71, 0, 222, ${0.02})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        // Traveling data packet along the line
        const packetPos = (t * 0.3 + p.pulsePhase) % 1
        const px = centerX + (p.x - centerX) * packetPos
        const py = centerY + (p.y - centerY) * packetPos
        ctx.beginPath()
        ctx.fillStyle = `rgba(71, 0, 222, ${0.3 + pulse * 0.3})`
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw agent nodes
      for (const p of particlesRef.current) {
        // Update orbital position
        p.orbitAngle += p.orbitSpeed
        p.x = centerX + Math.cos(p.orbitAngle) * p.orbitRadius
        p.y = centerY + Math.sin(p.orbitAngle) * p.orbitRadius * 0.65 // Elliptical

        const pulse = Math.sin(t * 3 + p.pulsePhase) * 0.5 + 0.5

        // Outer glow
        ctx.beginPath()
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        glowGrad.addColorStop(0, `rgba(71, 0, 222, ${0.1 + pulse * 0.08})`)
        glowGrad.addColorStop(1, 'rgba(71, 0, 222, 0)')
        ctx.fillStyle = glowGrad
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node body
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Label
        ctx.font = `bold ${Math.max(8, p.radius - 1)}px Inter, system-ui`
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.label, p.x, p.y)

        // Agent name below
        ctx.font = '10px Inter, system-ui'
        ctx.fillStyle = 'rgba(107, 107, 107, 0.6)'
        ctx.fillText(p.label, p.x, p.y + p.radius + 12)
      }

      // Center glow
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60)
      centerGlow.addColorStop(0, 'rgba(71, 0, 222, 0.06)')
      centerGlow.addColorStop(0.5, 'rgba(71, 0, 222, 0.02)')
      centerGlow.addColorStop(1, 'rgba(71, 0, 222, 0)')
      ctx.beginPath()
      ctx.fillStyle = centerGlow
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [agents])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}
