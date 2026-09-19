import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { HashLink } from "@/containers/faq/molecules/HashLink";
import type { FaqEntry } from "@/containers/faq/types";

export interface GuideQuestionLinksProps {
  label: string;
  questions: FaqEntry[];
}

/** A guide card's related questions — each jumps to, and opens, its answer. */
export function GuideQuestionLinks({ label, questions }: GuideQuestionLinksProps) {
  if (questions.length === 0) {
    return null;
  }
  return (
    <Box>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 1 }}
      >
        {label}
      </Text>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1 }}>
        {questions.map((question) => (
          <Box component="li" key={question.id}>
            <HashLink
              targetId={question.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                py: 0.5,
                "&:hover .faq-guide-question": { textDecoration: "underline" },
              }}
            >
              <Icon
                name="help"
                fontSize="small"
                aria-hidden
                sx={{ color: "primary.main", mt: 0.25 }}
              />
              <Text component="span" variant="body2" className="faq-guide-question">
                {question.question}
              </Text>
            </HashLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
