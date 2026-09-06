import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { ExperiencePage } from "@/containers/experiences/ExperiencePage";
import { ctas } from "@/content/ctas";
import { airportTransfer, airportTransferPageIntro } from "@/content/experiences";

const arrange = ctas.find((cta) => cta.id === "transfer-arrange");

/**
 * Airport transfer. The approved §8 copy names Entebbe International Airport
 * and states the complimentary-over-one-week benefit; both render.
 *
 * **Distance, journey time and price do not.** None is verified
 * (TODO(EMIN-Q09)) and no DECISIONS.md entry approves a figure, so rather
 * than a plausible "40 minutes from Entebbe" the page shows an enquiry route.
 * A wrong journey time is the kind of detail a guest plans a flight around.
 */
export function AirportTransferContainer() {
  return (
    <ExperiencePage
      eyebrow="§ AIRPORT TRANSFER"
      heading={airportTransfer.name}
      intro={airportTransferPageIntro}
      body={airportTransfer.description}
      assetId="experiences-airport-transfer"
      cta={arrange?.href ? { label: arrange.label, href: arrange.href } : undefined}
      relatedHrefs={["/accommodation", "/contact", "/offers"]}
    >
      <PendingInfoNotice
        subject="Journey time, distance and transfer rates"
        todoId="EMIN-Q09"
        action="Transfers run to and from Entebbe International Airport. Journey time and rates depend on your flight and party size — email reservations@eminpasha.com and we will confirm both. Complimentary on stays of more than one week."
      />
    </ExperiencePage>
  );
}
