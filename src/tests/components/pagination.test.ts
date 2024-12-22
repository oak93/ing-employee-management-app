import { html, fixture, expect } from '@open-wc/testing';

import '../../components/pagination';
import { Pagination } from '../../components/pagination';

describe('Pagination Component', () => {
  describe('pagination-element', () => {
    it('should render basic structure', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element .totalPageCount=${5}></pagination-element>`
      );

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;

      const buttons = el.shadowRoot?.querySelectorAll('button');
      expect(buttons?.length).to.equal(8);
    });

    it('should initialize with default values', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element .totalPageCount=${5}></pagination-element>`
      );

      expect(el.activePage).to.equal(1);
      expect(el.totalPageCount).to.equal(5);
      expect(el.isLeftButtonDisabled).to.be.true;
      expect(el.isRightButtonDisabled).to.be.false;
    });

    it('should disable left button on first page', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element
          .totalPageCount=${5}
          .activePage=${1}
        ></pagination-element>`
      );

      const leftButton = el.shadowRoot?.querySelector(
        '.pagination__button--left'
      );
      expect(leftButton?.hasAttribute('disabled')).to.be.true;
    });

    it('should disable right button on last page', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element
          .totalPageCount=${5}
          .activePage=${5}
        ></pagination-element>`
      );

      const rightButton = el.shadowRoot?.querySelector(
        '.pagination__button--right'
      );
      expect(rightButton?.hasAttribute('disabled')).to.be.true;
    });

    it('should emit page-change event when clicking page button', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element .totalPageCount=${5}></pagination-element>`
      );

      let emittedPage: number | null = null;
      el.addEventListener('page-change', ((e: CustomEvent) => {
        emittedPage = e.detail;
      }) as EventListener);

      const pageButtons = el.shadowRoot?.querySelectorAll(
        '.pagination__buttons--desktop button'
      );
      (pageButtons?.[2] as HTMLButtonElement)?.click();

      expect(emittedPage).to.equal(3);
    });

    it('should emit page-change event when clicking navigation buttons', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element
          .totalPageCount=${5}
          .activePage=${2}
        ></pagination-element>`
      );

      const emittedPages: number[] = [];
      el.addEventListener('page-change', ((e: CustomEvent) => {
        emittedPages.push(e.detail);
      }) as EventListener);

      const leftButton = el.shadowRoot?.querySelector(
        '.pagination__button--left'
      );
      const rightButton = el.shadowRoot?.querySelector(
        '.pagination__button--right'
      );

      (leftButton as HTMLButtonElement)?.click();
      (rightButton as HTMLButtonElement)?.click();

      expect(emittedPages).to.deep.equal([1, 3]);
    });

    it('should render mobile view with current page button', async () => {
      const el = await fixture<Pagination>(
        html`<pagination-element
          .totalPageCount=${5}
          .activePage=${3}
        ></pagination-element>`
      );

      const mobileButton = el.shadowRoot?.querySelector(
        '.pagination__buttons--mobile button'
      );
      expect(mobileButton?.textContent?.trim()).to.equal('3');
      expect(mobileButton?.getAttribute('aria-current')).to.equal('page');
    });

    it('should handle custom onPageChange callback', async () => {
      let callbackPage = 0;
      const customCallback = (page: number) => {
        callbackPage = page;
      };

      const el = await fixture<Pagination>(
        html`<pagination-element
          .totalPageCount=${5}
          .activePage=${2}
          .onPageChange=${customCallback}
        ></pagination-element>`
      );

      const rightButton = el.shadowRoot?.querySelector(
        '.pagination__button--right'
      );
      (rightButton as HTMLButtonElement)?.click();

      expect(callbackPage).to.equal(3);
    });
  });
});
