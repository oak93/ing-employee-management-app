import { css, html, LitElement, TemplateResult } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';

import '../components/dialog';

@customElement('employee-confirmation-dialog')
@localized()
export class EmployeeConfirmationDialog extends LitElement {
  @property()
  title!: string;

  @property({ attribute: false })
  message!: TemplateResult;

  @property()
  proceed!: () => void;

  @property()
  cancel!: () => void;

  render() {
    return html`
      <dialog-element
        open
        class="dialog"
        label=${this.title}
        @dialog-backdrop-click=${this.cancel}
      >
        <dialog-header>
          <h2 class="dialog__title">${this.title}</h2>
        </dialog-header>
        <dialog-body>
          <p class="dialog__message">${this.message}</p>
        </dialog-body>
        <dialog-footer>
          <div class="dialog__footer">
            <button class="dialog__button--proceed" @click=${this.proceed}>
              ${msg('Proceed')}
            </button>
            <button class="dialog__button--cancel" @click=${this.cancel}>
              ${msg('Cancel')}
            </button>
          </div>
        </dialog-footer>
      </dialog-element>
    `;
  }

  static styles = css`
    .dialog {
      button {
        border: none;
        cursor: pointer;
        background-color: transparent;
      }

      button:hover {
        opacity: 0.8;
      }

      .dialog__title {
        margin-top: 0;
        color: var(--ing-color-primary);
        font-size: var(--ing-font-size-lg);
      }

      .dialog__message {
        max-width: 600px;
        word-wrap: break-word;
      }

      .dialog__footer {
        display: flex;
        flex-direction: column;
        gap: var(--ing-space-4x);
      }

      .dialog__button--proceed {
        color: var(--ing-color-white);
        border-radius: var(--ing-radius-m);
        background-color: var(--ing-color-primary);
        padding: var(--ing-space-4x) var(--ing-space-8x);
      }

      .dialog__button--cancel {
        color: var(--ing-color-primary);
        border-radius: var(--ing-radius-m);
        border: 1px solid var(--ing-color-primary);
        padding: var(--ing-space-4x) var(--ing-space-8x);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-confirmation-dialog': EmployeeConfirmationDialog;
  }
}
