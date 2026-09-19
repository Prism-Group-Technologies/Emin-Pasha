"use client";

import { Stack } from "@/components/atoms/Stack";
import type { FilmChapter } from "@/containers/gallery/copy/film";
import { useActiveId } from "@/containers/gallery/hooks/useActiveId";
import { ReelChapterChips } from "@/containers/gallery/molecules/ReelChapterChips";
import { ReelScreen, type ReelScreenProps } from "@/containers/gallery/molecules/ReelScreen";

export interface FilmReelProps {
  chapters: FilmChapter[];
  poster: ReelScreenProps["poster"];
  labels: ReelScreenProps["labels"];
}

/**
 * 'use client' justification: the selected chapter. Selection lives in
 * `useActiveId`; this only joins the screen to the chapter chips.
 */
export function FilmReel({ chapters, poster, labels }: FilmReelProps) {
  const ids = chapters.map((chapter) => chapter.id);
  const { active, select } = useActiveId(ids);
  const chapter = chapters.find((item) => item.id === active);

  return (
    <Stack spacing={3}>
      <ReelScreen poster={poster} chapter={chapter} labels={labels} />
      <ReelChapterChips chapters={chapters} active={active} onSelect={select} />
    </Stack>
  );
}
