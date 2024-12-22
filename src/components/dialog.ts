import { localized, msg } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../icons/close';

@customElement('dialog-element')
@localized()
export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  label = '';

  render() {
    return html`
      <div
        role="dialog"
        aria-modal="true"
        class="dialog__backdrop"
        aria-label=${this.label}
        aria-hidden=${!this.open}
        @keydown=${this._handleKeydown}
        @click=${this._handleBackdropClick}
      >
        <div class="dialog__content" @click=${this._stopPropagation}>
          ${html`
            <button
              class="dialog__close"
              title=${msg('Close dialog')}
              aria-label=${msg('Close dialog')}
              @click=${this._handleBackdropClick}
            >
              <close-icon></close-icon>
            </button>
          `}
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _handleBackdropClick() {
    this.dispatchEvent(
      new CustomEvent('dialog-backdrop-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this._handleBackdropClick();
    }
  }

  private _stopPropagation(event: Event) {
    event.stopPropagation();
  }

  static styles = css`
    :host {
      display: contents;
    }

    .dialog__backdrop {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      display: none;
      position: fixed;
      align-items: center;
      justify-content: center;
      z-index: var(--ing-index-backdrop);
      background-color: var(--ing-color-backdrop);
    }

    :host([open]) .dialog__backdrop {
      display: flex;
    }

    .dialog__content {
      overflow: auto;
      max-width: 90vw;
      max-height: 90vh;
      position: relative;
      padding: var(--ing-space-12x);
      background: var(--ing-color-white);
      border-radius: var(--ing-radius-m);
    }

    .dialog__close {
      top: 20px;
      right: 20px;
      border: none;
      cursor: pointer;
      background: none;
      position: absolute;
      color: var(--ing-color-primary);
    }

    .dialog__close:hover {
      opacity: 0.8;
    }
  `;
}

@customElement('dialog-header')
export class DialogHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--ing-space-8x);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('dialog-body')
export class DialogBody extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('dialog-footer')
export class DialogFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: right;
      margin-top: var(--ing-space-8x);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dialog-element': Dialog;
    'dialog-body': DialogBody;
    'dialog-header': DialogHeader;
    'dialog-footer': DialogFooter;
  }
}
