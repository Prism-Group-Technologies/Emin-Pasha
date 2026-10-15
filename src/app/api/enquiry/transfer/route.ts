import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/transfer";
import { transferBookingSchema } from "@/schemas/transferBooking";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: transferBookingSchema });
}
