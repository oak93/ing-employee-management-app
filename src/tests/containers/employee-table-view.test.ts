import { fixture, html, expect } from '@open-wc/testing';

import { Employee } from '../../models/employee';
import { EmployeeTableView } from '../../containers/employee-table-view';

describe('EmployeeTableView', () => {
  let element: EmployeeTableView;

  const mockEmployee: Employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfEmployment: '2023-01-01',
    dateOfBirth: '1990-01-01',
    phoneNumber: '1234567890',
    email: 'john@example.com',
    department: '0',
    position: '1',
  };

  beforeEach(async () => {
    element = await fixture(html`<employee-table-view></employee-table-view>`);
  });

  it('renders empty table when no employees', async () => {
    const rows = element.shadowRoot!.querySelectorAll('table-row');
    expect(rows.length).to.equal(1);
  });

  it('renders employee data correctly', async () => {
    element.employees = [mockEmployee];
    await element.updateComplete;

    const cells = element.shadowRoot!.querySelectorAll('table-body table-cell');
    expect(cells[0].textContent).to.equal('1');
    expect(cells[1].textContent).to.equal('John');
    expect(cells[2].textContent).to.equal('Doe');
    expect(cells[3].textContent).to.equal('2023-01-01');
    expect(cells[4].textContent).to.equal('1990-01-01');
    expect(cells[5].textContent).to.equal('1234567890');
    expect(cells[6].textContent).to.equal('john@example.com');
  });

  describe('_getDepartment', () => {
    it('returns Tech for department 0', () => {
      expect(
        element._getDepartment({ ...mockEmployee, department: '0' })
      ).to.equal('Tech');
    });

    it('returns Analytics for department 1', () => {
      expect(
        element._getDepartment({ ...mockEmployee, department: '1' })
      ).to.equal('Analytics');
    });
  });

  describe('_getPosition', () => {
    it('returns Junior for position 0', () => {
      expect(element._getPosition({ ...mockEmployee, position: '0' })).to.equal(
        'Junior'
      );
    });

    it('returns Medior for position 1', () => {
      expect(element._getPosition({ ...mockEmployee, position: '1' })).to.equal(
        'Medior'
      );
    });

    it('returns Senior for position 2', () => {
      expect(element._getPosition({ ...mockEmployee, position: '2' })).to.equal(
        'Senior'
      );
    });
  });

  it('registers as a custom element', () => {
    expect(customElements.get('employee-table-view')).to.equal(
      EmployeeTableView
    );
  });
});
