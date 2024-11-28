import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
interface BmiChartProps {}

export const BmiChart: React.FC<BmiChartProps> = () => {
  const [weight, setWeight] = useState<number>(68); // Default weight in kg
  const [height, setHeight] = useState<number>(170); // Default height in cm
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBmi = () => {
    const heightInMeters = height / 100; // Convert cm to meters
    const bmiValue = weight / (heightInMeters ** 2);
    setBmi(bmiValue);
    setCategory(getBmiCategory(bmiValue));
  };

  const getBmiCategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return 'Normal';
    if (bmiValue >= 25 && bmiValue <= 29.9) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Interactive BMI Chart</h2>
      
      <div>
        <label className="block text-gray-700">Weight (kg)</label>
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="mt-2"
          min={1}
        />
      </div>

      <div>
        <label className="block text-gray-700">Height (cm)</label>
        <Input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="mt-2"
          min={1}
        />
      </div>

      <Button onClick={calculateBmi} className="w-full bg-blue-600 text-white">
        Calculate BMI
      </Button>

      {bmi !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your BMI: {bmi.toFixed(1)}</h3>
          <p className="text-lg">Category: <strong>{category}</strong></p>

          {/* BMI Chart Display */}
          <div className="mt-4">
            <div
              className={`h-2 rounded-full ${getBmiBarColor(bmi)}`}
              style={{ width: `${calculateBmiWidth(bmi)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate the width of the BMI bar based on the BMI value
const calculateBmiWidth = (bmi: number): number => {
  if (bmi < 18.5) return (bmi / 18.5) * 100;
  if (bmi >= 18.5 && bmi <= 24.9) return ((bmi - 18.5) / 6.4) * 100;
  if (bmi >= 25 && bmi <= 29.9) return ((bmi - 25) / 5) * 100 + 50;
  return 100;
};

// Helper function to determine BMI bar color based on BMI value
const getBmiBarColor = (bmi: number): string => {
  if (bmi < 18.5) return 'bg-yellow-400'; // Underweight
  if (bmi >= 18.5 && bmi <= 24.9) return 'bg-green-500'; // Normal
  if (bmi >= 25 && bmi <= 29.9) return 'bg-orange-500'; // Overweight
  return 'bg-red-500'; // Obese
};

