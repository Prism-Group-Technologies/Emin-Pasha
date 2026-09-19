"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { SelectField } from "@/components/molecules/SelectField";
import { contactTimeOptions, formCopy, replyChannelOptions } from "@/containers/contact/copy/form";
import { RadioTile } from "@/containers/contact/molecules/RadioTile";
import type { ContactValues } from "@/schemas/contact";

const f = formCopy.fields;
const LEGEND_ID = "contact-reply-channel-legend";

const CHANNEL_ICON: Record<(typeof replyChannelOptions)[number]["value"], IconName> = {
  email: "mail",
  phone: "phone",
  whatsapp: "whatsapp",
};

const TIME_OPTIONS = contactTimeOptions.map((o) => ({ value: o.value, label: o.label }));

/**
 * How and when the visitor wants to hear back — the two answers that decide
 * whether the desk emails, calls or messages, and at what hour. Reply channel
 * is three tiles (one tap, no dropdown); the time is a select, since it is
 * secondary and four long labels would crowd a row.
 */
export function ReplyPreferenceFields({ form }: { form: UseFormReturn<ContactValues> }) {
  const registration = form.register("replyChannel");

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Text id={LEGEND_ID} variant="overline" component="p" color="text.secondary">
        {f.replyChannel}
      </Text>
      <Box
        component="fieldset"
        aria-labelledby={LEGEND_ID}
        sx={{
          border: 0,
          m: 0,
          p: 0,
          minWidth: 0,
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {replyChannelOptions.map((option) => (
          <RadioTile
            key={option.value}
            registration={registration}
            value={option.value}
            label={option.label}
            icon={CHANNEL_ICON[option.value]}
          />
        ))}
      </Box>
      <SelectField
        {...form.register("contactTime")}
        id="contact-time"
        label={f.contactTime}
        options={TIME_OPTIONS}
        defaultValue="any"
        fullWidth
      />
    </Box>
  );
}
