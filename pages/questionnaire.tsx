import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

import AppLayout from '../components/AppLayout'
import { useFormData } from '../context/FormDataContext';

export default function Home() {
const router = useRouter()
const [step, setStep] = useState(0)
const { setGlobalFormData } = useFormData();
const [formData, setFormData] = useState({
  // Basic Demographic Information
  fullName: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  contactInfo: '',

  // Medical History
  hasHypertension: false,
  hypertensionDuration: '',
  hypertensionSeverity: '',
  otherConditions: [],
  allergies: '',
  medications: '',
  medicalHistoryFile: null,

  // Dietary Preferences and Restrictions
  foodPreferences: { likes: '', dislikes: '' },
  dietaryRestrictions: [],
  foodAllergies: '',

  // Lifestyle and Behavioral Data
  dailySchedule: '',
  activityLevel: '',
  cookingSkills: '',
  kitchenResources: [],
  diningHabits: [],

  // Health Goals and Motivations
  healthGoals: [],
  motivations: [],
  preferredOutcomes: '',
  timeline: '',

  // Current Dietary Habits
  averageDailyIntake: '',
  snackFrequency: '',
  fluidIntake: '',
  portionSizes: '',

  // Health Data Tracking
  bloodPressureReadings: [],
  weightTrends: [],
  physicalActivityLogs: [],
  mealSatisfaction: '',

  // Feedback and Experience
  userSatisfaction: '',
  easeOfUse: '',
  suggestions: '',
  adherenceIssues: '',

  // Integration with Healthcare Providers
  healthcareProviderInfo: '',
  consentToShareData: false,
  providerNotes: '',

  // Psychological and Social Context
  stressLevels: '',
  supportSystem: '',
  emotionalRelationshipWithFood: '',
  socialEatingPatterns: '',
  questionnaireFilled: false
})

const handleInputChange = (e: { target: any }) => {
  const { name, value } = e.target
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }))
}

const handleNextedChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const [group, field] = name.split('.');
  
    setFormData((prevState: any) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        [field]: value
      }
    }));
  }

const handleCheckboxChange = (name: string, value: string) => {
  setFormData((prevState: any) => ({
    ...prevState,
    [name]: prevState[name].includes(value)
      ? prevState[name].filter((item: string) => item !== value)
      : [...prevState[name], value]
  }))
}

const handleFileUpload = (e: { target: { files: any[] } }) => {
  const file = e.target.files[0]
  if (file) {
    setFormData(prevState => ({...prevState, medicalHistoryFile: file}))
  }
}

const handleNext = () => {
  setStep(prevStep => prevStep + 1)
}

const handlePrevious = () => {
  setStep(prevStep => prevStep - 1)
}

const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  formData['questionnaireFilled'] = true
  localStorage.setItem('formData', JSON.stringify(formData)); // Ensure localStorage is updated
  // Update context to reflect the new form data
  setGlobalFormData(formData);
  router.push('/dashboard'); // Redirect to dashboard
};

