"use client"

import React, { useState, useEffect } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Utensils, FileDown, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import AppLayout from '../components/AppLayout'
import {recipes} from '../data/index'
import { DashboardSideNavbar } from '../components/DashboardSideNavBar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface MealPlanItem {
  meal_type: string;
  recipe_name: string;
  ingredients: string[];
  instructions: string;
}

// Generate random meal plan data
const generateMealPlan = () => {
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  return mealTypes.map(mealType => {
    const recipe = recipes[Math.floor(Math.random() * recipes.length)]
    return {
      meal_type: mealType,
      recipe_name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    }
  })
}

export default function MealPlanPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
	const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([])

	useEffect(() => {
    setMealPlan(generateMealPlan()) // Generate meal plan after client-side rendering
  }, [])


  const changeDate = (amount: number) => {
    const newDate = amount > 0 ? addDays(selectedDate, amount) : subDays(selectedDate, Math.abs(amount))
    setSelectedDate(newDate)
    setMealPlan(generateMealPlan()) // Generate new meal plan for the new date
  }

   return (
    <AppLayout>
			<div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        {/* <Sidebar /> */}
				<DashboardSideNavbar />



    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Personalized Meal Plan</h1>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl font-semibold">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date || new Date())
                      setMealPlan(generateMealPlan())
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardTitle>
            <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {mealPlan.map((meal, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <Utensils className="mr-2 h-5 w-5" />
                          {meal.meal_type}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium mb-2">{meal.recipe_name}</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
                          {meal.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Info className="mr-2 h-4 w-4" />
                              Cooking Instructions
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className='base-font'>{meal.recipe_name} - Cooking Instructions</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2 base-font-bold">Ingredients:</h4>
                              <ul className="list-disc list-inside mb-4 base-font-normal">
                                {meal.ingredients.map((ingredient, i) => (
                                  <li key={i}>{ingredient}</li>
                                ))}
                              </ul>
                              <h4 className="font-semibold mb-2 base-font-bold">Instructions:</h4>
                              <p className='base-font-normal'>{meal.instructions}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
      </Card>
      {/* <div className="flex justify-center">
        <Button size="lg">
          Generate Shopping List
        </Button>
      </div> */}
    </div>
		</div>
    </AppLayout>
  )
}