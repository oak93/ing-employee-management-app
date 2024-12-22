import { ContextProvider } from '@lit/context';
import { html, fixture, expect } from '@open-wc/testing';

import '../../components/navigation';
import { Navigation } from '../../components/navigation';
import { appContext, AppContext } from '../../contexts/app';

describe('Navigation Component', () => {
  describe('navigation-element', () => {
    let mockAppContext: AppContext;

    beforeEach(() => {
      mockAppContext = {
        locale: 'en',
        setLocale: (locale: string) => {
          mockAppContext.locale = locale;
        },
      };
    });

    it('should render basic structure', async () => {
      const el = await fixture<Navigation>(
        html`<navigation-element></navigation-element>`
      );

      new ContextProvider(el, {
        context: appContext,
        initialValue: mockAppContext,
      });

      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;

      const logo = el.shadowRoot?.querySelector('.navigation__logo');
      const logoImg = logo?.querySelector('img');
      const logoText = logo?.querySelector('.navigation__logo__text');

      expect(logo?.getAttribute('href')).to.equal('/');
      expect(logoImg?.getAttribute('src')).to.equal('/assets/ing-logo.png');
      expect(logoText?.textContent).to.equal('ING');
    });

    it('should render navigation links correctly', async () => {
      const el = await fixture<Navigation>(
        html`<navigation-element></navigation-element>`
      );

      const links = el.shadowRoot?.querySelectorAll('.navigation__link');
      expect(links?.length).to.equal(2);

      const [employeesLink, addEmployeeLink] = Array.from(links || []);
      expect(employeesLink?.getAttribute('href')).to.equal('/');
      expect(addEmployeeLink?.getAttribute('href')).to.equal(
        '/employee/create'
      );
    });

    it('should render language selector with correct options', async () => {
      const el = await fixture<Navigation>(
        html`<navigation-element></navigation-element>`
      );

      const select = el.shadowRoot?.querySelector('.language-select');
      const options = select?.querySelectorAll('option');

      expect(select).to.exist;
      expect(options?.length).to.equal(2);

      const [enOption, trOption] = Array.from(options || []);
      expect(enOption?.value).to.equal('en');
      expect(trOption?.value).to.equal('tr');
    });
  });
});
