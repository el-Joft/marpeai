// pages/record.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
// import { FormGlobalData } from '../types';  // You can import types based on your existing code
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/AppLayout"
import { DashboardSideNavbar } from '../components/DashboardSideNavBar'

const RecordPage = () => {
  const router = useRouter();

  // Initialize the state for weight, height, and blood pressure
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [date, setDate] = useState<string>('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the data to global state/local storage or API
    // Example: save form data to localStorage (You can replace it with actual API calls)
    const formData: any = {
      weight,
      height,
      systolic,
      diastolic,
      date,
    };
    
    // Save formData to global state or local storage
    localStorage.setItem('formGlobalData', JSON.stringify(formData));

    // Optionally navigate to dashboard or a confirmation page
    router.push('/');
  };

  return (
    <AppLayout>
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
        <DashboardSideNavbar />

    <div className="p-8 max-w-xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">Record Your Health Data</h1>

      {/* Weight Input */}
      <Card>
        <CardHeader>
          <CardTitle>Weight (kg)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Height Input */}
      <Card>
        <CardHeader>
          <CardTitle>Height (cm)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Blood Pressure Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="systolic">Systolic (mmHg)</Label>
            <Input
              id="systolic"
              type="number"
              placeholder="Enter systolic pressure"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
            <Input
              id="diastolic"
              type="number"
              placeholder="Enter diastolic pressure"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white">
        Update Health Data
      </Button>
    </div>
    </div>
    
    </AppLayout>
  );
};

export default RecordPage;
