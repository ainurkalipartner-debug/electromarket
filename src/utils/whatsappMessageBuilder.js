import { SITE } from '../data/siteConfig';
import { buildMessageText } from './messageTemplates';

export function buildWhatsAppLink(templateKey, fields = {}, lang = 'ru') {
  const text = buildMessageText(templateKey, fields, lang);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export { buildMessageText as buildWhatsAppText };
