import { Text } from "@/components/atoms/Text";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ButtonsSection } from "@/components/organisms/ButtonsSection";
import { CardsSection } from "@/components/organisms/CardsSection";
import { CarouselSection } from "@/components/organisms/CarouselSection";
import { DateRangeSection } from "@/components/organisms/DateRangeSection";
import { DisplaySection } from "@/components/organisms/DisplaySection";
import { FormsSection } from "@/components/organisms/FormsSection";
import { MotionSection } from "@/components/organisms/MotionSection";
import { NavigationSection } from "@/components/organisms/NavigationSection";
import { OverlaySection } from "@/components/organisms/OverlaySection";
import { PaletteContrastSection } from "@/components/organisms/PaletteContrastSection";
import { ShadowSection } from "@/components/organisms/ShadowSection";
import { SpacingRadiiSection } from "@/components/organisms/SpacingRadiiSection";
import { TypeScaleSection } from "@/components/organisms/TypeScaleSection";
import { BookingSection } from "@/containers/styleguide/BookingSection";

/**
 * Temporary QA route (item 7 of the theme-implementation step; extended for
 * the design-system step) — deleted in Step 17. No business logic; composes
 * the design-system sections only.
 */
export function StyleguideContainer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px", padding: "48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text variant="h1">Styleguide</Text>
        <ThemeToggle />
      </div>
      <PaletteContrastSection />
      <TypeScaleSection />
      <SpacingRadiiSection />
      <ShadowSection />
      <MotionSection />
      <ButtonsSection />
      <FormsSection />
      <DateRangeSection />
      <DisplaySection />
      <CardsSection />
      <NavigationSection />
      <OverlaySection />
      <CarouselSection />
      <BookingSection />
    </div>
  );
}
