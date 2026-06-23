// Centralized wording for every WhatsApp/email message the site generates,
// so all 4 forms + every "Запросить цену" button stay consistent.
export const TEMPLATES = {
  productInquiry: {
    subject: 'Запрос цены на продукцию',
    intro: 'Здравствуйте! Интересует следующая продукция:',
    fieldLabels: { product: 'Товар', sku: 'Артикул', company: 'Компания', contact: 'Контактное лицо', phone: 'Телефон' },
    outro: 'Прошу предоставить стоимость, срок поставки и коммерческое предложение.',
  },
  quoteList: {
    subject: 'Запрос КП по списку позиций',
    intro: 'Здравствуйте! Прошу подготовить коммерческое предложение по следующим позициям:',
    fieldLabels: { items: 'Позиции', company: 'Компания', contact: 'Контактное лицо', phone: 'Телефон', email: 'Email' },
    outro: 'Прошу предоставить стоимость и срок поставки.',
  },
  consultation: {
    subject: 'Заявка на консультацию',
    intro: 'Здравствуйте! Прошу проконсультировать по подбору оборудования.',
    fieldLabels: { name: 'Имя', company: 'Компания', phone: 'Телефон', email: 'Email', message: 'Сообщение' },
  },
  quote: {
    subject: 'Запрос коммерческого предложения',
    intro: 'Здравствуйте! Прошу подготовить коммерческое предложение.',
    fieldLabels: {
      company: 'Компания',
      contact: 'Контактное лицо',
      phone: 'Телефон',
      email: 'Email',
      equipment: 'Список оборудования',
      comment: 'Комментарий',
    },
  },
  spec: {
    subject: 'Спецификация для расчёта',
    intro: 'Здравствуйте! Направляю спецификацию для расчёта.',
    fieldLabels: { company: 'Компания', contact: 'Контактное лицо', phone: 'Телефон', email: 'Email', fileName: 'Файл' },
    outro: 'Файл приложу отдельным сообщением.',
  },
  callback: {
    subject: 'Заказ обратного звонка',
    intro: 'Здравствуйте! Прошу заказать обратный звонок.',
    fieldLabels: { name: 'Имя', phone: 'Телефон' },
  },
  cableRequest: {
    subject: 'Запрос по кабельной продукции',
    intro: 'Здравствуйте! Интересует кабельно-проводниковая продукция.',
    fieldLabels: { name: 'Имя', company: 'Компания', phone: 'Телефон', message: 'Комментарий' },
  },
};

export function buildMessageText(templateKey, fields = {}) {
  const tpl = TEMPLATES[templateKey];
  if (!tpl) throw new Error(`Unknown message template: ${templateKey}`);
  const lines = [tpl.intro, ''];
  for (const [key, label] of Object.entries(tpl.fieldLabels)) {
    const value = fields[key];
    if (value === undefined || value === null || String(value).trim() === '') continue;
    lines.push(`${label}: ${value}`);
  }
  if (tpl.outro) lines.push('', tpl.outro);
  return lines.join('\n');
}

export function getSubject(templateKey) {
  return TEMPLATES[templateKey]?.subject || 'Заявка с сайта ЭЛЕКТРОМАРКЕТ';
}
