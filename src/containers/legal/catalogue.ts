import type { IconName } from "@/components/atoms/Icon";
import {
  LEGAL_PAGE_ORDER,
  LEGAL_PATH,
  type LegalDocId,
  type LegalPageId,
} from "@/containers/legal/anchors";
import {
  accessibilityDocument,
  cookieDocument,
  cookieSettingsCopy,
  privacyDocument,
  termsDocument,
} from "@/containers/legal/copy";
import type { LegalDocument } from "@/containers/legal/types";

export const legalDocuments: Record<LegalDocId, LegalDocument> = {
  privacy: privacyDocument,
  cookies: cookieDocument,
  terms: termsDocument,
  accessibility: accessibilityDocument,
};

export interface LegalLink {
  id: LegalPageId;
  href: string;
  label: string;
  teaser: string;
  icon: IconName;
}

const COOKIE_SETTINGS_LINK: Omit<LegalLink, "id" | "href"> = {
  label: "Cookie settings",
  teaser: "Switch analytics and marketing cookies on or off — it takes one tap.",
  icon: "tune",
};

function toLink(id: LegalPageId): LegalLink {
  const source = id === "cookie-settings" ? COOKIE_SETTINGS_LINK : legalDocuments[id];
  return {
    id,
    href: LEGAL_PATH[id],
    label: "navLabel" in source ? source.navLabel : source.label,
    teaser: source.teaser,
    icon: source.icon,
  };
}

/** Every legal page as a cross-link, in `LEGAL_PAGE_ORDER`. */
export const legalLinks: LegalLink[] = LEGAL_PAGE_ORDER.map(toLink);

/** Breadcrumb label for the settings page — kept beside the other labels. */
export const cookieSettingsLabel = COOKIE_SETTINGS_LINK.label;

/** The settings hero headline, re-exported so pages import one module. */
export const cookieSettingsHero = cookieSettingsCopy.hero;
