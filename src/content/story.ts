import { storySchema } from "@/schemas/content/story";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.4 (GM message) and §12.5 (the
 * namesake, long form). GM name/photo are TODO(EMIN-Q21) — the message
 * ships unattributed beyond the generic title, exactly as approved.
 */
export const story = storySchema.parse({
  whyWeCarryThisName:
    "Emin Pasha was truly one of the most extraordinary characters in Ugandan history. He was a doctor, a naturalist and a linguist — and an African at heart. Among all the bravado and machismo of the colonial age, he was a genuinely unique figure. His aim was not to conquer but to understand and to learn, and in doing so he came to respect and to fall in love with this country. We cannot imagine a more appropriate or more relevant person to name our hotel after.",
  lifeIntro:
    "His link to Uganda dates back to the late 1800s, during the era known as the Scramble for Africa. An explorer, physician and linguist, he was also fascinated by anthropology, botany, zoology and meteorology — and, importantly, he was actively opposed to the slave trade.",
  timeline: [
    {
      id: "germany-and-albania",
      title: "Germany and Albania",
      body: "Born Eduard Carl Oscar Theodor Schnitzer in Germany. Based for a period in Albania, where he practised medicine and put his linguistic talent to good use, adding Turkish, Albanian and Greek to a repertoire that already included several western European languages. He became quarantine officer of the port, leaving only in 1870 to join the staff of Ismail Hakki Pasha, governor of northern Albania, in whose service he travelled extensively throughout the Ottoman Empire.",
    },
    {
      id: "cairo-and-khartoum",
      title: "Cairo and Khartoum",
      body: "In 1875 he reappeared in Cairo, and then in Khartoum. At this point he took the name Mehemet Emin — Arabic for Muhammad al-Amin — established a medical practice, and began collecting plants, animals and birds, many of which he sent to museums in Europe. Some regarded him as a Muslim, though it is not clear that he ever formally converted.",
    },
    {
      id: "equatoria",
      title: "Equatoria",
      body: "Charles Gordon, then governor of Equatoria — the territory that is now northern Uganda and South Sudan — heard of Emin's presence and invited him to serve as chief medical officer of the province. Emin accepted and arrived in May 1876. Gordon immediately sent him on diplomatic missions south to Buganda and Bunyoro, where Emin's modest manner and his fluency in Luganda made him notably popular.",
    },
    {
      id: "governor",
      title: "Governor",
      body: "In 1878 the Khedive of Egypt appointed Emin as Gordon's successor as Governor, with the title of Bey. Despite the grand title there was little for him to do: his military force amounted to a few thousand soldiers who controlled no more than a mile's radius around each of their outposts, and the government in Khartoum was indifferent to his proposals for development.",
    },
    {
      id: "cut-off",
      title: "Cut off",
      body: "The Mahdi Rebellion began in 1881 and severed Equatoria from the outside world. In 1885 General Gordon was killed in Khartoum, and Emin withdrew with most of his forces further south to Wadelai, on the upper Nile near Lake Albert. Cut off from communication with the north, he was still able to exchange mail with Zanzibar by way of Buganda. Determined to remain in Equatoria, his despatches aroused considerable sentiment in Europe in 1886 — feeling that was especially acute after Gordon's death.",
    },
    {
      id: "the-rescue-that-wasnt-wanted",
      title: "The rescue that wasn't wanted",
      body: "The Emin Pasha Relief Expedition, led by Henry Morton Stanley, was one of the best-equipped ever sent to Africa. Strangely, rather than take the direct route from the East African coast, Stanley chose to reach Emin by going up the Congo River and then through the Ituri Forest — an extraordinarily difficult route that cost the expedition two-thirds of its number. Stanley finally met Emin in April 1888, and was surprised to find in him not a trace of ill-health or anxiety. They celebrated with three bottles of champagne that had been carried the entire way up the Congo. Despite the celebration, Emin Pasha had no desire to leave. He felt no need to be rescued, and refused to abandon the country he had grown to love.",
    },
    {
      id: "the-long-walk-out",
      title: "The long walk out",
      body: "After a year of argument and indecision, Stanley finally persuaded him to leave for the coast. Marching through new country and exploring the Semliki River, Mount Rwenzori and Lakes Edward and George, Stanley and his followers made their way south of the Victoria Nyanza, reaching Bagamoyo in 1890. Ironically — and, in retrospect, rather comically — at a welcome reception in Bagamoyo, Emin Pasha fell out of a second-storey window and cracked his head open. After all the delays, an upset and impatient Stanley left him behind. Emin then entered German service and led an expedition to the interior lakes, but was killed by slave traders at Kinene.",
    },
  ],
  whatWeTakeFromIt:
    "Curiosity over conquest. Humanity over hierarchy. A real appreciation for the natural world. And a stubborn affection for this country. That is the spirit we try to put into a room, a meal, a massage and a welcome.",
  generalManagerMessage:
    "Welcome to The Emin Pasha Hotel and Spa, where a collage of history, culture and nature embrace you in a pouch of serenity! Just like Emin Pasha, the distinguished physician and anthropologist, The Emin Pasha Hotel and Spa embodies a bold spirit of unity, humanity and an appreciation of nature's marvels. Journey through time aboard our historically charming architecture, dotted with tasteful décor that is infused with Uganda's rich heritage. Be it a moment of quiet reflection or a pulse-racing rendezvous, let our bespoke hospitality envelop you in a sense of homecoming and distinct rejuvenation!",
});
