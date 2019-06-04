import React, { Component } from "react";
import {
  Button,
  Segment,
  Container,
  Icon,
  Menu,
  Popup,
  Message,
  Transition
} from "semantic-ui-react";

import axios from "axios";

import { Link } from "react-router-dom";

import AccordionExampleFluid from "./AccordionTheme";

const struct = [
  {
    theme: "Intensité et complexité du travail",
    sub_themes: [
      "Les contraintes de rythmes de travail",
      "La précision des objectifs de travail",
      "L'adéquation des objectifs de travail avec les moyens alloués et les responsabilités exercées",
      "La compatibilité des instructions de travail entre elles",
      "La modalité d'organisation de la polyvalence",
      "Les interruptions perturbatrices au cours du travail",
      "Les niveaux d'attention et de vigilance requis dans le travail"
    ]
  },
  {
    theme: "Horaires de travail",
    sub_themes: [
      "La durée hebdomadaire du travail",
      "Le travail en horaires atypiques",
      "L'extension de la disponibilité en dehors des horaires de travail",
      "La prévisibilité des horaires de travail et anticipation de leur changement",
      "La conciliation entre vie professionnelle et vie personnelle"
    ]
  },
  {
    theme: "Exigences émotionnelles",
    sub_themes: [
      "Les tensions avec le public",
      "La confrontation à la souffrance d'autrui",
      "La maitrise des émotions (faire bonne figure)"
    ]
  },
  {
    theme: "Autonomie au travail",
    sub_themes: [
      "L'autonomie dans la tâche",
      "L'autonomie temporelle",
      "L'utilisation et le développement des compétences"
    ]
  },
  {
    theme: "Rapports sociaux au travail",
    sub_themes: [
      "Le soutien de la part des collègues",
      "Le soutien de la part des supérieurs hiérarchiques",
      "Les violences internes au travail",
      "La reconnaissance dans le travail"
    ]
  },
  {
    theme: "Conflits de valeurs",
    sub_themes: ["La qualité empêchée", "L'utilité du travail"]
  },
  {
    theme: "Insécurité de l'emploi et du travail",
    sub_themes: [
      "L'insécurité/la sécurité socio-économique",
      "La conduite du changement"
    ]
  }
];

const initData = {
  situationsExamples: "",
  presence: -1,
  intensity: -1,
  correctiveActions: "",
  urgencyLevel: -1,
  existingActions: "",
  selectedActions: "",
  timeLimit: "",
  inCharge: "",
  comment: ""
};

