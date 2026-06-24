import { useLeadForm } from '../../hooks/useLeadForm';
import { useTranslation } from '../../i18n/LanguageContext';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function RequestQuoteForm({ defaultEquipment = '' }) {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('quote', {
    equipment: defaultEquipment,
  });
  const { t } = useTranslation();

  return (
    <FormShell
      title={t('forms.quoteTitle')}
      description={t('forms.quoteDescription')}
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel={t('forms.quoteSubmit')}
    >
      <FormField
        label={t('forms.fieldCompany')}
        name="company"
        required
        value={fields.company || ''}
        onChange={(v) => setField('company', v)}
      />
      <FormField
        label={t('forms.fieldContact')}
        name="contact"
        required
        value={fields.contact || ''}
        onChange={(v) => setField('contact', v)}
      />
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
        label={t('forms.fieldEquipment')}
        name="equipment"
        type="textarea"
        required
        value={fields.equipment || ''}
        onChange={(v) => setField('equipment', v)}
        hint={t('forms.fieldEquipmentHint')}
      />
      <FormField
        label={t('forms.fieldComment')}
        name="comment"
        type="textarea"
        value={fields.comment || ''}
        onChange={(v) => setField('comment', v)}
      />
    </FormShell>
  );
}
