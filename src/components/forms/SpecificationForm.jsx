import { useLeadForm } from '../../hooks/useLeadForm';
import { useTranslation } from '../../i18n/LanguageContext';
import FormShell from './FormShell';
import FormField from '../ui/FormField';

export default function SpecificationForm() {
  const { fields, setField, submitted, handleSubmit, whatsappHref, mailtoHref } = useLeadForm('spec');
  const { t } = useTranslation();

  return (
    <FormShell
      title={t('forms.specTitle')}
      description={t('forms.specDescription')}
      submitted={submitted}
      whatsappHref={whatsappHref}
      mailtoHref={mailtoHref}
      onSubmit={handleSubmit}
      submitLabel={t('forms.specSubmit')}
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
        label={t('forms.fieldFile')}
        name="file"
        type="file"
        value={fields.fileName || ''}
        onChange={(v) => setField('fileName', v)}
        hint={t('forms.fieldFileHint')}
      />
    </FormShell>
  );
}
