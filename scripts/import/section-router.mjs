function norm(text) {
  return String(text)
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .trim();
}

// ЭЛЕКТРОТЕХ contains ~26 internal section headers spanning several different
// site categories. Keys are the literal (normalized) header text found in the
// sheet; the lookup is sticky — once a top header matches, that category stays
// active until the next matching header is seen, so unmatched sub-headers
// (e.g. "Производство Россия") simply keep the current category.
const ELECTROTECH_MAP = {
  'ИЗОЛЯТОРЫ ШТЫРЕВЫЕ И ПОДВЕСНЫЕ': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ОПОРНЫЕ ФАРФОРОВЫЕ': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ОПОРНЫЕ ПОЛИМЕРНЫЕ ПРОИЗВОДСТВО IEK': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ОПОРНЫЕ ПОЛИМЕРНЫЕ ПРОИЗВОДСТВО РОССИЯ': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ПРОХОДНЫЕ': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ДЛЯ ТРАНСФОРМАТОРНЫХ ВВОДОВ': 'izolyatory-i-vysokovoltnaya-armatura',
  'ИЗОЛЯТОРЫ ОПОРНО-СТЕРЖНЕВЫЕ': 'izolyatory-i-vysokovoltnaya-armatura',

  'РАЗРЯДНИКИ, ОГРАНИЧИТЕЛИ ПЕРЕНАПРЯЖЕНИЯ': 'zazemlenie-i-molniezashchita',
  'ИЗОЛИРУЮЩИЕ ШТАНГИ И ПЕРЕНОСНОЕ ЗАЗЕМЛЕНИЕ ДО 220 КВ': 'zazemlenie-i-molniezashchita',
  'УКАЗАТЕЛИ НАПРЯЖЕНИЯ ДО 220 КВ': 'zazemlenie-i-molniezashchita',
  'ОГРАНИЧИТЕЛИ ПЕРЕНАПРЯЖЕНИЙ ОПН ПОД ЗАКАЗ': 'zazemlenie-i-molniezashchita',

  'ПРЕДОХРАНИТЕЛИ (ПАТРОНЫ), КОНТАКТЫ/ГУБКИ (РОССИЯ)': 'oborudovanie-10kv',
  'РАЗЪЕДИНИТЕЛИ НАРУЖНЕЙ УСТАНОВКИ РЛНД, РЛК': 'oborudovanie-10kv',
  'РАЗЪЕДИНИТЕЛИ ВНУТРЕННЕЙ УСТАНОВКИ РВО, РВЗ, РВФЗ': 'oborudovanie-10kv',
  'ВЫКЛЮЧАТЕЛИ НАГРУЗКИ ВНА Л/П': 'oborudovanie-10kv',
  'ДЛЯ ЯЧЕЕК КСО, КРУ ВТЫЧНЫЕ КОНТАКТЫ, ПОДВИЖНЫЕ И НЕПОДВИЖНЫЕ НОЖИ, КРЕПЛЕНИЯ': 'oborudovanie-10kv',

  'РУБИЛЬНИКИ 0,4 КВ': 'avtomatika-i-zashchita',
  'ТРАНСФОРМАТОРЫ ТОКА Т-0,66, РОССИЯ': 'avtomatika-i-zashchita',
  'ТРАНСФОРМАТОРЫ ТОКА И НАПРЯЖЕНИЯ НТЗ-ВОЛХОВ, РОССИЯ': 'avtomatika-i-zashchita',
  'ТРАНСФОРМАТОР ТОКА ДО 10 КВ СЗТТ СВЕРДЛОВСК, РОССИЯ': 'avtomatika-i-zashchita',

  'ШИНА АЛЮМИНИЕВАЯ (ДЛИНА 4 М, ЦЕНА ЗА МЕТР)': 'raskhodnye-materialy',
  'ШИНА МЕДНАЯ (ДЛИНА 4 М, ЦЕНА ЗА МЕТР)': 'raskhodnye-materialy',
  'ДИЭЛЕКТРИЧЕСКАЯ ПРОДУКЦИЯ И ПРЕДУПРЕЖДАЮЩИЕ ПЛАКАТЫ': 'raskhodnye-materialy',
  'КОГТИ И ЛАЗЫ МОНТЕРСКИЕ И КОМПЛЕКТУЮЩИЕ К НИМ, РОССИЯ': 'raskhodnye-materialy',
  'УДЕРЖИВАЮЩИЕ И СТРАХОВОЧНЫЕ СИСТЕМЫ ПО ГОСТ Р ЕН 358-2008': 'raskhodnye-materialy',
};

const ROUTERS = {
  electrotech: { map: ELECTROTECH_MAP, fallback: 'izolyatory-i-vysokovoltnaya-armatura' },
};

export function routeSection(routerKey, headerText, currentCategorySlug) {
  const router = ROUTERS[routerKey];
  if (!router) return currentCategorySlug;
  const key = norm(headerText);
  if (router.map[key]) return router.map[key];
  return currentCategorySlug || router.fallback;
}
