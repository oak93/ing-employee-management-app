import { LitElement, css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';

@customElement('no-data')
@localized()
export class NoData extends LitElement {
  @property({ type: String })
  title!: string;

  @property({ type: String })
  message!: string;

  render() {
    return html`
      <div class="no-data">
        <p class="no-data__title"><b>${this.title}</b></p>
        <p class="no-data__message">${this.message}</p>
        <a href="/employee/create" class="no-data__link"
          >${msg('Add Employee')}</a
        >
      </div>
    `;
  }

  static styles = css`
    .no-data {
      height: 50vh;
      display: flex;
      text-align: center;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: var(--ing-space-6x);
      padding: var(--ing-space-8x);
      margin-top: var(--ing-space-8x);
      border-radius: var(--ing-radius-m);
      border: 1px dashed var(--ing-color-secondary-light);

      a {
        text-decoration: none;
        color: var(--ing-color-white);
        margin-top: var(--ing-space-4x);
        border-radius: var(--ing-radius-m);
        background-color: var(--ing-color-primary);
        border: 1px solid var(--ing-color-primary);
        padding: var(--ing-space-4x) var(--ing-space-8x);
      }

      a:hover {
        opacity: 0.8;
      }

      p {
        margin: 0;
      }
    }

    .no-data__message {
      margin: 0;
      font-size: var(--ing-font-size-md);
      color: var(--ing-color-text-secondary);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'no-data': NoData;
  }
}
