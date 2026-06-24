// Centralized wording for every WhatsApp/email message the site generates,
// so all 4 forms + every "Запросить цену" button stay consistent.
// Each template has a ru/kk variant — the message follows whatever language
// the visitor is currently browsing in.
export const TEMPLATES = {
  ru: {
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
  },
  kk: {
    productInquiry: {
      subject: 'Өнімге баға сұрау',
      intro: 'Сәлеметсіз бе! Келесі өнім қызықтырады:',
      fieldLabels: { product: 'Тауар', sku: 'Артикул', company: 'Компания', contact: 'Байланысатын тұлға', phone: 'Телефон' },
      outro: 'Құнын, жеткізу мерзімін және коммерциялық ұсынысты беруді сұраймын.',
    },
    quoteList: {
      subject: 'Позициялар тізімі бойынша КҰ сұрау',
      intro: 'Сәлеметсіз бе! Келесі позициялар бойынша коммерциялық ұсыныс дайындауды сұраймын:',
      fieldLabels: { items: 'Позициялар', company: 'Компания', contact: 'Байланысатын тұлға', phone: 'Телефон', email: 'Email' },
      outro: 'Құнын және жеткізу мерзімін беруді сұраймын.',
    },
    consultation: {
      subject: 'Кеңес алуға өтінім',
      intro: 'Сәлеметсіз бе! Жабдықты таңдау бойынша кеңес беруді сұраймын.',
      fieldLabels: { name: 'Аты', company: 'Компания', phone: 'Телефон', email: 'Email', message: 'Хабарлама' },
    },
    quote: {
      subject: 'Коммерциялық ұсыныс сұрау',
      intro: 'Сәлеметсіз бе! Коммерциялық ұсыныс дайындауды сұраймын.',
      fieldLabels: {
        company: 'Компания',
        contact: 'Байланысатын тұлға',
        phone: 'Телефон',
        email: 'Email',
        equipment: 'Жабдықтар тізімі',
        comment: 'Түсініктеме',
      },
    },
    spec: {
      subject: 'Есептеу үшін спецификация',
      intro: 'Сәлеметсіз бе! Есептеу үшін спецификация жібередім.',
      fieldLabels: { company: 'Компания', contact: 'Байланысатын тұлға', phone: 'Телефон', email: 'Email', fileName: 'Файл' },
      outro: 'Файлды жеке хабарламамен тіркеймін.',
    },
    callback: {
      subject: 'Кері қоңырау тапсырысы',
      intro: 'Сәлеметсіз бе! Кері қоңырау шалуды сұраймын.',
      fieldLabels: { name: 'Аты', phone: 'Телефон' },
    },
    cableRequest: {
      subject: 'Кабельдік өнім бойынша сұрау',
      intro: 'Сәлеметсіз бе! Кабельдік-сым өнімі қызықтырады.',
      fieldLabels: { name: 'Аты', company: 'Компания', phone: 'Телефон', message: 'Түсініктеме' },
    },
  },
};

export function buildMessageText(templateKey, fields = {}, lang = 'ru') {
  const tpl = TEMPLATES[lang]?.[templateKey] || TEMPLATES.ru[templateKey];
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

export function getSubject(templateKey, lang = 'ru') {
  return TEMPLATES[lang]?.[templateKey]?.subject || TEMPLATES.ru[templateKey]?.subject || 'Заявка с сайта ЭЛЕКТРОМАРКЕТ';
}
