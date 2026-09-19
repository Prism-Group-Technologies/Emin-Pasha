import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { SETTINGS_ANCHOR_ID } from "@/containers/legal/anchors";
import { cookieSettingsCopy } from "@/containers/legal/copy";
import { CookieFaqList } from "@/containers/legal/molecules/CookieFaqList";
import { CookieSettingsPanel } from "@/containers/legal/organisms/CookieSettingsPanel";
import { shell } from "@/content/shell";
import type { RevealDirection } from "@/theme/motion";

const { panel, steps, faq } = cookieSettingsCopy;

/** The controls band. Category copy is resolved here, on the server, and passed down as plain data (D25). */
export function CookieSettingsSection({ motion }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={SETTINGS_ANCHOR_ID}
      variant="raised"
      motion={motion}
      eyebrow={panel.eyebrow}
      heading={panel.heading}
      description={panel.description}
    >
      <CookieSettingsPanel categories={shell.consent.categories} />
    </SectionShell>
  );
}

/** Three numbered steps explaining that the choice is local, instant and reversible. */
export function CookieStepsSection({ motion }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} eyebrow={steps.eyebrow} heading={steps.heading} align="center">
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: 4,
        }}
      >
        {steps.items.map((step, index) => (
          <Box component="li" key={step.title}>
            <Reveal index={index} fill>
              <Box sx={[cardSurface(true), { gap: 2 }]}>
                <Text
                  aria-hidden
                  sx={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "primary.main",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text variant="h4" component="h3">
                  {step.title}
                </Text>
                <Text variant="body2" color="text.secondary">
                  {step.body}
                </Text>
              </Box>
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}

/** Quick answers to the four cookie questions visitors actually ask. */
export function CookieFaqSection({ motion }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} eyebrow={faq.eyebrow} heading={faq.heading} variant="raised">
      <Box sx={{ maxWidth: 820 }}>
        <CookieFaqList items={faq.items} />
      </Box>
    </SectionShell>
  );
}
