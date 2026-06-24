import { useLeadForm } from '../../hooks/useLeadForm';
import { useTranslation } from '../../i18n/LanguageContext';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function ConsultationForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('consultation');
  const { t } = useTranslation();

  return (
    <FormShell
      title={t('forms.consultationTitle')}
      description={t('forms.consultationDescription')}
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
    >
      <FormField label={t('forms.fieldName')} name="name" required value={fields.name || ''} onChange={(v) => setField('name', v)} />
      <FormField label={t('forms.fieldCompany')} name="company" value={fields.company || ''} onChange={(v) => setField('company', v)} />
      <FormField
        label={t('forms.fieldPhone')}
        name="phone"
        type="tel"
        required
        value={fields.phone || ''}
        onChange={(v) => setField('phone', v)}
      />
      <FormField label={t('forms.fieldEmail')} name="email" type="email" value={fields.email || ''} onChange={(v) => setField('email', v)} />
      <FormField
        label={t('forms.fieldMessage')}
        name="message"
        type="textarea"
        value={fields.message || ''}
        onChange={(v) => setField('message', v)}
      />
    </FormShell>
  );
}
