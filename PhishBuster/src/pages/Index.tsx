import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Search, Zap, Terminal } from "lucide-react";
import { analyzeUrl, type AnalysisResult } from "@/lib/phishing-engine";
import { RiskGauge } from "@/components/RiskGauge";
import { ThreatList } from "@/components/ThreatList";

const Index = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;
    setIsScanning(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1500));
    const analysis = analyzeUrl(url.trim());
    setResult(analysis);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      <div className="fixed inset-0 bg-scanline pointer-events-none z-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold text-primary text-glow-primary tracking-tight">
              PhishBuster
            </h1>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto">
            Intelligent phishing URL detection powered by heuristic analysis.
            Paste any suspicious link below.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" /> 12 Detection Rules
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-primary" /> Client-Side
            </span>
          </div>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex gap-2 bg-card border border-border rounded-xl p-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  placeholder="https://suspicious-link.xyz/login"
                  className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                onClick={handleScan}
                disabled={isScanning || !url.trim()}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition-all glow-primary disabled:shadow-none"
              >
                {isScanning ? "Scanning..." : "Analyze"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scanning animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="relative inline-block">
                <motion.div
                  className="w-16 h-16 border-2 border-primary/30 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <Shield className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="font-mono text-sm text-primary mt-6 animate-pulse-glow">
                Analyzing URL threat indicators...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <RiskGauge score={result.riskScore} riskLevel={result.riskLevel} />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-mono text-xs text-muted-foreground mb-1">ANALYZED URL</p>
                    <p className="font-mono text-sm text-foreground break-all bg-secondary/50 p-3 rounded-lg border border-border">
                      {result.url}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-3">
                      {result.analyzedAt.toLocaleTimeString()} · {result.findings.length} indicator{result.findings.length !== 1 ? "s" : ""} detected
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                <ThreatList findings={result.findings} />
              </div>

              <p className="text-center text-xs font-mono text-muted-foreground px-4">
                PhishBuster uses client-side heuristic analysis only. Results are indicative, not definitive.
                Always verify with additional sources before trusting any URL.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example URLs */}
        {!result && !isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xs font-mono text-muted-foreground mb-4">TRY THESE EXAMPLES</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "http://192.168.0.1/paypal-login",
                "https://paytm-secure-login.xyz/update",
                "https://google.com",
                "https://faceb00k-verify.tk/login?confirm=true",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setUrl(example)}
                  className="text-xs font-mono px-3 py-1.5 bg-secondary border border-border rounded-lg text-secondary-foreground hover:border-primary/50 hover:text-primary transition-colors truncate max-w-[280px]"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
