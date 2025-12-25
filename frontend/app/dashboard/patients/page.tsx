"use client";

import { useState, Suspense } from "react";
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

// Mock patient data
const patients = [
  {
    id: "PT-1001",
    name: "Sarah Johnson",
    lastScan: "2025-01-15",
    riskScore: 85,
    riskLevel: "High",
    age: 54,
    condition: "Diabetes",
  },
  {
    id: "PT-1002",
    name: "Michael Chen",
    lastScan: "2025-01-14",
    riskScore: 42,
    riskLevel: "Moderate",
    age: 38,
    condition: "Heart Disease",
  },
  {
    id: "PT-1003",
    name: "Emily Davis",
    lastScan: "2025-01-13",
    riskScore: 18,
    riskLevel: "Low",
    age: 29,
    condition: "Diabetes",
  },
  {
    id: "PT-1004",
    name: "Robert Wilson",
    lastScan: "2025-01-12",
    riskScore: 73,
    riskLevel: "High",
    age: 61,
    condition: "Hypertension",
  },
  {
    id: "PT-1005",
    name: "Jennifer Martinez",
    lastScan: "2025-01-11",
    riskScore: 55,
    riskLevel: "Moderate",
    age: 45,
    condition: "Diabetes",
  },
  {
    id: "PT-1006",
    name: "David Brown",
    lastScan: "2025-01-10",
    riskScore: 22,
    riskLevel: "Low",
    age: 32,
    condition: "Heart Disease",
  },
  {
    id: "PT-1007",
    name: "Lisa Anderson",
    lastScan: "2025-01-09",
    riskScore: 88,
    riskLevel: "High",
    age: 57,
    condition: "Diabetes",
  },
  {
    id: "PT-1008",
    name: "James Taylor",
    lastScan: "2025-01-08",
    riskScore: 35,
    riskLevel: "Moderate",
    age: 41,
    condition: "Hypertension",
  },
];

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

function PatientRecordsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
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
