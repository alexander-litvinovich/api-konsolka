import { storage } from "utils";

const defaultTemplates = [
  {
    name: "Проверка трека",
    text: `{
            "action":"track.get",
            "id":"@"
        }`,
  },
  {
    name: "Понг",
    text: `{
            "action":"pong"
        }`,
  },
  {
    name: "Получить настройки аккаунта",
    text: `{
            "action":"sys.settings.get"
        }`,
  },
  {
    name: "Статунька",
    text: `{
      "action": "stat.uni",
      "select": [
          "issue.from_name",
          "issue.from_email",
          "issue.reply_email",
          "issue.subject",
          "issue.dt",
          "issue.hardbounce",
          "issue.stoplist",
          "issue.lockunsub",
          "issue.lockconfirm",
          "issue.excludefilter",
          "issue.unsublist",
          "issue.excludecontactrate",
          "issue.double",
          "issue.onlyunique",
          "issue.wrongline",
          "issue.cost",
          "issue.members",
          "issue.deliv_ok",
          "issue.deliv_bad",
          "issue.group.gid",
          "issue.group.name",
          "issue.size"
      ],
      "filter": [
          {
              "a": "issue.id",
              "op": "==",
              "v": "5644"
          }
      ]
  }`,
  },
];

const templates = {
  get: () => {
    return storage.get("templates").then((templates) => {
      if (!!templates) {
        try {
          return JSON.parse(templates);
        } catch (error) {
          console.log(error);

          return defaultTemplates;
        }
      }

      return defaultTemplates;
    });
  },
  set: (templates) => {
    storage.set("templates", JSON.stringify(templates));
  },
};

export default templates;
