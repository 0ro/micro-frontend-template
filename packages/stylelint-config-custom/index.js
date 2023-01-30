// eslint-disable-next-line no-undef
module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["value", "include", "mixin"],
      },
    ],
    "no-descending-specificity": null,
  },
};
