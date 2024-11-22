"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import AppLayout from "@/components/AppLayout"
import { DashboardSideNavbar } from '../components/DashboardSideNavBar'
import { useFormData } from '../context/FormDataContext';

// Mock user data
const userData = {
  name: "John Doe",
  weight: 75, // in kg
  height: 175, // in cm
  bmi: 24.5,
}

// Mock blood pressure data
const initialBloodPressureData = [
  { date: "2023-11-01", systolic: 120, diastolic: 80 },
  { date: "2023-11-02", systolic: 118, diastolic: 78 },
  { date: "2023-11-03", systolic: 122, diastolic: 82 },
  { date: "2023-11-04", systolic: 121, diastolic: 79 },
  { date: "2023-11-05", systolic: 119, diastolic: 81 },
]

function isEmpty(obj: any) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export default function UserDashboard() {
  const router = useRouter(); // Get the router to navigate between pages
  const [bloodPressureData, setBloodPressureData] = useState(initialBloodPressureData)
  const [systolic, setSystolic] = useState("")
  const [diastolic, setDiastolic] = useState("")
  const [date, setDate] = useState("")
  const { formGlobalData, setGlobalFormData } = useFormData(); // Get form data from context
  // Check if the formData is empty and render accordingly

  useEffect(() => {
    // Check if formData is empty or the questionnaire is not filled out
    if (!formGlobalData || !formGlobalData.questionnaireFilled) {
      console.log("FormData is missing or questionnaire not filled, checking localStorage...");
      
      // Retrieve form data from localStorage
      const savedFormData = localStorage.getItem('formData');
      
      // If no form data in localStorage, redirect to the questionnaire page
      if (!savedFormData) {
        router.push('/questionnaire');
        return;
      }
  
      // Parse the saved form data from localStorage
      const parsedFormData = JSON.parse(savedFormData);
  
      // Check if the saved form data is valid and the questionnaire is filled
      if (!parsedFormData?.questionnaireFilled) {
        router.push('/questionnaire');
        return;
      }
  
      // If valid form data exists in localStorage, you can optionally update context
      setGlobalFormData(parsedFormData);
    }
  }, [formGlobalData, router, setGlobalFormData]); // Re-run when formData or router changes
  
  const handleBloodPressureSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReading = {
      date: date || format(new Date(), "yyyy-MM-dd"),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
    }
    setBloodPressureData([...bloodPressureData, newReading])
    setSystolic("")
    setDiastolic("")
    setDate("")
  }
  const bmi = formGlobalData?.weight && formGlobalData?.height
  ? (
      (parseFloat(formGlobalData.weight) / 
      (parseFloat(formGlobalData.height) * parseFloat(formGlobalData.height)))
    ).toFixed(1)
  : 'No data';

  return (
    <AppLayout>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
        <DashboardSideNavbar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {formGlobalData.fullName}</h1>
        
        {/* Health Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formGlobalData?.weight ? `${formGlobalData.weight} kg` : 'No data'}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Height</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formGlobalData?.height ? `${formGlobalData.height} cm` : 'No data'} </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bmi}</div>
            </CardContent>
          </Card>
        </div>

        {/* Blood Pressure Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blood Pressure Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Blood Pressure Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Record Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBloodPressureSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic">Systolic (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="Enter systolic pressure"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    required
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit">Record Blood Pressure</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
    </AppLayout>
  )
}