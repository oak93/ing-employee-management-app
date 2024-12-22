import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('card-element')
export class Card extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--ing-space-8x);
      border-radius: var(--ing-radius-m);
      background: var(--ing-color-white);
      box-shadow: var(--ing-shadow-card);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('card-header')
export class CardHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--ing-space-8x);
      padding-bottom: var(--ing-space-8x);
      border-bottom: 1px solid var(--ing-color-soft);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('card-content')
export class CardContent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('card-footer')
export class CardFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-top: var(--ing-space-8x);
      padding-top: var(--ing-space-8x);
      border-top: 1px solid var(--ing-color-soft);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-element': Card;
    'card-header': CardHeader;
    'card-footer': CardFooter;
    'card-content': CardContent;
  }
}
