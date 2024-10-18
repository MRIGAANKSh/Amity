import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

// Home component
export default function Home() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AI Cloud Scheduler</CardTitle>
          <CardDescription>Optimize your cloud resources with AI-driven predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our AI-based Cloud Resource Auto-Scheduler predicts resource demand based on historical data and user activity,
            automatically scaling resources up or down to meet demand while minimizing idle time and cost.
          </p>
          <Link to="/dashboard">
            <Button>View Predicted Usage Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Intelligent Scaling</CardTitle>
          </CardHeader>
          <CardContent>
            Automatically adjust resources based on AI predictions to ensure optimal performance and cost-efficiency.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cost Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            Reduce cloud expenses by minimizing idle resources and optimizing resource allocation.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Real-time Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            Get instant insights into your cloud resource usage and predictions through our intuitive dashboard.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
