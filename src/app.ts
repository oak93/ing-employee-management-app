import { html, LitElement } from 'lit';
import { routes } from './routes';
import { Router } from '@vaadin/router';
import * as Localization from '../localization';
import { customElement } from 'lit/decorators.js';

import './contexts/app';
import './contexts/employee';

import './components/navigation';

@customElement('app-element')
export class App extends LitElement {
  private router?: Router;
  private cleanupLocalization?: () => void;

  async firstUpdated() {
    const outlet = this.shadowRoot?.querySelector('#outlet');
    this.router = new Router(outlet);
    this.router.setRoutes(routes);

    this.cleanupLocalization = await Localization.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupLocalization?.();
  }

  render() {
    return html`<app-provider
      ><employee-provider>
        <navigation-element></navigation-element>
        <div id="outlet"></div> </employee-provider
    ></app-provider>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': App;
  }
}
