"use client";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  expanded: string | false;
  onChange: (id: string) => void;
}

/** An expand/collapse list — FAQ page. Controlled: one open panel at a time. */
export function Accordion({ items, expanded, onChange }: AccordionProps) {
  return (
    <div>
      {items.map((item) => (
        <MuiAccordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={() => onChange(item.id)}
        >
          <AccordionSummary expandIcon={<Icon name="expand-more" />} id={`${item.id}-header`}>
            <Typography component="h3">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
}
