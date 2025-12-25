import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Users, AlertCircle, TrendingUp } from "lucide-react";

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "High Risk Cases",
      value: "147",
      change: "-5.3%",
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      title: "Active Screenings",
      value: "89",
      change: "+8.2%",
      icon: Activity,
      color: "text-success",
    },
    {
      title: "Monthly Growth",
      value: "23.1%",
      change: "+3.8%",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Dr. Doe. Here's your hospital's summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span
                  className={
                    stat.change.startsWith("+")
                      ? "text-success"
                      : "text-destructive"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest patient interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
                >
                  <div className="bg-primary/10 text-primary p-2 rounded">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Patient screening completed
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>
              Patients requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
                >
                  <div className="bg-destructive/10 text-destructive p-2 rounded">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      High risk diabetes case
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Patient ID: PT-{1000 + i}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
