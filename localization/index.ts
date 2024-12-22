import { LocaleModule, configureLocalization } from '@lit/localize';
import * as templatesTR from './generated/locales/tr';
import {
  allLocales,
  sourceLocale,
  targetLocales,
} from './generated/locale-codes';

type LangKey = 'tr' | 'en';

const localizedTemplates = { tr: templatesTR } as Record<string, LocaleModule>;

const { setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale: string) =>
    localizedTemplates[locale] as LocaleModule,
});

export const init = async () => {
  const html = document.querySelector('html');
  const htmlLang = html?.getAttribute('lang') as LangKey | null;

  if (htmlLang && allLocales.includes(htmlLang)) {
    await setLocale(htmlLang);
  }

  const langAttributeChangeListener = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'lang') {
        const newLangValue = html?.getAttribute('lang') as LangKey | null;

        if (newLangValue && allLocales.includes(newLangValue)) {
          setLocale(newLangValue);
        }
      }
    });
  };

  const observer = new MutationObserver(langAttributeChangeListener);
  observer.observe(html as Node, { attributes: true });

  return () => {
    observer.disconnect();
  };
};

export default init;
