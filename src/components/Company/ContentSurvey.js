import React, { Component } from "react";
import {
  Button,
  Segment,
  Container,
  Icon,
  Form,
  Modal,
  Menu,
  Header,
  Popup,
  Message,
  Transition
} from "semantic-ui-react";
import ExportContent from "../Admin/ExportContainer";

import { ToastContainer, toast } from "react-toastify";

import { url } from "../../config";

import axios from "axios";

import { BrowserRouter, Link } from "react-router-dom";

import AccordionExampleFluid from "./AccordionTheme";

const struct = [
  {
    theme: "Intensité et complexité du travail",
    sub_themes: [
      "Contraintes de rythmes",
      "Précision des objectifs",
      "Adéquation des objectifs avec les moyens et les responsabilités de chacun",
      "La compatibilité des instructions entre elles",
      "Modalités d'organisation de la polyvalence",
      "Interruptions perturbatrices",
      "Niveaux d'attention et de vigilance requis"
    ]
  },
  {
    theme: "Temps de travail",
    sub_themes: [
      "Durée hebdomadaire du travail",
      "Travail en horaires atypiques",
      "Extension de la disponibilité en dehors des horaires de travail",
      "Prévisibilité des horaires de travail et anticipation de leur changement",
      "Conciliation entre vie professionnelle et vie personnelle"
    ]
  },
  {
    theme: "Exigences émotionnelles",
    sub_themes: [
      "Tensions avec le public",
      "Confrontation à la souffrance d'autrui",
      "Maitrise des émotions"
    ]
  },
  {
    theme: "Autonomie au travail",
    sub_themes: [
      "Autonomie dans la tâche",
      "Autonomie temporelle",
      "Utilisation et développement des compétences"
    ]
  },
  {
    theme: "Rapports sociaux au travail",
    sub_themes: [
      "Soutien de la part des collègues",
      "Soutien de la part de la hiérarchie",
      "Violences internes au travail",
      "Reconnaissance du travail"
    ]
  },
  {
    theme: "Conflits de valeurs",
    sub_themes: ["Qualité empêchée", "Utilité du travail"]
  },
  {
    theme: "Insécurité de l'emploi et du travail",
    sub_themes: [
      "Insécuritéde la situation de travail",
      "Conduite du changement"
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
        name: "Contraintes de rythmes",
        data: initData,
        subTitle:
          "Les salariés sont-ils soumis à des contraintes de rythme élevées ?",
        details:
          "Le rythme de travail peut être imposé par des contraintes internes à l’organisation (normes de performance, exigences des interlocuteurs en interne…) ou externes (demande des clients nécessitant une réponse immédiate…)."
      },
      {
        name: "Précision des objectifs ",
        data: initData,
        subTitle: "Les objectifs des salariés sont-ils clairement déﬁnis ?",
        details:
          "Les objectifs fixés doivent être clairs et réalistes pour permettre aux salariés de disposer de critères d’atteinte, mesurables quantitativement et qualitativement (par opposition avec des objectifs ﬂous, irréalistes, voire inexistants).  "
      },
      {
        name:
          "Adéquation des objectifs avec les moyens et les responsabilités de chacun",
        data: initData,
        subTitle:
          "Les objectifs ﬁxés sont-ils compatibles avec les moyens et responsabilités alloués aux salariés pour les atteindre ?",
        details: `Il s’agit ici d’évaluer si les objectifs définis sont compatibles avec les marges de manœuvre dont disposent les salariés et la réalité quotidienne du travail. 
          Les objectifs peuvent être clairement déﬁnis mais irréalistes au regard des exigences du travail et des ressources matérielles, techniques et humaines mises à disposition des salariés. 
          `
      },
      {
        name: "La compatibilité des instructions entre elles",
        data: initData,
        subTitle:
          "Les salariés reçoivent-ils des instructions ou demandes contradictoires ?",
        details:
          "Les demandes contradictoires peuvent provenir de sollicitations antagonistes émanant des différents acteurs (hiérarchique/fonctionnel, direction/clientèle…), par exemple : combiner qualité sans défaut et rapidité d’exécution. "
      },
      {
        name: "Modalités d’organisation de la polyvalence",
        data: initData,
        subTitle:
          "Les salariés sont-ils amenés à changer de tâches, de postes ou de fonctions à l’improviste pour répondre aux contraintes du moment ?",
        details: `La polyvalence est une forme d’organisation du travail qui consiste à affecter plusieurs activités différentes à un salarié. 
          Elle peut devenir problématique lorsqu’elle est subie, c’est-à-dire quand sa nécessité n’est pas comprise/accompagnée ou s’exerce au détriment de la qualité.
          `
      },
      {
        name: "Interruptions perturbatrices",
        data: initData,
        subTitle:
          "Les salariés sont-ils fréquemment interrompus par des tâches non prévues ?",
        details:
          "Les interruptions imprévues conduisent les salariés à suspendre régulièrement leur travail en cours, les obligeant ensuite à se reconcentrer sur leur tâche de départ. "
      },
      {
        name: "Niveaux d’attention et de vigilance requis",
        data: initData,
        subTitle:
          "Les salariés exercent-ils des activités qui nécessitent une attention soutenue ou une vigilance permanente ?",
        details:
          "Un niveau élevé d’attention ou de vigilance maintenu pendant de longues périodes peut s’avérer d’autant plus difﬁcile (risque de fatigue mentale pouvant conduire à des erreurs) lorsqu’il est impossible d’organiser des temps de pause. "
      }
    ]
  },
  {
    name: "Temps de travail",
    subTopics: [
      {
        name: "Durée hebdomadaire du travail",
        data: initData,
        subTitle:
          "Les salariés travaillent-ils de manière excessive sans période de moindre charge ?",
        details:
          "Les horaires de travail peuvent être excessifs de manière continue."
      },
      {
        name: "Travail en horaires atypiques",
        data: initData,
        subTitle:
          "Les salariés sont-ils soumis à des horaires de nuit, alternants ou décalés ?",
        details:
          "Il s’agit par exemple du travail le soir, le week-end, de nuit ou encore du travail posté."
      },
      {
        name: "Extension de la disponibilité en dehors des horaires de travail",
        data: initData,
        subTitle:
          "Les salariés sont-ils sollicités en dehors des horaires de travail pour des raisons professionnelles ?",
        details:
          "La disponibilité attendue des salariés peut s’étendre au-delà de leurs horaires habituels de travail (soirs, week-end ou congés…)."
      },
      {
        name:
          "Prévisibilité des horaires de travail et l’anticipation de leur changement",
        data: initData,
        subTitle:
          "Les salariés peuvent-ils anticiper sufﬁsamment à l’avance leurs horaires de travail ?",
        details:
          "L’incertitude sur les horaires de travail à effectuer complique l’organisation du travail et de la vie personnelle."
      },
      {
        name: "Conciliation entre vie professionnelle et vie personnelle",
        data: initData,
        subTitle:
          "L’organisation du travail permet-elle aux salariés de concilier vie professionnelle et vie personnelle ?",
        details:
          "L’équilibre des temps de vie peut être facilité par la négociation d’accords individuels (aménagements des horaires, possibilité d’arrangements informels) et collectifs (charte d’utilisation des outils numériques, droit à la déconnexion)."
      }
    ]
  },
  {
    name: "Exigences émotionnelles",
    subTopics: [
      {
        name: "Tensions avec le public",
        data: initData,
        subTitle:
          "Les salariés sont-ils confrontés à des situations de tension avec des tiers dont ils se plaignent ?",
        details:
          "La perception d’une mauvaise qualité de service, peut susciter le mécontentement du public, des usagers, des clients, des patients… et exposer les salariés à des tensions (violences verbales et/ou physiques…)."
      },
      {
        name: "Confrontation à la souffrance d'autrui",
        data: initData,
        subTitle:
          "Les salariés sont-ils amenés à devoir traiter des situations de personnes en souffrance (physique, psychologique ou sociale) ?",
        details:
          "Les salariés peuvent devoir faire face régulièrement à des situations de mal-être de la part de tiers (public, usagers, clients, patients…) qu’ils ont à gérer."
      },
      {
        name: "Maîtrise des émotions",
        data: initData,
        subTitle:
          "Les salariés doivent-ils  contrôler leurs émotions pour « faire bonne ﬁgure » en toutes circonstances ? ",
        details:
          "Les salariés en contact avec des tiers (public, usagers, clients, patients…) peuvent être amenés à régulièrement « prendre sur eux » pour ne pas montrer leurs véritables émotions ou ressentis."
      }
    ]
  },
  {
    name: "Autonomie au travail",
    subTopics: [
      {
        name: "Autonomie dans la tâche",
        data: initData,
        subTitle:
          "Les salariés ont-ils suffisamment de marge de manœuvre pour réaliser leur travail ?",
        details:
          "L’autonomie permet aux salariés de bénéficier d’une certaine liberté d’action et d’organisation dans la réalisation de leur activité de travail."
      },
      {
        name: "Autonomie temporelle",
        data: initData,
        subTitle:
          "Les salariés peuvent-ils interrompre momentanément leur travail quand ils en ressentent le besoin",
        details: `La possibilité de choisir ses moments de pause est un indicateur du niveau d’autonomie dont les salariés bénéﬁcient. 
          Les pauses peuvent être l’occasion de temps de récupération, de partage sur le travail et/ou de convivialité. 
          `
      },
      {
        name: "Utilisation et développement des compétences",
        data: initData,
        subTitle:
          "Les salariés peuvent-ils utiliser leurs compétences professionnelles et en développer de nouvelles ?",
        details:
          "Il s’agit de déterminer si les missions conﬁées permettent aux salariés de mettre pleinement en œuvre leurs compétences (savoir-faire, savoir-être) et leur donnent l’occasion d’en développer de nouvelles. "
      }
    ]
  },
  {
    name: "Rapports sociaux au travail",
    subTopics: [
      {
        name: "Soutien de la part des collègues",
        data: initData,
        subTitle: "Les relations entre collègues sont-elles bonnes ?",
        details:
          "La qualité des relations de travail entre collègues et l’intégration dans un collectif (conﬁance, entraide, convivialité au sein des équipes) inﬂuent sur le bien-être et l’efficacité individuelle et collective."
      },
      {
        name: "Soutien de la part de la hiérarchie",
        data: initData,
        subTitle: "Les salariés reçoivent-ils du soutien managérial ?",
        details:
          "Il est question ici de la disponibilité, des capacités d’écoute et d’action de la hiérarchie face aux besoins/demandes des salariés (discuter d’un problème technique, régler des difﬁcultés imprévues, arbitrer, réguler les conﬂits…)."
      },
      {
        name: "Violence interne au travail",
        data: initData,
        subTitle:
          "Règne-t-il un climat de respect et de courtoisie mutuels entre les salariés ?",
        details:
          "La violence interne est relative à l’ensemble des incivilités, comportements, propos, agissements hostiles ou irrespectueux (sexisme, discrimination…) entre collègues et/ou avec la hiérarchie."
      },
      {
        name: "Reconnaissance du travail",
        data: initData,
        subTitle: "Les salariés reçoivent-ils des marques de reconnaissance ?",
        details:
          "La reconnaissance des efforts et du résultat peut être symbolique (félicitations, éloges, feedback constructifs, soutien, remerciements…), de carrière (évolutions professionnelles, développement des compétences, moyens mis à disposition pour réaliser le travail…), financière (primes, augmentations, promotions…)."
      }
    ]
  },
  {
    name: "Conflits de valeurs",
    subTopics: [
      {
        name: "Qualité empêchée",
        data: initData,
        subTitle:
          "Les salariés ont-ils le sentiment de faire un travail de qualité ?",
        details:
          "La perception pour les salariés de pouvoir exercer leur activité conformément à leur conception d’un travail bien fait (délais de réalisation, moyens adaptés et suffisants…)."
      },
      {
        name: "Utilité du travail",
        data: initData,
        subTitle:
          "Les salariés estiment-ils que leur travail est reconnu comme utile ?",
        details:
          "Il s’agit du sentiment de contribuer significativement, par son activité, à un ensemble plus large et de servir concrètement les résultats de l’organisation ou d’en faire bénéﬁcier d’autres acteurs (public, clients, usagers, patients, collègues…). S’ajoute à cela la notion de complétude : possibilité de constater soi-même la finalité et la réussite de son travail."
      }
    ]
  },
  {
    name: "Insécurité de l'emploi et du travail",
    subTopics: [
      {
        name: "Insécurité de la situation de travail",
        data: initData,
        subTitle:
          "Les salariés sont-ils confrontés à des incertitudes quant au maintien de leur activité dans les prochains mois ?",
        details:
          "Ces incertitudes peuvent se manifester par la peur de perdre son emploi, la crainte de voir baisser son revenu et de ne pas bénéﬁcier d’un déroulement de carrière « favorable » (absence de promotion, temps partiel subi…)."
      },
      {
        name: "Conduite du changement",
        data: initData,
        subTitle:
          "Les changements sont-ils suffisamment anticipés, accompagnés, et clairement expliqués aux salariés ?",
        details:
          "Tout changement (stratégique, organisationnel, technologique...) représente une situation d'efforts et donc potentiellement de tensions : temps d'apprentissage et d'assimilation des changements, remise en cause des compétences, atteinte possible du sens donné au travail et du sentiment de 'bien travailler'"
      }
    ]
  }
];

