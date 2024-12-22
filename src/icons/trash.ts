import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('trash-icon')
export class TrashIcon extends LitElement {
  render() {
    return html`
      <svg
        width="20"
        height="20"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
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
    'trash-icon': TrashIcon;
  }
}
