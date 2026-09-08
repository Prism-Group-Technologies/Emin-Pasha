"use client";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";
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
}

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

/** An expand/collapse list. Controlled: one open panel at a time. */
export function Accordion({ items, expanded, onChange, variant = "plain" }: AccordionProps) {
  const soft = variant === "soft";

  return (
    <div>
      {items.map((item) => {
        const isOpen = expanded === item.id;
        return (
          <MuiAccordion
            key={item.id}
            expanded={isOpen}
            onChange={() => onChange(item.id)}
            elevation={0}
            disableGutters={soft}
            square={!soft}
            sx={soft ? softPanelSx : undefined}
          >
            <AccordionSummary
              expandIcon={<Icon name={soft ? (isOpen ? "remove" : "add") : "expand-more"} />}
              id={`${item.id}-header`}
              sx={soft ? { px: { xs: 4, md: 5 }, py: 1 } : undefined}
            >
              <Typography component="h3" variant={soft ? "h4" : undefined}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={soft ? { px: { xs: 4, md: 5 }, pt: 0, pb: 4 } : undefined}>
              <Typography color={soft ? "text.secondary" : undefined}>{item.answer}</Typography>
            </AccordionDetails>
          </MuiAccordion>
        );
      })}
    </div>
  );
}
