import { LitElement, css, html } from 'lit';
import { consume } from '@lit/context';
import { Router } from '@vaadin/router';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { NUMBER_REGEX } from '../constants/app';
import '../containers/employee-confirmation-dialog';
import { Employee, EmployeeFormAttributes } from '../models/employee';
import { EmployeeContext, employeeContext } from '../contexts/employee';
@customElement('employee-form')
@localized()
export class EmployeeForm extends LitElement {
  @consume({ context: employeeContext, subscribe: true })
  @property({ attribute: false })
  private employeeContext?: EmployeeContext;

  @state()
  private _employeeToUpdate?: Omit<Employee, 'id'>;

  @state()
  private _errors?: Record<string, string>;

  public employeeId?: number;
  private _employee?: Employee;

  connectedCallback() {
    super.connectedCallback();

    this.employeeContext?.fetchEmployees();
    this.getEmployeeById();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.employeeContext?.clearError();
  }

  private getEmployeeById() {
    if (this.employeeId && this.employeeContext) {
      this._employee = this.employeeContext.getEmployeeById(
        Number(this.employeeId)
      );
    }
  }

  private _validateForm(formValues: Record<string, string>) {
    const errors: Record<string, string> = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = msg('First name is required!');
    } else {
      delete errors.firstName;
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = msg('Last name is required!');
    } else {
      delete errors.lastName;
    }

