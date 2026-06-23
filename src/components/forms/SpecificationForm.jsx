import { useLeadForm } from '../../hooks/useLeadForm';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function SpecificationForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('spec');

  return (
    <FormShell
      title="Отправить спецификацию"
      description="Загрузите файл спецификации — мы посчитаем стоимость и сроки поставки по позициям."
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel="Отправить спецификацию"
    >
      <FormField
        label="Компания"
        name="company"
        required
        value={fields.company || ''}
        onChange={(v) => setField('company', v)}
      />
      <FormField
        label="Контактное лицо"
        name="contact"
        required
        value={fields.contact || ''}
        onChange={(v) => setField('contact', v)}
      />
      <FormField
        label="Телефон"
        name="phone"
        type="tel"
        required
        value={fields.phone || ''}
        onChange={(v) => setField('phone', v)}
      />
      <FormField label="Email" name="email" type="email" value={fields.email || ''} onChange={(v) => setField('email', v)} />
      <FormField
        label="Загрузка файла"
        name="file"
        type="file"
        value={fields.fileName || ''}
        onChange={(v) => setField('fileName', v)}
        hint="Сайт не отправляет файл автоматически — после нажатия кнопки приложите его вручную в чате WhatsApp или письме"
      />
    </FormShell>
  );
}
