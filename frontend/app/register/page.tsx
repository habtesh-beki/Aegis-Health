"use client";

import type React from "react";
import api from "@/lib/axios";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Activity, Building2, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    email: "",
    phone: "",
    adminName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/hospitals", {
        hospital_name: formData.hospitalName,
        registration_number: formData.registrationNumber,
        email: formData.email,
        phone: formData.phone,
        admin_name: formData.adminName,
        password: formData.password,
      });
      toast.success("Registration Successful", {
        description: "Your hospital has been registered. You can login now.",
      });
      console.log("Backend response:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6 px-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Aegis Health
              </h1>
              <p className="text-muted-foreground">
                Medical Risk Analysis Platform
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Join the Future of Healthcare
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Register your hospital to access advanced AI-powered risk
              analysis, comprehensive patient management, and real-time health
              monitoring tools.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  AI-Powered Predictions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning for accurate risk assessment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Secure & Compliant
                </h3>
                <p className="text-sm text-muted-foreground">
                  HIPAA-compliant data management and encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Hospital Registration</CardTitle>
            <CardDescription>
              Create your hospital account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hospitalName"
                    name="hospitalName"
                    placeholder="Memorial General Hospital"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    placeholder="REG-123456"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@hospital.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminName">Administrator Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="adminName"
                    name="adminName"
                    placeholder="Dr. John Doe"
                    value={formData.adminName}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register Hospital"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
