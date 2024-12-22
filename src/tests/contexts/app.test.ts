import { LitElement } from 'lit';
import { consume } from '@lit/context';
import { expect } from '@open-wc/testing';
import { fixture, html } from '@open-wc/testing-helpers';
import { customElement, property } from 'lit/decorators.js';

import { DEFAULT_LOCALE } from '../../constants/app';
import { AppContext, AppProvider, appContext } from '../../contexts/app';

@customElement('test-consumer')
class TestConsumer extends LitElement {
  @consume({ context: appContext, subscribe: true })
  @property({ attribute: false })
  public appState?: AppContext;

  render() {
    return html`${this.appState?.locale}`;
  }
}

describe('AppProvider', () => {
  let element: AppProvider;
  let consumer: TestConsumer;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.lang = '';
    element = await fixture(html`
      <app-provider>
        <test-consumer></test-consumer>
      </app-provider>
    `);
    consumer = element.querySelector('test-consumer')!;
  });

  it('initializes with DEFAULT_LOCALE when no locale is set', async () => {
    expect(element.appState.locale).to.equal(DEFAULT_LOCALE);
    expect(document.documentElement.lang).to.equal(DEFAULT_LOCALE);
    expect(localStorage.getItem('locale')).to.equal(DEFAULT_LOCALE);
  });

  it('initializes with localStorage locale when available', async () => {
    const testLocale = 'fr';
    localStorage.setItem('locale', testLocale);

    element = await fixture(html`
      <app-provider>
        <test-consumer></test-consumer>
      </app-provider>
    `);

    expect(element.appState.locale).to.equal(testLocale);
    expect(document.documentElement.lang).to.equal(testLocale);
  });

  it('updates locale through context method', async () => {
    const newLocale = 'de';
    element.appState.setLocale(newLocale);
    await element.updateComplete;

    expect(element.appState.locale).to.equal(newLocale);
    expect(document.documentElement.lang).to.equal(newLocale);
    expect(localStorage.getItem('locale')).to.equal(newLocale);
    expect(consumer.appState?.locale).to.equal(newLocale);
  });

  it('renders slot content', () => {
    const slot = element.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });
});
