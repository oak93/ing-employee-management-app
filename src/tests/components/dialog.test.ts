import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../../components/dialog';
import { Dialog } from '../../components/dialog';

describe('Dialog Components', () => {
  describe('dialog-element', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <dialog-element>Test content</dialog-element>
      `);

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
      expect(el.textContent?.trim()).to.equal('Test content');
    });

    it('should set aria-label from label property', async () => {
      const el = await fixture(html`
        <dialog-element label="Test Dialog">Test content</dialog-element>
      `);

      const dialog = el.shadowRoot?.querySelector('[role="dialog"]');
      expect(dialog).to.exist;
      expect(el.getAttribute('label')).to.equal('Test Dialog');
    });

    it('should emit dialog-backdrop-click when backdrop is clicked', async () => {
      const el = await fixture(html`
        <dialog-element>Test content</dialog-element>
      `);

      const backdrop = el.shadowRoot?.querySelector('.dialog__backdrop');
      const clickPromise = oneEvent(el, 'dialog-backdrop-click');

      expect(backdrop).to.exist;
      backdrop?.dispatchEvent(new MouseEvent('click'));
      const event = await clickPromise;

      expect(event.type).to.equal('dialog-backdrop-click');
      expect(event.target).to.equal(el);
    });

    it('should emit dialog-backdrop-click when close button is clicked', async () => {
      const el = await fixture(html`
        <dialog-element>Test content</dialog-element>
      `);

      const closeButton = el.shadowRoot?.querySelector('.dialog__close');
      const clickPromise = oneEvent(el, 'dialog-backdrop-click');

      closeButton?.dispatchEvent(new MouseEvent('click'));
      const event = await clickPromise;

      expect(event.type).to.equal('dialog-backdrop-click');
      expect(event.target).to.equal(el);
    });

    it('should emit dialog-backdrop-click on Escape key', async () => {
      const el = await fixture(html`
        <dialog-element>Test content</dialog-element>
      `);

      const backdrop = el.shadowRoot?.querySelector('.dialog__backdrop');
      const clickPromise = oneEvent(el, 'dialog-backdrop-click');

      expect(backdrop).to.exist;
      backdrop?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      const event = await clickPromise;

      expect(event.type).to.equal('dialog-backdrop-click');
      expect(event.target).to.equal(el);
    });

    it('should not propagate clicks on dialog content', async () => {
      const el = await fixture<Dialog>(html`
        <dialog-element>Test content</dialog-element>
      `);

      const content = el.shadowRoot?.querySelector('.dialog__content');
      let backdropClicked = false;

      el.addEventListener('dialog-backdrop-click', () => {
        backdropClicked = true;
      });

      expect(content).to.exist;
      expect(el.shadowRoot).to.exist;

      content?.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;

      expect(backdropClicked).to.be.false;
    });
  });

  describe('dialog-header', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <dialog-header>Header content</dialog-header>
      `);

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
      expect(el.textContent?.trim()).to.equal('Header content');
    });
  });

  describe('dialog-body', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html` <dialog-body>Body content</dialog-body> `);

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
      expect(el.textContent?.trim()).to.equal('Body content');
    });
  });

  describe('dialog-footer', () => {
    it('should render with slot content', async () => {
      const el = await fixture(html`
        <dialog-footer>Footer content</dialog-footer>
      `);

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
      expect(el.textContent?.trim()).to.equal('Footer content');
    });
  });

  it('should compose a complete dialog', async () => {
    const el = await fixture(html`
      <dialog-element>
        <dialog-header>Header</dialog-header>
        <dialog-body>Content</dialog-body>
        <dialog-footer>Footer</dialog-footer>
      </dialog-element>
    `);

    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.querySelector('dialog-header')?.textContent?.trim()).to.equal(
      'Header'
    );
    expect(el.querySelector('dialog-body')?.textContent?.trim()).to.equal(
      'Content'
    );
    expect(el.querySelector('dialog-footer')?.textContent?.trim()).to.equal(
      'Footer'
    );
  });
});
