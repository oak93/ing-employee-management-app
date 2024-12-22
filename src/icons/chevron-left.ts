import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('chevron-left-icon')
export class ChevronLeftIcon extends LitElement {
  render() {
    return html`
      <svg
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
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
    'chevron-left-icon': ChevronLeftIcon;
  }
}
