import { expect } from '@open-wc/testing';
import { fixture, html } from '@open-wc/testing-helpers';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from '../../components/table';

describe('Table Components', () => {
  describe('table-element', () => {
    it('should be defined', () => {
      const el = document.createElement('table-element');
      expect(el).to.be.instanceOf(Table);
    });

    it('should render with slots', async () => {
      const el = await fixture(html`
        <table-element>
          <table-header slot="header">
            <table-row>
              <table-cell header>Header 1</table-cell>
              <table-cell header>Header 2</table-cell>
            </table-row>
          </table-header>
          <table-body slot="body">
            <table-row>
              <table-cell>Cell 1</table-cell>
              <table-cell>Cell 2</table-cell>
            </table-row>
          </table-body>
        </table-element>
      `);

      expect(el.shadowRoot?.querySelector('.table__wrapper')).to.exist;
      expect(el.shadowRoot?.querySelector('.table')).to.exist;
    });
  });

  describe('table-header', () => {
    it('should be defined', () => {
      const el = document.createElement('table-header');
      expect(el).to.be.instanceOf(TableHeader);
    });

    it('should render slot content', async () => {
      const el = await fixture(html`
        <table-header>
          <div>Header Content</div>
        </table-header>
      `);

      expect(el).lightDom.to.equal('<div>Header Content</div>');
    });
  });

  describe('table-body', () => {
    it('should be defined', () => {
      const el = document.createElement('table-body');
      expect(el).to.be.instanceOf(TableBody);
    });

    it('should render slot content', async () => {
      const el = await fixture(html`
        <table-body>
          <div>Body Content</div>
        </table-body>
      `);

      expect(el).lightDom.to.equal('<div>Body Content</div>');
    });
  });

  describe('table-row', () => {
    it('should be defined', () => {
      const el = document.createElement('table-row');
      expect(el).to.be.instanceOf(TableRow);
    });

    it('should render slot content', async () => {
      const el = await fixture(html`
        <table-row>
          <div>Row Content</div>
        </table-row>
      `);

      expect(el).lightDom.to.equal('<div>Row Content</div>');
    });
  });

  describe('table-cell', () => {
    it('should be defined', () => {
      const el = document.createElement('table-cell');
      expect(el).to.be.instanceOf(TableCell);
    });

    it('should render as td by default', async () => {
      const el = await fixture(html` <table-cell>Cell Content</table-cell> `);

      expect(el.shadowRoot?.querySelector('td')).to.exist;
      expect(el.shadowRoot?.querySelector('th')).to.not.exist;
    });

    it('should render as th when header is true', async () => {
      const el = await fixture(html`
        <table-cell header>Header Cell Content</table-cell>
      `);

      expect(el.shadowRoot?.querySelector('th')).to.exist;
      expect(el.shadowRoot?.querySelector('td')).to.not.exist;
    });

    it('should render slot content', async () => {
      const el = await fixture(html` <table-cell>Cell Content</table-cell> `);

      expect(el).lightDom.to.equal('Cell Content');
    });
  });

  describe('Table Integration', () => {
    it('should compose a complete table structure', async () => {
      const el = await fixture(html`
        <table-element>
          <table-header slot="header">
            <table-row>
              <table-cell header>Name</table-cell>
              <table-cell header>Age</table-cell>
            </table-row>
          </table-header>
          <table-body slot="body">
            <table-row>
              <table-cell>John</table-cell>
              <table-cell>30</table-cell>
            </table-row>
            <table-row>
              <table-cell>Jane</table-cell>
              <table-cell>25</table-cell>
            </table-row>
          </table-body>
        </table-element>
      `);

      expect(el.querySelector('table-header')).to.exist;
      expect(el.querySelector('table-body')).to.exist;
      expect(el.querySelectorAll('table-row').length).to.equal(3);
      expect(el.querySelectorAll('table-cell').length).to.equal(6);
      expect(el.querySelectorAll('table-cell[header]').length).to.equal(2);
    });
  });
});
