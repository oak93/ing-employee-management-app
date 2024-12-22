import sinon from 'sinon';

import { Employee } from '../../models/employee';
import { EmployeeListingActions } from '../../containers/employee-listing-actions';

describe('EmployeeListingActions', () => {
  let element: EmployeeListingActions;
  const mockEmployee: Employee = {
    id: 123,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    position: 'Developer',
    department: 'IT',
    dateOfBirth: '1990-01-01',
    phoneNumber: '1234567890',
    dateOfEmployment: '2020-01-01',
  };
  const mockOnDelete = sinon.stub();

  beforeEach(async () => {
    element = new EmployeeListingActions();
    element.employee = mockEmployee;
    element.onDelete = mockOnDelete;
    document.body.appendChild(element);
  });

  afterEach(() => {
    sinon.restore();
    element.remove();
    mockOnDelete.reset();
  });

  it('renders edit link with correct href', () => {
    const editLink = element.shadowRoot!.querySelector('a');
    sinon.assert.match(editLink?.getAttribute('href'), '/employee/update/123');
  });

  it('calls onDelete callback when delete button is clicked', () => {
    const deleteButton = element.shadowRoot!.querySelector('button');
    deleteButton?.dispatchEvent(new Event('click'));

    sinon.assert.calledOnce(mockOnDelete);
    sinon.assert.calledWith(mockOnDelete, mockEmployee);
  });
});
