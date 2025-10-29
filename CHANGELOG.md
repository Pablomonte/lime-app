# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.30](https://github.com/Pablomonte/lime-app/compare/v0.2.29...v0.2.30) (2025-10-29)


### Bug Fixes

* **netadmin:** correct mesh-wide config route after password change ([8fbe09c](https://github.com/Pablomonte/lime-app/commit/8fbe09c4c7494f07410650e7ff48c20814f03b18))

### [0.2.29](https://github.com/Pablomonte/lime-app/compare/v0.2.28...v0.2.29) (2025-10-24)


### Features

* **locate:** remove show/hide community button ([6dd30d6](https://github.com/Pablomonte/lime-app/commit/6dd30d6411d038642dc48d3cb01520d3abf10e9d))
* **meshwide:** improve map UX with responsive bottom sheet and fixed tooltips ([cbb0d01](https://github.com/Pablomonte/lime-app/commit/cbb0d01a01070fa0af449033279ab29f37ecc016))
* **netadmin:** add detailed warning messages for password change ([51fb8de](https://github.com/Pablomonte/lime-app/commit/51fb8dec6e07a7fadb17cab168b13a461ccd21af))
* **netadmin:** implement mesh-wide shared password change ([04ff7ea](https://github.com/Pablomonte/lime-app/commit/04ff7eab70de2cd3462ae94ee871048e4223ba0c))
* **rx:** improve ethernet port role configuration UX ([e87b2b3](https://github.com/Pablomonte/lime-app/commit/e87b2b3baffc263eb0f276b2a9464d95a210027b))


### Bug Fixes

* **meshwide:** remove tap highlight from all map interactive elements ([f7a3e26](https://github.com/Pablomonte/lime-app/commit/f7a3e2678d193dfe904053179131d799c8b39220))

### [0.2.28](https://github.com/Pablomonte/lime-app/compare/v0.2.26...v0.2.28) (2025-10-21)


### Features

* add centralized query keys with gradual migration ([f6856a2](https://github.com/Pablomonte/lime-app/commit/f6856a2b9fc933755f9457eb09f8b1fdab479c6d))
* add clear reference state buttons for mesh-wide map ([439251c](https://github.com/Pablomonte/lime-app/commit/439251cedaa4fc6f49f6c78b613a08c4243d48c9))
* add ethernet port role configuration button (WIP) ([4a39a0b](https://github.com/Pablomonte/lime-app/commit/4a39a0b6b3e6cbbb98b18099db36bf72967cfdd2)), closes [#6](https://github.com/Pablomonte/lime-app/issues/6)
* add ethernet port role configuration buttons ([e43bcd7](https://github.com/Pablomonte/lime-app/commit/e43bcd785ecf027d763c61b8840f21161ae7def1)), closes [#6](https://github.com/Pablomonte/lime-app/issues/6)
* add reconfigure button for completed mesh-wide config ([3f51dd7](https://github.com/Pablomonte/lime-app/commit/3f51dd7e4e4dc8e97ac771bca74e133012385213)), closes [#5](https://github.com/Pablomonte/lime-app/issues/5)
* add tooltips to mesh-wide action buttons ([1f6a455](https://github.com/Pablomonte/lime-app/commit/1f6a455355ce4487a53a06b1b41d35e3c18ce929)), closes [#2](https://github.com/Pablomonte/lime-app/issues/2)
* complete Phase 2A - migrate remaining plugins to centralized queryKeys ([302473b](https://github.com/Pablomonte/lime-app/commit/302473bb17352bd1a4706abddcbc6f8232c6bc32))
* complete Redux elimination and functionality restoration ([eabc651](https://github.com/Pablomonte/lime-app/commit/eabc651f8dae0fa60ece744a8b5b4c34223ec002))
* complete v4 performance & optimization foundation ([d7e90f3](https://github.com/Pablomonte/lime-app/commit/d7e90f3d9f22b1d500c519acead2aca690aed421))
* comprehensive error handling system ([c18f8d6](https://github.com/Pablomonte/lime-app/commit/c18f8d6c5c164d1d16b1b3d366fda653ae0cda41))
* enhance production error handling across core plugins ([4f7553f](https://github.com/Pablomonte/lime-app/commit/4f7553feff844aa1ddedb2a9b303ca82a6ddd857))
* **i18n:** complete all missing Spanish translations ([25ba95d](https://github.com/Pablomonte/lime-app/commit/25ba95dac7544a5c105095d97bbaf1b43abbc3e8))
* implement proper FBW initial overlay with centralized query management ([8b7a065](https://github.com/Pablomonte/lime-app/commit/8b7a065758cdf799bd1cba9767d08ffb9d48d6fd))
* improve Rx page aesthetics and layout ([7d84885](https://github.com/Pablomonte/lime-app/commit/7d84885a8cfab9be93a44526c68881335a99b5d3))
* migrate firmware plugin to centralized queryKeys + fix AlignSingle imports ([359d023](https://github.com/Pablomonte/lime-app/commit/359d0234972ed9a1782423f568ee2e32727b6ef4))
* optimize bundle for LibreMesh deployment ([85350f7](https://github.com/Pablomonte/lime-app/commit/85350f733f3ee52a73fa0f0489ff095b712dd7c2))
* optimize bundle size and fix layout issues ([ab655f9](https://github.com/Pablomonte/lime-app/commit/ab655f95b4f0ad0e343ece056246f454fd104f05))
* **rx:** add unique port labels and complete translations ([ebd2b52](https://github.com/Pablomonte/lime-app/commit/ebd2b52b8c1a015a73bf992baa043e7e37f16b9f))
* **rx:** improve alignment section layout and styling ([b0c880a](https://github.com/Pablomonte/lime-app/commit/b0c880a792c63f831694458e176b35bfa396ebfd))


### Bug Fixes

* add index.html to redirect root to lime-app ([9afb5fb](https://github.com/Pablomonte/lime-app/commit/9afb5fba3481cc7fa1a35aa382dbea80b99b3e2c))
* add missing iwinfo ACL file for align plugin ([933e0db](https://github.com/Pablomonte/lime-app/commit/933e0db16456f3a1de6a9b47864348e2137cfa51))
* add missing uci-defaults and config files from upstream ([ef856db](https://github.com/Pablomonte/lime-app/commit/ef856db149d697a7b8e4c9c607675ebb4a11a6e9))
* conditionally apply base href only in production ([cdecac5](https://github.com/Pablomonte/lime-app/commit/cdecac5904c789dd180c477de817ccbf848b5bca))
* Configure correct base tag for production deployment ([8e55888](https://github.com/Pablomonte/lime-app/commit/8e5588892d4036ae5db03fbb8b7d2ea403806ce0))
* disable source maps and add SPA route redirects ([c5ac10d](https://github.com/Pablomonte/lime-app/commit/c5ac10d4da307a811c3de014764052c69dfff629))
* Improve production detection in footer asset paths ([6b53d83](https://github.com/Pablomonte/lime-app/commit/6b53d8353096b66ba1afc0fce7b77cb697becb97))
* **mesh-wide:** fix node reference deletion and show all unique links ([7e8829d](https://github.com/Pablomonte/lime-app/commit/7e8829d42e1d311b3528d22264c9195ed30c4572))
* notes not saving - correct API parameter and add cache invalidation ([be4e593](https://github.com/Pablomonte/lime-app/commit/be4e593a96e31245c4808b2dbd64dfd1e0191773)), closes [#10](https://github.com/Pablomonte/lime-app/issues/10)
* Remove trailing slash requirement from production detection ([8d57eec](https://github.com/Pablomonte/lime-app/commit/8d57eecac8e3d34bd3bcf22a323cd802333ebcd7))
* replace React Fragment with Preact Fragment in alignment component ([7349ac5](https://github.com/Pablomonte/lime-app/commit/7349ac5f8e003e90e380b9314bc2a0fa76461653))
* restore align functionality with route props and speech synthesis ([a1076f4](https://github.com/Pablomonte/lime-app/commit/a1076f44ef349f232b1975ad11d70d804399fa8d))
* restore align functionality with route props and speech synthesis ([65f509d](https://github.com/Pablomonte/lime-app/commit/65f509df1ebe1522391135f6a62f7749f033c31a))
* restore Babel links visualization in mesh-wide map ([5317c3a](https://github.com/Pablomonte/lime-app/commit/5317c3ade41741df665f9b70e40982f5cab5dd3f))

### [0.2.27](https://github.com/Pablomonte/lime-app/compare/v0.2.26...v0.2.27) (2025-08-29)


### Features

* add centralized query keys with gradual migration ([f6856a2](https://github.com/Pablomonte/lime-app/commit/f6856a2b9fc933755f9457eb09f8b1fdab479c6d))
* complete Phase 2A - migrate remaining plugins to centralized queryKeys ([302473b](https://github.com/Pablomonte/lime-app/commit/302473bb17352bd1a4706abddcbc6f8232c6bc32))
* complete Redux elimination and functionality restoration ([b4c3302](https://github.com/Pablomonte/lime-app/commit/b4c33021fbf86ccbba853fbbdab089a356f25647))
* complete v4 performance & optimization foundation ([d7e90f3](https://github.com/Pablomonte/lime-app/commit/d7e90f3d9f22b1d500c519acead2aca690aed421))
* comprehensive error handling system ([c18f8d6](https://github.com/Pablomonte/lime-app/commit/c18f8d6c5c164d1d16b1b3d366fda653ae0cda41))
* enhance production error handling across core plugins ([4f7553f](https://github.com/Pablomonte/lime-app/commit/4f7553feff844aa1ddedb2a9b303ca82a6ddd857))
* implement proper FBW initial overlay with centralized query management ([8b7a065](https://github.com/Pablomonte/lime-app/commit/8b7a065758cdf799bd1cba9767d08ffb9d48d6fd))
* migrate firmware plugin to centralized queryKeys + fix AlignSingle imports ([359d023](https://github.com/Pablomonte/lime-app/commit/359d0234972ed9a1782423f568ee2e32727b6ef4))
* optimize bundle for LibreMesh deployment ([6c0d30d](https://github.com/Pablomonte/lime-app/commit/6c0d30d5418ec12a18841c0afc36854f450d43c0))
* optimize bundle size and fix layout issues ([813c3d5](https://github.com/Pablomonte/lime-app/commit/813c3d5daedb0fa0f5ae447d3cb5bc8724cd6bfe))


### Bug Fixes

* replace React Fragment with Preact Fragment in alignment component ([7349ac5](https://github.com/Pablomonte/lime-app/commit/7349ac5f8e003e90e380b9314bc2a0fa76461653))

## [0.2.26](https://github.com/libremesh/lime-app/compare/v0.2.25...v0.3.0) (2024-04-03)


### ⚠ BREAKING CHANGES

* **dependencies:** upgrade `react-query` v2 to v4. Also migrate old storybook `@storybook/addon-knobs to` api to `@storybook/addon-controls`

### Features

* **docker:** Add docker for local dev ([ffa9876](https://github.com/libremesh/lime-app/commit/ffa987670fa6cc9c73f6454dec043b22bc9b736e))
* **fbw:** show scans results https://github.com/libremesh/lime-app/pull/339
* **nodejs:** upgrade .nvmrc to 20 ([48f415b](https://github.com/libremesh/lime-app/commit/48f415ba312bf4eb8e84eea687de1178df23f342))
* **gh-action:** create actions to test, build and create a build package to test
* **packages:** upgrade packages to latest versions
* **packages:** typescript and tailwindcss support

### Bug Fixes

* **ci:** translations not present ([2127352](https://github.com/libremesh/lime-app/commit/2127352ba6ee690f562b652a0effa35e3d053851))
* **fbw:** multiple fixes and migrate to react query
* **lime-plugin-metrics:** multiple fixes
* **lime-plugin-metrics:** refactor to react query ([a166cd6](https://github.com/libremesh/lime-app/commit/a166cd627d3bb7d1683156124addcdb462889e08))
* **lime-plugin-rx:** multiple fixes
* **lime-plugin-rx:** migrate to react query ([7118a73](https://github.com/libremesh/lime-app/commit/7118a73a1b443e1d7a7dcdf06632032bfcb5bbc6))
* **node-admin:** voucher tests ([bdf1219](https://github.com/libremesh/lime-app/commit/bdf12196ae4eaba6682ba5dd4b7168ef413f2f64))
* **tests:** multiple text fixing. See https://github.com/libremesh/lime-app/issues/359
* **jest:** fix regular expression to find the tests files ([a9f57f2](https://github.com/libremesh/lime-app/commit/a9f57f2333ead426c1526a3a50b4c9eed2e11ba5))

* **dependencies:** upgrade node dependencies ([5acd8ca](https://github.com/libremesh/lime-app/commit/5acd8ca3f3aa738c80807e24707c301dae0a7842))
### [0.2.25](https://github.com/germanferrero/lime-app/compare/v0.2.24...v0.2.25) (2022-03-04)


### Features

* **hotspot:** add hotspot feature ([6f0355f](https://github.com/germanferrero/lime-app/commit/6f0355fc4af7f6a55198bed58d5957ff14ce7e02))
* **node admin:** add Roaming AP config ([31c65d1](https://github.com/germanferrero/lime-app/commit/31c65d19389bfa237245db7de3b5467bc9364172))
* **node-admin:** allow changing wifi password ([12d8492](https://github.com/germanferrero/lime-app/commit/12d849275cbed31dd885c156ebe629b693062b39))
* **pirania:** adds interface for pirania based on new-pirania-api ([63476a2](https://github.com/germanferrero/lime-app/commit/63476a2561eed8e7531faba5a4699622cf363c3c))
* pirania ui ([353ffd9](https://github.com/germanferrero/lime-app/commit/353ffd90ac946815fc30cc09ae5e658f7ef874af))
* **portal editor:** add portal editor ([d95d4fb](https://github.com/germanferrero/lime-app/commit/d95d4fb993dd8601a43d0854ccc8a1d0b63cf291))


### Bug Fixes

* **login:** make form submit on enter ([f218c6b](https://github.com/germanferrero/lime-app/commit/f218c6bee093e5407b8662010081d31181a34106))
* **login:** persist session after page refresh ([ee0d9d4](https://github.com/germanferrero/lime-app/commit/ee0d9d486d317c89afdb838c4cb29d3e70bbde3c))
* **reboot-banner:** persist page refresh ([cee2800](https://github.com/germanferrero/lime-app/commit/cee28004b13ab21a53f475f3c5eda4f2fe53a388))
* **subheader:** show only one banner at a time ([0bc37bc](https://github.com/germanferrero/lime-app/commit/0bc37bcd90ce57b7839f0c7aceb9603814eb0557))
* **translations:** fix error in pt translation ([3640de1](https://github.com/germanferrero/lime-app/commit/3640de19b3614066be66f84829354132ea30ccfb))

### [0.2.24](https://github.com/germanferrero/lime-app/compare/v0.2.23...v0.2.24) (2022-02-23)

### Bug Fixes

* **firmware:** display spinners in download from release ([a50d314](https://github.com/germanferrero/lime-app/commit/a50d3144703a7c213e0ed1e80993a6db1ee9e89c))

### [0.2.23](https://github.com/germanferrero/lime-app/compare/v0.2.22...v0.2.23) (2022-02-21)

### Bug Fixes
* **translations:** fix error in pt translation ([3640de1](https://github.com/germanferrero/lime-app/commit/3640de19b3614066be66f84829354132ea30ccfb))

### [0.2.22](https://github.com/germanferrero/lime-app/compare/v0.2.21...v0.2.22) (2022-02-21)

* **pirania:** add portuguese translations ([63476a2](https://github.com/germanferrero/lime-app/commit/d005012fb9925c849591c7051c3150f9263ebeba))

### [0.2.21](https://github.com/germanferrero/lime-app/compare/v0.2.20...v0.2.21) (2022-02-21)


### Features

* **hotspot:** add hotspot feature ([6f0355f](https://github.com/germanferrero/lime-app/commit/6f0355fc4af7f6a55198bed58d5957ff14ce7e02))
* **node admin:** add Roaming AP config ([31c65d1](https://github.com/germanferrero/lime-app/commit/31c65d19389bfa237245db7de3b5467bc9364172))
* **node-admin:** allow changing wifi password ([12d8492](https://github.com/germanferrero/lime-app/commit/12d849275cbed31dd885c156ebe629b693062b39))
* **pirania:** adds interface for pirania based on new-pirania-api ([63476a2](https://github.com/germanferrero/lime-app/commit/63476a2561eed8e7531faba5a4699622cf363c3c))
* pirania ui ([353ffd9](https://github.com/germanferrero/lime-app/commit/353ffd90ac946815fc30cc09ae5e658f7ef874af))
* **portal editor:** add portal editor ([d95d4fb](https://github.com/germanferrero/lime-app/commit/d95d4fb993dd8601a43d0854ccc8a1d0b63cf291))


### Bug Fixes

* **getvoices:** fix synth voices crash in align screen ([1ba18c4](https://github.com/germanferrero/lime-app/commit/1ba18c4e0a0154a9568ae6e6a4d73e570f940c98))

### [0.2.20](https://github.com/germanferrero/lime-app/compare/v0.2.19...v0.2.20) (2021-05-11)

* **map:** prevent buttons overflow in mobile
* **align:** show message "no mesh interfaces available" when there aren't
### [0.2.19](https://github.com/germanferrero/lime-app/compare/v0.2.18...v0.2.19) (2021-05-11)


### Bug Fixes

* **firmware:** disable upgrade button after submit ([aaea467](https://github.com/germanferrero/lime-app/commit/aaea4670f064fbb07c6f35bc4ac5d47a6826a1cd))

### [0.2.18](https://github.com/germanferrero/lime-app/compare/v0.2.17...v0.2.18) (2021-05-11)


### Bug Fixes

* **firmware:** show loading spinner while uploading file ([ea4293c](https://github.com/germanferrero/lime-app/commit/ea4293cbabf1d0c757114e441d2084518e00e3d6))

### [0.2.17](https://github.com/germanferrero/lime-app/compare/v0.2.16...v0.2.17) (2021-05-06)


### Features

* **translations:**  add a lot of pt-br translations :)
* **menu:** add community / node view to menu (currently without community features) ([09fcec8](https://github.com/germanferrero/lime-app/commit/09fcec8e5872e27e6adfad0ba1a6e23c14efdb2e))


### Bug Fixes

* **translations:** fix English counts ([8b3d0c4](https://github.com/germanferrero/lime-app/commit/8b3d0c4f0998f9b1e77ba2e085b6b8ef082c83e3))
* **translations:** fix English spelling ([a319694](https://github.com/germanferrero/lime-app/commit/a3196940452fa21de63c9928ee3017b4a1f60cd0))
* **translations:** force lowercase locale to I18n ([34e7b57](https://github.com/germanferrero/lime-app/commit/34e7b57a7dc6edf58f9ef769ff02f3dc0a64f32c))
* **translations:** spelling fixes for pt-br ([11d52b8](https://github.com/germanferrero/lime-app/commit/11d52b894dc9404c380622d74adf44b77fc1944f))
* **upgrade:** fix typo, now showing release link to more info ([14e6f89](https://github.com/germanferrero/lime-app/commit/14e6f89e81c15b41707b7cea0d13b180e0d0c8ff))

### [0.2.16](https://github.com/germanferrero/lime-app/compare/v0.2.15...v0.2.16) (2021-03-12)


### Bug Fixes

* **align:** url incremental growth at align-single ([3f92f6a](https://github.com/germanferrero/lime-app/commit/3f92f6a5079143c1b6478b0d1ab3483076d642db))
* **firmware:** fix firmware upgrade when eupgrade is missing ([f6683af](https://github.com/germanferrero/lime-app/commit/f6683af2a36c33a9d67a43824a46d8eb419667f1))
* **i18n:** fix localization fallback. Bring back some PT-br translations([4891d66](https://github.com/germanferrero/lime-app/commit/4891d666c810623980c36d6ee2dae32a6462a8d3))
* **remotesupport:** fix remotesupport broken ui when no internet ([a198536](https://github.com/germanferrero/lime-app/commit/a19853687e21aef94b3809ff4155e07a28a1f958))

### Improvements

* **changenode:** improve UI texts with more user-friendly ones ([cab16f3](https://github.com/libremesh/lime-app/commit/cab16f3bbcf54b30f906e065ac569810e8b509a1))
### [0.2.15](https://github.com/germanferrero/lime-app/compare/v0.2.14...v0.2.15) (2021-01-27)


### Bug Fixes

* **most_active:** fix rx page not loading when no most_active ([428f267](https://github.com/germanferrero/lime-app/commit/428f2670e8a89f6de7f1254129a23ce72988b37f))

### [0.2.14](https://github.com/germanferrero/lime-app/compare/v0.2.13...v0.2.14) (2021-01-27)

### Refactor
* **bathost:** adapt to new ubus endpoint

### [0.2.13](https://github.com/germanferrero/lime-app/compare/v0.2.12...v0.2.13) (2021-01-25)

### Features
* **remotesupport:** add support for sharing tmate sessions to your node ([#289](https://github.com/libremesh/lime-app/pull/289))

### Bug Fixes

* **map:** load community when this node is not in nodes_and_links db ([67140b3](https://github.com/germanferrero/lime-app/commit/67140b31efa34b8c3817b84a42d36cebeadab262))

### Improvements
* **map:** show links only when both nodes list each other as associated ([d195ac4](https://github.com/germanferrero/lime-app/commit/9038906ff7f3de5b6a4758e739705c3c7d195ac4))

### [0.2.12](https://github.com/germanferrero/lime-app/compare/v0.2.11...v0.2.12) (2021-01-15)
### Features
* **align** New align screen, check out more info at PR [#285](https://github.com/libremesh/lime-app/pull/285)

### [0.2.11](https://github.com/libremesh/lime-app/compare/v0.2.10...v0.2.11) (2020-11-27)


### Features

* **firstbootwizard:** add do not ask again option to fbw banner ([ed9b733](https://github.com/libremesh/lime-app/commit/ed9b73388fe610358f7db52ab2ebabdc3b0d8676))

* **firmware upgrade:** add one click firmware upgrade ([a62547d](https://github.com/libremesh/lime-app/commit/a62547d971438cf3197f40432708469b410eca94))

### Bug Fixes

* **firstbootwizard:** ask root privilege to run fbw ([4c5e52e](https://github.com/libremesh/lime-app/commit/4c5e52e7d25d2e146e8a973a7ca64fdb3e9f9961))

### [0.2.10](https://github.com/germanferrero/lime-app/compare/v0.2.9...v0.2.10) (2020-10-29)


### Bug Fixes

* **fbw:** fix app crash when lime-fbw is not available ([8993892](https://github.com/germanferrero/lime-app/commit/8993892334dbdd52c7804dda4d63ff22be4ef276))
* **fbw:** protect fbw with root password ([3930f1e](https://github.com/germanferrero/lime-app/commit/3930f1eb80caea0904cacbc755dba5e437f6832c))

### [0.2.9](https://github.com/germanferrero/lime-app/compare/v0.2.8...v0.2.9) (2020-09-16)

### [0.2.8](https://github.com/germanferrero/lime-app/compare/v0.2.7...v0.2.8) (2020-09-16)

### [0.2.6](https://github.com/germanferrero/lime-app/compare/v0.2.5...v0.2.6) (2020-09-15)


### Features

* **firmware upgrade:** basic implementation of firmware upgrade ([175ec82](https://github.com/germanferrero/lime-app/commit/175ec820aab261463c13318b30bc1ff687467bf4))


### Bug Fixes

* **fbw:** allow uppercase letters in network name ([987c458](https://github.com/germanferrero/lime-app/commit/987c4581d350e3cc75b2e467e1559748e870f2fc))
* **rx:** fix most_active change node functionality ([acc2617](https://github.com/germanferrero/lime-app/commit/acc26176da225501c6d02c8403bede54d270cefb))
* **rxpage:** fix uptime days field ([85e6b55](https://github.com/germanferrero/lime-app/commit/85e6b5562585c69652a08f2e828e57181cc543e1))
* **shared-password:** do not show success message on error ([3866041](https://github.com/germanferrero/lime-app/commit/38660416dbb6391b0e338c0f128e52dd57828bcd))

### [0.2.5](https://github.com/germanferrero/lime-app/compare/v0.2.4...v0.2.5) (2020-05-20)


### CI Changes

* **libremesh pull request** overwrite master Makefile, no template one ([eb4fe08](https://github.com/germanferrero/lime-app/commit/eb4fe08815af15f68fee222263bd151bff79744c))

### [0.2.4](https://github.com/germanferrero/lime-app/compare/v0.2.2...v0.2.4) (2020-05-20)


### Features

* **fbw:** add shared password to network creation form ([0e90457](https://github.com/germanferrero/lime-app/commit/0e90457f828e84264ded5568205925d57ef82918)), closes [#237](https://github.com/germanferrero/lime-app/issues/237)
* **plugin-network-admin:** add network admin plugin ([b40604c](https://github.com/germanferrero/lime-app/commit/b40604c1bae0ed8d65d1c01ddd63e8b791390d94))


### Bug Fixes

* **locate:** fix ui bugs related to undefined coordinates of nodes ([d6e90d5](https://github.com/germanferrero/lime-app/commit/d6e90d5f0bd2e205731836daf3312e29c9d391bc)), closes [#250](https://github.com/germanferrero/lime-app/issues/250)

### [0.2.3](https://github.com/libremesh/lime-app/compare/v0.2.2...v0.2.3) (2020-02-11)


### Bug Fixes

* **bug:** fix access from different node ([956b337](https://github.com/libremesh/lime-app/commit/956b337048b640062fdc975b74a74f605bbe0b52))

### [0.2.2](https://github.com/libremesh/lime-app/compare/v0.2.1...v0.2.2) (2020-01-29)


### Features

* **rxjs:** update to new api in epics and api files ([8500cc5](https://github.com/libremesh/lime-app/commit/8500cc5664834c73eb539d0b1ee8f3b1eb22b4d5))


### Bug Fixes

* **align:** fix setInterval and redux state ([a430c69](https://github.com/libremesh/lime-app/commit/a430c69152728dba60c324cea47dfc3225496f3c))
* **bug:** 10.5.0.1 as home address ([58f581d](https://github.com/libremesh/lime-app/commit/58f581da78a1479bc160c40cfeb5793fe138c34d))
* **intl:** fix int18n errors and add new translations ([c3dc4bb](https://github.com/libremesh/lime-app/commit/c3dc4bb425c5f49a4cfeb52c39416d56028e7268))
* **navigation:** avoid undefined elements ([1814c39](https://github.com/libremesh/lime-app/commit/1814c39ebe49edd3e1f817d7d9836632709772af))
* **timer:** fix uptime timer ([214f83a](https://github.com/libremesh/lime-app/commit/214f83a1a53eea704ddfed4f28eb87166d5c651e))
* **timer:** fix uptime timer ([21b3e2e](https://github.com/libremesh/lime-app/commit/21b3e2ed6a7b38b37a02e2b3f3db730c670bf73c))

### [0.2.1](https://github.com/libremesh/lime-app/compare/v0.2.0...v0.2.1) (2019-10-22)


### Bug Fixes

* **fbw:** community name in lowercase ([73d464e](https://github.com/libremesh/lime-app/commit/73d464e))
* **slugify:** improves domain usage ([0237be9](https://github.com/libremesh/lime-app/commit/0237be9))
* **validation:** fix hostname and communiy name validation in fbw ([436a258](https://github.com/libremesh/lime-app/commit/436a258))
* **validation:** fix hostname validation in adminPage ([13afd8c](https://github.com/libremesh/lime-app/commit/13afd8c))


### Features

* **redux:** add generic actions file ([fb4f173](https://github.com/libremesh/lime-app/commit/fb4f173))
* **validation:** hostname validation and slugify ([48cdd4e](https://github.com/libremesh/lime-app/commit/48cdd4e))

## [0.2.0](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.13...v0.2.0) (2019-10-08)


### Bug Fixes

* **config:** remove duplicated hostname ([0cd3ac9](https://github.com/libremesh/lime-app/commit/0cd3ac9)), closes [#207](https://github.com/libremesh/lime-app/issues/207)
* **redirect:** full redirect instead of change the api endopint ([5dd520e](https://github.com/libremesh/lime-app/commit/5dd520e))
* **redirect:** remove redirect on metrics page ([6639b64](https://github.com/libremesh/lime-app/commit/6639b64))
* **validation:** network and host name validation in FBW ([85755ef](https://github.com/libremesh/lime-app/commit/85755ef))

<a name="0.2.0-alpha.13"></a>
# [0.2.0-alpha.13](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.12...v0.2.0-alpha.13) (2019-06-25)


### Bug Fixes

* **metrics:** fix error messages on gateway error ([858bf02](https://github.com/libremesh/lime-app/commit/858bf02))


### Features

* **metrics:** change to new lime-metrics response ([7131d02](https://github.com/libremesh/lime-app/commit/7131d02))



<a name="0.2.0-alpha.12"></a>
# [0.2.0-alpha.12](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.11...v0.2.0-alpha.12) (2019-06-25)


### Bug Fixes

* **location:** catch error loading nodes links ([a255d9c](https://github.com/libremesh/lime-app/commit/a255d9c))
* **location:** fix comparation. Convert all values to number ([f47da3a](https://github.com/libremesh/lime-app/commit/f47da3a))
* **location:** fix geojson render ([6b90dc6](https://github.com/libremesh/lime-app/commit/6b90dc6))
* **location:** remove develop ip in meta/CONECTION_START event ([12c3a92](https://github.com/libremesh/lime-app/commit/12c3a92))
* **package:** update axios to version 0.19.0 ([27401f9](https://github.com/libremesh/lime-app/commit/27401f9))


### Features

* **location:** include hostname in point data ([f3c4ead](https://github.com/libremesh/lime-app/commit/f3c4ead))



<a name="0.2.0-alpha.6"></a>
# [0.2.0-alpha.6](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.5...v0.2.0-alpha.6) (2019-03-09)


### Bug Fixes

* change api error message ([033c5d9](https://github.com/libremesh/lime-app/commit/033c5d9)), closes [#113](https://github.com/libremesh/lime-app/issues/113)
* first boot wizard screen ([46069ef](https://github.com/libremesh/lime-app/commit/46069ef))
* metrics on gateway node ([3fead9f](https://github.com/libremesh/lime-app/commit/3fead9f)), closes [#112](https://github.com/libremesh/lime-app/issues/112)



<a name="0.2.0-alpha.5"></a>
# [0.2.0-alpha.5](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.3...v0.2.0-alpha.5) (2019-02-25)



<a name="0.2.0-alpha.4"></a>
# [0.2.0-alpha.4](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.3...v0.2.0-alpha.4) (2019-02-25)



<a name="0.2.0-alpha.3"></a>
# [0.2.0-alpha.3](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.3) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.2"></a>
# [0.2.0-alpha.2](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.2) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.1"></a>
# [0.2.0-alpha.1](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.1) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.0"></a>
# [0.2.0-alpha.0](https://github.com/libremesh/lime-app/compare/v0.1.1-alpha.0...v0.2.0-alpha.0) (2018-10-24)


### Bug Fixes

* **location:** fix inverted value in default location ([6fac5dd](https://github.com/libremesh/lime-app/commit/6fac5dd))


### Features

* **align:** show message when no other node is found ([84a2c1b](https://github.com/libremesh/lime-app/commit/84a2c1b))



<a name="0.1.1-alpha.0"></a>
## [0.1.1-alpha.0](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.5...v0.1.1-alpha.0) (2018-10-23)


### Bug Fixes

* **husky:** update hooks in package.json ([87ac1ba](https://github.com/libremesh/lime-app/commit/87ac1ba))
* **path:** change default path to libremesh lime-app path ([53106c0](https://github.com/libremesh/lime-app/commit/53106c0))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.5...v0.1.0) (2018-10-23)


### Bug Fixes

* **husky:** update hooks in package.json ([87ac1ba](https://github.com/libremesh/lime-app/commit/87ac1ba))
* **path:** change default path to libremesh lime-app path ([53106c0](https://github.com/libremesh/lime-app/commit/53106c0))



<a name="0.1.0-alpha.5"></a>
# [0.1.0-alpha.5](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2018-10-23)


### Bug Fixes

* **api:** fix api call ([00dc926](https://github.com/libremesh/lime-app/commit/00dc926))
* **cors:** fix cors connection ([13ef9b5](https://github.com/libremesh/lime-app/commit/13ef9b5))
* **groundrouting:** disable groundrouting plugin ([e792737](https://github.com/libremesh/lime-app/commit/e792737))
* **package:** update leaflet.gridlayer.googlemutant to version 0.7.0 ([5be94dd](https://github.com/libremesh/lime-app/commit/5be94dd))
* **package:** update redux-observable to version 0.19.0 ([a941dce](https://github.com/libremesh/lime-app/commit/a941dce))
* **package:** update redux-observable to version 1.0.0-beta.2 ([667aa46](https://github.com/libremesh/lime-app/commit/667aa46))
* **reducer:** fix wrong state variable ([49edbcb](https://github.com/libremesh/lime-app/commit/49edbcb))
* **redux:** use new redux-observable api ([f916d61](https://github.com/libremesh/lime-app/commit/f916d61))
* **transaltion:** fix metrics page transaltions ([07969ad](https://github.com/libremesh/lime-app/commit/07969ad))
* **translations:** remove preact-inline from status component ([7668701](https://github.com/libremesh/lime-app/commit/7668701))
* **url:** fix ground routing url in menu ([78a8263](https://github.com/libremesh/lime-app/commit/78a8263))


### Features

* **loading:** add loading in ground routing page ([1d92b0f](https://github.com/libremesh/lime-app/commit/1d92b0f))
* **location:** add new ubus-lime-location api ([a32622b](https://github.com/libremesh/lime-app/commit/a32622b))
* **location:** detect unassigned location in node ([e0678a9](https://github.com/libremesh/lime-app/commit/e0678a9))
* **plugin:** init ground routing script ([442e934](https://github.com/libremesh/lime-app/commit/442e934))
* **plugin:** register groundrouting plugin in config.js ([1688639](https://github.com/libremesh/lime-app/commit/1688639))



<a name="0.1.0-alpha.4"></a>
# [0.1.0-alpha.4](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2018-02-06)



<a name="0.1.0-alpha.3"></a>
# [0.1.0-alpha.3](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2018-01-31)


### Bug Fixes

* Remove invalid code ([97518b5](https://github.com/libremesh/lime-app/commit/97518b5))



<a name="0.1.0-alpha.2"></a>
# [0.1.0-alpha.2](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2018-01-22)


### Bug Fixes

* **package:** update redux-observable to version 0.17.0 ([e5bafbc](https://github.com/libremesh/lime-app/commit/e5bafbc))
* Remove admin options form config page ([ccbe3ab](https://github.com/libremesh/lime-app/commit/ccbe3ab))


### Features

* Add admin section ([c416cc4](https://github.com/libremesh/lime-app/commit/c416cc4))
* Setup notifications ([6e5ce8c](https://github.com/libremesh/lime-app/commit/6e5ce8c))



<a name="0.1.0-alpha.1"></a>
# [0.1.0-alpha.1](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2017-11-24)



<a name="0.1.0-alpha.0"></a>
# [0.1.0-alpha.0](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.6...v0.1.0-alpha.0) (2017-11-24)


### Features

* **location:** Changes in how to select the new location of a node ([31fdabf](https://github.com/libremesh/lime-app/commit/31fdabf)), closes [#53](https://github.com/libremesh/lime-app/issues/53)
* **settings:** Metrics box and align status now respond to community settings ([dbc3c8d](https://github.com/libremesh/lime-app/commit/dbc3c8d)), closes [#28](https://github.com/libremesh/lime-app/issues/28)



<a name="0.0.1-alpha.6"></a>
## [0.0.1-alpha.6](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.4...v0.0.1-alpha.6) (2017-10-25)


### Bug Fixes

* **travis:** Remove on repo ([739deac](https://github.com/libremesh/lime-app/commit/739deac))
* **travis:** Skip cleanup after build ([3cec77a](https://github.com/libremesh/lime-app/commit/3cec77a))



<a name="0.0.1-alpha.5"></a>
## [0.0.1-alpha.5](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.4...v0.0.1-alpha.5) (2017-10-25)


### Bug Fixes

* **travis:** Skip cleanup after build ([3cec77a](https://github.com/libremesh/lime-app/commit/3cec77a))



<a name="0.0.1-alpha.4"></a>
## [0.0.1-alpha.4](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2017-10-25)


### Bug Fixes

* **travis:** Wrong credentials ([d9c14b4](https://github.com/libremesh/lime-app/commit/d9c14b4))



<a name="0.0.1-alpha.3"></a>
## [0.0.1-alpha.3](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2017-10-25)


### Bug Fixes

* **travis:** Use user and password instead of api key ([c451387](https://github.com/libremesh/lime-app/commit/c451387))



<a name="0.0.1-alpha.2"></a>
## [0.0.1-alpha.2](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2017-10-25)



<a name="0.0.1-alpha.1"></a>
## [0.0.1-alpha.1](https://github.com/libremesh/lime-app/compare/0.0.1-alpha1...0.0.1-alpha.1) (2017-10-25)


### Bug Fixes

* **package:** update redux-observable to version 0.15.0 ([2bb161b](https://github.com/libremesh/lime-app/commit/2bb161b))



<a name="0.0.1-alpha.0"></a>
## [0.0.1-alpha.0](https://github.com/libremesh/lime-app/compare/0.0.1-alpha1...0.0.1-alpha.0) (2017-10-25)


### Bug Fixes

* **package:** update redux-observable to version 0.15.0 ([2bb161b](https://github.com/libremesh/lime-app/commit/2bb161b))
