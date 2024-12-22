import { html, LitElement } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createContext, provide } from '@lit/context';

import { Employee } from '../models/employee';

export const employeeContext = createContext<EmployeeContext>(
  Symbol('employee')
);

@customElement('employee-provider')
@localized()
export class EmployeeProvider extends LitElement {
  private employees: Employee[] = [];

  @state()
  private error: string = '';

  protected _updateEmployeeState(updates: Partial<EmployeeContext>) {
    this.employeeState = {
      ...this.employeeState,
      ...updates,
    };

    this._updateStorage();
  }

  private _updateStorage(): void {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  _checkIfEmployeeAlreadyExists(employee: Omit<Employee, 'id'>): boolean {
    return Boolean(
      employee.email &&
        this.employees.some((each) => each.email === employee.email)
    );
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    if (this._checkIfEmployeeAlreadyExists(employee)) {
      const errorMessage = msg('Employee already exists!');
      this.error = errorMessage;
      this._updateEmployeeState({ error: errorMessage });
      throw new Error(errorMessage);
    }

    const newEmployee: Employee = {
      ...employee,
      id: parseInt(Math.random().toString(36).substr(2, 4), 36),
    };

    this.employees = [...this.employees, newEmployee];
    this._updateEmployeeState({ employees: this.employees });
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this._updateEmployeeState({ employees: this.employees });
  }

  updateEmployee(id: number, updates: Partial<Omit<Employee, 'id'>>): void {
    this.employees = this.employees.map((employee) =>
      employee.id === id ? { ...employee, ...updates } : employee
    );

    this._updateEmployeeState({ employees: this.employees });
  }

  clearError(): void {
    this.error = '';
    this._updateEmployeeState({ error: this.error });
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  fetchEmployees(): void {
    if (this.employees.length === 0) {
      const localStorageEmployees = localStorage.getItem('employees');

      this.employees = localStorageEmployees
        ? JSON.parse(localStorageEmployees)
        : [];

      this._updateEmployeeState({ employees: this.employees });
    }
  }

  @provide({ context: employeeContext })
  public employeeState: EmployeeContext = {
    error: this.error,
    employees: this.employees,
    clearError: this.clearError.bind(this),
    addEmployee: this.addEmployee.bind(this),
    deleteEmployee: this.deleteEmployee.bind(this),
    updateEmployee: this.updateEmployee.bind(this),
    fetchEmployees: this.fetchEmployees.bind(this),
    getEmployeeById: this.getEmployeeById.bind(this),
  };

  render() {
    return html`<slot></slot>`;
  }
}

export interface EmployeeContext {
  error: string;
  employees: Employee[];
  clearError: () => void;
  fetchEmployees: () => void;
  deleteEmployee: (id: number) => void;
  getEmployeeById: (id: number) => Employee | undefined;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: number, updates: Partial<Omit<Employee, 'id'>>) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-provider': EmployeeProvider;
  }
}
