import { useLeadForm } from '../../hooks/useLeadForm';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function ConsultationForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('consultation');

  return (
    <FormShell
      title="Получить консультацию"
      description="Расскажите, какое оборудование вам нужно — наш инженер поможет с подбором."
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
    >
      <FormField label="Имя" name="name" required value={fields.name || ''} onChange={(v) => setField('name', v)} />
      <FormField label="Компания" name="company" value={fields.company || ''} onChange={(v) => setField('company', v)} />
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
        label="Сообщение"
        name="message"
        type="textarea"
        value={fields.message || ''}
        onChange={(v) => setField('message', v)}
      />
    </FormShell>
  );
}
