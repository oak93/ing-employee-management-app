import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('list-icon')
export class ListIcon extends LitElement {
  render() {
    return html`
      <svg
        width="24"
        height="24"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 12h18" />
        <path d="M3 18h18" />
        <path d="M3 6h18" />
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
    'list-icon': ListIcon;
  }
}
