/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Contact page the conversion surfaces the approved copy
 * deck never supplied — a hero pitch, channel cards with reply-time promises,
 * an intent-led enquiry form, arrival notes and travel times, a front-desk
 * team, guest voices, an FAQ and a closing band.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/story/copy` and `containers/wellness/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy.
 *
 * Traceability. **Every channel stays real**: the telephone, WhatsApp number,
 * both email addresses and the address render from `content/identity.ts`,
 * and no department inbox is invented. What is invented is the wrapper —
 * reply-time promises, desk availability, travel times, arrival notes, team
 * profiles (placeholder names) and voices (attributed to no real person).
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content`. TODO(EMIN-Q10): the reply-time promises need confirming
 * against the desk's real SLA. TODO(EMIN-Q34): no mail provider is wired.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { channelCopy, replyPromises, type ChannelId } from "./channels";
export { contactIntents, intentById, type ContactIntentConfig } from "./intents";
export { formCopy, replyChannelOptions, contactTimeOptions } from "./form";
export { travelTimes, arrivalNotes, type ArrivalNote, type TravelTime } from "./arrival";
export { deskTeam, type DeskMember } from "./team";
export { contactVoices, type ContactVoice } from "./voices";
export { contactFaq, type ContactFaqItem } from "./faq";
export { contactMedia, contactAsset } from "./media";
