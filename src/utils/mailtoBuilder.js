import { SITE } from '../data/siteConfig';
import { buildMessageText, getSubject } from './messageTemplates';

export function buildMailtoLink(templateKey, fields = {}, lang = 'ru') {
  const body = buildMessageText(templateKey, fields, lang);
  const subject = getSubject(templateKey, lang);
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
