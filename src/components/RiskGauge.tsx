import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
  riskLevel: "critical" | "high" | "medium" | "low" | "safe";
}

const levelConfig = {
  critical: { color: "text-destructive", glow: "glow-destructive", label: "CRITICAL" },
  high: { color: "text-destructive", glow: "glow-destructive", label: "HIGH RISK" },
  medium: { color: "text-warning", glow: "glow-warning", label: "MEDIUM RISK" },
  low: { color: "text-primary", glow: "glow-primary", label: "LOW RISK" },
  safe: { color: "text-safe", glow: "glow-accent", label: "SAFE" },
};

export function RiskGauge({ score, riskLevel }: RiskGaugeProps) {
  const config = levelConfig[riskLevel];
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  const getStrokeColor = () => {
    if (riskLevel === "critical" || riskLevel === "high") return "hsl(0 85% 55%)";
    if (riskLevel === "medium") return "hsl(38 95% 55%)";
    if (riskLevel === "low") return "hsl(170 100% 50%)";
    return "hsl(140 70% 45%)";
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg width="200" height="180" viewBox="0 0 200 200" className="drop-shadow-lg">
        <circle
          cx="100" cy="100" r="80" fill="none"
          stroke="hsl(220 15% 18%)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={circumference * 0.25}
          transform="rotate(135 100 100)"
        />
        <motion.circle
          cx="100" cy="100" r="80" fill="none"
          stroke={getStrokeColor()} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform="rotate(135 100 100)"
          style={{ filter: `drop-shadow(0 0 8px ${getStrokeColor()})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <motion.span
          className={`text-5xl font-mono font-bold ${config.color}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span className="text-xs font-mono text-muted-foreground mt-1">/100</span>
      </div>
      <motion.div
        className={`font-mono text-sm font-semibold tracking-widest ${config.color} mt-[-10px]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {config.label}
      </motion.div>
    </div>
  );
}
