// eslint-disable-next-line no-undef
module.exports = {
  extends: ["react-app", "custom"],
  settings: {
    typescript: true,
    node: true,
    react: {
      version: "detect",
    },
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "{react,react-dom,react-router-dom}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{../**/*.module.scss,./**/*.module.scss}",
            group: "index",
            position: "after",
          },
        ],
        "newlines-between": "always",
      },
    ],
  },
};
