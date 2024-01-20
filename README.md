# Whos Live?

## Description

This web application connects with various media platforms to show live streams and recent videos via OAuth 2.0 connections

## TODO

- [x] Twitch Integration
  - [x] Show live followed channels
  - [ ] Be able to watch live in the page
  - [ ] Discover?
- [ ] YouTube Integration
  - [ ] videos from subscriptions
  - [ ] Be able to watch videos in the page
  - [ ] recommended videos?
- [ ] Preferences Page
  - [ ] Show integrations list
  - [ ] configure integrations list
- [ ] Update eslint config (from below and react tutorial)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
