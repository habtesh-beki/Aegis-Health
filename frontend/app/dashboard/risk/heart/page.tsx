import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function HeartDiseaseRiskPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Heart Disease Risk Predictor
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered cardiovascular risk assessment
        </p>
      </div>

      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Coming Soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              Heart disease risk prediction module is currently under
              development. Check back soon for this feature.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