const renderStep = () => {
  switch(step) {
    case 0:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Basic Demographic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup name="gender" value={formData.gender} onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} placeholder="Email or Phone" />
            </div>
          </div>
        </div>
      )
    case 1:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Medical History</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Do you have hypertension?</Label>
              <RadioGroup name="hasHypertension" value={formData.hasHypertension.toString()} onValueChange={(value) => handleInputChange({ target: { name: 'hasHypertension', value: value === 'true' } })}>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="hypertension-yes" />
                    <Label htmlFor="hypertension-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="hypertension-no" />
                    <Label htmlFor="hypertension-no">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            {formData.hasHypertension && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="hypertensionDuration">Duration of Hypertension</Label>
                  <Input id="hypertensionDuration" name="hypertensionDuration" value={formData.hypertensionDuration} onChange={handleInputChange} placeholder="e.g., 5 years" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hypertensionSeverity">Severity of Hypertension</Label>
                  <Select name="hypertensionSeverity" value={formData.hypertensionSeverity} onValueChange={(value) => handleInputChange({ target: { name: 'hypertensionSeverity', value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label>Other Chronic Conditions</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Diabetes', 'Heart Disease', 'Kidney Disease', 'High Cholesterol'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.otherConditions.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange('otherConditions', condition)}
                    />
                    <Label htmlFor={condition}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies/Food Intolerances</Label>
              <Textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="List any allergies or food intolerances" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea id="medications" name="medications" value={formData.medications} onChange={handleInputChange} placeholder="List all current medications and supplements" />
            </div>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Medical History Upload (Optional)</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalHistoryFile">Upload Medical History Document (Optional)</Label>
              <Input id="medicalHistoryFile" name="medicalHistoryFile" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
            </div>
            <p className="text-sm text-gray-500">Accepted file formats: PDF, DOC, DOCX</p>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Dietary Preferences and Restrictions</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foodLikes">Food Preferences - Likes</Label>
              <Textarea id="foodLikes" name="foodPreferences.likes" value={formData.foodPreferences.likes} onChange={handleNextedChange} placeholder="List foods you enjoy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foodDislikes">Food Preferences - Dislikes</Label>
              <Textarea id="foodDislikes" name="foodPreferences.dislikes" value={formData.foodPreferences.dislikes} onChange={handleNextedChange} placeholder="List foods you dislike" />
            </div>
            <div className="space-y-2">
              <Label>Dietary Restrictions</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Vegetarian', 'Vegan', 'Gluten-free', 'Kosher', 'Halal'].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={restriction}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={() => handleCheckboxChange('dietaryRestrictions', restriction)}
                    />
                    <Label htmlFor={restriction}>{restriction}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="foodAllergies">Known Food Allergies</Label>
              <Textarea id="foodAllergies" name="foodAllergies" value={formData.foodAllergies} onChange={handleInputChange} placeholder="List any food allergies" />
            </div>
          </div>
        </div>
      )
    case 4:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Lifestyle and Behavioral Data</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailySchedule">Typical Daily Schedule</Label>
              <Textarea id="dailySchedule" name="dailySchedule" value={formData.dailySchedule} onChange={handleInputChange} placeholder="Describe your typical daily schedule, including meal times, work hours, and sleep schedule" />
            </div>
            <div className="space-y-2">
              <Label>Physical Activity Level</Label>
              <RadioGroup name="activityLevel" value={formData.activityLevel} onValueChange={(value) => handleInputChange({ target: { name:  'activityLevel', value } })}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary">Sedentary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lightly-active" id="lightly-active" />
                    <Label htmlFor="lightly-active">Lightly Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderately-active" id="moderately-active" />
                    <Label htmlFor="moderately-active">Moderately Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-active" id="very-active" />
                    <Label htmlFor="very-active">Very Active</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Cooking Skills</Label>
              <RadioGroup name="cookingSkills" value={formData.cookingSkills} onValueChange={(value) => handleInputChange({ target: { name: 'cookingSkills', value } })}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-skills" id="no-skills" />
                    <Label htmlFor="no-skills">No Skills</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <Label htmlFor="expert">Expert</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Kitchen Resources</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Microwave', 'Oven', 'Stove', 'Blender', 'Slow Cooker', 'Air Fryer'].map((resource) => (
                  <div key={resource} className="flex items-center space-x-2">
                    <Checkbox
                      id={resource}
                      checked={formData.kitchenResources.includes(resource)}
                      onCheckedChange={() => handleCheckboxChange('kitchenResources', resource)}
                    />
                    <Label htmlFor={resource}>{resource}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dining Habits</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Eat out frequently', 'Meal prep regularly', 'Cook at home', 'Order takeout'].map((habit) => (
                  <div key={habit} className="flex items-center space-x-2">
                    <Checkbox
                      id={habit}
                      checked={formData.diningHabits.includes(habit)}
                      onCheckedChange={() => handleCheckboxChange('diningHabits', habit)}
                    />
                    <Label htmlFor={habit}>{habit}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    case 5:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Health Goals and Motivations</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Health Goals</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Lower blood pressure', 'Weight loss', 'Improve energy levels', 'Better sleep', 'Reduce medication'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.healthGoals.includes(goal)}
                      onCheckedChange={() => handleCheckboxChange('healthGoals', goal)}
                    />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Motivations for Managing Diet</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Personal health', 'Family', "Healthcare provider's advice", 'Longevity', 'Quality of life'].map((motivation) => (
                  <div key={motivation} className="flex items-center space-x-2">
                    <Checkbox
                      id={motivation}
                      checked={formData.motivations.includes(motivation)}
                      onCheckedChange={() => handleCheckboxChange('motivations', motivation)}
                    />
                    <Label htmlFor={motivation}>{motivation}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredOutcomes">Preferred Outcomes</Label>
              <Textarea id="preferredOutcomes" name="preferredOutcomes" value={formData.preferredOutcomes} onChange={handleInputChange} placeholder="e.g., Lower blood pressure by 10 points in 3 months" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline for Achieving Goals</Label>
              <Input id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} placeholder="e.g., 6 months" />
            </div>
          </div>
        </div>
      )
    case 6:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Current Dietary Habits</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="averageDailyIntake">Average Daily Intake</Label>
              <Textarea id="averageDailyIntake" name="averageDailyIntake" value={formData.averageDailyIntake} onChange={handleInputChange} placeholder="Describe your typical daily food intake" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="snackFrequency">Frequency of Snacks</Label>
              <Select name="snackFrequency" value={formData.snackFrequency} onValueChange={(value) => handleInputChange({ target: { name: 'snackFrequency', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select snack frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="1-2 times">1-2 times a day</SelectItem>
                  <SelectItem value="3-4 times">3-4 times a day</SelectItem>
                  <SelectItem value="5+ times">5+ times a day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fluidIntake">Fluid Intake</Label>
              <Textarea id="fluidIntake" name="fluidIntake" value={formData.fluidIntake} onChange={handleInputChange} placeholder="Describe your typical daily fluid intake (water, alcohol, caffeinated drinks)" />
            </div>
            <div className="space-y-2">
              <Label>Portion Sizes</Label>
              <RadioGroup name="portionSizes" value={formData.portionSizes} onValueChange={(value) => handleInputChange({ target: { name: 'portionSizes', value } })}>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="smaller" id="smaller-portions" />
                    <Label htmlFor="smaller-portions">Smaller than standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard-portions" />
                    <Label htmlFor="standard-portions">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="larger" id="larger-portions" />
                    <Label htmlFor="larger-portions">Larger than standard</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )
    case 7:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Health Data Tracking</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bloodPressureReadings">Blood Pressure Readings</Label>
              <Textarea id="bloodPressureReadings" name="bloodPressureReadings" value={formData.bloodPressureReadings.join('\n')} onChange={(e) => handleInputChange({ target: { name: 'bloodPressureReadings', value: e.target.value.split('\n') } })} placeholder="Enter blood pressure readings (one per line)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightTrends">Weight Trends</Label>
              <Textarea id="weightTrends" name="weightTrends" value={formData.weightTrends.join('\n')} onChange={(e) => handleInputChange({ target: { name: 'weightTrends', value: e.target.value.split('\n') } })} placeholder="Enter weight measurements (one per line)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="physicalActivityLogs">Physical Activity Logs</Label>
              <Textarea id="physicalActivityLogs" name="physicalActivityLogs" value={formData.physicalActivityLogs.join('\n')} onChange={(e) => handleInputChange({ target: { name: 'physicalActivityLogs', value: e.target.value.split('\n') } })} placeholder="Enter physical activities (one per line)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mealSatisfaction">Meal Satisfaction and Adherence</Label>
              <Textarea id="mealSatisfaction" name="mealSatisfaction" value={formData.mealSatisfaction} onChange={handleInputChange} placeholder="Describe your satisfaction with meals and adherence to the plan" />
            </div>
          </div>
        </div>
      )
    case 8:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Feedback and Experience</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userSatisfaction">User Satisfaction with Meal Plans</Label>
              <Textarea id="userSatisfaction" name="userSatisfaction" value={formData.userSatisfaction} onChange={handleInputChange} placeholder="Describe your satisfaction with the meal plans" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="easeOfUse">Ease of Use of the Platform</Label>
              <Select name="easeOfUse" value={formData.easeOfUse} onValueChange={(value) => handleInputChange({ target: { name: 'easeOfUse', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ease of use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-easy">Very Easy</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                  <SelectItem value="very-difficult">Very Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="suggestions">Suggestions for Additional Features</Label>
              <Textarea id="suggestions" name="suggestions" value={formData.suggestions} onChange={handleInputChange} placeholder="Enter any suggestions for improving the platform" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adherenceIssues">Issues Faced with Meal Adherence</Label>
              <Textarea id="adherenceIssues" name="adherenceIssues" value={formData.adherenceIssues} onChange={handleInputChange} placeholder="Describe any issues you've faced in adhering to the meal plans" />
            </div>
          </div>
        </div>
      )
    case 9:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Integration with Healthcare Providers</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="healthcareProviderInfo">Healthcare Provider Information</Label>
              <Textarea id="healthcareProviderInfo" name="healthcareProviderInfo" value={formData.healthcareProviderInfo} onChange={handleInputChange} placeholder="Enter your healthcare provider's name, contact, and specialty" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consentToShareData"
                checked={formData.consentToShareData}
                onCheckedChange={(checked) => handleInputChange({ target: { name: 'consentToShareData', value: checked } })}
              />
              <Label htmlFor="consentToShareData">I consent to sharing my data with my healthcare provider</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="providerNotes">Notes from Healthcare Provider</Label>
              <Textarea id="providerNotes" name="providerNotes" value={formData.providerNotes} onChange={handleInputChange} placeholder="Enter any specific dietary instructions from your healthcare provider" />
            </div>
          </div>
        </div>
      )
    case 10:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Psychological and Social Context</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stressLevels">Stress Levels and Management Strategies</Label>
              <Textarea id="stressLevels" name="stressLevels" value={formData.stressLevels} onChange={handleInputChange} placeholder="Describe your stress levels and how you manage stress" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportSystem">Support System</Label>
              <Textarea id="supportSystem" name="supportSystem" value={formData.supportSystem} onChange={handleInputChange} placeholder="Describe your support system (family, friends, etc.)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emotionalRelationshipWithFood">Emotional Relationship with Food</Label>
              <Textarea id="emotionalRelationshipWithFood" name="emotionalRelationshipWithFood" value={formData.emotionalRelationshipWithFood} onChange={handleInputChange} placeholder="Describe your emotional relationship with food (e.g., stress eating, emotional eating)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialEatingPatterns">Social Eating Patterns</Label>
              <Textarea id="socialEatingPatterns" name="socialEatingPatterns" value={formData.socialEatingPatterns} onChange={handleInputChange} placeholder="Describe your social eating patterns (e.g., communal meals, eating during celebrations)" />
            </div>
          </div>
        </div>
      )
    case 11:
      return (
        <div>Done</div>
      )
    default:
      return null
  }
}

return (
<AppLayout>
  <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Marpe AI</h1>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Progress value={(step / 10) * 100} className="mb-6" />
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {step > 0 && (
            <Button onClick={handlePrevious} variant="outline">Previous</Button>
          )}
          {step <= 10 && (
            <Button
              onClick={step === 10 ? handleSubmit : handleNext} // Use handleSubmit for step 10, handleNext for all other steps
              className={step === 0 ? 'mx-auto' : 'ml-auto'}
            >
              {step === 10 ? 'Finish' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
  </AppLayout>
)
}