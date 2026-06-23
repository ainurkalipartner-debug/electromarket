import { useLeadForm } from '../../hooks/useLeadForm';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function RequestQuoteForm({ defaultEquipment = '' }) {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('quote', {
    equipment: defaultEquipment,
  });

  return (
    <FormShell
      title="Запросить коммерческое предложение"
      description="Укажите оборудование, которое нужно посчитать — пришлём КП со сроками поставки."
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel="Запросить КП"
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
        label="Список оборудования"
        name="equipment"
        type="textarea"
        required
        value={fields.equipment || ''}
        onChange={(v) => setField('equipment', v)}
        hint="Перечислите наименования и количество — можно вставить список из заявки"
      />
      <FormField
        label="Комментарий"
        name="comment"
        type="textarea"
        value={fields.comment || ''}
        onChange={(v) => setField('comment', v)}
      />
    </FormShell>
  );
}
