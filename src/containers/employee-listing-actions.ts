import { LitElement, css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';

import '../icons/edit';
import '../icons/trash';
import { Employee } from '../models/employee';

@customElement('employee-listing-actions')
@localized()
export class EmployeeListingActions extends LitElement {
  @property({ type: Object })
  employee!: Employee;

  @property()
  onDelete?: (employee: Employee) => void;

  render() {
    return html`
      <div class="employee-listing-actions__wrapper">
        <a
          title="${msg('Edit employee')}"
          href=${`/employee/update/${this.employee.id}`}
        >
          <edit-icon></edit-icon>
          <span class="sr-only">${msg('Edit')}</span>
        </a>
        <button
          title="${msg('Delete employee')}"
          @click=${() => this.onDelete?.(this.employee)}
        >
          <trash-icon></trash-icon>
          <span class="sr-only">${msg('Delete')}</span>
        </button>
      </div>
    `;
  }

  static styles = css`
    .employee-listing-actions__wrapper {
      display: flex;
      align-items: center;
      gap: var(--ing-space-6x);

      a,
      button {
        padding: 0;
        border: none;
        display: flex;
        color: inherit;
        cursor: pointer;
        background: none;
        align-items: center;
        justify-content: center;
        color: var(--ing-color-primary);
      }
    }

    .sr-only {
      border: 0;
      width: 1px;
      padding: 0;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-listing-actions': EmployeeListingActions;
  }
}
