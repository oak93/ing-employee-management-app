import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('close-icon')
export class CloseIcon extends LitElement {
  render() {
    return html`
      <svg
        width="20"
        height="20"
        fill="none"
        stroke-width="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    `;
  }

  static styles = css`
    :host {
      width: 20px;
      height: 20px;
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'close-icon': CloseIcon;
  }
}
