import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the form data
// interface FormData {
//   fullName: string;
//   age: string;
//   gender: string;
//   weight: string;
//   height: string;
//   contactInfo: string;
//   questionnaireFilled: boolean;
// }

// Create the context with the correct type
interface FormDataContextType {
  formGlobalData: any;
  setGlobalFormData: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

// Custom hook to use the form data context
export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

// Context Provider component
interface FormDataProviderProps {
  children: ReactNode;
}

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formGlobalData, setGlobalFormData] = useState<any>({
    questionnaireFilled: false
  });

  // Load form data from localStorage when the app mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);
        setGlobalFormData(parsedFormData);
    }
  }, []); // This runs only once when the component mounts

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (formGlobalData) {
      localStorage.setItem('formData', JSON.stringify(formGlobalData));
    }
  }, [formGlobalData]); // This runs whenever formData changes

  return (
    <FormDataContext.Provider value={{ formGlobalData, setGlobalFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
