"use client";

import { useEffect, useState, Suspense } from "react";
import api from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Download, Filter } from "lucide-react";
import Link from "next/link";

function getRiskBadgeVariant(level: string) {
  switch (level) {
    case "High":
      return "destructive";
    case "Moderate":
      return "default";
    case "Low":
      return "secondary";
    default:
      return "default";
  }
}
type UIPatient = {
  id: string;
  name: string;
  lastScan: string;
  riskScore: number;
  riskLevel: "High" | "Moderate" | "Low";
  age: number;
  condition: string;
};

function PatientRecordsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<UIPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        console.log("Fetching patients from API...");
        const response = await api.get("/patients/");
        const transformedPatients: UIPatient[] = response.data.map(
          (patient: any) => ({
            id: patient.id, // or PT-${1000 + patient.id}
            name: patient.patient_name,
            age: patient.age,
            lastScan: new Date(patient.created_at).toLocaleDateString(),
            riskScore: Math.round(patient.risk_probability), // 47.51 → 48
            riskLevel:
              patient.risk_probability >= 70
                ? "High"
                : patient.risk_probability >= 40
                  ? "Moderate"
                  : "Low",
            condition: "Diabetes",
          }),
        );
        setPatients(transformedPatients);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  console.log("Patients state:", patients);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Patient Records
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all patient health records
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Patient History</CardTitle>
              <CardDescription>
                Complete list of patients with recent risk assessments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Patient Name</TableHead>
                  <TableHead className="font-semibold">Patient ID</TableHead>
                  <TableHead className="font-semibold">
                    Last Scan Date
                  </TableHead>
                  <TableHead className="font-semibold">Condition</TableHead>
                  <TableHead className="font-semibold">Risk Score</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {patient.id}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {patient.lastScan}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {patient.condition}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          patient.riskScore >= 70
                            ? "text-destructive"
                            : patient.riskScore >= 40
                              ? "text-warning"
                              : "text-success"
                        }`}
                      >
                        {patient.riskScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>
                        {patient.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No patients found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PatientRecordsPage() {
  return (
    <Suspense fallback={null}>
      <PatientRecordsContent />
    </Suspense>
  );
}
