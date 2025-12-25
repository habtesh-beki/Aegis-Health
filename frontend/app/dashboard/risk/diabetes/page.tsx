"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Activity, TrendingUp, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PredictionFormData {
  patientId: string;
  patientName: string;
  age: string;
  glucose: string;
  bmi: string;
  bloodPressure: string;
  insulin: string;
  skinThickness: string;
  pregnancies: string;
}

export default function DiabetesRiskPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //PredictionFormData
  const [formData, setFormData] = useState<any>({
    patientId: "",
    patientName: "",
    age: "",
    glucose: "",
    bmi: "",
    bloodPressure: "",
    insulin: "",
    skinThickness: "",
    pregnancies: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate prediction calculation
    setTimeout(() => {
      setLoading(false);
      toast("Analysis Complete", {
        description: "Risk assessment has been generated successfully.",
      });

      // Navigate to results page with form data
      const queryParams = new URLSearchParams(formData).toString();
      router.push(`/dashboard/risk/diabetes/results?${queryParams}`);
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Diabetes Risk Predictor
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered risk assessment using advanced machine learning algorithms
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Activity className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground">
              Clinical Decision Support Tool
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              This prediction model uses validated medical parameters to assess
              diabetes risk. Always consult with healthcare professionals for
              final diagnosis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information & Clinical Parameters</CardTitle>
          <CardDescription>
            Complete all required fields for accurate risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/*  */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Identification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  1
                </div>
                Patient Identification
              </h3>
              <div className="grid md:grid-cols-2 gap-4 ml-10">
                <div className="space-y-2">
                  <Label htmlFor="patientId">
                    Patient ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="patientId"
                    name="patientId"
                    placeholder="PT-1001"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for patient record
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientName">
                    Patient Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    placeholder="John Doe"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Full legal name
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  2
                </div>
                Clinical Measurements
              </h3>
              <div className="grid md:grid-cols-2 gap-4 ml-10">
                <div className="space-y-2">
                  <Label htmlFor="glucose">
                    Glucose Level (mg/dL){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="glucose"
                    name="glucose"
                    type="number"
                    placeholder="120"
                    min="0"
                    max="400"
                    value={formData.glucose}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Normal range: 70-100 mg/dL (fasting)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">
                    Blood Pressure (mmHg){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    type="number"
                    placeholder="80"
                    min="40"
                    max="200"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Diastolic pressure (normal: 60-80 mmHg)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insulin">
                    Insulin Level (µU/mL){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="insulin"
                    name="insulin"
                    type="number"
                    placeholder="85"
                    min="0"
                    max="900"
                    value={formData.insulin}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Serum insulin (normal: 2.6-24.9 µU/mL)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skinThickness">
                    Skin Thickness (mm){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="skinThickness"
                    name="skinThickness"
                    type="number"
                    placeholder="20"
                    min="0"
                    max="100"
                    value={formData.skinThickness}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Triceps skin fold thickness
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Demographics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  3
                </div>
                Patient Demographics
              </h3>
              <div className="grid md:grid-cols-2 gap-4 ml-10">
                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age (years) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="45"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Patient's current age
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">
                    BMI (kg/m²) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="bmi"
                    name="bmi"
                    type="number"
                    step="0.1"
                    placeholder="25.5"
                    min="10"
                    max="70"
                    value={formData.bmi}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Body Mass Index (normal: 18.5-24.9)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pregnancies">Number of Pregnancies</Label>
                  <Input
                    id="pregnancies"
                    name="pregnancies"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="20"
                    value={formData.pregnancies}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    For female patients (optional)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>All fields marked with * are required</span>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    Calculate Risk
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
