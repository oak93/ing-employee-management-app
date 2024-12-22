import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('plus-icon')
export class PlusIcon extends LitElement {
  render() {
    return html`
      <svg
        width="16"
        height="16"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'plus-icon': PlusIcon;
  }
}
