import { useMemo, useState } from 'react';
import { buildWhatsAppLink } from '../utils/whatsappMessageBuilder';
import { buildMailtoLink } from '../utils/mailtoBuilder';
import { useTranslation } from '../i18n/LanguageContext';

export function useLeadForm(templateKey, initialFields = {}) {
  const [fields, setFields] = useState(initialFields);
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useTranslation();

  function setField(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function reset() {
    setFields(initialFields);
    setSubmitted(false);
  }

  const whatsappHref = useMemo(() => buildWhatsAppLink(templateKey, fields, lang), [templateKey, fields, lang]);
  const mailtoHref = useMemo(() => buildMailtoLink(templateKey, fields, lang), [templateKey, fields, lang]);

  return { fields, setField, submitted, handleSubmit, reset, whatsappHref, mailtoHref };
}
