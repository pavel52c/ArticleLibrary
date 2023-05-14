import React from "react";
import { useParams } from "react-router";
import Button from "@/shared/ui/Button/Button";
import { FavoriteArticlesImg } from "@/shared/public/images";
import Heading from "@/shared/ui/Heading/Heading";
import { AbstractsSection } from "@/widgets/AbstractsSection/AbstractsSection";
import "./ArticlePage.scss";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import { ReferenceSection } from "@/widgets/ReferencesSection/ReferencesSection";

export const ArticlePage = () => {
  const { articleId } = useParams();
  const abstracts = [
    {
      title: "Background",
      description:
        "Elderly population has been progressively rising in the world, thus the demand for anti-aging heath products to assure longevity as well as to ameliorate age-related complications is also on the rise. Among various anti-aging health products, nicotinamide mononucleotide (NMN) has been gaining attentions of the consumers and the scientific community.",
    },
    {
      title: "Aim of review",
      description:
        "This article intends to provide an overview on the current knowledge on promises and safety concerns of NMN as an anti-aging health product.",
    },
    {
      title: "Key scientific concepts of review",
      description:
        "Nicotinamide adenine dinucleotide (NAD+) levels in the body deplete with aging and it is associated with downregulation of energy production in mitochondria, oxidative stress, DNA damage, cognitive impairment and inflammatory conditions. However, NMN, as the precursor of NAD+, can slow down this process by elevating NAD+ levels in the body. A number of in vivo studies have indicated affirmative results of therapeutic effects for various age-induced complications with NMN supplementation. One preclinical and one clinical study have been conducted to investigate the safety concerns of NMN administration while a few more human clinical trials are being conducted. As there is a large influx of NMN based anti-aging products on the market, proper clinical investigations are urgently needed to find out the effectiveness and safety of NMN supplementation.",
    },
  ];
  const references = [
    {
      title:
        "United Nations (UN), Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights (ST/ESA/SER.A/430). New York, USA: United Nations; 2019.",
      description: "",
      links: [
        {
          url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
          title: "Google Scholar",
        },
      ],
    },
    {
      title:
        "Age and age-related diseases: role of inflammation triggers and cytokines",
      description: "Front Immunol, 9 (2018), p. 586",
      links: [
        {
          url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
          title: "View in Scopus",
        },
        {
          url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
          title: "Google Scholar",
        },
      ],
    },
    {
      title: "Aging and anti-aging: a combo-endocrinology overview",
      description: "Eur J Endocrinol, 176 (2017), pp. 283-308",
      links: [
        {
          url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
          title: "Google Scholar",
        },
      ],
    },
    {
      title:
        "Anti-aging medicine: the legal issues: legal issues associated with the current and future practice of anti-aging medicine",
      description:
        "J Gerontol A Biol Sci Med Sci, 59 (7) (2004), pp. B674-B681",
      links: [
        {
          url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
          title: "View in Scopus",
        },
        {
          url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
          title: "Google Scholar",
        },
      ],
    },
  ];

  return (
    <div className="ArticlePage">
      <article className="ArticlePage__article">
        <Heading size="l" mode="medium">
          Nicotinamide mononucleotide (NMN) as an anti-aging health product –
          Promises and safety concerns
        </Heading>
        <AbstractsSection abstracts={abstracts} />
        <ReferenceSection references={references} />
      </article>
      <div className="ArticlePage__right">
        <Button className="ArticlePage__saveBtn">
          <FavoriteArticlesImg />
          <Heading size="m" mode="semibold">
            Сохранить
          </Heading>
        </Button>
        <a
          href="https://www.sciencedirect.com//science/article/pii/S2090123221001491"
          target="_blank"
        >
          Ссылка на оригинал
        </a>
      </div>
    </div>
  );
};
