import { useLeadForm } from '../../hooks/useLeadForm';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function CallbackForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('callback');

  return (
    <FormShell
      title="Заказать звонок"
      description="Оставьте номер — менеджер позвонит в рабочее время."
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel="Заказать звонок"
    >
      <FormField label="Имя" name="name" required value={fields.name || ''} onChange={(v) => setField('name', v)} />
      <FormField
        label="Телефон"
        name="phone"
        type="tel"
        required
        value={fields.phone || ''}
        onChange={(v) => setField('phone', v)}
      />
    </FormShell>
  );
}
