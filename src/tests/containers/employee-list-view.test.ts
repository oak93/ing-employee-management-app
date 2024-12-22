import sinon from 'sinon';

import { Employee } from '../../models/employee';
import { EmployeeListView } from '../../containers/employee-list-view';

describe('EmployeeListView', () => {
  let element: EmployeeListView;
  const mockEmployee: Employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    position: 'Developer',
    department: 'IT',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    dateOfEmployment: '2020-01-01',
  };
  const mockOnDelete = sinon.stub();

  beforeEach(async () => {
    element = new EmployeeListView();
    element.employees = [mockEmployee];
    element.onDelete = mockOnDelete;
    document.body.appendChild(element);
  });

  afterEach(() => {
    sinon.restore();
    element.remove();
    mockOnDelete.reset();
  });

  it('renders empty state when no employees are provided', async () => {
    element.employees = [];
    await element.updateComplete;

    const cards = element.shadowRoot!.querySelectorAll('card-element');
    sinon.assert.match(cards.length, 0);
  });

  it('renders multiple employee cards when multiple employees are provided', async () => {
    const secondEmployee: Employee = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      position: 'Manager',
      department: 'HR',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2020-01-01',
    };

    element.employees = [mockEmployee, secondEmployee];
    await element.updateComplete;

    const cards = element.shadowRoot!.querySelectorAll('card-element');
    sinon.assert.match(cards.length, 2);
  });

  it('handles undefined employees array gracefully', async () => {
    element.employees = undefined as any;
    await element.updateComplete;

    const cards = element.shadowRoot!.querySelectorAll('card-element');
    sinon.assert.match(cards.length, 0);
  });
});
