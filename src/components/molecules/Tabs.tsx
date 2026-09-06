"use client";

import Box from "@mui/material/Box";
import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";

export interface TabItem {
  id: string;
  label: string;
  panel: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  "aria-label": string;
}

/** Keyboard-operable tabs (arrow keys move focus, native MUI behaviour) with labelled panels. */
export function Tabs({ items, value, onChange, ...rest }: TabsProps) {
  return (
    <div>
      <MuiTabs value={value} onChange={(_event, next: string) => onChange(next)} {...rest}>
        {items.map((item) => (
          <MuiTab
            key={item.id}
            label={item.label}
            value={item.id}
            id={`tab-${item.id}`}
            aria-controls={`tabpanel-${item.id}`}
          />
        ))}
      </MuiTabs>
      {items.map((item) => (
        <Box
          key={item.id}
          role="tabpanel"
          id={`tabpanel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={value !== item.id}
        >
          {value === item.id && item.panel}
        </Box>
      ))}
    </div>
  );
}
