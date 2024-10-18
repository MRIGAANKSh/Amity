import React, { useState, useEffect } from "react";
import { CpuIcon, Database } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./components/ui/chart";

export default function Dashboard() {
  const [cloudModelLink, setCloudModelLink] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [predictedPeak, setPredictedPeak] = useState(0);
  const [costSavings, setCostSavings] = useState(0);
  const [resourceAllocation, setResourceAllocation] = useState([]);

  // Retrieve saved link from localStorage
  useEffect(() => {
    const savedLink = localStorage.getItem('cloudModelLink');
    if (savedLink) {
      setCloudModelLink(savedLink);
    }
  }, []);

  // Fetch predictions data
  const fetchPredictions = async () => {
    if (!cloudModelLink) return;

    try {
      const response = await fetch(cloudModelLink);
      const data = await response.json();
      setPredictions(data.predictions || []);
      setCurrentUsage(data.currentUsage || 0);
      setPredictedPeak(data.predictedPeak || 0);
      setCostSavings(data.costSavings || 0);
      setResourceAllocation(data.resourceAllocation || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  // Fetch predictions on load and every minute
  useEffect(() => {
    if (cloudModelLink) {
      fetchPredictions();
      const interval = setInterval(fetchPredictions, 60000); // Fetch every minute
      return () => clearInterval(interval);
    }
  }, [cloudModelLink]);

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Resource Usage Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Resource Usage and Predictions</CardTitle>
          <CardDescription>Actual vs Predicted Resource Utilization</CardDescription>
        </CardHeader>
        <CardContent>
          {predictions.length > 0 ? (
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Usage",
                  color: "hsl(var(--chart-1))",
                },
                predicted: {
                  label: "Predicted Usage",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictions}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p>No data available for predictions</p>
          )}
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
          <CpuIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentUsage}%</div>
          <p className="text-xs text-muted-foreground">
            {currentUsage > 0 ? `+${currentUsage}% from last hour` : `${currentUsage}% from last hour`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted Peak</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{predictedPeak}%</div>
          <p className="text-xs text-muted-foreground">
            Expected at {predictions.length > 0 ? predictions[predictions.length - 1].time : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
          <CpuIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{costSavings}%</div>
          <p className="text-xs text-muted-foreground">Compared to static allocation</p>
        </CardContent>
      </Card>

      {/* Resource Allocation Visualization */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Current Resource Allocation</CardTitle>
          <CardDescription>Visual representation of resource distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-end h-40">
            {resourceAllocation.length > 0 ? (
              resourceAllocation.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-16 bg-primary rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))
            ) : (
              <p>No resource allocation data available</p>
            )}
          </div>
          <div className="flex justify-around mt-2">
            <span>CPU</span>
            <span>Memory</span>
            <span>Storage</span>
            <span>Network</span>
            <span>GPU</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
