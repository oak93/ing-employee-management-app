import { LitElement, css, html } from 'lit';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';

import '../icons/list';
import '../icons/table';
import '../components/no-data';
import '../components/pagination';
import '../containers/employee-list-view';
import '../containers/employee-table-view';
import { debounce } from '../utils/debounce';
import { Employee } from '../models/employee';
import '../containers/employee-confirmation-dialog';
import { DEFAULT_PAGE_SIZE } from '../constants/app';
import { EmployeeContext, employeeContext } from '../contexts/employee';

@customElement('employee-list')
@localized()
export class EmployeeList extends LitElement {
  @consume({ context: employeeContext, subscribe: true })
  private readonly employeeContext?: EmployeeContext;

  @state()
  private _activePage = 1;

  @state()
  private _isSearchResultEmpty = false;

  @state()
  private _searchTerm = '';

  @state()
  private _activeView: 'list' | 'table' = 'table';

  @state()
  private _employeeToDelete?: Employee;

  private _debouncedSearch = debounce((value: string) => {
    this._searchTerm = value;
    this.requestUpdate();
  }, 200);

  private _handleSearch = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this._debouncedSearch(value);
  };

  connectedCallback() {
    super.connectedCallback();

    if (!this.employeeContext) {
      throw new Error('Employee context is required');
    }

    this.employeeContext.fetchEmployees();
  }

  _renderDeleteConfirmationDialog() {
    if (!this._employeeToDelete) {
      return html``;
    }

    const title = msg('Are you sure?');
    const message = msg(
      html`Selected employee record of ${this._employeeToDelete.firstName}
      ${this._employeeToDelete.lastName} will be deleted.`
    );

    return html`
      <employee-confirmation-dialog
        title=${title}
        .message=${message}
        .cancel=${() => (this._employeeToDelete = undefined)}
        .proceed=${() => {
          this.employeeContext?.deleteEmployee(this._employeeToDelete?.id!);
          this._employeeToDelete = undefined;
          this.requestUpdate();
        }}
      ></employee-confirmation-dialog>
    `;
  }

  _renderNoEmployeesFound() {
    return html`<no-data
      title=${msg('No employees found')}
      message=${msg('Please add new employees to view them here.')}
    ></no-data>`;
  }

  _renderEmployeeListing() {
    if (this.employeeContext?.employees.length === 0) {
      return this._renderNoEmployeesFound();
    }

    const startIndex = (this._activePage - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + DEFAULT_PAGE_SIZE;

    const searchTerm = this._searchTerm.trim().toLowerCase();

    const filteredEmployees =
      this.employeeContext?.employees.filter((employee) => {
        if (!searchTerm) return true;

        return (
          employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }) || [];

    const paginatedEmployees =
      filteredEmployees.slice(startIndex, endIndex) || [];

    if (searchTerm && paginatedEmployees.length === 0) {
      this._isSearchResultEmpty = true;
      return this._renderNoEmployeesFound();
    } else {
      this._isSearchResultEmpty = false;
    }

    return this._activeView === 'table'
      ? html`<employee-table-view
          .employees=${paginatedEmployees}
          .onDelete=${(employee: Employee) =>
            (this._employeeToDelete = employee)}
        ></employee-table-view>`
      : html`<employee-list-view
          .employees=${paginatedEmployees}
          .onDelete=${(employee: Employee) =>
            (this._employeeToDelete = employee)}
        ></employee-list-view>`;
  }

  _renderEmployeeListingPagination() {
    if (
      this.employeeContext?.employees.length === 0 ||
      this._isSearchResultEmpty
    ) {
      return html``;
    }

    return html`
      <div class="employee-list__pagination">
        <pagination-element
          activePage=${this._activePage}
          @page-change=${(event: CustomEvent<number>) =>
            (this._activePage = event.detail)}
          totalPageCount=${Math.ceil(
            (this.employeeContext?.employees.length || 0) / DEFAULT_PAGE_SIZE
          )}
        ></pagination-element>
      </div>
    `;
  }

  _renderEmployeeListingActions() {
    if (this.employeeContext?.employees.length === 0) {
      return html``;
    }

    return html`
      <div class="employee-list__actions">
        <button
          title=${msg('List view')}
          @click=${() => {
            this._activeView = 'list';
            this.requestUpdate();
          }}
        >
          <list-icon></list-icon>
          <span class="sr-only">${msg('List view')}</span>
        </button>
        <button
          title=${msg('Table view')}
          @click=${() => {
            this._activeView = 'table';
            this.requestUpdate();
          }}
        >
          <table-icon></table-icon>
          <span class="sr-only">${msg('Table view')}</span>
        </button>
      </div>
    `;
  }

  render() {
    return html`
      <div class="employee-list_wrapper">
        <div class="employee-list__header">
          <h2>${msg('Employee List')}</h2>
          ${this._renderEmployeeListingActions()}
        </div>
        ${(this.employeeContext?.employees?.length ?? 0) > 0
          ? html`<div class="employee-list__search">
              <input
                type="text"
                @input=${this._handleSearch}
                placeholder=${msg('Search employee by name')}
              />
            </div>`
          : html``}
        <div class="employee-list__table">
          ${this._renderEmployeeListing()}
          ${this._renderEmployeeListingPagination()}
        </div>
        ${this._renderDeleteConfirmationDialog()}
      </div>
    `;
  }

  static styles = css`
    .employee-list__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        margin: 0;
        color: var(--ing-color-primary);
        font-size: var(--ing-font-size-xl);
      }

      button {
        border: none;
        cursor: pointer;
        background-color: transparent;
        color: var(--ing-color-primary);
      }

      button:hover {
        opacity: 0.8;
      }
    }

    .employee-list_wrapper {
      margin: 0 auto;
      max-width: 1600px;
      padding: var(--ing-space-4x);
      margin-top: var(--ing-space-16x);

      @media (max-width: 768px) {
        margin-top: var(--ing-space-4x);
      }
    }

    .employee-list__search {
      margin: var(--ing-space-12x) 0;

      input {
        width: 93%;
        outline: none;
        padding: var(--ing-space-6x);
        border-radius: var(--ing-radius-s);
        border: 1px solid var(--ing-color-secondary-light);

        @media (min-width: 768px) {
          width: 400px;
        }
      }

      input:focus {
        border: 1px solid var(--ing-color-primary);
      }

      input::placeholder {
        color: var(--ing-color-secondary-light);
      }
    }

    .employee-list__pagination {
      margin-top: var(--ing-space-16x);
    }

    .sr-only {
      width: 1px;
      padding: 0;
      height: 1px;
      margin: -1px;
      border-width: 0;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      clip: rect(0, 0, 0, 0);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-list': EmployeeList;
  }
}
