import { useMemo, useState } from 'react';
import { buildWhatsAppLink } from '../utils/whatsappMessageBuilder';
import { buildMailtoLink } from '../utils/mailtoBuilder';

export function useLeadForm(templateKey, initialFields = {}) {
  const [fields, setFields] = useState(initialFields);
  const [submitted, setSubmitted] = useState(false);

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

  const whatsappHref = useMemo(() => buildWhatsAppLink(templateKey, fields), [templateKey, fields]);
  const mailtoHref = useMemo(() => buildMailtoLink(templateKey, fields), [templateKey, fields]);

  return { fields, setField, submitted, handleSubmit, reset, whatsappHref, mailtoHref };
}
