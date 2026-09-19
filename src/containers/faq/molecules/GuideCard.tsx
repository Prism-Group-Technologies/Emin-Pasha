import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { FaqGuide } from "@/containers/faq/copy";
import { GuideQuestionLinks } from "@/containers/faq/molecules/GuideQuestionLinks";
import type { FaqEntry } from "@/containers/faq/types";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface GuideCardProps {
  guide: FaqGuide;
  asset?: AssetRef;
  questions: FaqEntry[];
  relatedLabel: string;
}

/**
 * One plan-your-stay guide: a placeholder photo at a fixed 3:2 (so a row sits
 * level and a real photo can land without layout shift), a short pitch, the
 * questions that go with it, and a CTA into the relevant section of the site.
 */
export function GuideCard({ guide, asset, questions, relatedLabel }: GuideCardProps) {
  return (
    <Box component="article" sx={[cardSurface(false), { p: { xs: 0, md: 0 }, overflow: "hidden" }]}>
      <MediaFrame
        radius="sm"
        hoverZoom
        sx={{
          borderRadius: 0,
          aspectRatio: "3 / 2",
          bgcolor: "action.hover",
          "& > div:first-of-type": { aspectRatio: "auto", height: "100%" },
        }}
      >
        {asset && (
          <AssetImage
            asset={asset}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        )}
      </MediaFrame>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text
          variant="overline"
          component="p"
          sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
        >
          {guide.eyebrow}
        </Text>
        <Text variant="h4" component="h3" sx={{ textWrap: "balance" }}>
          {guide.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {guide.body}
        </Text>
        <GuideQuestionLinks label={relatedLabel} questions={questions} />
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button href={guide.href} variant="ghost" endIcon={<Icon name="arrow-forward" />}>
            {guide.cta}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
