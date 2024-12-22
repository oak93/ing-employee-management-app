import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('table-element')
export class Table extends LitElement {
  render() {
    return html`
      <div class="table__wrapper">
        <div class="table">
          <table>
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
          </table>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .table__wrapper {
      overflow: auto;
      max-height: 100%;
      position: relative;
      border: 1px solid var(--ing-color-soft);
      border-radius: var(--ing-border-radius-sm);
    }

    .table {
      width: 100%;
      display: table;
      border-spacing: 0px;
    }
  `;
}

@customElement('table-header')
export class TableHeader extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: table-header-group;
    }
  `;
}

@customElement('table-body')
export class TableBody extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: table-row-group;
    }
  `;
}

@customElement('table-row')
export class TableRow extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: table-row;
    }
  `;
}

@customElement('table-cell')
export class TableCell extends LitElement {
  @property({ type: Boolean })
  header = false;

  render() {
    return this.header
      ? html`<th><slot></slot></th>`
      : html`<td><slot></slot></td>`;
  }

  static styles = css`
    :host {
      display: table-cell;
      white-space: nowrap;
      box-sizing: border-box;
      vertical-align: middle;
      background-clip: padding-box;
      padding: var(--ing-space-12x);
      color: var(--ing-color-secondary);
      background-color: var(--ing-color-white);
      border-bottom: 1px solid var(--ing-color-grey);
    }

    :host([header]) {
      color: var(--ing-color-primary);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'table-row': TableRow;
    'table-element': Table;
    'table-body': TableBody;
    'table-cell': TableCell;
    'table-header': TableHeader;
  }
}
