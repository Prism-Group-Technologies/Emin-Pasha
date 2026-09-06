import { z } from "zod";

/**
 * Site-chrome copy — the labels, headings and messages that belong to the
 * shell itself (header utilities, footer scaffolding, consent banner, sticky
 * action bar, route states) rather than to any one page.
 *
 * None of this is a *fact* about the hotel: no hours, rates, capacities or
 * claims live here — those stay in their own content modules and are read
 * from there. Everything below is interface copy written to the §2 tone of
 * voice, and is logged as `ASSUMED — NEEDS SIGN-OFF` (DECISIONS.md D24,
 * TODO(EMIN-Q68)) because 02_CONTENT_SOURCE_OF_TRUTH.md does not supply
 * approved chrome copy.
 */
const linkSchema = z.object({ label: z.string().min(1), href: z.string().min(1) });

/**
 * Footer columns store `hrefs`, not labels — labels are resolved from
 * `navigation` at render time so a nav label exists in exactly one place
 * (CLAUDE.md §5.4, "if the same string appears twice… that is a bug").
 */
const footerColumnSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  hrefs: z.array(z.string().min(1)).min(1),
});

const consentCategoryCopySchema = z.object({
  id: z.enum(["necessary", "analytics", "marketing"]),
  title: z.string().min(1),
  description: z.string().min(1),
});

const routeStateCopySchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  body: z.string().min(1),
});

export const shellContentSchema = z.object({
  skipLink: z.object({ label: z.string().min(1), targetId: z.string().min(1) }),
  header: z.object({
    /** Second line of the typographic lock-up — the tail of the approved name. */
    wordmarkSuffix: z.string().min(1),
    openMenuLabel: z.string().min(1),
    closeMenuLabel: z.string().min(1),
    primaryNavLabel: z.string().min(1),
    utilityNavLabel: z.string().min(1),
    submenuHint: z.string().min(1),
    /** Routes whose header floats transparent over a full-bleed hero. */
    heroRoutes: z.array(z.string().min(1)),
  }),
  footer: z.object({
    columns: z.array(footerColumnSchema).min(1),
    /** One line under the wordmark in the brand rail — voice, not a claim. */
    brandStatement: z.string().min(1),
    napTitle: z.string().min(1),
    hoursTitle: z.string().min(1),
    hoursPendingNote: z.string().min(1),
    socialTitle: z.string().min(1),
    legalLinks: z.array(linkSchema).min(1),
    legalNavLabel: z.string().min(1),
    copyrightSuffix: z.string().min(1),
  }),
  newsletter: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    emailLabel: z.string().min(1),
    consentLabel: z.string().min(1),
    errors: z.object({ email: z.string().min(1), consent: z.string().min(1) }),
    messages: z.object({
      subscribed: z.string().min(1),
      pending: z.string().min(1),
      failed: z.string().min(1),
    }),
  }),
  consent: z.object({
    bannerLabel: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    acceptAll: z.string().min(1),
    rejectAll: z.string().min(1),
    manage: z.string().min(1),
    save: z.string().min(1),
    reopenLabel: z.string().min(1),
    preferencesTitle: z.string().min(1),
    alwaysOnLabel: z.string().min(1),
    categories: z.array(consentCategoryCopySchema).length(3),
  }),
  stickyBar: z.object({
    label: z.string().min(1),
    call: z.string().min(1),
    whatsapp: z.string().min(1),
    directions: z.string().min(1),
  }),
  /**
   * The desktop floating dock — accessible names only. The number is a NAP
   * fact (`content/identity`) and the pre-filled opening line is shared with
   * every other WhatsApp link on the site (`content/whatsapp`); neither is
   * the shell's to own.
   */
  floatingActions: z.object({
    /** Accessible name for the icon-only WhatsApp control. */
    whatsappLabel: z.string().min(1),
    /** Accessible name for the icon-only back-to-top control. */
    backToTopLabel: z.string().min(1),
  }),
  routeStates: z.object({
    loading: routeStateCopySchema,
    error: routeStateCopySchema.extend({ retryLabel: z.string().min(1) }),
    notFound: routeStateCopySchema.extend({ homeLabel: z.string().min(1) }),
  }),
});

export type ShellContent = z.infer<typeof shellContentSchema>;
