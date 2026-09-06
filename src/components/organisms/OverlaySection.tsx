"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Alert, Toast } from "@/components/molecules/Alert";
import { Drawer } from "@/components/molecules/Drawer";
import { Modal } from "@/components/molecules/Modal";
import { Tooltip } from "@/components/molecules/Tooltip";

/** Modal, Drawer, Tooltip, Alert/Toast — real open/close state, not just static markup. */
export function OverlaySection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Text variant="h2">Overlays</Text>
      <Alert severity="success">Success — your enquiry was sent.</Alert>
      <Alert severity="error">Error — check the highlighted fields.</Alert>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button variant="ghost" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Button variant="ghost" onClick={() => setDrawerOpen(true)}>
          Open Drawer
        </Button>
        <Button variant="ghost" onClick={() => setToastOpen(true)}>
          Show Toast
        </Button>
        <Tooltip title="Visible on hover and keyboard focus">
          <Button variant="ghost">Hover or focus me</Button>
        </Tooltip>
      </Stack>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Reserve This Room">
        <Text variant="body2">Modal content — focus is trapped; Escape closes it.</Text>
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
        <Text variant="body2" sx={{ p: 2 }}>
          Drawer content.
        </Text>
      </Drawer>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        severity="success"
        autoHideDuration={4000}
      >
        Enquiry sent — we reply within 24 hours.
      </Toast>
    </Stack>
  );
}
