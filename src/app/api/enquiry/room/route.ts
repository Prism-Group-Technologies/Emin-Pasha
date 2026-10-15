import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/room";
import { roomReservationSchema } from "@/schemas/roomReservation";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: roomReservationSchema });
}
