import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Users, Activity } from "lucide-react";

export default function HospitalManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Hospital Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of hospital operations and staff management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staff
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+5</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Departments
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Operational units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bed Occupancy
            </CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">78%</div>
            <p className="text-xs text-muted-foreground mt-1">
              234 of 300 beds
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hospital Information</CardTitle>
          <CardDescription>
            Current facility details and administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Hospital Name</p>
                <p className="font-medium text-foreground mt-1">
                  Memorial General Hospital
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Registration Number
                </p>
                <p className="font-medium text-foreground mt-1">REG-123456</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Administrator</p>
                <p className="font-medium text-foreground mt-1">Dr. John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="font-medium text-foreground mt-1">300 Beds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
