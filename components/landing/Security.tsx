"use client"

import { motion } from "framer-motion"
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  Server,
  Key
} from "lucide-react"

import { Card } from "@/components/ui/card"

export default function Security() {

  const items = [
    {
      icon: Lock,
      title: "Secure authentication",
      desc: "Gmail OAuth-based connection. No passwords stored anywhere.",
      extra: "Industry standard encrypted handshake"
    },
    {
      icon: EyeOff,
      title: "Private processing",
      desc: "Emails are processed in isolated execution layers, not shared or reused.",
      extra: "No human or external access"
    },
    {
      icon: ShieldCheck,
      title: "No model training",
      desc: "Your inbox data is never used to train or improve AI models.",
      extra: "Zero data retention policy"
    },
  ]

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-background">

      {/* ambient */}
      <motion.div
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.12, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[600px]
          rounded-full
          bg-foreground/5
          blur-[140px]
        "
      />

      <div className="relative max-w-6xl mx-auto text-center">

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            inline-flex items-center gap-2
            glass
            rounded-full px-5 py-2
            text-sm text-muted-foreground
          "
        >
          <Key size={14} />
          Built with enterprise-grade privacy
        </motion.div>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            mt-8
            text-4xl md:text-6xl
            font-bold tracking-tight
          "
        >
          Your inbox is sensitive data.
          <br />
          <span className="text-gradient">We treat it that way.</span>
        </motion.h2>

        {/* subtext */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Security isn’t a feature — it’s the foundation.
          Everything is designed so your email data never leaves your control boundary.
        </p>

        {/* cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">

          {items.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="
                relative overflow-hidden
                p-7 rounded-3xl
                bg-card/40
                border border-border/40
                backdrop-blur-xl
              ">

                {/* soft glow */}
                <div className="absolute inset-0 bg-foreground/5 opacity-0 hover:opacity-100 transition" />

                <div className="relative">

                  <item.icon className="text-foreground/70" size={20} />

                  <h3 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>

                  <p className="mt-4 text-xs text-foreground/40">
                    {item.extra}
                  </p>

                </div>
              </Card>
            </motion.div>
          ))}

        </div>

        {/* trust strip */}
        <div className="
          mt-16
          flex flex-wrap justify-center gap-6
          text-sm text-muted-foreground
        ">
          <span className="flex items-center gap-2">
            <Database size={14} />
            No persistent storage
          </span>

          <span className="flex items-center gap-2">
            <Server size={14} />
            Isolated processing
          </span>

          <span className="flex items-center gap-2">
            <Lock size={14} />
            End-to-end encrypted flow
          </span>
        </div>

      </div>
    </section>
  )
}