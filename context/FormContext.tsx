import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for the form data
// interface FormData {}

// Create the context
interface FormContextType {
  formData: any | null;
  saveFormData: (data: any) => void;
}

// Create the context with default values
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the provider component
interface FormProviderProps {
  children: ReactNode; // Define the type for children properly
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<any | null>(null);

  // Function to save the form data
  const saveFormData = (data: any) => {
    setFormData(data);
  };

  return (
    <FormContext.Provider value={{ formData, saveFormData }}>
      {children} {/* Rendering the children here */}
    </FormContext.Provider>
  );
};

// Custom hook to use the FormContext
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
