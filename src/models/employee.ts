export interface Employee {
  id: number;
  email: string;
  lastName: string;
  position: string;
  firstName: string;
  department: string;
  dateOfBirth: string;
  phoneNumber: string;
  dateOfEmployment: string;
}

export interface EmployeeFormAttributes {
  name: string;
  label: string;
  value: string;
  error: string;
  maxLength?: number;
  disabled?: boolean;
  minLength?: number;
  placeholder?: string;
  type: 'text' | 'date' | 'tel' | 'email';
}
