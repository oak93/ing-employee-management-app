import { LitElement, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';

import '../components/table';
import './employee-listing-actions';
import { Employee } from '../models/employee';

@customElement('employee-table-view')
@localized()
export class EmployeeTableView extends LitElement {
  @property({ type: Array })
  employees: Employee[] = [];

  @property()
  onDelete?: (employee: Employee) => void;

  _getPosition(employee: Employee) {
    switch (employee.position) {
      case '0':
        return msg('Junior');
      case '1':
        return msg('Medior');
      case '2':
        return msg('Senior');
    }
  }

  _getDepartment(employee: Employee) {
    switch (employee.department) {
      case '0':
        return msg('Tech');
      case '1':
        return msg('Analytics');
    }
  }

  render() {
    return html`
      <table-element>
        <table-header slot="header">
          <table-row>
            <table-cell header>ID</table-cell>
            <table-cell header>${msg('First Name')}</table-cell>
            <table-cell header>${msg('Last Name')}</table-cell>
            <table-cell header>${msg('Date of Employment')}</table-cell>
            <table-cell header>${msg('Date of Birth')}</table-cell>
            <table-cell header>${msg('Phone')}</table-cell>
            <table-cell header>${msg('Email')}</table-cell>
            <table-cell header>${msg('Department')}</table-cell>
            <table-cell header>${msg('Position')}</table-cell>
            <table-cell header>${msg('Actions')}</table-cell>
          </table-row>
        </table-header>
        <table-body slot="body">
          ${this.employees?.map(
            (employee) => html`
              <table-row>
                <table-cell>${employee.id}</table-cell>
                <table-cell><b>${employee.firstName}</b></table-cell>
                <table-cell><b>${employee.lastName}</b></table-cell>
                <table-cell>${employee.dateOfEmployment}</table-cell>
                <table-cell>${employee.dateOfBirth}</table-cell>
                <table-cell>${employee.phoneNumber}</table-cell>
                <table-cell>${employee.email}</table-cell>
                <table-cell>${this._getDepartment(employee)}</table-cell>
                <table-cell>${this._getPosition(employee)}</table-cell>
                <table-cell>
                  <employee-listing-actions
                    .employee=${employee}
                    .onDelete=${this.onDelete}
                  ></employee-listing-actions>
                </table-cell>
              </table-row>
            `
          )}
        </table-body>
      </table-element>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-table-view': EmployeeTableView;
  }
}
