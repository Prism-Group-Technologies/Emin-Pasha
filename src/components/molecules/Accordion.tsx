"use client";

import type { ReactNode } from "react";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { radiusTokens } from "@/theme/tokens";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  expanded: string | false;
  onChange: (id: string) => void;
  /**
   * `soft` gives each panel its own bordered, rounded card with breathing
   * room between them and a +/- toggle; `plain` (default) is the flat
   * divider list the FAQ page has always used.
   */
  variant?: "plain" | "soft";
  /**
   * Extra content under an answer — a helpful vote, a follow-up CTA. Rendered
   * inside the panel's details, so it collapses with the answer.
   */
  renderFooter?: (item: AccordionItem) => ReactNode;
  /**
   * Puts each item's `id` on its panel (with a header-clearing scroll margin),
   * so an `#id` link lands on it. Opt-in: ids from short page-local lists
   * could otherwise collide with a page's own section anchors.
   */
  anchored?: boolean;
}

type PanelProps = Omit<AccordionProps, "items"> & { item: AccordionItem };

const softPanelSx = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.md}px`,
  bgcolor: "background.default",
  mb: 3,
  "&::before": { display: "none" },
  "&:first-of-type, &:last-of-type": { borderRadius: `${radiusTokens.md}px` },
  "&.Mui-expanded": { borderColor: "primary.main" },
};

/**
 * Everything that differs between the two looks, resolved once per variant so
 * the panel itself carries a single branch against the `complexity` ceiling.
 */
const LOOKS = {
  soft: {
    gutters: false,
    panel: softPanelSx,
    summary: { px: { xs: 4, md: 5 }, py: 1 },
    details: { px: { xs: 4, md: 5 }, pt: 0, pb: 4 },
    heading: "h4",
    answerColor: "text.secondary",
    icon: (open: boolean): IconName => (open ? "remove" : "add"),
  },
  plain: {
    gutters: true,
    panel: {},
    summary: {},
    details: {},
    heading: undefined,
    answerColor: undefined,
    icon: (): IconName => "expand-more",
  },
} as const;

function AccordionPanel({ item, expanded, onChange, variant, renderFooter, anchored }: PanelProps) {
  const look = LOOKS[variant ?? "plain"];
  const isOpen = expanded === item.id;

  return (
    <MuiAccordion
      expanded={isOpen}
      onChange={() => onChange(item.id)}
      elevation={0}
      disableGutters={!look.gutters}
      square={look.gutters}
      id={anchored ? item.id : undefined}
      sx={[look.panel, Boolean(anchored) && { scrollMarginTop: 120 }]}
    >
      <AccordionSummary
        expandIcon={<Icon name={look.icon(isOpen)} />}
        id={`${item.id}-header`}
        sx={look.summary}
      >
        <Typography component="h3" variant={look.heading}>
          {item.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={look.details}>
        <Typography color={look.answerColor}>{item.answer}</Typography>
        {renderFooter?.(item)}
      </AccordionDetails>
    </MuiAccordion>
  );
}

/** An expand/collapse list. Controlled: one open panel at a time. */
export function Accordion({ items, ...panel }: AccordionProps) {
  return (
    <div>
      {items.map((item) => (
        <AccordionPanel key={item.id} item={item} {...panel} />
      ))}
    </div>
  );
}