export default class ContentSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      selected: undefined,
      saved: true,
      factorName: "",
      justsaved: false,
      displaySave: true,
      modalOpen: false,
      topics: [
        {
          name: "Intensité et complexité du travail",
          subTopics: [
            {
              name: "Contraintes de rythmes",
              data: initData,
              subTitle:
                "Les salariés sont-ils soumis à des contraintes de rythme élevées ?",
              details:
                "Le rythme de travail peut être imposé par des contraintes internes à l’organisation (normes de performance, exigences des interlocuteurs en interne…) ou externes (demande des clients nécessitant une réponse immédiate…)."
            },
            {
              name: "Précision des objectifs ",
              data: initData,
              subTitle:
                "Les objectifs des salariés sont-ils clairement déﬁnis ?",
              details:
                "Les objectifs fixés doivent être clairs et réalistes pour permettre aux salariés de disposer de critères d’atteinte, mesurables quantitativement et qualitativement (par opposition avec des objectifs ﬂous, irréalistes, voire inexistants).  "
            },
            {
              name:
                "Adéquation des objectifs avec les moyens et les responsabilités de chacun",
              data: initData,
              subTitle:
                "Les objectifs ﬁxés sont-ils compatibles avec les moyens et responsabilités alloués aux salariés pour les atteindre ?",
              details: `Il s’agit ici d’évaluer si les objectifs définis sont compatibles avec les marges de manœuvre dont disposent les salariés et la réalité quotidienne du travail. 
                Les objectifs peuvent être clairement déﬁnis mais irréalistes au regard des exigences du travail et des ressources matérielles, techniques et humaines mises à disposition des salariés. 
                `
            },
            {
              name: "La compatibilité des instructions entre elles",
              data: initData,
              subTitle:
                "Les salariés reçoivent-ils des instructions ou demandes contradictoires ?",
              details:
                "Les demandes contradictoires peuvent provenir de sollicitations antagonistes émanant des différents acteurs (hiérarchique/fonctionnel, direction/clientèle…), par exemple : combiner qualité sans défaut et rapidité d’exécution. "
            },
            {
              name: "Modalités d’organisation de la polyvalence",
              data: initData,
              subTitle:
                "Les salariés sont-ils amenés à changer de tâches, de postes ou de fonctions à l’improviste pour répondre aux contraintes du moment ?",
              details: `La polyvalence est une forme d’organisation du travail qui consiste à affecter plusieurs activités différentes à un salarié. 
                Elle peut devenir problématique lorsqu’elle est subie, c’est-à-dire quand sa nécessité n’est pas comprise/accompagnée ou s’exerce au détriment de la qualité.
                `
            },
            {
              name: "Interruptions perturbatrices",
              data: initData,
              subTitle:
                "Les salariés sont-ils fréquemment interrompus par des tâches non prévues ?",
              details:
                "Les interruptions imprévues conduisent les salariés à suspendre régulièrement leur travail en cours, les obligeant ensuite à se reconcentrer sur leur tâche de départ. "
            },
            {
              name: "Niveaux d’attention et de vigilance requis",
              data: initData,
              subTitle:
                "Les salariés exercent-ils des activités qui nécessitent une attention soutenue ou une vigilance permanente ?",
              details:
                "Un niveau élevé d’attention ou de vigilance maintenu pendant de longues périodes peut s’avérer d’autant plus difﬁcile (risque de fatigue mentale pouvant conduire à des erreurs) lorsqu’il est impossible d’organiser des temps de pause. "
            }
          ]
        },
        {
          name: "Temps de travail",
          subTopics: [
            {
              name: "Durée hebdomadaire du travail",
              data: initData,
              subTitle:
                "Les salariés travaillent-ils de manière excessive sans période de moindre charge ?",
              details:
                "Les horaires de travail peuvent être excessifs de manière continue."
            },
            {
              name: "Travail en horaires atypiques",
              data: initData,
              subTitle:
                "Les salariés sont-ils soumis à des horaires de nuit, alternants ou décalés ?",
              details:
                "Il s’agit par exemple du travail le soir, le week-end, de nuit ou encore du travail posté."
            },
            {
              name:
                "Extension de la disponibilité en dehors des horaires de travail",
              data: initData,
              subTitle:
                "Les salariés sont-ils sollicités en dehors des horaires de travail pour des raisons professionnelles ?",
              details:
                "La disponibilité attendue des salariés peut s’étendre au-delà de leurs horaires habituels de travail (soirs, week-end ou congés…)."
            },
            {
              name:
                "Prévisibilité des horaires de travail et l’anticipation de leur changement",
              data: initData,
              subTitle:
                "Les salariés peuvent-ils anticiper sufﬁsamment à l’avance leurs horaires de travail ?",
              details:
                "L’incertitude sur les horaires de travail à effectuer complique l’organisation du travail et de la vie personnelle."
            },
            {
              name: "Conciliation entre vie professionnelle et vie personnelle",
              data: initData,
              subTitle:
                "L’organisation du travail permet-elle aux salariés de concilier vie professionnelle et vie personnelle ?",
              details:
                "L’équilibre des temps de vie peut être facilité par la négociation d’accords individuels (aménagements des horaires, possibilité d’arrangements informels) et collectifs (charte d’utilisation des outils numériques, droit à la déconnexion)."
            }
          ]
        },
        {
          name: "Exigences émotionnelles",
          subTopics: [
            {
              name: "Tensions avec le public",
              data: initData,
              subTitle:
                "Les salariés sont-ils confrontés à des situations de tension avec des tiers dont ils se plaignent ?",
              details:
                "La perception d’une mauvaise qualité de service, peut susciter le mécontentement du public, des usagers, des clients, des patients… et exposer les salariés à des tensions (violences verbales et/ou physiques…)."
            },
            {
              name: "Confrontation à la souffrance d'autrui",
              data: initData,
              subTitle:
                "Les salariés sont-ils amenés à devoir traiter des situations de personnes en souffrance (physique, psychologique ou sociale) ?",
              details:
                "Les salariés peuvent devoir faire face régulièrement à des situations de mal-être de la part de tiers (public, usagers, clients, patients…) qu’ils ont à gérer."
            },
            {
              name: "Maîtrise des émotions",
              data: initData,
              subTitle:
                "Les salariés doivent-ils  contrôler leurs émotions pour « faire bonne ﬁgure » en toutes circonstances ? ",
              details:
                "Les salariés en contact avec des tiers (public, usagers, clients, patients…) peuvent être amenés à régulièrement « prendre sur eux » pour ne pas montrer leurs véritables émotions ou ressentis."
            }
          ]
        },
        {
          name: "Autonomie au travail",
          subTopics: [
            {
              name: "Autonomie dans la tâche",
              data: initData,
              subTitle:
                "Les salariés ont-ils suffisamment de marge de manœuvre pour réaliser leur travail ?",
              details:
                "L’autonomie permet aux salariés de bénéficier d’une certaine liberté d’action et d’organisation dans la réalisation de leur activité de travail."
            },
            {
              name: "Autonomie temporelle",
              data: initData,
              subTitle:
                "Les salariés peuvent-ils interrompre momentanément leur travail quand ils en ressentent le besoin",
              details: `La possibilité de choisir ses moments de pause est un indicateur du niveau d’autonomie dont les salariés bénéﬁcient. 
                Les pauses peuvent être l’occasion de temps de récupération, de partage sur le travail et/ou de convivialité. 
                `
            },
            {
              name: "Utilisation et développement des compétences",
              data: initData,
              subTitle:
                "Les salariés peuvent-ils utiliser leurs compétences professionnelles et en développer de nouvelles ?",
              details:
                "Il s’agit de déterminer si les missions conﬁées permettent aux salariés de mettre pleinement en œuvre leurs compétences (savoir-faire, savoir-être) et leur donnent l’occasion d’en développer de nouvelles. "
            }
          ]
        },
        {
          name: "Rapports sociaux au travail",
          subTopics: [
            {
              name: "Soutien de la part des collègues",
              data: initData,
              subTitle: "Les relations entre collègues sont-elles bonnes ?",
              details:
                "La qualité des relations de travail entre collègues et l’intégration dans un collectif (conﬁance, entraide, convivialité au sein des équipes) inﬂuent sur le bien-être et l’efficacité individuelle et collective."
            },
            {
              name: "Soutien de la part de la hiérarchie",
              data: initData,
              subTitle: "Les salariés reçoivent-ils du soutien managérial ?",
              details:
                "Il est question ici de la disponibilité, des capacités d’écoute et d’action de la hiérarchie face aux besoins/demandes des salariés (discuter d’un problème technique, régler des difﬁcultés imprévues, arbitrer, réguler les conﬂits…)."
            },
            {
              name: "Violence interne au travail",
              data: initData,
              subTitle:
                "Règne-t-il un climat de respect et de courtoisie mutuels entre les salariés ?",
              details:
                "La violence interne est relative à l’ensemble des incivilités, comportements, propos, agissements hostiles ou irrespectueux (sexisme, discrimination…) entre collègues et/ou avec la hiérarchie."
            },
            {
              name: "Reconnaissance du travail",
              data: initData,
              subTitle:
                "Les salariés reçoivent-ils des marques de reconnaissance ?",
              details:
                "La reconnaissance des efforts et du résultat peut être symbolique (félicitations, éloges, feedback constructifs, soutien, remerciements…), de carrière (évolutions professionnelles, développement des compétences, moyens mis à disposition pour réaliser le travail…), financière (primes, augmentations, promotions…)."
            }
          ]
        },
        {
          name: "Conflits de valeurs",
          subTopics: [
            {
              name: "Qualité empêchée",
              data: initData,
              subTitle:
                "Les salariés ont-ils le sentiment de faire un travail de qualité ?",
              details:
                "La perception pour les salariés de pouvoir exercer leur activité conformément à leur conception d’un travail bien fait (délais de réalisation, moyens adaptés et suffisants…)."
            },
            {
              name: "Utilité du travail",
              data: initData,
              subTitle:
                "Les salariés estiment-ils que leur travail est reconnu comme utile ?",
              details:
                "Il s’agit du sentiment de contribuer significativement, par son activité, à un ensemble plus large et de servir concrètement les résultats de l’organisation ou d’en faire bénéﬁcier d’autres acteurs (public, clients, usagers, patients, collègues…). S’ajoute à cela la notion de complétude : possibilité de constater soi-même la finalité et la réussite de son travail."
            }
          ]
        },
        {
          name: "Insécurité de l'emploi et du travail",
          subTopics: [
            {
              name: "Insécurité de la situation de travail",
              data: initData,
              subTitle:
                "Les salariés sont-ils confrontés à des incertitudes quant au maintien de leur activité dans les prochains mois ?",
              details:
                "Ces incertitudes peuvent se manifester par la peur de perdre son emploi, la crainte de voir baisser son revenu et de ne pas bénéﬁcier d’un déroulement de carrière « favorable » (absence de promotion, temps partiel subi…)."
            },
            {
              name: "Conduite du changement",
              data: initData,
              subTitle:
                "Les changements sont-ils suffisamment anticipés, accompagnés, et clairement expliqués aux salariés ?",
              details:
                "Tout changement (stratégique, organisationnel, technologique...) représente une situation d'efforts et donc potentiellement de tensions : temps d'apprentissage et d'assimilation des changements, remise en cause des compétences, atteinte possible du sens donné au travail et du sentiment de 'bien travailler'"
            }
          ]
        }
      ]
    };
  }

  componentWillMount() {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios.get(`${url}/api/companies/${this.props.id}`).then(r => {
      console.log(
        r.data.sites[this.props.siteIndex].populations[
          this.props.populationIndex
        ],
        this.props.populationIndex
      );
      this.setState({
        sites: r.data.sites,
        topics:
          r.data.sites[this.props.siteIndex].populations[
            this.props.populationIndex
          ].topics,
        name: r.data.name,
        _id: r.data._id
      });
      console.log(r.data);
    });
  }

  ChangeState = (i, j) => {
    console.log(i, j);
    const { selected } = this.state;
    if (selected && selected[0] === i && selected[1] === j) {
      this.setState({ selected: undefined });
    } else {
      this.setState({ selected: [i, j] });
    }
    console.log(this.state.selected);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false, factorName: "" });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

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

  changeAction = (i, j, name, value, k) => {
    console.log(name, value);
    var { topics } = this.state;
    topics[i].subTopics[j].data.actions[k] = {
      ...topics[i].subTopics[j].data.actions[k],
      [name]: value
    };
    this.setState({ saved: false, topics });
  };

  save = () => {
    // const siteIndex = this.props.siteIndex
    const { sites, topics } = this.state;
    sites[this.props.siteIndex].populations[
      this.props.populationIndex
    ].topics = topics;
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("jwtToken");
    axios
      .post(`${url}/api/companies/save/${this.props.id}`, {
        sites
      })
      .then(r => {
        this.setState({
          topics:
            r.data.sites[this.props.siteIndex].populations[
              this.props.populationIndex
            ].topics,
          justsaved: true,
          saved: true,
          displaySave: false
        });
      });
  };

  next = () => {
    const { selected, topics, activeItem } = this.state;
    console.log(
      topics[selected[0]].subTopics.length,
      selected[1],
      selected[1] === topics[selected[0]].length - 1
    );
    console.log(
      typeof topics[selected[0]].subTopics.length,
      typeof selected[1]
    );
    if (selected[1] === topics[selected[0]].subTopics.length - 1) {
      this.setState({
        selected: [selected[0] + 1, 0],
        activeItem: activeItem + 1
      });
    } else {
      this.setState({ selected: [selected[0], selected[1] + 1] });
    }
    console.log("post", this.state.selected, this.state.activeItem);
    this.save();
  };

  previous = () => {
    const { selected, topics, activeItem } = this.state;
    if (selected[1] === 0) {
      this.setState({
        selected: [
          selected[0] - 1,
          topics[selected[0] - 1].subTopics.length - 1
        ],
        activeItem: activeItem - 1
      });
    } else {
      this.setState({ selected: [selected[0], selected[1] - 1] });
    }
    this.save();
  };

  finishRedirect = () => {
    console.log(this.props);
    window.location.replace("/user/sites");
  };

  newAction = (i, j) => {
    const topics = this.state.topics;
    console.log(topics[i].subTopics[j].data);
    topics[i].subTopics[j].data.actions.push({
      name: "",
      alreadyExisting: "",
      new: "",
      emergency: -1,
      timeLimit: "",
      inCharge: ""
    });
    this.setState({ topics });
    this.save();
    console.log(this.state.topics[i].subTopics[j].data.actions);
  };

  newFactor = () => {
    const topics = this.state.topics;
    const { factorName, activeItem } = this.state;
    console.log("Active item : ", activeItem)
    console.log("topic modified : ", topics[activeItem]);
    topics[activeItem].subTopics.push({
      name: factorName,
      data: {
        situationsExamples: "",
        presence: -1,
        intensity: -1,
        actions: [],
        comment: ""
      }
    });
    this.setState({ topics, factorName: "" });
    this.save();
    this.handleClose();
    console.log("New topic : ", this.state.topics[activeItem]);
  };

  render() {
    const {
      activeItem,
      selected,
      saved,
      topics,
      justsaved,
      displaySave,
      factorName,
    } = this.state;
    console.log("state, props :", this.state, this.props);

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
                style={{ width: "12.5%", textAlign: "center" }}
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
              selected={selected}
              change={this.change}
              changeAction={this.changeAction}
              form={form}
              newAction={this.newAction}
            />
            <Modal
                  trigger={
                    <Button
              primary
              style = {{ backgroundColor: "#52768F" }}
              icon
              fluid
              onClick={() => this.setState({ modalOpen: true })}
            >
              Ajouter un facteur de risque
            </Button>
                  }
                  open={this.state.modalOpen}
                  onClose={() => this.setState({ modalOpen: false, factorName: "" })}
                  style={{ width: "30%", marginTop: "5%" }}
                >
                  <Header icon="edit" content="Facteur de risque personnalisé" />
                  <Modal.Content>
                  <h5>Vous pouvez ajouter un nouveau facteur de risque personnalisé en saisissant son nom et en cliquant sur "Créer".</h5>
                    <Form>
                      <Form.Group>
                        <Form.Input
                          placeholder="Nom du facteur"
                          name="factorName"
                          value={factorName}
                          onChange={this.handleChange}
                        />
                        <Form.Button content="Créer" onClick={() => this.newFactor()} />
                      </Form.Group>
                    </Form>
                  </Modal.Content>
                </Modal>
            
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
            disabled={!selected || (selected && selected[0] === 0 && selected[1] === 0)}
            onClick={this.previous}
          >
            <Icon name="left arrow" />
            Précedent
          </Button>
          <Button
            icon
            positive
            labelPosition="right"
            style={{
              height: "7vh",
              width: "15%",
              margin: "10px",
              textAlign: "center", backgroundColor: "#52768F"
            }}
            onClick={() => {toast.info(
              "Vos modifications ont bien été enregistrées",
              {
                position: "top-center",
                autoClose: 10000
              }
            ); this.save(); }}
          >
            Enregistrer
            <Icon name="save outline" />
          </Button>
          <ExportContent
            company={{ name: this.state.name, _id: this.state._id }}
            topics={topics}
            siteIndex={this.props.siteIndex}
            populationIndex={this.props.populationIndex}
          />

          {selected &&
          (selected[0] < topics.length - 1 ||
            selected[1] < topics[topics.length - 1].subTopics.length - 1) ? (
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
              {localStorage.getItem("level") === "0" ? (
                <Button
                  icon
                  labelPosition="right"
                  style={{
                    height: "7vh",
                    width: "15%",
                    margin: "10px",
                    textAlign: "center"
                  }}
                  onClick={this.finishRedirect}
                >
                  Terminer
                  <Icon name="check" />
                </Button>
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}
