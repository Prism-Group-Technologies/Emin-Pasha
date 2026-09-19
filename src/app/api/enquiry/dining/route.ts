import { outletOptions, reservationCopy } from "@/containers/dining/copy/reservation";
import { contactCopy } from "@/content/contact-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { diningReservationSchema } from "@/schemas/diningReservation";

export const dynamic = "force-dynamic";

const OUTLET_LABEL = new Map<string, string>(
  outletOptions.map((option) => [option.value, option.label]),
);
const outletLabel = (value: string) => OUTLET_LABEL.get(value) ?? value;

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "dining",
    schema: diningReservationSchema,
    subject: "Table reservation enquiry",
    replyTo: (values) => values.email,
    toFields: (values) => [
      { label: "Outlet", value: outletLabel(values.outlet) },
      { label: "Date", value: values.date || "—" },
      { label: "Time", value: values.time || "—" },
      { label: "Party size", value: String(values.partySize) },
      { label: "Occasion", value: values.occasion },
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone || "—" },
      { label: "Message", value: values.message ?? "—" },
    ],
    messages: {
      success: reservationCopy.messages.success,
      failure: reservationCopy.messages.failed,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
