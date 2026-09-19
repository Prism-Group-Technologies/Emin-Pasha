import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { CHANNELS_ANCHOR_ID } from "@/containers/contact/anchors";
import { type ChannelId, channelCopy, sections } from "@/containers/contact/copy";
import { ContactChannelCard } from "@/containers/contact/molecules/ContactChannelCard";
import { ReplyPromiseStrip } from "@/containers/contact/molecules/ReplyPromiseStrip";
import { identity } from "@/content/identity";
import { directionsUrl, emailUrl, telephoneUrl, whatsappUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

/**
 * Where each card points and what it shows, resolved here from the approved
 * identity — never from the invented copy — so no card can link anywhere the
 * source does not list.
 */
const TARGET: Record<ChannelId, { href: string; value: string }> = {
  whatsapp: { href: whatsappUrl, value: identity.whatsapp.display },
  call: { href: telephoneUrl, value: identity.telephone },
  email: { href: emailUrl, value: identity.email },
  visit: { href: directionsUrl, value: identity.address.split(",")[0] ?? identity.address },
};

/**
 * Four channels directly under the hero — the moment a visitor has decided to
 * get in touch, every route is one tap away — with WhatsApp featured as the
 * fastest path to a booking. The reply-promise strip underneath answers the
 * unspoken "will anyone actually get back to me?".
 */
export function ChannelsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={CHANNELS_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.channels.eyebrow}
      heading={sections.channels.heading}
      description={sections.channels.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {channelCopy.map((channel, index) => (
          <Reveal key={channel.id} index={index} fill>
            <ContactChannelCard
              {...channel}
              {...TARGET[channel.id]}
              featured={channel.id === "whatsapp"}
            />
          </Reveal>
        ))}
      </Box>
      <ReplyPromiseStrip />
    </SectionShell>
  );
}
