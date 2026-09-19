"use client";

import { useEffect, useRef } from "react";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { formCopy } from "@/containers/contact/copy/form";

export interface EnquirySuccessProps {
  message: string | null;
  /** The intent-matched WhatsApp hand-off, resolved on the server. */
  whatsappHref: string;
  onStartOver: () => void;
}

/**
 * What replaces the form once it sends. Focus moves to the heading on mount
 * — the form the visitor was in has just disappeared, and without this a
 * keyboard or screen-reader user would be dropped at the top of the page.
 * The message is whatever `useContactEnquiry` resolved, including the honest
 * "pending" wording while no mail provider is wired (TODO(EMIN-Q34)).
 */
export function EnquirySuccess({ message, whatsappHref, onStartOver }: EnquirySuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <Box
      role="status"
      sx={{ display: "grid", gap: 4, justifyItems: "start", py: { xs: 2, md: 4 } }}
    >
      <Icon name="check-circle" sx={{ fontSize: 56, color: "success.main" }} aria-hidden />
      <Text ref={headingRef} tabIndex={-1} variant="h3" component="h3" sx={{ outline: "none" }}>
        {formCopy.success.heading}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ maxWidth: "52ch", textWrap: "pretty" }}>
        {message}
      </Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Button
          href={whatsappHref}
          startIcon={<Icon name="whatsapp" />}
          aria-label={`${formCopy.success.whatsapp}${NEW_TAB_NOTE}`}
        >
          {formCopy.success.whatsapp}
        </Button>
        <Button variant="ghost" onClick={onStartOver}>
          {formCopy.success.again}
        </Button>
      </Box>
    </Box>
  );
}
