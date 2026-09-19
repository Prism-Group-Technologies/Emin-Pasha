"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";

/** Form controls — default, error and disabled states, in real controlled use. */
export function FormsSection() {
  const [guests, setGuests] = useState(2);
  const [radioValue, setRadioValue] = useState("deluxe-room");

  return (
    <Stack spacing={2} sx={{ maxWidth: 480 }}>
      <Text variant="h2">Form controls</Text>
      <TextInput label="Full name" placeholder="Jacqui Fairness" />
      <TextInput label="Email" error helperText="Enter a valid email address" />
      <TextInput label="Phone" disabled value="+256 312 264 712" />
      <Textarea label="Message" placeholder="Tell us about your stay…" />
      <SelectField
        label="Room category"
        defaultValue="deluxe-room"
        options={[
          { value: "superior-room", label: "Superior Room" },
          { value: "deluxe-room", label: "Deluxe Room" },
          { value: "deluxe-suites", label: "Deluxe Suites" },
          { value: "superior-suites", label: "Superior Suites" },
        ]}
      />
      <Checkbox label="I agree to be contacted about this enquiry" />
      <Checkbox label="Newsletter (error state)" error="This field is required" />
      <RadioGroup
        legend="Preferred room"
        name="preferred-room-demo"
        value={radioValue}
        onChange={(event) => setRadioValue(event.target.value)}
        options={[
          { value: "deluxe-room", label: "Deluxe Room" },
          { value: "superior-room", label: "Superior Room" },
        ]}
      />
      <NumberStepper label="Guests" value={guests} onChange={setGuests} min={1} max={6} />
    </Stack>
  );
}