const form = [
  {
    name: "Intensité et complexité du travail",
    subTopics: [
      { 
        name: "Les contraintes de rythmes de travail",
        data: initData,
        subTitle: "Les salariés sont-ils soumis à des contraintes de rythmes élevés ?",
        details: "Le rythme de travail peut être imposé par des contraintes internes à l’entreprise (cadence d’une machine, normes de production, dépendance vis- à-vis du travail de collègues en amont ou en aval...) ou externes (demande des clients nécessitant une réponse immédiate...). Ces contraintes de rythmes, lorsqu’elles sont élevées, exigent des salariés une réactivité et une disponibilité quasi-permanente qui sont sources de stress."},
      { 
        name: "La précision des objectifs de travail",
        data: initData,
        subTitle: "Les objectifs des salariés sont-ils clairement définis ?",
        details: "Les objectifs de travail fixés par l’entreprise guident les salariés dans la réalisation de leurs tâches. Ils peuvent être quantitatifs (par exemple, le nombre de ventes à réaliser dans le mois) ou qualitatifs (par exemple, donner des réponses satisfaisantes aux demandes des clients). Lorsque ces objectifs sont imprécis, flous, voire inexistants, les salariés manquent de repères sur ce qu’on attend réel- lement de leur travail. Dès lors, des décalages peuvent se créer entre les objectifs que les sala- riés peuvent eux-mêmes se fixer et les objectifs de l’entreprise."
      },
      {
        name:
          "L'adéquation des objectifs de travail avec les moyens alloués et les responsabilités exercées",
        data: initData,
        subTitle: "Les objectifs fixés sont-ils compatibles avec les moyens et responsabilités alloués aux salariés pour les atteindre?",
        details: "Les objectifs de travail peuvent être clairement défi- nis sans toutefois s’avérer réalistes au regard des exigences du travail et des ressources mises à dis- position des salariés (moyens humains, techniques, responsabilités effectives...). Lorsque les objectifs ne sont pas en adéquation avec les moyens, les risques sont plus élevés de voir les salariés en dif- ficulté (fatigue, saturation, débordement, baisse de performance) et insatisfaits."
      },
      {
        name: "La compatibilité des instructions de travail entre elles",
        data: initData,
        subTitle: "Les salariés reçoivent-ils des instructions, des ordres ou demandes qui peuvent être contradictoires entre eux ?",
        details: "Les contradictions peuvent provenir de consignes différentes données par les uns et les autres (enca- drement/fonctionnel, direction de l’entreprise/ clientèle...). Elles peuvent également être dues à des instructions, ordres, demandes antagonistes : par exemple, faire de la qualité rapidement, satis- faire les attentes personnalisées des clients dans un temps préétabli... La nécessité d’arbitrer entre ces contradictions complique le travail et constitue une charge mentale supplémentaire pour les salariés."
      },
      {
        name: "La modalité d'organisation de la polyvalence",
        data: initData,
        subTitle: "Les salariés sont-ils amenés à changer de tâches, de postes ou de fonctions à l’improviste pour répondre aux contraintes du moment ?",
        details: "La polyvalence est une forme d’organisation du tra- vail qui consiste à affecter plusieurs activités diffé- rentes à un salarié. Elle peut devenir problématique lorsqu’elle est subie, c’est-à-dire quand les rempla- cements se font au « pied levé », dans l’urgence et sans préparation. Elle est d’autant plus pénalisante quand les salariés ne sont pas formés pour exercer ces différentes activités. Au-delà des risques d’erreur ou d’accident, la polyvalence subie peut être considérée comme dévalorisante par les sala- riés et constituer une perte de sens du métier."
      },
      {
        name: "Les interruptions perturbatrices au cours du travail",
        data: initData,
        subTitle:"Les salariés sont-ils fréquemment interrompus au cours de leur travail par des tâches non prévues ?",
        details:"Les interruptions inopinées obligent les salariés à mettre entre parenthèses leur tâche principale pour en traiter d’autre(s). Elles « morcèlent » le travail, perturbent son bon déroulement et sont source de charge mentale. Elles peuvent générer des erreurs mais aussi être mal vécues dans la mesure où les salariés ont l’impression de faire un travail de mauvaise qualité et de ne jamais pouvoir terminer ce qu’ils ont entrepris."
      },
      {
        name:
          "Les niveaux d'attention et de vigilance requis dans le travail",
        data: initData,
        subTitle: "Les salariés exercent-ils des activités qui nécessitent une attention soutenue ou une vigilance permanente ?",
        details: "Maintenir un niveau élevé d’attention ou rester vigi- lant pendant de longues périodes est particulière- ment difficile pour l’organisme. Selon les tâches, par exemple de surveillance ou de contrôle, cela peut occasionner chez les salariés de la fatigue, des baisses d’attention, mais aussi la crainte de com- mettre des erreurs ou des oublis dans leur travail."
      }
    ]
  },
  {
    name: "Horaires de travail",
    subTopics: [
      { 
        name: "La durée hebdomadaire du travail",
        data: initData,
        subTitle: "Arrive-t-il que les salariés travaillent plus de 45 heures par semaine ?",
        details: "Au-delà d’une certaine limite, la durée hebdoma- daire du travail s’avère dommageable pour la santé, quelle que soit la satisfaction qu’éprouve le salarié dans son travail. D’après les connaissances scien- tifiques actuelles, il serait raisonnable de ne pas dépasser 45 heures de travail par semaine."
      },
      { 
        name: "Le travail en horaires atypiques", 
        data: initData, 
        subTitle: "Les salariés sont-ils soumis à des horaires de nuit, alternants ou décalés ?", 
        details: "Certains types d’horaires de travail ont des réper- cussions sur la santé physique et mentale des sa- lariés. C’est par exemple les cas du travail de nuit ou du travail en horaires alternants (3x8, 2x12...), des horaires décalés (particulièrement le soir et le week-end), des horaires fractionnés (11h-15h puis 18h-21h, par exemple) ou du travail sur appel (ab- sence d’horaire pré-établi)."
      },
      {
        name:
          "L'extension de la disponibilité en dehors des horaires de travail",
        data: initData, 
        subTitle: "Les salariés sont-ils contactés en dehors des horaires de travail pour des raisons professionnelles ?", 
        details: "La disponibilité demandée aux salariés peut s’éten- dre au-delà de leurs horaires de travail (week-end, congés...). Elle limite les possibilités de récupéra- tion physique et mentale. De plus, elle empiète sur la vie personnelle des salariés."
      },
      {
        name:
          "La prévisibilité des horaires de travail et anticipation de leur changement",
        data: initData, 
        subTitle: "Les salariés connaissent-ils suffisamment à l’avance leurs horaires de travail ou les changements éventuels de leur planning de travail ?", 
        details: "L’incertitude envers les horaires de travail à effec- tuer, le caractère inopiné des changements dans les plannings horaires... ne facilitent pas l’orga- nisation de la vie personnelle. Ils rendent difficile toute prévision des activités extraprofessionnelles et obligent à des adaptations souvent coûteuses pour les salariés, par exemple s’ils ont à charge de jeunes enfants."
      },
      {
        name:
          "La conciliation entre vie professionnelle et vie personnelle",
        data: initData, 
        subTitle: "L’entreprise permet-elle aux salariés de concilier vie professionnelle et vie personnelle ?", 
        details: "La conciliation peut être facilitée dans l’entreprise par la négociation d’accords, par exemple en ma- tière d’aménagement des horaires de travail, ou par la possibilité d’arrangements informels accordés selon les besoins des salariés. Ces commodités peuvent les aider à remplir des obligations extraprofessionnelles (familiales, médi- cales, administratives...)."
      }
    ]
  },
  {
    name: "Exigences émotionnelles",
    subTopics: [
      { 
        name: "Les tensions avec le public", 
        data: initData, 
        subTitle: 
        "Les salariés sont-ils confrontés à des situations de tension (avec des clients, usagers, patients...) dont ils se plaignent ?", 
        details: "La mauvaise qualité de service, des délais d’attente jugés trop longs... peuvent susciter le mécontente- ment du public et créer des tensions avec les sala- riés (altercations verbales et/ou physiques...). Ces heurts sont susceptibles d’avoir des répercussions sur le travail des salariés (interruption ponctuelle de l’activité, augmentation des erreurs, démobilisation professionnelle, dégradation du climat de travail, des relations professionnelles...)."
      },
      {
        name: "La confrontation à la souffrance d'autrui",
        data: initData, 
        subTitle: "Dans le cadre de leur activité professionnelle, les salariés sont-ils amenés à devoir traiter la situation de personnes en souffrance (physique, psychologique ou sociale) ?", 
        details: "Toute confrontation à la souffrance de tiers est coû- teuse psychiquement pour les salariés. Certaines situations de travail peuvent en accentuer la charge émotionnelle : manque de moyens pour venir en aide aux personnes en difficulté, absence d’issue face à leurs problèmes... Cela peut profondément ébranler les salariés et réduire leur investissement dans leur travail."
      },
      {
        name: "La maitrise des émotions (faire bonne figure)",
        data: initData, 
        subTitle: "Dans leur travail, les salariés se doivent-ils de « faire bonne figure » en toutes circonstances ?", 
        details: "Devoir adopter une attitude bienveillante et dis- ponible envers les autres constitue une exigence à laquelle les salariés peuvent être contraints, par exemple dans certains métiers en contact avec le public. Plus généralement, il peut aussi leur être demandé de manifester de l’enthousiasme et de l’allant pour leur travail vis-à-vis de l’entourage pro- fessionnel. Cela peut avoir des conséquences sur la santé mentale des salariés lorsqu’ils sont amenés à « prendre sur eux » pour ne pas montrer leurs véri- tables émotions ou bien leurs ressentis du moment."
      }
    ]
  },
  {
    name: "Autonomie au travail",
    subTopics: [
      { 
        name: "L'autonomie dans la tâche", 
        data: initData, 
        subTitle: "Les salariés ont-ils des marges de manœuvre dans la manière de réaliser leur travail dès lors que les objectifs sont atteints ?", 
        details: "Les marges de manœuvre dans le travail relèvent des possibilités d’action dont les salariés disposent pour choisir la manière d’organiser et de réaliser leur travail ainsi que les procédés employés (choix des gestes, des techniques, des outils...). Plus ces marges sont grandes, plus l’autonomie des sala- riés dans leur travail peut être importante. Sans ou avec peu d’autonomie, les salariés sont contraints dans l’exécution de leur travail, sans possibilité d’en influencer le déroulement et de prendre des initia- tives. Les salariés peuvent dès lors se désinvestir d’un travail dénué d’intérêt."
      },
      { 
        name: "L'autonomie temporelle", 
        data: initData, 
        subTitle: "Les salariés peuvent-ils interrompre momentanément leur travail quand ils en ressentent le besoin ?", 
        details: "La possibilité de choisir les moments de pause donne également une indication du niveau d’auto- nomie dont les salariés bénéficient dans le travail. Les pauses de courte durée peuvent être l’occa- sion de récupération ou de partage de moments de convivialité, qui restaurent la capacité de travail et favorisent la qualité des relations sociales dans l’entreprise. Les pauses favorisent également les échanges informels sur le travail."
      },
      {
        name: "L'utilisation et le développement des compétences",
        data: initData, 
        subTitle: "Les salariés peuvent-ils utiliser leurs compétences professionnelles et en développer de nouvelles ?", 
        details: "Il s’agit ici de déterminer si les tâches et missions confiées aux salariés leur permettent, d’une part, de mettre pleinement en œuvre leurs compétences et, d’autre part, leur donnent l’occasion d’en déve- lopper d’autres. Ne pas avoir la possibilité d’utiliser dans le travail ses connaissances et ses savoir- faire, ou encore ne pas avoir de perspective d’accroître son potentiel (par des formations, par exemple) place les salariés dans une situation de dévalori- sation progressive de leur qualification profession- nelle. Elle peut engendrer une dépréciation de soi et de ses capacités, et conduire à un désengage- ment dans le travail."
      }
    ]
  },
  {
    name: "Rapports sociaux au travail",
    subTopics: [
      { 
        name: "Le soutien de la part des collègues", 
        data: initData, 
        subTitle: "Les relations entre collègues sont-elles bonnes (confiance, entraide, convivialité au sein des équipes) ?", 
        details: "La qualité des relations avec les collègues et l’in- tégration dans un collectif de travail influent sur le bien-être et la santé au travail. Les possibilités d’entraide et de coopération facilitent l’accomplis- sement des tâches. Elles sont en particulier une res- source pour les salariés lorsqu’ils se trouvent face à des situations imprévues, complexes ou difficiles à gérer. Selon les contextes, le collectif de travail peut jouer un rôle d’intégration sociale, en favori- sant les solidarités et les moments de convivialité. À l’inverse, il peut être le cadre de tensions, de rivali- tés ou de concurrence, devenant dès lors un facteur de risque pour la santé mentale des salariés."
      },
      {
        name: "Le soutien de la part des supérieurs hiérarchiques",
        data: initData, 
        subTitle: "Les salariés reçoivent-ils un soutien de la part de l’encadrement ?", 
        details: "Au-delà de la qualité des relations entretenues avec la hiérarchie, il est question ici de la disponibilité, des capacités d’écoute et d’action dont fait preuve l’encadrement face aux sollicitations des salariés (par exemple, discuter d’un problème technique, régler des difficultés imprévues, arbitrer des inté- rêts divergents, modérer des conflits...). L’absence de soutien d’un supérieur peut créer un sentiment d’isolement, de frustration, de lassitude ou d’injus- tice chez les salariés."
      },
      { 
        name: "Les violences internes au travail", 
        data: initData, 
        subTitle: "Règne-t-il un climat de courtoisie et de respect mutuel entre les salariés de l’entreprise (absence de propos ou d’attitudes blessantes, discriminatoires...) ?", 
        details: "La violence interne est relative à l’ensemble des attitudes, comportements, actes hostiles qui se manifestent sur le lieu de travail entre les salariés de l’entreprise, quels que soient leurs niveaux hié- rarchiques. Il peut s’agir d’atteintes dégradantes, de comportements méprisants, discriminatoires, voire de harcèlement moral ou sexuel. Cette vio- lence, quelle qu’en soit sa forme, est symptoma- tique d’une dégradation des relations sociales dans l’entreprise. Elle peut porter atteinte à la santé phy- sique et mentale des salariés."
      },
      { 
        name: "La reconnaissance dans le travail", 
        data: initData , 
        subTitle: "Les salariés reçoivent-ils des marques de reconnaissance de leur travail de la part de l’entreprise ?", 
        details: "La reconnaissance de la valeur du travail réalisé, des compétences ou encore des performances est essentielle à la construction d’une identité profes- sionnelle positive. Cette reconnaissance peut se manifester au travers de la rémunération, du statut, des perspectives de carrière proposées par l’entre- prise. Elle peut être d’ordre plus pratique (attribu- tion de moyens pour réaliser son travail dans de bonnes conditions...) ou symbolique (éloges, dis- tinction...). Le manque de reconnaissance du travail par l’entreprise peut entraîner une perte d’estime de soi et conduire à un désinvestissement du salarié dans son activité professionnelle. Il a également des effets sur sa santé mentale et physique."}
    ]
  },
  {
    name: "Conflits de valeurs",
    subTopics: [
      { 
        name: "La qualité empêchée", 
        data: initData, 
        subTitle: "Les salariés considèrent-ils qu’ils font un travail de qualité ?", 
        details: "Pouvoir tirer de la fierté du travail qu’on réalise, du soin qu’on peut y apporter... contribue à une image valorisante de son activité professionnelle et de sa contribution personnelle. A contrario, être contraint de faire un travail bâclé ou de qualité médiocre, faute de moyens ou de délais suffisants, a des effets sur la santé mentale des salariés et sur le climat de travail. Il en est de même lorsque l’on est amené à faire un travail qui est en désaccord avec ses valeurs professionnelles."
      },
      { 
        name: "L'utilité du travail", 
        data: initData , 
        subTitle: "Les salariés estiment-ils en général que leur travail est reconnu comme utile ?", 
        details: "L’utilité du travail fait référence à la contribution significative du salarié à la mission qui lui est confiée par l’entreprise. Généralement, les salariés jugent leur travail utile lorsqu’il sert concrètement les résul- tats de l’entreprise ou bénéficie à d’autres acteurs (clients, usagers, patients...). La reconnaissance de cette contribution est un élément important du jugement d’utilité porté par les salariés sur leur propre travail."
      }
    ]
  },
  {
    name: "Insécurité de l'emploi et du travail",
    subTopics: [
      {
        name: "L'insécurité/la sécurité socio-économique",
        data: initData, 
        subTitle: "Les salariés sont-ils confrontés à des incertitudes quant au maintien de leur activité dans les prochains mois ?", 
        details: "Ces incertitudes peuvent provoquer la peur de perdre son emploi, la crainte de voir baisser son revenu et de ne pas bénéficier d’un déroulement « favorable » de sa carrière (absence de promotion, temps partiel subi...)."
      },
      { 
        name: "La conduite du changement", 
        data: initData, 
        subTitle: "Les changements sont-ils suffisamment anticipés, accompagnés, et clairement expliqués aux salariés ?", 
        details: "De manière générale, les situations de changement (stratégique, organisationnel, technologique...) sont génératrices de risques de surcharge (temps d’ap- prentissage et d’assimilation des changements), de remise en cause des compétences et d’atteinte au sens donné au travail."
      }
    ]
  }
]

