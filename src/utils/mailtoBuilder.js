import { SITE } from '../data/siteConfig';
import { buildMessageText, getSubject } from './messageTemplates';

export function buildMailtoLink(templateKey, fields = {}) {
  const body = buildMessageText(templateKey, fields);
  const subject = getSubject(templateKey);
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
