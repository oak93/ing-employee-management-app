import { html, fixture, expect } from '@open-wc/testing';

import '../../components/card';

describe('Card Components', () => {
  describe('card-element', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <card-element> Test content </card-element>
      `);

      expect(el.shadowRoot?.querySelector('slot')).to.exist;
      expect(el).dom.to.equal(`
        <card-element>
          Test content
        </card-element>
      `);
    });
  });

  describe('card-header', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <card-header> Header content </card-header>
      `);

      expect(el.shadowRoot?.querySelector('slot')).to.exist;
      expect(el).dom.to.equal(`
        <card-header>
          Header content
        </card-header>
      `);
    });
  });

  describe('card-content', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <card-content> Main content </card-content>
      `);

      expect(el.shadowRoot?.querySelector('slot')).to.exist;
      expect(el).dom.to.equal(`
        <card-content>
          Main content
        </card-content>
      `);
    });
  });

  describe('card-footer', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <card-footer> Footer content </card-footer>
      `);

      expect(el.shadowRoot?.querySelector('slot')).to.exist;
      expect(el).dom.to.equal(`
        <card-footer>
          Footer content
        </card-footer>
      `);
    });
  });

  it('should compose a complete card', async () => {
    const el = await fixture(html`
      <card-element>
        <card-header>Header</card-header>
        <card-content>Content</card-content>
        <card-footer>Footer</card-footer>
      </card-element>
    `);

    expect(el.querySelector('card-header')).to.exist;
    expect(el.querySelector('card-content')).to.exist;
    expect(el.querySelector('card-footer')).to.exist;
  });
});
