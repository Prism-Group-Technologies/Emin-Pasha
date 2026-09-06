"use client";

import { SectionShell } from "@/components/templates/SectionShell";
import { planSection } from "@/containers/home/copy";
import { usePlanYourVisit } from "@/containers/home/hooks/usePlanYourVisit";
import { PlanPanel } from "@/containers/home/molecules/PlanPanel";
import { PlanTabs } from "@/containers/home/molecules/PlanTabs";
import type { RevealDirection } from "@/theme/motion";

/**
 * The page's conversion centrepiece: three lead paths behind one tablist.
 *
 * This property sells three different things to three audiences that overlap
 * very little — an overnight stay, an event, and a day out for someone who
 * already lives in Kampala. A single blended call to action serves none of
 * them, so the section asks the visitor to self-identify and then shows only
 * that path's argument and its two CTAs.
 *
 * A client island by necessity (it holds selection state), but a cheap one:
 * all three panels' copy is static, and only the selected panel is mounted, so
 * the tab switch is a re-render rather than a fetch.
 *
 * All state, analytics and keyboard handling live in `usePlanYourVisit` —
 * this organism is composition only.
 *
 * Only the header reveals. The panel below it is swapped on every tab press,
 * and a reveal on a element that remounts mid-page would re-run its entry
 * animation each time the visitor changed tab — motion as a side effect of a
 * click, which is not what a scroll reveal is for. `revealSx` is plain CSS, so
 * the header animates here exactly as it does in the server-rendered sections
 * despite this being a client island; the reveal adds nothing to the bundle.
 */
export function PlanYourVisit({ motion = "up" }: { motion?: RevealDirection }) {
  const { paths, activeId, activePath, select, onKeyDown, tabId, panelId } = usePlanYourVisit();

  return (
    <SectionShell
      id="plan-your-visit"
      motion={motion}
      eyebrow={planSection.eyebrow}
      heading={planSection.heading}
      description={planSection.description}
      topRule
    >
      <PlanTabs
        paths={paths}
        activeId={activeId}
        select={select}
        onKeyDown={onKeyDown}
        tabId={tabId}
        panelId={panelId}
      />
      <PlanPanel
        key={activePath.id}
        path={activePath}
        id={panelId(activePath.id)}
        labelledBy={tabId(activePath.id)}
      />
    </SectionShell>
  );
}
