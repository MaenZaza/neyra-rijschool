'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  registrationSchema,
  type RegistrationInput,
  drivingExperienceValues,
  availabilityValues,
  transmissionValues,
  experienceLabels,
  availabilityLabels,
  transmissionLabels,
} from '@/lib/validation/registration';
import { submitRegistration, type RegistrationState } from '@/lib/actions/register';
import { packages, getPackageBySlug } from '@/data/packages';
import { Field, inputClasses } from './Field';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/icons';
import { RegistrationSuccess } from './RegistrationSuccess';
import { cn } from '@/lib/utils';

export function RegistrationForm() {
  const searchParams = useSearchParams();
  const initialPackage = getPackageBySlug(searchParams.get('pakket'))?.slug ?? 'geen';

  const [result, setResult] = useState<RegistrationState | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      company: '',
      packageSlug: initialPackage,
      availability: [],
    },
    mode: 'onBlur',
  });

  // Keep the preselected package in sync if the URL changes (e.g. via a link).
  useEffect(() => {
    const fromUrl = getPackageBySlug(searchParams.get('pakket'))?.slug;
    if (fromUrl) setValue('packageSlug', fromUrl);
  }, [searchParams, setValue]);

  const selectedTransmission = watch('transmission');

  const onSubmit = async (data: RegistrationInput) => {
    const state = await submitRegistration(data);
    setResult(state);
    // Map any server-side field errors back onto the form.
    if (state.status === 'error' && state.errors) {
      for (const [key, message] of Object.entries(state.errors)) {
        setError(key as keyof RegistrationInput, { message });
      }
    }
    if (state.status === 'success' && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (result?.status === 'success' && result.summary) {
    return <RegistrationSuccess state={result} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8"
      aria-describedby={result?.status === 'error' ? 'form-error' : undefined}
    >
      {/* Honeypot: hidden from users, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="company">Bedrijf (niet invullen)</label>
        <input id="company" type="text" autoComplete="off" tabIndex={-1} {...register('company')} />
      </div>

      {result?.status === 'error' && result.message && (
        <p
          id="form-error"
          role="alert"
          className="rounded-sm border border-signal-deep/40 bg-signal/10 px-4 py-3 text-sm font-medium text-signal-deep"
        >
          {result.message}
        </p>
      )}

      {/* Personal details */}
      <fieldset className="space-y-5">
        <legend className="mb-1 font-mono text-xs uppercase tracking-kicker text-signal">
          Jouw gegevens
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Voornaam" htmlFor="firstName" required error={errors.firstName?.message}>
            <input
              id="firstName"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              className={inputClasses(!!errors.firstName)}
              {...register('firstName')}
            />
          </Field>
          <Field label="Achternaam" htmlFor="lastName" required error={errors.lastName?.message}>
            <input
              id="lastName"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              className={inputClasses(!!errors.lastName)}
              {...register('lastName')}
            />
          </Field>
          <Field label="E-mailadres" htmlFor="email" required error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={inputClasses(!!errors.email)}
              {...register('email')}
            />
          </Field>
          <Field label="Telefoonnummer" htmlFor="phone" required error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              aria-invalid={!!errors.phone}
              className={inputClasses(!!errors.phone)}
              {...register('phone')}
            />
          </Field>
          <Field
            label="Geboortedatum"
            htmlFor="birthDate"
            optional
            error={errors.birthDate?.message}
          >
            <input
              id="birthDate"
              type="date"
              autoComplete="bday"
              className={inputClasses(!!errors.birthDate)}
              {...register('birthDate')}
            />
          </Field>
          <div className="grid grid-cols-2 gap-5">
            <Field label="Woonplaats" htmlFor="city" required error={errors.city?.message}>
              <input
                id="city"
                autoComplete="address-level2"
                aria-invalid={!!errors.city}
                className={inputClasses(!!errors.city)}
                {...register('city')}
              />
            </Field>
            <Field label="Postcode" htmlFor="postcode" required error={errors.postcode?.message}>
              <input
                id="postcode"
                autoComplete="postal-code"
                placeholder="1234 AB"
                aria-invalid={!!errors.postcode}
                className={inputClasses(!!errors.postcode)}
                {...register('postcode')}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Lesson preferences */}
      <fieldset className="space-y-5">
        <legend className="mb-1 font-mono text-xs uppercase tracking-kicker text-signal">
          Jouw voorkeuren
        </legend>

        {/* Transmission — radio cards */}
        <Field
          label="Schakel of automaat?"
          htmlFor="transmission"
          required
          error={errors.transmission?.message}
        >
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Transmissie">
            {transmissionValues.map((value) => (
              <label
                key={value}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-sm border-2 px-4 py-3 text-sm font-medium transition-colors',
                  selectedTransmission === value
                    ? 'border-signal bg-signal/10 text-ink'
                    : 'border-ink/15 hover:border-ink/30',
                )}
              >
                <input
                  type="radio"
                  value={value}
                  className="sr-only"
                  {...register('transmission')}
                />
                <span
                  aria-hidden
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border-2',
                    selectedTransmission === value ? 'border-signal bg-signal' : 'border-ink/30',
                  )}
                >
                  {selectedTransmission === value && (
                    <Check width={12} height={12} className="text-paper" />
                  )}
                </span>
                {transmissionLabels[value]}
              </label>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Gewenst pakket" htmlFor="packageSlug" error={errors.packageSlug?.message}>
            <select
              id="packageSlug"
              className={inputClasses(!!errors.packageSlug)}
              {...register('packageSlug')}
            >
              <option value="geen">Nog geen pakket / losse lessen</option>
              {packages.map((pkg) => (
                <option key={pkg.slug} value={pkg.slug}>
                  {pkg.name} ({pkg.lessonCount} lessen)
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Je huidige ervaring"
            htmlFor="experience"
            required
            error={errors.experience?.message}
          >
            <select
              id="experience"
              aria-invalid={!!errors.experience}
              defaultValue=""
              className={inputClasses(!!errors.experience)}
              {...register('experience')}
            >
              <option value="" disabled>
                Maak een keuze…
              </option>
              {drivingExperienceValues.map((value) => (
                <option key={value} value={value}>
                  {experienceLabels[value]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Availability — checkbox group */}
        <Field
          label="Wanneer ben je beschikbaar?"
          htmlFor="availability"
          required
          hint="Meerdere opties mogelijk."
          error={errors.availability?.message}
        >
          <div className="flex flex-wrap gap-3" role="group" aria-label="Beschikbaarheid">
            {availabilityValues.map((value) => (
              <label
                key={value}
                className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/30 has-[:checked]:border-signal has-[:checked]:bg-signal/10"
              >
                <input
                  type="checkbox"
                  value={value}
                  className="h-4 w-4 accent-signal"
                  {...register('availability')}
                />
                {availabilityLabels[value]}
              </label>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Gewenste startdatum"
            htmlFor="startDate"
            optional
            error={errors.startDate?.message}
          >
            <input
              id="startDate"
              type="date"
              className={inputClasses(!!errors.startDate)}
              {...register('startDate')}
            />
          </Field>
        </div>

        <Field label="Opmerkingen" htmlFor="message" optional error={errors.message?.message}>
          <textarea
            id="message"
            rows={4}
            placeholder="Bijvoorbeeld: eerdere ervaring, specifieke wensen of vragen."
            className={inputClasses(!!errors.message)}
            {...register('message')}
          />
        </Field>
      </fieldset>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-asphalt">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-signal"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent')}
          />
          <span>
            Ik ga akkoord met de verwerking van mijn gegevens zoals beschreven in de{' '}
            <Link
              href="/privacyverklaring"
              className="font-medium text-signal underline underline-offset-2"
            >
              privacyverklaring
            </Link>
            . <span className="text-signal">*</span>
          </span>
        </label>
        {errors.consent?.message && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm font-medium text-signal-deep">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-asphalt">
          Velden met <span className="text-signal">*</span> zijn verplicht.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting || isSubmitSuccessful}>
          {isSubmitting ? 'Bezig met verzenden…' : 'Aanmelding versturen'}
        </Button>
      </div>
    </form>
  );
}
