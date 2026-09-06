import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { Carousel } from "@/components/molecules/Carousel";

const items = ["Hakki Pasha", "Sir Samuel Baker", "The Rooftop Terrace", "Manutea"].map((name) => ({
  id: name,
  content: (
    <Stack
      key={name}
      sx={{ width: 220, height: 140, backgroundColor: "background.paper", borderRadius: 1 }}
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="body2">{name}</Text>
    </Stack>
  ),
}));

/** Custom scroll-snap carousel — swipe on touch, arrow keys when focused, Prev/Next buttons. */
export function CarouselSection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Carousel</Text>
      <Carousel items={items} aria-label="Dining outlets" />
    </Stack>
  );
}
