import { html, css, LitElement } from 'lit';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';

import { AppContext, appContext } from '../contexts/app';

import '../icons/plus';
import '../icons/users';

@customElement('navigation-element')
@localized()
export class Navigation extends LitElement {
  @consume({ context: appContext, subscribe: true })
  private readonly appContext?: AppContext;

  render() {
    return html`<div class="navigation">
      <a class="navigation__logo" href="/">
        <img src="/assets/ing-logo.png" width="30" height="30" alt="ING Logo" />
        <h1 class="navigation__logo__text">ING</h1>
      </a>
      <div class="navigation__links">
        <a href="/" class="navigation__link">
          <users-icon></users-icon>
          <span class="navigation__link__text">${msg('Employees')}</span>
        </a>
        <a href="/employee/create" class="navigation__link">
          <plus-icon></plus-icon>
          <span class="navigation__link__text">${msg('Add Employee')}</span>
        </a>
        <select
          class="language-select"
          aria-label="${msg('Select language')}"
          @change=${(event: Event) =>
            this.appContext?.setLocale(
              (event.target as HTMLSelectElement).value
            )}
        >
          <option value="en" ?selected=${this.appContext?.locale === 'en'}>
            <span>🇬🇧</span>
            <div>${msg('English')}</div>
          </option>
          <option value="tr" ?selected=${this.appContext?.locale === 'tr'}>
            <span>🇹🇷</span>
            <div>${msg('Turkish')}</div>
          </option>
        </select>
      </div>
    </div>`;
  }

  static styles = css`
    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--ing-color-white);
      padding: var(--ing-space-6x) var(--ing-space-16x);
    }

    .navigation__logo {
      display: flex;
      cursor: pointer;
      align-items: center;
      text-decoration: none;
      gap: var(--ing-space-8x);
      color: var(--ing-color-secondary);
      font-weight: var(--ing-font-weight-bold);
    }

    .navigation__links {
      display: flex;
      gap: var(--ing-space-8x);
    }

    .navigation__link {
      display: flex;
      cursor: pointer;
      align-items: center;
      text-decoration: none;
      justify-content: center;
      gap: var(--ing-space-4x);
      color: var(--ing-color-primary);
    }

    .navigation__logo__text {
      margin: 0;
      font-size: var(--ing-font-size-md);
    }

    .navigation__logo__text,
    .navigation__link__text {
      display: block;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .navigation__link:hover {
      opacity: 0.8;
    }

    .language-select {
      border: none;
      cursor: pointer;
      background: none;
      padding: var(--ing-space-4x);
      font-size: var(--ing-font-size-md);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-element': Navigation;
  }
}
