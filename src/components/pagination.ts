import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../icons/chevron-left';
import '../icons/chevron-right';

@customElement('pagination-element')
export class Pagination extends LitElement {
  @property({ type: Number })
  activePage = 1;

  @property({ type: Number })
  totalPageCount = 0;

  @property({ attribute: false })
  onPageChange: (page: number) => void = (page: number) => {
    this.dispatchEvent(new CustomEvent('page-change', { detail: page }));
  };

  get isLeftButtonDisabled() {
    return this.activePage === 1;
  }

  get isRightButtonDisabled() {
    return this.activePage === this.totalPageCount;
  }

  render() {
    return html`
      <div class="pagination">
        <button
          class="pagination__button pagination__button--left"
          aria-label="Previous page"
          ?disabled=${this.isLeftButtonDisabled}
          @click=${() => this.onPageChange(this.activePage - 1)}
        >
          <chevron-left-icon></chevron-left-icon>
        </button>

        <div class="pagination__buttons--desktop">
          ${Array(this.totalPageCount)
            .fill(0)
            .map((_, i) => i + 1)
            .map(
              (page) => html`
                <button
                  aria-label="Page ${page}"
                  @click=${() => this.onPageChange(page)}
                  aria-current=${page === this.activePage ? 'page' : 'false'}
                  class="pagination__button ${page === this.activePage
                    ? 'pagination__button--active'
                    : ''}"
                >
                  ${page}
                </button>
              `
            )}
        </div>

        <div class="pagination__buttons--mobile">
          <button
            aria-current="page"
            aria-label="Page ${this.activePage}"
            @click=${() => this.onPageChange(this.activePage)}
            class="pagination__button pagination__button--active"
          >
            ${this.activePage}
          </button>
        </div>

        <button
          aria-label="Next page"
          class="pagination__button pagination__button--right"
          ?disabled=${this.isRightButtonDisabled}
          @click=${() => this.onPageChange(this.activePage + 1)}
        >
          <chevron-right-icon></chevron-right-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      gap: var(--ing-space-2x);
      margin-top: var(--ing-space-4x);
    }

    .pagination__buttons--desktop {
      display: flex;
      gap: var(--ing-space-2x);

      @media (max-width: 768px) {
        display: none;
      }
    }

    .pagination__buttons--mobile {
      display: none;

      @media (max-width: 768px) {
        display: flex;
      }
    }

    .pagination__button {
      width: 30px;
      height: 30px;
      border: none;
      cursor: pointer;
      text-align: center;
      background: transparent;
      padding: var(--ing-space-2x);
      border-radius: var(--ing-radius-full);
    }

    .pagination__button--active {
      color: var(--ing-color-white);
      border-color: var(--ing-color-primary);
      background-color: var(--ing-color-primary);
    }

    .pagination__button:disabled {
      cursor: not-allowed;
    }

    .pagination__button:disabled {
      opacity: 0.6;
      color: var(--ing-color-secondary);
    }

    .pagination__button--left,
    .pagination__button--right {
      border: none;
      background: transparent;
      color: var(--ing-color-primary);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pagination-element': Pagination;
  }
}
