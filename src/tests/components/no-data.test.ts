import { html, fixture, expect } from '@open-wc/testing';

import '../../components/no-data';
import { NoData } from '../../components/no-data';

describe('NoData Component', () => {
  describe('no-data', () => {
    it('should render basic structure with provided props', async () => {
      const el = await fixture<NoData>(
        html`<no-data title="Test Title" message="Test Message"></no-data>`
      );

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;

      const title = el.shadowRoot?.querySelector('.no-data__title');
      const message = el.shadowRoot?.querySelector('.no-data__message');
      const link = el.shadowRoot?.querySelector('.no-data__link');

      expect(title?.textContent).to.equal('Test Title');
      expect(message?.textContent).to.equal('Test Message');
      expect(link?.getAttribute('href')).to.equal('/employee/create');
    });

    it('should update content when properties change', async () => {
      const el = await fixture<NoData>(
        html`<no-data
          title="Initial Title"
          message="Initial Message"
        ></no-data>`
      );

      el.title = 'Updated Title';
      el.message = 'Updated Message';
      await el.updateComplete;

      const title = el.shadowRoot?.querySelector('.no-data__title');
      const message = el.shadowRoot?.querySelector('.no-data__message');

      expect(title?.textContent).to.equal('Updated Title');
      expect(message?.textContent).to.equal('Updated Message');
    });

    it('should render the add employee link with correct translation', async () => {
      const el = await fixture<NoData>(
        html`<no-data title="Test Title" message="Test Message"></no-data>`
      );

      const link = el.shadowRoot?.querySelector('.no-data__link');
      expect(link).to.exist;
      expect(link?.textContent?.trim()).to.equal('Add Employee');
    });
  });
});
