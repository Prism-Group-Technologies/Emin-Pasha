import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface PendingInfoNoticeProps {
  /** What is missing, e.g. "Menus and opening hours". */
  subject: string;
  /** The open-question id, e.g. "EMIN-Q12". */
  todoId: string;
  /** What the visitor can do instead — never a dead end (CLAUDE.md §2). */
  action?: string;
}

/**
 * A visible, honest gap.
 *
 * Restaurant menus, dishes, prices and outlet opening hours are all
 * explicitly forbidden to invent (02_CONTENT_SOURCE_OF_TRUTH.md §0.7) and
 * none is in the source. Rather than omit the section silently — which reads
 * as "this hotel has no menu" — or fill it with plausible-looking dishes,
 * the page states what is coming and offers a person instead.
 */
export function PendingInfoNotice({ subject, todoId, action }: PendingInfoNoticeProps) {
  return (
    <Box sx={{ p: 4, border: "1px dashed", borderColor: "warning.main", display: "grid", gap: 1 }}>
      <Typography variant="overline" sx={{ fontFamily: "var(--font-cartographic)" }}>
        {`TODO(${todoId}) — ${subject.toUpperCase()} NOT YET PUBLISHED`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {action ??
          `${subject} are not published on the site yet. Call or message us and we will send you what you need.`}
      </Typography>
    </Box>
  );
}
