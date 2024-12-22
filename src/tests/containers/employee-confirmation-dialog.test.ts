import sinon from 'sinon';
import { html } from '@open-wc/testing';

import { EmployeeConfirmationDialog } from '../../containers/employee-confirmation-dialog';

describe('EmployeeConfirmationDialog', () => {
  let element: EmployeeConfirmationDialog;
  const mockProceed = sinon.stub();
  const mockCancel = sinon.stub();
  const testTitle = 'Test Dialog';
  const testMessage = 'Test message';

  beforeEach(async () => {
    element = new EmployeeConfirmationDialog();
    element.title = testTitle;
    element.proceed = mockProceed;
    element.cancel = mockCancel;
    document.body.appendChild(element);
    element.message = html`<span>${testMessage}</span>`;
  });

  afterEach(() => {
    sinon.restore();
    element.remove();
    mockCancel.reset();
    mockProceed.reset();
  });

  it('renders with correct title and message', () => {
    const dialogTitle = element.shadowRoot!.querySelector('.dialog__title');
    const dialogMessage = element.shadowRoot!.querySelector('.dialog__message');

    sinon.assert.match(dialogTitle?.textContent, testTitle);
    sinon.assert.match(dialogMessage?.innerHTML.includes('Test message'), true);
  });

  it('calls proceed callback when proceed button is clicked', async () => {
    const proceedButton = element.shadowRoot!.querySelector(
      '.dialog__button--proceed'
    );
    proceedButton?.dispatchEvent(new Event('click'));

    sinon.assert.calledOnce(mockProceed);
  });

  it('calls cancel callback when cancel button is clicked', async () => {
    const cancelButton = element.shadowRoot!.querySelector(
      '.dialog__button--cancel'
    );
    cancelButton?.dispatchEvent(new Event('click'));

    sinon.assert.calledOnce(mockCancel);
  });

  it('calls cancel callback when backdrop is clicked', async () => {
    const dialog = element.shadowRoot!.querySelector('dialog-element');
    dialog?.dispatchEvent(new Event('dialog-backdrop-click'));
    sinon.assert.calledOnce(mockCancel);
  });
});
