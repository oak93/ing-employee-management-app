import { LitElement, css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';

import '../components/card';
import './employee-listing-actions';
import { Employee } from '../models/employee';

@customElement('employee-list-view')
@localized()
export class EmployeeListView extends LitElement {
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
      <div class="employee-list__wrapper">
        ${this.employees?.map(
          (employee) => html`
            <card-element>
              <card-header>
                <h2 class="employee-list__title">
                  ${employee.firstName} ${employee.lastName}
                </h2>
              </card-header>
              <card-content>
                <div class="employee-list__content">
                  <div class="employee-list__field">
                    <span class="employee-list__label"
                      >${msg('Position')}:</span
                    >
                    <span>${this._getPosition(employee)}</span>
                  </div>
                  <div class="employee-list__field">
                    <span class="employee-list__label"
                      >${msg('Department')}:</span
                    >
                    <span>${this._getDepartment(employee)}</span>
                  </div>
                  <div class="employee-list__field">
                    <span class="employee-list__label">${msg('Email')}:</span>
                    <span class="employee-list__label-content"
                      >${employee.email}</span
                    >
                  </div>
                  <div class="employee-list__field">
                    <span class="employee-list__label">${msg('Phone')}:</span>
                    <span class="employee-list__label-content"
                      >${employee.phoneNumber}</span
                    >
                  </div>
                </div>
              </card-content>
              <card-footer>
                <employee-listing-actions
                  class="employee-list__actions"
                  .employee=${employee}
                  .onDelete=${this.onDelete}
                ></employee-listing-actions>
              </card-footer>
            </card-element>
          `
        )}
      </div>
    `;
  }

  static styles = css`
    .employee-list__wrapper {
      display: grid;
      gap: var(--ing-space-8x);
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

      h2 {
        margin: 0;
        color: var(--ing-color-primary);
        font-size: var(--ing-font-size-lg);
      }
    }

    .employee-list__title {
      word-break: break-word;
    }

    .employee-list__content {
      display: flex;
      overflow: hidden;
      flex-direction: column;
      gap: var(--ing-space-4x);
    }

    .employee-list__actions {
      display: flex;
      justify-content: flex-end;
    }

    .employee-list__field {
      display: flex;
      gap: var(--ing-space-2x);
    }

    .employee-list__label {
      font-weight: bold;
    }

    .employee-list__label-content {
      word-break: break-word;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-list-view': EmployeeListView;
  }
}
