"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { Accordion } from "@/components/molecules/Accordion";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { Tabs } from "@/components/molecules/Tabs";

const faqItems = [
  { id: "wifi", question: "Is there Wi-Fi?", answer: "Yes — fast, unlimited fibre." },
  { id: "parking", question: "Is there parking?", answer: "Yes — secure, manned parking." },
];

const tabItems = [
  {
    id: "overview",
    label: "Overview",
    panel: <Text variant="body2">Overview panel content.</Text>,
  },
  {
    id: "policies",
    label: "Policies",
    panel: <Text variant="body2">Policies panel content.</Text>,
  },
];

/** Breadcrumbs, Tabs (keyboard-operable) and Accordion (FAQ pattern). */
export function NavigationSection() {
  const [expanded, setExpanded] = useState<string | false>("wifi");
  const [tab, setTab] = useState("overview");

  return (
    <Stack spacing={2}>
      <Text variant="h2">Navigation</Text>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Accommodation", href: "/accommodation" },
          { label: "Superior Room" },
        ]}
      />
      <Tabs items={tabItems} value={tab} onChange={setTab} aria-label="Room detail tabs" />
      <Accordion
        items={faqItems}
        expanded={expanded}
        onChange={(id) => setExpanded(expanded === id ? false : id)}
      />
    </Stack>
  );
}
