"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Database, Cpu, Activity } from "lucide-react";

export function ModelTransparencySidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">Model Info</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Model Transparency</SheetTitle>
          <SheetDescription>
            Technical details about the AI prediction model powering this
            analysis
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Model Version */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Model Version</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Algorithm
                </span>
                <Badge variant="secondary">XGBoost v1.2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Release Date
                </span>
                <span className="text-sm text-muted-foreground">
                  October 2024
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Training Data Source */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Database className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground">Training Data</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900/30">
              <p className="text-sm font-medium text-foreground mb-2">
                Primary Dataset
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                PIMA Indian Diabetes Dataset
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Total Samples:</span>
                  <span className="font-medium">768 patients</span>
                </div>
                <div className="flex justify-between">
                  <span>Positive Cases:</span>
                  <span className="font-medium">268 (35%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Source:</span>
                  <span className="font-medium">UCI ML Repository</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* How it Works */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-500/10 p-2 rounded-lg">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">How It Works</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The model analyzes{" "}
                <strong className="text-foreground">
                  8 key biometric indicators
                </strong>{" "}
                to predict diabetes risk:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Pregnancies:</strong>{" "}
                    Number of times pregnant
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Glucose:</strong> Plasma
                    glucose concentration
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Blood Pressure:</strong>{" "}
                    Diastolic measurement (mm Hg)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Skin Thickness:</strong>{" "}
                    Triceps skin fold (mm)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Insulin:</strong> 2-hour
                    serum insulin (mu U/ml)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">BMI:</strong> Body mass
                    index (weight/height²)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">
                      Pedigree Function:
                    </strong>{" "}
                    Diabetes family history score
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Age:</strong> Patient
                    age in years
                  </span>
                </li>
              </ul>
              <div className="bg-background rounded-lg p-3 border border-border mt-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Algorithm:</strong> The
                  XGBoost gradient boosting model combines these features using
                  ensemble learning to generate a risk probability score between
                  0-100%.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-900/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Clinical Note:</strong> This
              model provides screening support only and should not replace
              clinical judgment. All predictions must be verified by a licensed
              healthcare professional.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
