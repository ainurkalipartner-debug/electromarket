import { SITE } from '../data/siteConfig';
import { buildMessageText } from './messageTemplates';

export function buildWhatsAppLink(templateKey, fields = {}) {
  const text = buildMessageText(templateKey, fields);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export { buildMessageText as buildWhatsAppText };
