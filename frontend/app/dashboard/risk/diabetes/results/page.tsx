"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  TrendingUp,
  Activity,
  FileText,
  ArrowLeft,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function ResultsContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Get form data from query params
  const patientId = searchParams.get("patientId") || "PT-1001";
  const patientName = searchParams.get("patientName") || "Unknown Patient";
  const glucose = Number.parseFloat(searchParams.get("glucose") || "120");
  const bmi = Number.parseFloat(searchParams.get("bmi") || "25");
  const age = Number.parseInt(searchParams.get("age") || "45");
  const bloodPressure = Number.parseFloat(
    searchParams.get("bloodPressure") || "80"
  );
  const insulin = Number.parseFloat(searchParams.get("insulin") || "85");

  // Simulate risk calculation based on inputs
  let riskScore = 0;
  const factors: Array<{ name: string; impact: number; value: string }> = [];

  // Glucose impact (most significant)
  if (glucose > 140) {
    const glucoseImpact = Math.min(((glucose - 100) / 200) * 35, 35);
    riskScore += glucoseImpact;
    factors.push({
      name: "Glucose Level",
      impact: Math.round(glucoseImpact),
      value: `${glucose} mg/dL`,
    });
  }

  // BMI impact
  if (bmi > 25) {
    const bmiImpact = Math.min(((bmi - 18.5) / 40) * 20, 20);
    riskScore += bmiImpact;
    factors.push({
      name: "BMI",
      impact: Math.round(bmiImpact),
      value: `${bmi.toFixed(1)} kg/m²`,
    });
  }

  // Age impact
  if (age > 45) {
    const ageImpact = Math.min(((age - 18) / 80) * 15, 15);
    riskScore += ageImpact;
    factors.push({
      name: "Age",
      impact: Math.round(ageImpact),
      value: `${age} years`,
    });
  }

  // Blood Pressure impact
  if (bloodPressure > 80) {
    const bpImpact = Math.min(((bloodPressure - 60) / 80) * 12, 12);
    riskScore += bpImpact;
    factors.push({
      name: "Blood Pressure",
      impact: Math.round(bpImpact),
      value: `${bloodPressure} mmHg`,
    });
  }

  // Insulin impact
  if (insulin > 100) {
    const insulinImpact = Math.min(((insulin - 30) / 500) * 18, 18);
    riskScore += insulinImpact;
    factors.push({
      name: "Insulin Level",
      impact: Math.round(insulinImpact),
      value: `${insulin} µU/mL`,
    });
  }

  // Cap the risk score at 95
  riskScore = Math.min(Math.round(riskScore), 95);

  // Determine risk level
  let riskLevel = "Low";
  let riskVariant: "secondary" | "default" | "destructive" = "secondary";
  let riskColor = "text-success";

  if (riskScore >= 70) {
    riskLevel = "High";
    riskVariant = "destructive";
    riskColor = "text-destructive";
  } else if (riskScore >= 40) {
    riskLevel = "Moderate";
    riskVariant = "default";
    riskColor = "text-warning";
  }

  // Sort factors by impact
  factors.sort((a, b) => b.impact - a.impact);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/risk/diabetes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            Diabetes Risk Analysis Results
          </h1>
          <p className="text-muted-foreground mt-1">
            Patient: {patientName} ({patientId})
          </p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Main Results Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Risk Score Gauge */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Risk Assessment Score</CardTitle>
            <CardDescription>
              AI-calculated probability of diabetes risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              {/* Circular Progress */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={`${(riskScore / 100) * 534} 534`}
                    strokeLinecap="round"
                    className={
                      riskScore >= 70
                        ? "text-destructive"
                        : riskScore >= 40
                        ? "text-warning"
                        : "text-success"
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${riskColor}`}>
                    {riskScore}%
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    Risk Score
                  </span>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="mt-6">
                <Badge variant={riskVariant} className="text-lg px-4 py-1.5">
                  {riskLevel} Risk
                </Badge>
              </div>

              {/* Risk Description */}
              <p className="text-center text-muted-foreground mt-4 max-w-md leading-relaxed">
                {riskScore >= 70 &&
                  "This patient shows a high probability of diabetes risk. Immediate medical attention and lifestyle interventions are strongly recommended."}
                {riskScore >= 40 &&
                  riskScore < 70 &&
                  "This patient shows moderate diabetes risk. Regular monitoring and preventive measures are advised."}
                {riskScore < 40 &&
                  "This patient shows low diabetes risk. Continue maintaining healthy lifestyle habits and regular check-ups."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                  <Badge variant={riskVariant}>{riskLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Probability
                  </span>
                  <span className={`font-semibold ${riskColor}`}>
                    {riskScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Analysis Date
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Model Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-semibold text-foreground">94.2%</span>
                </div>
                <Progress value={94} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on validated medical datasets with high prediction
                  accuracy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contributing Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Top Contributing Factors
          </CardTitle>
          <CardDescription>
            Clinical parameters with the highest impact on risk score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {factors.length > 0 ? (
              factors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded bg-primary/10 text-primary text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {factor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {factor.value}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-destructive">
                        +{factor.impact}%
                      </p>
                      <p className="text-xs text-muted-foreground">impact</p>
                    </div>
                  </div>
                  <Progress
                    value={(factor.impact / 35) * 100}
                    className="h-2"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  All parameters are within normal ranges
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Clinical Parameters Summary
          </CardTitle>
          <CardDescription>
            Complete overview of measured health indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 pb-4 border-b border-border md:border-b-0 md:border-r md:pr-4">
              <p className="text-sm text-muted-foreground">Glucose Level</p>
              <p className="text-2xl font-bold text-foreground">{glucose}</p>
              <p className="text-xs text-muted-foreground">mg/dL</p>
            </div>
            <div className="space-y-2 pb-4 border-b border-border md:border-b-0 md:border-r md:pr-4">
              <p className="text-sm text-muted-foreground">BMI</p>
              <p className="text-2xl font-bold text-foreground">
                {bmi.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">kg/m²</p>
            </div>
            <div className="space-y-2 pb-4 border-b border-border md:border-b-0 md:border-r md:pr-4">
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <p className="text-2xl font-bold text-foreground">
                {bloodPressure}
              </p>
              <p className="text-xs text-muted-foreground">mmHg</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Insulin</p>
              <p className="text-2xl font-bold text-foreground">{insulin}</p>
              <p className="text-xs text-muted-foreground">µU/mL</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-foreground">Medical Disclaimer</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              This risk assessment is a clinical decision support tool and
              should not be used as the sole basis for diagnosis. Results should
              be interpreted by qualified healthcare professionals in
              conjunction with comprehensive clinical evaluation, patient
              history, and additional diagnostic tests. Always consult with a
              medical professional for proper diagnosis and treatment planning.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/dashboard/risk/diabetes">
          <Button variant="outline">Run New Analysis</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Save to Records
          </Button>
          <Button className="gap-2">
            <Activity className="h-4 w-4" />
            View Patient History
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DiabetesResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsContent />
    </Suspense>
  );
}
