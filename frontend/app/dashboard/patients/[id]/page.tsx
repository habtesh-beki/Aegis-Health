import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, User, Calendar, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock patient detail data
  const patient = {
    id: id,
    name: "Sarah Johnson",
    age: 54,
    gender: "Female",
    bloodType: "A+",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main St, Springfield, IL 62701",
    lastScan: "2025-01-15",
    riskScore: 85,
    riskLevel: "High",
    condition: "Diabetes",
    vitals: {
      glucose: 185,
      bmi: 31.2,
      bloodPressure: "145/92",
      heartRate: 82,
    },
    history: [
      {
        date: "2025-01-15",
        condition: "Diabetes Screening",
        riskScore: 85,
        result: "High Risk",
      },
      {
        date: "2024-12-10",
        condition: "Annual Checkup",
        riskScore: 78,
        result: "Moderate Risk",
      },
      {
        date: "2024-09-05",
        condition: "Diabetes Screening",
        riskScore: 72,
        result: "Moderate Risk",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/patients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Patient Details
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive health record for {patient.name}
          </p>
        </div>
      </div>

      {/* Patient Info Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <CardDescription>Patient ID: {patient.id}</CardDescription>
              </div>
              <Badge
                variant={
                  patient.riskLevel === "High" ? "destructive" : "default"
                }
                className="text-sm"
              >
                {patient.riskLevel} Risk
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Age / Gender</p>
                  <p className="font-medium text-foreground">
                    {patient.age} years / {patient.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium text-foreground">
                    {patient.bloodType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Scan</p>
                  <p className="font-medium text-foreground">
                    {patient.lastScan}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{patient.email}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium text-foreground">{patient.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Vitals</CardTitle>
            <CardDescription>Latest measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pb-3 border-b border-border">
              <p className="text-sm text-muted-foreground">Glucose Level</p>
              <p className="text-2xl font-bold text-destructive">
                {patient.vitals.glucose} mg/dL
              </p>
            </div>
            <div className="pb-3 border-b border-border">
              <p className="text-sm text-muted-foreground">BMI</p>
              <p className="text-2xl font-bold text-warning">
                {patient.vitals.bmi}
              </p>
            </div>
            <div className="pb-3 border-b border-border">
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <p className="text-2xl font-bold text-warning">
                {patient.vitals.bloodPressure}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {patient.vitals.heartRate} bpm
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>
            Recent screenings and risk assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.history.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {record.condition}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {record.riskScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {record.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
