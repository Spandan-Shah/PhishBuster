import { motion } from "framer-motion";
import type { ThreatFinding } from "@/lib/phishing-engine";
import { ShieldAlert, ShieldX, AlertTriangle, Info, ShieldCheck } from "lucide-react";

interface ThreatListProps {
  findings: ThreatFinding[];
}

const severityConfig = {
  critical: { icon: ShieldX, color: "text-destructive", border: "border-destructive/30", bg: "bg-destructive/5" },
  high: { icon: ShieldAlert, color: "text-destructive", border: "border-destructive/20", bg: "bg-destructive/5" },
  medium: { icon: AlertTriangle, color: "text-warning", border: "border-warning/20", bg: "bg-warning/5" },
  low: { icon: Info, color: "text-primary", border: "border-primary/20", bg: "bg-primary/5" },
  info: { icon: ShieldCheck, color: "text-safe", border: "border-safe/20", bg: "bg-safe/5" },
};

export function ThreatList({ findings }: ThreatListProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-sm text-muted-foreground tracking-wider uppercase">
        Threat Analysis ({findings.length} finding{findings.length !== 1 ? "s" : ""})
      </h3>
      {findings.map((finding, i) => {
        const config = severityConfig[finding.severity];
        const Icon = config.icon;
        return (
          <motion.div
            key={finding.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`p-4 rounded-lg border ${config.border} ${config.bg}`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono text-sm font-semibold ${config.color}`}>
                    {finding.label}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.border} ${config.color}`}>
                    {finding.severity}
                  </span>
                  {finding.score > 0 && (
                    <span className="text-[10px] font-mono text-muted-foreground">
                      +{finding.score} pts
                    </span>
                  )}
                </div>
                <p className="text-sm text-secondary-foreground mt-1.5 leading-relaxed">
                  {finding.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