export default class ContentSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      accordionStates: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0, 0],
        [0, 0],
        [0, 0]
      ],
      saved: true,
      justsaved: false,
      displaySave: true,
      topics: [
        {
          name: "Intensité et complexité du travail",
          subTopics: [
            { 
              name: "Les contraintes de rythmes de travail",
              data: initData,
              subTitle: "Les salariés sont-ils soumis à des contraintes de rythmes élevés ?",
              details: "Le rythme de travail peut être imposé par des contraintes internes à l’entreprise (cadence d’une machine, normes de production, dépendance vis- à-vis du travail de collègues en amont ou en aval...) ou externes (demande des clients nécessitant une réponse immédiate...). Ces contraintes de rythmes, lorsqu’elles sont élevées, exigent des salariés une réactivité et une disponibilité quasi-permanente qui sont sources de stress."},
            { 
              name: "La précision des objectifs de travail",
              data: initData,
              subTitle: "Les objectifs des salariés sont-ils clairement définis ?",
              details: "Les objectifs de travail fixés par l’entreprise guident les salariés dans la réalisation de leurs tâches. Ils peuvent être quantitatifs (par exemple, le nombre de ventes à réaliser dans le mois) ou qualitatifs (par exemple, donner des réponses satisfaisantes aux demandes des clients). Lorsque ces objectifs sont imprécis, flous, voire inexistants, les salariés manquent de repères sur ce qu’on attend réel- lement de leur travail. Dès lors, des décalages peuvent se créer entre les objectifs que les sala- riés peuvent eux-mêmes se fixer et les objectifs de l’entreprise."
            },
            {
              name:
                "L'adéquation des objectifs de travail avec les moyens alloués et les responsabilités exercées",
              data: initData,
              subTitle: "Les objectifs fixés sont-ils compatibles avec les moyens et responsabilités alloués aux salariés pour les atteindre?",
              details: "Les objectifs de travail peuvent être clairement défi- nis sans toutefois s’avérer réalistes au regard des exigences du travail et des ressources mises à dis- position des salariés (moyens humains, techniques, responsabilités effectives...). Lorsque les objectifs ne sont pas en adéquation avec les moyens, les risques sont plus élevés de voir les salariés en dif- ficulté (fatigue, saturation, débordement, baisse de performance) et insatisfaits."
            },
            {
              name: "La compatibilité des instructions de travail entre elles",
              data: initData,
              subTitle: "Les salariés reçoivent-ils des instructions, des ordres ou demandes qui peuvent être contradictoires entre eux ?",
              details: "Les contradictions peuvent provenir de consignes différentes données par les uns et les autres (enca- drement/fonctionnel, direction de l’entreprise/ clientèle...). Elles peuvent également être dues à des instructions, ordres, demandes antagonistes : par exemple, faire de la qualité rapidement, satis- faire les attentes personnalisées des clients dans un temps préétabli... La nécessité d’arbitrer entre ces contradictions complique le travail et constitue une charge mentale supplémentaire pour les salariés."
            },
            {
              name: "La modalité d'organisation de la polyvalence",
              data: initData,
              subTitle: "Les salariés sont-ils amenés à changer de tâches, de postes ou de fonctions à l’improviste pour répondre aux contraintes du moment ?",
              details: "La polyvalence est une forme d’organisation du tra- vail qui consiste à affecter plusieurs activités diffé- rentes à un salarié. Elle peut devenir problématique lorsqu’elle est subie, c’est-à-dire quand les rempla- cements se font au « pied levé », dans l’urgence et sans préparation. Elle est d’autant plus pénalisante quand les salariés ne sont pas formés pour exercer ces différentes activités. Au-delà des risques d’erreur ou d’accident, la polyvalence subie peut être considérée comme dévalorisante par les sala- riés et constituer une perte de sens du métier."
            },
            {
              name: "Les interruptions perturbatrices au cours du travail",
              data: initData,
              subTitle:"Les salariés sont-ils fréquemment interrompus au cours de leur travail par des tâches non prévues ?",
              details:"Les interruptions inopinées obligent les salariés à mettre entre parenthèses leur tâche principale pour en traiter d’autre(s). Elles « morcèlent » le travail, perturbent son bon déroulement et sont source de charge mentale. Elles peuvent générer des erreurs mais aussi être mal vécues dans la mesure où les salariés ont l’impression de faire un travail de mauvaise qualité et de ne jamais pouvoir terminer ce qu’ils ont entrepris."
            },
            {
              name:
                "Les niveaux d'attention et de vigilance requis dans le travail",
              data: initData,
              subTitle: "Les salariés exercent-ils des activités qui nécessitent une attention soutenue ou une vigilance permanente ?",
              details: "Maintenir un niveau élevé d’attention ou rester vigi- lant pendant de longues périodes est particulière- ment difficile pour l’organisme. Selon les tâches, par exemple de surveillance ou de contrôle, cela peut occasionner chez les salariés de la fatigue, des baisses d’attention, mais aussi la crainte de com- mettre des erreurs ou des oublis dans leur travail."
            }
          ]
        },
        {
          name: "Horaires de travail",
          subTopics: [
            { 
              name: "La durée hebdomadaire du travail",
              data: initData,
              subTitle: "Arrive-t-il que les salariés travaillent plus de 45 heures par semaine ?",
              details: "Au-delà d’une certaine limite, la durée hebdoma- daire du travail s’avère dommageable pour la santé, quelle que soit la satisfaction qu’éprouve le salarié dans son travail. D’après les connaissances scien- tifiques actuelles, il serait raisonnable de ne pas dépasser 45 heures de travail par semaine."
            },
            { 
              name: "Le travail en horaires atypiques", 
              data: initData, 
              subTitle: "Les salariés sont-ils soumis à des horaires de nuit, alternants ou décalés ?", 
              details: "Certains types d’horaires de travail ont des réper- cussions sur la santé physique et mentale des sa- lariés. C’est par exemple les cas du travail de nuit ou du travail en horaires alternants (3x8, 2x12...), des horaires décalés (particulièrement le soir et le week-end), des horaires fractionnés (11h-15h puis 18h-21h, par exemple) ou du travail sur appel (ab- sence d’horaire pré-établi)."
            },
            {
              name:
                "L'extension de la disponibilité en dehors des horaires de travail",
              data: initData, 
              subTitle: "Les salariés sont-ils contactés en dehors des horaires de travail pour des raisons professionnelles ?", 
              details: "La disponibilité demandée aux salariés peut s’éten- dre au-delà de leurs horaires de travail (week-end, congés...). Elle limite les possibilités de récupéra- tion physique et mentale. De plus, elle empiète sur la vie personnelle des salariés."
            },
            {
              name:
                "La prévisibilité des horaires de travail et anticipation de leur changement",
              data: initData, 
              subTitle: "Les salariés connaissent-ils suffisamment à l’avance leurs horaires de travail ou les changements éventuels de leur planning de travail ?", 
              details: "L’incertitude envers les horaires de travail à effec- tuer, le caractère inopiné des changements dans les plannings horaires... ne facilitent pas l’orga- nisation de la vie personnelle. Ils rendent difficile toute prévision des activités extraprofessionnelles et obligent à des adaptations souvent coûteuses pour les salariés, par exemple s’ils ont à charge de jeunes enfants."
            },
            {
              name:
                "La conciliation entre vie professionnelle et vie personnelle",
              data: initData, 
              subTitle: "L’entreprise permet-elle aux salariés de concilier vie professionnelle et vie personnelle ?", 
              details: "La conciliation peut être facilitée dans l’entreprise par la négociation d’accords, par exemple en ma- tière d’aménagement des horaires de travail, ou par la possibilité d’arrangements informels accordés selon les besoins des salariés. Ces commodités peuvent les aider à remplir des obligations extraprofessionnelles (familiales, médi- cales, administratives...)."
            }
          ]
        },
        {
          name: "Exigences émotionnelles",
          subTopics: [
            { 
              name: "Les tensions avec le public", 
              data: initData, 
              subTitle: 
              "Les salariés sont-ils confrontés à des situations de tension (avec des clients, usagers, patients...) dont ils se plaignent ?", 
              details: "La mauvaise qualité de service, des délais d’attente jugés trop longs... peuvent susciter le mécontente- ment du public et créer des tensions avec les sala- riés (altercations verbales et/ou physiques...). Ces heurts sont susceptibles d’avoir des répercussions sur le travail des salariés (interruption ponctuelle de l’activité, augmentation des erreurs, démobilisation professionnelle, dégradation du climat de travail, des relations professionnelles...)."
            },
            {
              name: "La confrontation à la souffrance d'autrui",
              data: initData, 
              subTitle: "Dans le cadre de leur activité professionnelle, les salariés sont-ils amenés à devoir traiter la situation de personnes en souffrance (physique, psychologique ou sociale) ?", 
              details: "Toute confrontation à la souffrance de tiers est coû- teuse psychiquement pour les salariés. Certaines situations de travail peuvent en accentuer la charge émotionnelle : manque de moyens pour venir en aide aux personnes en difficulté, absence d’issue face à leurs problèmes... Cela peut profondément ébranler les salariés et réduire leur investissement dans leur travail."
            },
            {
              name: "La maitrise des émotions (faire bonne figure)",
              data: initData, 
              subTitle: "Dans leur travail, les salariés se doivent-ils de « faire bonne figure » en toutes circonstances ?", 
              details: "Devoir adopter une attitude bienveillante et dis- ponible envers les autres constitue une exigence à laquelle les salariés peuvent être contraints, par exemple dans certains métiers en contact avec le public. Plus généralement, il peut aussi leur être demandé de manifester de l’enthousiasme et de l’allant pour leur travail vis-à-vis de l’entourage pro- fessionnel. Cela peut avoir des conséquences sur la santé mentale des salariés lorsqu’ils sont amenés à « prendre sur eux » pour ne pas montrer leurs véri- tables émotions ou bien leurs ressentis du moment."
            }
          ]
        },
        {
          name: "Autonomie au travail",
          subTopics: [
            { 
              name: "L'autonomie dans la tâche", 
              data: initData, 
              subTitle: "Les salariés ont-ils des marges de manœuvre dans la manière de réaliser leur travail dès lors que les objectifs sont atteints ?", 
              details: "Les marges de manœuvre dans le travail relèvent des possibilités d’action dont les salariés disposent pour choisir la manière d’organiser et de réaliser leur travail ainsi que les procédés employés (choix des gestes, des techniques, des outils...). Plus ces marges sont grandes, plus l’autonomie des sala- riés dans leur travail peut être importante. Sans ou avec peu d’autonomie, les salariés sont contraints dans l’exécution de leur travail, sans possibilité d’en influencer le déroulement et de prendre des initia- tives. Les salariés peuvent dès lors se désinvestir d’un travail dénué d’intérêt."
            },
            { 
              name: "L'autonomie temporelle", 
              data: initData, 
              subTitle: "Les salariés peuvent-ils interrompre momentanément leur travail quand ils en ressentent le besoin ?", 
              details: "La possibilité de choisir les moments de pause donne également une indication du niveau d’auto- nomie dont les salariés bénéficient dans le travail. Les pauses de courte durée peuvent être l’occa- sion de récupération ou de partage de moments de convivialité, qui restaurent la capacité de travail et favorisent la qualité des relations sociales dans l’entreprise. Les pauses favorisent également les échanges informels sur le travail."
            },
            {
              name: "L'utilisation et le développement des compétences",
              data: initData, 
              subTitle: "Les salariés peuvent-ils utiliser leurs compétences professionnelles et en développer de nouvelles ?", 
              details: "Il s’agit ici de déterminer si les tâches et missions confiées aux salariés leur permettent, d’une part, de mettre pleinement en œuvre leurs compétences et, d’autre part, leur donnent l’occasion d’en déve- lopper d’autres. Ne pas avoir la possibilité d’utiliser dans le travail ses connaissances et ses savoir- faire, ou encore ne pas avoir de perspective d’accroître son potentiel (par des formations, par exemple) place les salariés dans une situation de dévalori- sation progressive de leur qualification profession- nelle. Elle peut engendrer une dépréciation de soi et de ses capacités, et conduire à un désengage- ment dans le travail."
            }
          ]
        },
        {
          name: "Rapports sociaux au travail",
          subTopics: [
            { 
              name: "Le soutien de la part des collègues", 
              data: initData, 
              subTitle: "Les relations entre collègues sont-elles bonnes (confiance, entraide, convivialité au sein des équipes) ?", 
              details: "La qualité des relations avec les collègues et l’in- tégration dans un collectif de travail influent sur le bien-être et la santé au travail. Les possibilités d’entraide et de coopération facilitent l’accomplis- sement des tâches. Elles sont en particulier une res- source pour les salariés lorsqu’ils se trouvent face à des situations imprévues, complexes ou difficiles à gérer. Selon les contextes, le collectif de travail peut jouer un rôle d’intégration sociale, en favori- sant les solidarités et les moments de convivialité. À l’inverse, il peut être le cadre de tensions, de rivali- tés ou de concurrence, devenant dès lors un facteur de risque pour la santé mentale des salariés."
            },
            {
              name: "Le soutien de la part des supérieurs hiérarchiques",
              data: initData, 
              subTitle: "Les salariés reçoivent-ils un soutien de la part de l’encadrement ?", 
              details: "Au-delà de la qualité des relations entretenues avec la hiérarchie, il est question ici de la disponibilité, des capacités d’écoute et d’action dont fait preuve l’encadrement face aux sollicitations des salariés (par exemple, discuter d’un problème technique, régler des difficultés imprévues, arbitrer des inté- rêts divergents, modérer des conflits...). L’absence de soutien d’un supérieur peut créer un sentiment d’isolement, de frustration, de lassitude ou d’injus- tice chez les salariés."
            },
            { 
              name: "Les violences internes au travail", 
              data: initData, 
              subTitle: "Règne-t-il un climat de courtoisie et de respect mutuel entre les salariés de l’entreprise (absence de propos ou d’attitudes blessantes, discriminatoires...) ?", 
              details: "La violence interne est relative à l’ensemble des attitudes, comportements, actes hostiles qui se manifestent sur le lieu de travail entre les salariés de l’entreprise, quels que soient leurs niveaux hié- rarchiques. Il peut s’agir d’atteintes dégradantes, de comportements méprisants, discriminatoires, voire de harcèlement moral ou sexuel. Cette vio- lence, quelle qu’en soit sa forme, est symptoma- tique d’une dégradation des relations sociales dans l’entreprise. Elle peut porter atteinte à la santé phy- sique et mentale des salariés."
            },
            { 
              name: "La reconnaissance dans le travail", 
              data: initData , 
              subTitle: "Les salariés reçoivent-ils des marques de reconnaissance de leur travail de la part de l’entreprise ?", 
              details: "La reconnaissance de la valeur du travail réalisé, des compétences ou encore des performances est essentielle à la construction d’une identité profes- sionnelle positive. Cette reconnaissance peut se manifester au travers de la rémunération, du statut, des perspectives de carrière proposées par l’entre- prise. Elle peut être d’ordre plus pratique (attribu- tion de moyens pour réaliser son travail dans de bonnes conditions...) ou symbolique (éloges, dis- tinction...). Le manque de reconnaissance du travail par l’entreprise peut entraîner une perte d’estime de soi et conduire à un désinvestissement du salarié dans son activité professionnelle. Il a également des effets sur sa santé mentale et physique."}
          ]
        },
        {
          name: "Conflits de valeurs",
          subTopics: [
            { 
              name: "La qualité empêchée", 
              data: initData, 
              subTitle: "Les salariés considèrent-ils qu’ils font un travail de qualité ?", 
              details: "Pouvoir tirer de la fierté du travail qu’on réalise, du soin qu’on peut y apporter... contribue à une image valorisante de son activité professionnelle et de sa contribution personnelle. A contrario, être contraint de faire un travail bâclé ou de qualité médiocre, faute de moyens ou de délais suffisants, a des effets sur la santé mentale des salariés et sur le climat de travail. Il en est de même lorsque l’on est amené à faire un travail qui est en désaccord avec ses valeurs professionnelles."
            },
            { 
              name: "L'utilité du travail", 
              data: initData , 
              subTitle: "Les salariés estiment-ils en général que leur travail est reconnu comme utile ?", 
              details: "L’utilité du travail fait référence à la contribution significative du salarié à la mission qui lui est confiée par l’entreprise. Généralement, les salariés jugent leur travail utile lorsqu’il sert concrètement les résul- tats de l’entreprise ou bénéficie à d’autres acteurs (clients, usagers, patients...). La reconnaissance de cette contribution est un élément important du jugement d’utilité porté par les salariés sur leur propre travail."
            }
          ]
        },
        {
          name: "Insécurité de l'emploi et du travail",
          subTopics: [
            {
              name: "L'insécurité/la sécurité socio-économique",
              data: initData, 
              subTitle: "Les salariés sont-ils confrontés à des incertitudes quant au maintien de leur activité dans les prochains mois ?", 
              details: "Ces incertitudes peuvent provoquer la peur de perdre son emploi, la crainte de voir baisser son revenu et de ne pas bénéficier d’un déroulement « favorable » de sa carrière (absence de promotion, temps partiel subi...)."
            },
            { 
              name: "La conduite du changement", 
              data: initData, 
              subTitle: "Les changements sont-ils suffisamment anticipés, accompagnés, et clairement expliqués aux salariés ?", 
              details: "De manière générale, les situations de changement (stratégique, organisationnel, technologique...) sont génératrices de risques de surcharge (temps d’ap- prentissage et d’assimilation des changements), de remise en cause des compétences et d’atteinte au sens donné au travail."
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:3001/api/companies/${this.props.id}`)
      .then(r => {
        this.setState({ sites: r.data.sites, topics: r.data.sites[this.props.siteIndex].topics });
        console.log(r.data)
      });
  }

  ChangeState = (i, j) => {
    var { accordionStates } = this.state;
    accordionStates[i][j] = (accordionStates[i][j] + 1) % 2;
    this.setState({ accordionStates });
  };

  handleItemClick = (e, i) => {
    this.setState({ activeItem: i });
  };

  change = (i, j, name, value) => {
    var { topics } = this.state;
    topics[i].subTopics[j].data = {
      ...topics[i].subTopics[j].data,
      [name]: value
    };
    this.setState({ saved: false, topics });
  };

  save = () => {
    const siteIndex = this.props.siteIndex
    const { sites, topics } = this.state;
    sites[this.props.siteIndex].topics = topics
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(`http://localhost:3001/api/companies/save/${this.props.id}`, {
        sites
      })
      .then(r => {
        this.setState({
          topics: r.data.sites[this.props.siteIndex].topics,
          justsaved: true,
          saved: true,
          displaySave: false
        });
      });
  };

  next = () => this.setState({ activeItem: this.state.activeItem + 1 });

  previous = () => this.setState({ activeItem: this.state.activeItem - 1 });

  render() {
    const {
      activeItem,
      accordionStates,
      saved,
      topics,
      justsaved,
      displaySave
    } = this.state;

    return (
      <Container
        style={{ width: "70%", minWidth: "900px", margin: "20px auto" }}
      >
        <div>
          <Menu attached="top" tabular>
            {topics.map((e, i) => (
              <Menu.Item
                key={e.name}
                active={activeItem === i}
                onClick={e => this.handleItemClick(e, i)}
                style={{ width: "14.28%", textAlign: "center" }}
              >
                {e.name}
              </Menu.Item>
            ))}
          </Menu>
          <Segment
            attached="bottom"
            style={{ height: "60vh", overflowY: "scroll" }}
          >
            <AccordionExampleFluid
              topics={topics}
              index={activeItem}
              ChangeState={this.ChangeState}
              accordionStates={accordionStates}
              change={this.change}
              form={form}
            />
          </Segment>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            icon
            labelPosition="left"
            style={{
              height: "7vh",
              width: "15%",
              margin: "10px",
              textAlign: "center"
            }}
            disabled={activeItem === 0}
            onClick={this.previous}
          >
            <Icon name="left arrow" />
            Précedent
          </Button>
          <Popup
            content="Vos modifications sont déjà enregistrées."
            disabled={!saved}
            trigger={
              <Transition
                visible={displaySave}
                animation="scale"
                duration={500}
              >
                <Button
                  icon
                  positive
                  labelPosition="right"
                  style={{
                    height: "7vh",
                    width: "15%",
                    margin: "10px",
                    textAlign: "center"
                  }}
                  onClick={this.save}
                >
                  Enregistrer
                  <Icon name="save outline" />
                </Button>
              </Transition>
            }
          />

          <Transition
            visible={justsaved}
            animation="scale"
            duration={1000}
            onShow={() => this.setState({ justsaved: false })}
            onHide={() => this.setState({ displaySave: true })}
          >
            <Message
              positive
              style={{ height: "7vh", margin: "10px", textAlign: "center" }}
            >
              <Message.Header>
                Vos modifications ont bien été enregistrées.
              </Message.Header>
            </Message>
          </Transition>

          {activeItem < struct.length - 1 ? (
            <Button
              icon
              labelPosition="right"
              style={{
                height: "7vh",
                width: "15%",
                margin: "10px",
                textAlign: "center"
              }}
              onClick={this.next}
            >
              Suivant
              <Icon name="right arrow" />
            </Button>
          ) : (
            <>
              {localStorage.getItem("level") === 0 ? (
                <Link
                  to="/thankyou"
                  style={{
                    height: "7vh",
                    width: "15%",
                    margin: "10px",
                    textAlign: "center"
                  }}
                >
                  <Button icon labelPosition="right">
                    Terminer
                    <Icon name="check" />
                  </Button>
                </Link>
              ) : (
                <Button
                  icon
                  disabled
                  labelPosition="right"
                  style={{
                    height: "7vh",
                    width: "15%",
                    margin: "10px",
                    textAlign: "center"
                  }}
                  onClick={this.next}
                >
                  Suivant
                  <Icon name="right arrow" />
                </Button>
              )}
            </>
          )}
        </div>
      </Container>
    );
  }
}
