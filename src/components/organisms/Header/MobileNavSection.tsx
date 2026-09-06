"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { MobileNavChildren } from "@/components/organisms/Header/MobileNavChildren";
import { MobileNavDisclosure } from "@/components/organisms/Header/MobileNavDisclosure";
import type { HeaderPanel, HeaderPanelLink } from "@/components/organisms/Header/headerData";
import type { NavItem } from "@/schemas/content/navItem";
import { motionTokens } from "@/theme/tokens";

export interface MobileNavSectionProps {
  item: NavItem;
  /** The same server-built panel the desktop uses — descriptions and imagery. */
  panel?: HeaderPanel;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  isActiveChild: (href: string) => boolean;
  submenuHint: string;
}

/**
 * One row of the mobile drawer: the section link, plus — where the section
 * has children — a separate disclosure button. Splitting them means tapping
 * "Dining" still goes to the Dining index rather than only expanding a list,
 * which is the behaviour that reliably confuses people on hotel sites.
 *
 * `Collapse … unmountOnExit` means a collapsed section holds no imagery at
 * all, and `useMobileNav` keeps at most one section open, so the whole drawer
 * ever costs one section's worth of thumbnails.
 */
export function MobileNavSection(props: MobileNavSectionProps) {
  const { item, panel, active, expanded, isActiveChild, submenuHint } = props;
  const hasChildren = Boolean(item.children?.length);
  // `buildPanels` covers every section that has children, so the fallback is
  // reached only if a section is ever given children without a panel being
  // built — it degrades to bare labels rather than rendering nothing.
  const links: HeaderPanelLink[] =
    panel?.links ?? (item.children ?? []).map(({ href, label }) => ({ href, label }));

  return (
    <Box component="li" sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Typography
          component={NextLink}
          href={item.href}
          variant="h4"
          aria-current={active ? "page" : undefined}
          onClick={props.onNavigate}
          sx={{
            flex: 1,
            py: 4,
            minHeight: 44,
            color: active ? "primary.main" : "text.primary",
            textDecoration: "none",
          }}
        >
          {item.label}
        </Typography>
        {hasChildren && (
          <MobileNavDisclosure
            label={item.label}
            controls={`mobile-nav-${item.href}`}
            expanded={expanded}
            submenuHint={submenuHint}
            onToggle={props.onToggle}
          />
        )}
      </Box>

      {hasChildren && (
        <Collapse in={expanded} unmountOnExit timeout={motionTokens.navFade}>
          <MobileNavChildren
            id={`mobile-nav-${item.href}`}
            intro={panel?.intro}
            links={links}
            isActiveChild={isActiveChild}
            onNavigate={props.onNavigate}
          />
        </Collapse>
      )}
    </Box>
  );
}
