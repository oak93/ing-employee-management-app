import { expect } from '@open-wc/testing';
import { EmployeeProvider } from '../../contexts/employee';
import { Employee } from '../../models/employee';

describe('EmployeeProvider', () => {
  let provider: EmployeeProvider;
  let mockEmployee: Omit<Employee, 'id'>;

  beforeEach(() => {
    localStorage.clear();
    provider = new EmployeeProvider();
    mockEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2023-01-01',
      phoneNumber: '1234567890',
      email: 'john@example.com',
      department: 'Engineering',
      position: 'Developer',
    };
  });

  describe('addEmployee', () => {
    it('should add a new employee successfully', () => {
      provider.addEmployee(mockEmployee);
      expect(provider.employeeState.employees).to.have.lengthOf(1);
      expect(provider.employeeState.employees[0]).to.include(mockEmployee);
      expect(provider.employeeState.employees[0].id).to.exist;
    });

    it('should throw error when adding duplicate employee', () => {
      provider.addEmployee(mockEmployee);
      expect(() => provider.addEmployee(mockEmployee)).to.throw(
        'Employee already exists!'
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee', () => {
      provider.addEmployee(mockEmployee);
      const employeeId = provider.employeeState.employees[0].id;

      provider.deleteEmployee(employeeId);
      expect(provider.employeeState.employees).to.have.lengthOf(0);
    });
  });

  describe('updateEmployee', () => {
    it('should update employee details', () => {
      provider.addEmployee(mockEmployee);
      const employeeId = provider.employeeState.employees[0].id;
      const updates = { firstName: 'Jane' } as Partial<Omit<Employee, 'id'>>;

      provider.updateEmployee(employeeId, updates);
      const updated = provider.getEmployeeById(employeeId);
      expect(updated?.firstName).to.equal('Jane');
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee by id', () => {
      provider.addEmployee(mockEmployee);
      const employeeId = provider.employeeState.employees[0].id;

      const found = provider.getEmployeeById(employeeId);
      expect(found).to.include(mockEmployee);
    });

    it('should return undefined for non-existent id', () => {
      const found = provider.getEmployeeById(999);
      expect(found).to.be.undefined;
    });
  });

  describe('fetchEmployees', () => {
    it('should load employees from localStorage', () => {
      const storedEmployees = [{ ...mockEmployee, id: 123 }];
      localStorage.setItem('employees', JSON.stringify(storedEmployees));

      provider.fetchEmployees();
      expect(provider.employeeState.employees).to.deep.equal(storedEmployees);
    });

    it('should initialize empty array when localStorage is empty', () => {
      provider.fetchEmployees();
      expect(provider.employeeState.employees).to.deep.equal([]);
    });
  });
});
