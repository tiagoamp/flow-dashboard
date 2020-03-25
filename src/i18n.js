import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: {
      "timestamp": "Generated at",
      "by": "by",
      "delayed-for": "delayed for",
      "delayed": "delayed",
      "days": "days",
      "blocked": "blocked",
      "BLOCKED": "BLOCKED",
      "projstatus-backlog-delayed": "of delayed backlog items",
      "projstatus-issues-delayed": "delayed issues",
      "project-elapsed-time": "Project elapsed time",
      "perc-accomplished-items": "% accomplished items",
      "priority-issues": "Priority Issues",
      "request": "Request",
      "request-date": "Request date",
      "required-to": "Required to",
      "accomplished-date": "Accomplished date",
      "ongoing": "ongoing",
      "accountable": "Accountable",
      "elapsed-time": "Elapsed time",
      "action-delayed-statement": "Request not accomplished on time, may get the project delayed!",
      "risks": "Risks"
    }
  },
  ptbr: {
    translation: {
      "timestamp": "Gerado em",
      "by": "por",
      "delayed-for": "atrasado por",
      "delayed": "atrasado",
      "days": "dias",
      "blocked": "boqueado",
      "BLOCKED": "BLOQUEADO",
      "projstatus-backlog-delayed": "dos itens de backlog atrasados",
      "projstatus-issues-delayed": "das pendências do projeto em atraso",
      "project-elapsed-time": "Percentual tempo decorrido do projeto",
      "perc-accomplished-items": "Percentual itens concluídos",
      "priority-issues": "Pendências Prioritárias",
      "request": "Solicitação",
      "request-date": "Data da Solicitação",
      "required-to": "Necessário para",
      "accomplished-date": "Data do atendimento",
      "ongoing": "em aberto",
      "accountable": "Responsável",
      "elapsed-time": "Tempo decorrido",
      "action-delayed-statement": "Pendência não atendida no tempo necessário, deve causar atraso no projeto!",
      "risks": "Riscos"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",  // change here for set other locale

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;