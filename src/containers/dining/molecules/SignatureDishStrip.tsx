import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import type { SignatureDish } from "@/containers/dining/menuView";
import { SignatureDishCard } from "@/containers/dining/molecules/SignatureDishCard";

/**
 * The two or three plated-dish cards that head the outlet menu section — the
 * "photograph a few, not all of them" strip the full text menu then follows.
 * One column on a phone, two from `sm`, one per dish from `md`. Renders
 * nothing when the sample menu flags no signature dishes.
 */
export function SignatureDishStrip({ dishes }: { dishes: SignatureDish[] }) {
  if (dishes.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: `repeat(${dishes.length}, minmax(0, 1fr))`,
        },
        gap: { xs: 4, md: 5 },
        alignItems: "stretch",
      }}
    >
      {dishes.map((dish, index) => (
        <Reveal key={dish.name} index={index} fill>
          <SignatureDishCard dish={dish} />
        </Reveal>
      ))}
    </Box>
  );
}
