import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  BarChart3,
  Bell,
  FileText,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: FileText,
      title: "Track Applications",
      description: "Keep all your job applications organized in one place. Never lose track of where you applied.",
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "Manage interview dates and deadlines. Get reminders for important events.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Visualize your job search progress with charts and statistics.",
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Get notified about follow-ups, interviews, and application deadlines.",
    },
    {
      icon: CheckCircle,
      title: "Status Tracking",
      description: "Track application status from applied to offer received.",
    },
    {
      icon: TrendingUp,
      title: "Progress Insights",
      description: "See how many applications lead to interviews and offers.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Track Your Job Applications
            <br />
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Keep track of every application, interview, and offer in one beautiful dashboard.
            Perfect for freshers and experienced professionals alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of job seekers who trust ApplyFlow to manage their applications
            </p>
            <Link href="/signup">
              <Button size="lg">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
