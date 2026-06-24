import { useLeadForm } from '../../hooks/useLeadForm';
import { useTranslation } from '../../i18n/LanguageContext';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function CallbackForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('callback');
  const { t } = useTranslation();

  return (
    <FormShell
      title={t('forms.callbackTitle')}
      description={t('forms.callbackDescription')}
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel={t('forms.callbackSubmit')}
    >
      <FormField label={t('forms.fieldName')} name="name" required value={fields.name || ''} onChange={(v) => setField('name', v)} />
      <FormField
        label={t('forms.fieldPhone')}
        name="phone"
        type="tel"
        required
        value={fields.phone || ''}
        onChange={(v) => setField('phone', v)}
      />
    </FormShell>
  );
}
