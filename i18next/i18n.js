import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "nav-my-habits": "My Habits",
      "nav-history": "History",
      "nav-profile": "Profile",

      "my-habits-title": "How is the current week going{{username}}?",
      "my-habits-new-habit": "Add new habit!",

      "save-habit-title": "New habit",
      "save-habit-name": "Name:",
      "save-habit-name-validation": "Eerg... we kind of need this one, right?",
      "save-habit-type": "Type:",
      "save-habit-type-validation": "Dude, this field is mandatory.",
      "save-habit-type-options": [
        { key: "Health", label: "Health" },
        { key: "Social", label: "Social" },
        { key: "Career", label: "Career" },
        { key: "Hobbies", label: "Hobbies" }
      ],
      "save-habit-frequency": "Frequency:",
      "save-habit-frequency-validation": "Funny, that's an easy way to ace it!",
      "save-habit-save": "Let's start!",
      "save-habit-delete": "Delete this!",
      "save-habit-cancel": "Hmm... Changed my mind!",

      "history-title": "My past weeks:",
      "history-title-empty-data": "You just started, come back next week!",

      "profile-title": "Super hero who?",
      "profile-name": "Name:",
      "profile-name-validation":
        "What an honor! The non-named habit geek among us?",
      "profile-avatar": "Avatar:",
      "profile-avatar-alt-desc": "Avatar, not really important. Don't worry!",
      "profile-save": "Save!",

      "week-description": "Week",
      "date-days-short": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "date-months-short": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
  },

  pt: {
    translation: {
      "nav-my-habits": "Meus Hábitos",
      "nav-history": "Histórico",
      "nav-profile": "Perfil",

      "my-habits-title": "Como a semana atual está indo,{{username}}?",
      "my-habits-new-habit": "Criar novo hábito!",

      "save-habit-title": "Novo hábito",
      "save-habit-name": "Nome:",
      "save-habit-name-validation":
        "Umm... esse campo meio que é importante, não?",
      "save-habit-type": "Tipo:",
      "save-habit-type-validation": "Campo obrigatório.",
      "save-habit-type-options": [
        { key: "Health", label: "Saúde" },
        { key: "Social", label: "Social" },
        { key: "Career", label: "Carreira" },
        { key: "Hobbies", label: "Hobbies" }
      ],
      "save-habit-frequency": "Frequência:",
      "save-habit-frequency-validation":
        "Hábito sem frequência? Aí fica fácil, né?",
      "save-habit-save": "Bora!",
      "save-habit-delete": "Pode apagar!",
      "save-habit-cancel": "Peraí! Quero voltar!",

      "history-title": "Esse é o seu progresso até agora:",
      "history-title-empty-data": "Aparece aqui na semana que vem!",

      "profile-title": "Quem é você na fila do pão?",
      "profile-name": "Nome:",
      "profile-name-validation":
        "Que honra! Um habit geeker que-não-pode-ser-nomeado no meio de nós?",
      "profile-avatar": "Avatar:",
      "profile-avatar-alt-desc":
        "Avatar, não é muito importante. Não se preocupe!",
      "profile-save": "Salvar!",

      "week-description": "Semana",
      "date-days-short": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
      "date-months-short": [
        "Jan",
        "FeV",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
      ]
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
