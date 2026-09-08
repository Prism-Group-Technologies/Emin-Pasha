import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { PACKAGE_CTA_HREF } from "@/containers/accommodation/constants";
import { packagesDisclaimer, packagesSection, stayPackages } from "@/containers/accommodation/copy";
import { PackageCard } from "@/containers/accommodation/molecules/PackageCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Four framings of an existing room plus already-approved services —
 * business, weekend, extended stay, family. Standard boutique practice:
 * package the property around a reason to be here rather than selling four
 * undifferentiated rate lines. No package invents an amenity; see
 * `copy/packages.ts`. On the raised surface so the band reads as a distinct
 * offer rather than another pale section.
 */
export function PackagesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={packagesSection.eyebrow}
      heading={packagesSection.heading}
      description={packagesSection.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {stayPackages.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <PackageCard
              name={pkg.name}
              tagline={pkg.tagline}
              fromUgx={pkg.fromUgx}
              forGuests={pkg.forGuests}
              includes={pkg.includes}
              ctaLabel={pkg.ctaLabel}
              ctaHref={PACKAGE_CTA_HREF}
            />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {packagesDisclaimer}
      </Text>
    </SectionShell>
  );
}
