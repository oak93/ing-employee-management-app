import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DEFAULT_LOCALE } from '../constants/app';
import { createContext, provide } from '@lit/context';

export const appContext = createContext<AppContext>(Symbol('app'));

@customElement('app-provider')
export class AppProvider extends LitElement {
  protected locale =
    localStorage.getItem('locale') ||
    document.querySelector('html')?.lang ||
    DEFAULT_LOCALE;

  constructor() {
    super();
    this.setLocale(this.locale);
  }

  protected _updateAppState(updates: Partial<AppContext>) {
    this.appState = {
      ...this.appState,
      ...updates,
    };
  }

  protected setLocale(lang: string) {
    document.documentElement.lang = lang;
    localStorage.setItem('locale', lang);
    this.locale = lang;
    this._updateAppState({ locale: lang });
  }

  @provide({ context: appContext })
  public appState: AppContext = {
    locale: this.locale,
    setLocale: (lang: string) => {
      this.setLocale(lang);
    },
  };

  render() {
    return html`<slot></slot>`;
  }
}

export interface AppContext {
  locale: string;
  setLocale: (lang: string) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-provider': AppProvider;
  }
}