    if (!formValues.dateOfBirth) {
      errors.dateOfBirth = msg('Date of birth is required!');
    } else {
      delete errors.dateOfBirth;
    }

    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = msg('Phone number is required!');
    } else if (!formValues.phoneNumber.match(NUMBER_REGEX)) {
      errors.phoneNumber = msg('Phone number is invalid! E.g 905555555555');
    } else {
      delete errors.phoneNumber;
    }

    if (!this._employee?.email.trim() && !formValues.email?.trim()) {
      errors.email = msg('Email is required!');
    } else {
      delete errors.email;
    }

    if (formValues.dateOfBirth && formValues.dateOfEmployment) {
      const birthDate = new Date(formValues.dateOfBirth);
      const employmentDate = new Date(formValues.dateOfEmployment);

      if (employmentDate < birthDate) {
        errors.dateOfEmployment = msg(
          'Date of employment cannot be before date of birth!'
        );
      } else {
        delete errors.dateOfEmployment;
      }
    }

    this._errors = errors;

    return errors;
  }

  private _handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData) as Record<string, string>;

    const errors = this._validateForm(formValues);

    if (Object.keys(errors).length > 0) {
      this._errors = errors;
      return;
    }

    if (this._employee) {
      this._employeeToUpdate = formValues as Omit<Employee, 'id'>;
    } else {
      this.employeeContext?.addEmployee(formValues as Omit<Employee, 'id'>);
      Router.go('/');
    }
  }

  _renderUpdateConfirmationDialog() {
    if (!this._employeeToUpdate || !this._employee) {
      return html``;
    }

    const title = msg('Are you sure?');
    const message = msg(
      html`Selected employee record of ${this._employee.firstName}
      ${this._employee.lastName} will be updated.`
    );

    return html`
      <employee-confirmation-dialog
        title=${title}
        .message=${message}
        .cancel=${() => (this._employeeToUpdate = undefined)}
        .proceed=${() => {
          this.employeeContext?.updateEmployee(
            this._employee?.id!,
            this._employeeToUpdate!
          );
          this._employeeToUpdate = undefined;
          this.requestUpdate();
          Router.go('/');
        }}
      ></employee-confirmation-dialog>
    `;
  }

  _renderInputField({
    name,
    type,
    value,
    error,
    label,
    disabled,
    maxLength,
    minLength,
    placeholder,
  }: EmployeeFormAttributes) {
    return html`
      <div class="form__field">
        <label for="${name}">${label}</label>
        <input
          required
          id="${name}"
          type="${type}"
          name="${name}"
          .value="${value}"
          ?disabled=${disabled}
          maxlength=${ifDefined(maxLength)}
          minlength=${ifDefined(minLength)}
          placeholder="${placeholder ? placeholder : ''}"
        />
        ${error ? html`<div class="form__field__error">${error}</div>` : ''}
      </div>
    `;
  }

  render() {
    return html`
      <form class="form" @submit=${this._handleSubmit}>
        <h2>
          ${this._employee ? msg('Edit Employee') : msg('Create Employee')}
        </h2>
        ${this._renderInputField({
          type: 'text',
          minLength: 2,
          maxLength: 50,
          name: 'firstName',
          label: msg('First Name'),
          placeholder: msg('Name'),
          error: this._errors?.firstName || '',
          value: this._employee?.firstName || '',
        })}
        ${this._renderInputField({
          minLength: 2,
          type: 'text',
          maxLength: 50,
          name: 'lastName',
          label: msg('Last Name'),
          placeholder: msg('Last Name'),
          error: this._errors?.lastName || '',
          value: this._employee?.lastName || '',
        })}
        ${this._renderInputField({
          type: 'date',
          name: 'dateOfEmployment',
          label: msg('Date of Employment'),
          error: this._errors?.dateOfEmployment || '',
          value: this._employee?.dateOfEmployment || '',
        })}
        ${this._renderInputField({
          type: 'date',
          name: 'dateOfBirth',
          label: msg('Date of Birth'),
          error: this._errors?.dateOfBirth || '',
          value: this._employee?.dateOfBirth || '',
        })}
        ${this._renderInputField({
          type: 'tel',
          maxLength: 15,
          minLength: 10,
          name: 'phoneNumber',
          label: msg('Phone Number'),
          placeholder: '905555555555',
          error: this._errors?.phoneNumber || '',
          value: this._employee?.phoneNumber || '',
        })}
        ${this._renderInputField({
          name: 'email',
          type: 'email',
          maxLength: 50,
          label: msg('Email'),
          error: this._errors?.email || '',
          disabled: Boolean(this._employee),
          value: this._employee?.email || '',
          placeholder: msg('example@ing.com'),
        })}
        <div class="form__field">
          <label for="department">${msg('Department')}</label>
          <select
            required
            id="department"
            name="department"
            .value="${this._employee?.department || '0'}"
          >
            <option value="0">${msg('Tech')}</option>
            <option value="1">${msg('Analytics')}</option>
          </select>
        </div>
        <div class="form__field">
          <label for="position">${msg('Position')}</label>
          <select
            required
            id="position"
            name="position"
            .value="${this._employee?.position || '0'}"
          >
            <option value="0">${msg('Junior')}</option>
            <option value="1">${msg('Medior')}</option>
            <option value="2">${msg('Senior')}</option>
          </select>
        </div>
        ${this.employeeContext?.error
          ? html`<div class="form_error">${this.employeeContext.error}</div>`
          : ''}
        <div class="form__actions">
          <a href="/">${msg('Cancel')}</a>
          <button class="form__actions__submit" type="submit">
            ${msg('Submit')}
          </button>
        </div>
        ${this._renderUpdateConfirmationDialog()}
      </form>
    `;
  }

  static styles = css`
    .form {
      display: flex;
      margin: 0 auto;
      max-width: 600px;
      flex-direction: column;
      gap: var(--ing-space-8x);
      padding: var(--ing-space-8x);
      margin-top: var(--ing-space-16x);
      border-radius: var(--ing-radius-m);
      background-color: var(--ing-color-white);

      @media (max-width: 768px) {
        margin-top: var(--ing-space-4x);
      }

      h2 {
        margin: 0;
        color: var(--ing-color-primary);
        margin-bottom: var(--ing-space-4x);
        font-size: var(--ing-font-size-xl);
      }

      input,
      select {
        outline: none;
        padding: var(--ing-space-6x);
        border-radius: var(--ing-radius-s);
        border: 1px solid var(--ing-color-secondary-light);
      }

      input:focus,
      select:focus {
        border: 1px solid var(--ing-color-primary);
      }

      input:disabled {
        cursor: not-allowed;
        background-color: var(--ing-color-secondary-light);
      }

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--ing-color-secondary);
      }

      a:hover {
        opacity: 0.8;
      }
    }

    .form__field {
      display: flex;
      flex-direction: column;
      gap: var(--ing-space-4x);

      label {
        font-size: var(--ing-font-size-s);
        color: var(--ing-color-secondary);
      }
    }

    .form_error {
      color: var(--ing-color-error);
      font-size: var(--ing-font-size-s);
    }

    .form__actions {
      display: flex;
      gap: var(--ing-space-8x);
      justify-content: flex-end;
      margin-top: var(--ing-space-4x);
    }

    .form__actions__submit {
      border: none;
      cursor: pointer;
      color: var(--ing-color-white);
      border-radius: var(--ing-radius-s);
      background-color: var(--ing-color-primary);
      padding: var(--ing-space-6x) var(--ing-space-8x);
    }

    .form__field__error {
      color: var(--ing-color-error);
      font-size: var(--ing-font-size-s);
    }

    .form__actions__submit:hover {
      opacity: 0.8;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-form': EmployeeForm;
  }
}
