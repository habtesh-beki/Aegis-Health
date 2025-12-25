"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Scale,
  Info,
  Lock,
  Users,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Model performance data across age groups
const performanceData = [
  { ageGroup: "18-30", accuracy: 87, f1Score: 85 },
  { ageGroup: "31-45", accuracy: 89, f1Score: 88 },
  { ageGroup: "46-60", accuracy: 91, f1Score: 90 },
  { ageGroup: "61-75", accuracy: 88, f1Score: 86 },
  { ageGroup: "76+", accuracy: 86, f1Score: 84 },
];

export default function EthicsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Ethics & Usage Guidelines
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Transparency, accountability, and responsible AI usage in clinical
          settings
        </p>
      </div>

      {/* Clinical Guardrails */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Clinical Guardrails</CardTitle>
          </div>
          <CardDescription className="text-base">
            Critical requirements for safe and effective AI-assisted healthcare
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              AI is an Assistant, Not a Diagnostic Tool
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Aegis Health risk prediction models provide{" "}
              <strong>decision support only</strong> and must never replace
              clinical judgment. All risk scores and predictions must be
              reviewed, interpreted, and validated by a licensed healthcare
              professional before any clinical action is taken.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-destructive/10 text-destructive border-destructive/20"
              >
                Requires Clinician Review
              </Badge>
              <Badge
                variant="outline"
                className="bg-destructive/10 text-destructive border-destructive/20"
              >
                Not FDA Approved
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Screening Use Only
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Appropriate Uses
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Population-level risk screening</li>
                <li>• Prioritizing patient follow-ups</li>
                <li>• Identifying high-risk cohorts</li>
                <li>• Supporting clinical workflows</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Prohibited Uses
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Sole basis for diagnosis</li>
                <li>• Treatment decisions without review</li>
                <li>• Insurance coverage determinations</li>
                <li>• Emergency care triage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy (HIPAA Alignment) */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">
              Data Privacy & HIPAA Alignment
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Enterprise-grade security and compliance for protected health
            information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Encrypted at Rest
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AES-256 encryption for all stored patient data and model
                    predictions
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    De-Identified Training
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Models trained on anonymized datasets with all PHI removed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Zero Data Sales
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Patient data never shared with or sold to third parties
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-5 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              Compliance & Certifications
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>HIPAA compliant data handling and storage</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>SOC 2 Type II certified infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Regular third-party security audits</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Business Associate Agreements (BAA) available</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bias Disclosure & Fairness Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-500/10 p-2 rounded-lg">
              <Scale className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">
              Bias Disclosure & Fairness Report
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Transparent performance metrics across demographic groups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Known Limitations
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our diabetes risk prediction model was primarily trained on
                  the PIMA Indian Diabetes Dataset, which has known demographic
                  limitations. Performance may vary across different ethnic
                  groups, and we continuously monitor for bias in predictions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Model Performance Across Age Groups
            </h4>
            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <ChartContainer
                config={{
                  accuracy: {
                    label: "Accuracy (%)",
                    color: "hsl(var(--chart-1))",
                  },
                  f1Score: {
                    label: "F1 Score (%)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="accuracy"
                      fill="var(--color-accuracy)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="f1Score"
                      fill="var(--color-f1Score)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              The model demonstrates consistent performance across age groups
              with accuracy ranging from 86-91%. Minor variations are within
              acceptable clinical thresholds and are continuously monitored.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Usage Protocol */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Clinical Usage Protocol</CardTitle>
          </div>
          <CardDescription className="text-base">
            Recommended workflow for integrating AI predictions into patient
            care
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Initial Screening
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Use the AI risk predictor to identify patients who may benefit
                  from further evaluation. Input clinical parameters accurately
                  and review the generated risk score.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border border-border text-sm">
                  <strong>Action:</strong> Generate risk score → Review
                  contributing factors → Flag high-risk patients
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Clinical Verification
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Review the AI prediction against patient history, current
                  symptoms, and standard clinical guidelines. Validate the
                  prediction with additional diagnostic tests as appropriate.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border border-border text-sm">
                  <strong>Action:</strong> Review patient history → Order
                  confirmatory tests → Apply clinical judgment
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Patient Consultation
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Discuss findings with the patient, explain the risk assessment
                  in context, and develop a personalized care plan. Document the
                  AI-assisted screening in the patient record.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border border-border text-sm">
                  <strong>Action:</strong> Explain results → Develop care plan →
                  Document AI usage in medical record
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="bg-muted/30 rounded-lg p-6 border border-border">
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          Last Updated: December 2025 | Version 1.2 | For questions about ethics
          or data usage, contact{" "}
          <a
            href="mailto:ethics@aegishealth.com"
            className="text-primary hover:underline"
          >
            ethics@aegishealth.com
          </a>
        </p>
      </div>
    </div>
  );
}
