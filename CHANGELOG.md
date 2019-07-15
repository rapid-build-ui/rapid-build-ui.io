## [0.0.22](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.21...v0.0.22) (2019-07-15)


### Bug Fixes

* **misspelling:** on homepage ([a8f00fc](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/a8f00fc))



## [0.0.21](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.20...v0.0.21) (2019-07-12)


Maintenance release, we renamed 2 dependencies which affected all rb components:
* utils changed to cli
* rb-base changed to base


### Dependencies

* **bump:** all rb components ([04f39c2](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/04f39c2))



## [0.0.20](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.19...v0.0.20) (2019-07-12)


### Bug Fixes

* **rb logo link:** from partially getting clicked in the header ([7ac2cdb](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7ac2cdb))


### Features

* **homepage:** redesign 🚀 ([911dfd5](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/911dfd5))



## [0.0.19](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.18...v0.0.19) (2019-07-05)


### Features

* **new rb component:** rb-code 🚀 ([a4eb1c6](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/a4eb1c6))
* **rb-popover:** add new api option onclick ([fecdc22](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/fecdc22))
* **dogfood:** swap in rb-code ([7aeb988](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7aeb988))


### Performance Improvements

* **builder:** remove $compile since we aren't building angular directives ([742536d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/742536d))


### Dependencies

* **bump:** client deps all rb components 👍 ([d879aef](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d879aef))



## [0.0.18](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.17...v0.0.18) (2019-05-09)


### Bug Fixes

* **bare bones page:** rb-icon fouc ([e819e45](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/e819e45))
* **page header:** from slightly overlapping src nav when viewport is extra small ([beb68d0](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/beb68d0))
* **rba-code:** normalize scrollbar look on mac and windows ([64eb967](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/64eb967))
* **windows:** huge heading font size via using Segoe UI as the font family ([dd79209](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/dd79209))


### Features

* **new rb components 🚀**
	* rb-dropdown ([7480873](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7480873))
	* rb-textcurve ([1a20068](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/1a20068))
	* rb-toggle ([d991b2c](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d991b2c))
* **rb-alert:** add api option inline ([7ea5f9e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7ea5f9e))
* **rb-button:** add api option onclick ([7f6cc42](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7f6cc42))
* **rb-icon:** use rb-dropdown to show all icon kind options ([af8c3d4](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/af8c3d4))
* **rba-api:** new angular directive for displaying rb component's api ([0ed6c9e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/0ed6c9e))
* **rba-code:** add momentum scrolling for iOS ([898d703](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/898d703))
* **rba-code:** style the title bar ([e907cd7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/e907cd7))
* **android fonts:** add roboto and roboto mono ([4770413](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/4770413))
* **themes page:** create it but only expose on dev site (not ready for prod yet) ([6ed189b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6ed189b))
* **lavender theme:** rename alina theme to lavender (which will be an official theme) ([fe655e3](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/fe655e3))
* **dev site:** 🔒 now accessible via https so redirect http to https with status code 301 ([da109ad](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/da109ad))
* **new server data route:** /api/data/us-states ([c4d76e8](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c4d76e8))
* **dogfood**
	* swap in rb-textcurve and rb-toggle ([59a549b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/59a549b))
	* swap in rb-dropdown to show all icon kind options ([af8c3d4](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/af8c3d4))


### Performance Improvements

* **rapid build ui logo:** inline it reducing server requests by 2 and speeding up page load ([133147c](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/133147c))
* **angular app:**
	* disable debugInfo ([57f61cd](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/57f61cd))
	* disable comment and css directives ([c19ee61](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c19ee61))
	* bootstrap app with option strictDi true ([43cf9de](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/43cf9de))


### Dependencies

* **bump:**
	* client dep codemirror ([9d8cefd](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9d8cefd))
	* client deps all rb components 👍 ([39dbf2c](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/39dbf2c))
	* server dep compression ([0337875](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/0337875))



## [0.0.17](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.16...v0.0.17) (2019-03-05)


### Features

* **bump:** deps all rb components ([1031c9b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/1031c9b))
* **rb-icon:** add and document icon animation ([edd3503](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/edd3503))
* **rb-button:** add and document icon animation ([64f58d7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/64f58d7))
* **rb-input:** add and document icon animation ([20d0182](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/20d0182))
* **rb-input:** add type options: email, password and url ([7107684](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7107684))
* **rb-input:** document readonly option ([bb36d6b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/bb36d6b))
* **rb-popover:** add and document icon animation ([d0c4e20](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d0c4e20))
* **rb-textarea:** add and document readonly option ([3afbddc](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/3afbddc))


### Performance Improvements

* **rb-icon:** v0.0.13 bump includes a [major performance boost](https://github.com/rapid-build-ui/rb-icon/commit/fabf049) 🚀



## [0.0.16](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.15...v0.0.16) (2019-02-25)


### Bug Fixes

* **browser support table:** from cutting off rb-popover ([f2bd1ed](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f2bd1ed))
* **page header:** prevent heading from overlapping source nav ([f9d1945](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f9d1945))
* **rb-nav:** from not displaying over each other correctly in responsive mode ([abf6d64](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/abf6d64))
* **table styling:** remove extra left and right borders from table header ([2a1f54a](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/2a1f54a))


### Features

* **bump:** deps all rb components ([9d230e3](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9d230e3))
* **components:** document icon-valign for rb-button and rb-popover ([a7645c1](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/a7645c1))
* **components:** document the name attribute for all rb form controls ([f5e37ee](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f5e37ee))
* **components:** place open toggles on all of api sections ([4562b48](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/4562b48))
* **css variables:** place toggles on all component css variable sections ([6a66337](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6a66337))
* **css-variables:** automate the documenting of css variables ([d2d9f07](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d2d9f07))
* **dogfood:** swap in rb-textarea ([533658d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/533658d))
* **getting started page:** update documentation for easier understanding ([f56b68b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f56b68b))
* **rb-dropdown:** add it to the showcase but only expose it in the dev environment ([7480873](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7480873))
* **rb-nav:** add responsive options to configure and api section ([aa91d8f](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/aa91d8f))
* **rb-popover:** document pin option ([d395229](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d395229))
* **rb-popover:** document how to use with all rb form controls ([5bbf67d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/5bbf67d))
* **rb-textarea:** create showcase page for it ([69dd037](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/69dd037))
* **rba-css-vars:** create and add it for displaying rb component's css variables ([1e5ae44](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/1e5ae44))
* **rba-code:** create and add it to the showcase for displaying code awesomely ([39827d2](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/39827d2))
* **rba-popover-value:** create and add it to all rb form controls to easily view the demo's value ([6d926dd](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6d926dd))
* **rba-toggle:** create new directive rba-toggle ([afe94fc](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/afe94fc))


### Performance Improvements

* **server compression:** boost performance by [gzipping](https://www.npmjs.com/package/compression) server requests ([aaf879f](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/aaf879f))


### Dependencies

* **bump:**
	* client dep codemirror ([6e061bd](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6e061bd))
	* server dep marked ([7855347](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/7855347))



## [0.0.15](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.14...v0.0.15) (2018-12-05)


### Bug Fixes

* **modal:** from showing undefined when slot is empty ([a0ada3a](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/a0ada3a))
* **rb-modal:** set scope.a.show to false when the modal closes ([4bab171](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/4bab171))


### Features

* **alina theme:** create it ([8fb3f3b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/8fb3f3b))
* **testing-theme:** create it ([b732a71](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b732a71))
* **dog food:** swap in rb-checkboxes ([6190d4a](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6190d4a))
* **rb-alert:** document new css variables radius, width and style ([c132cbf](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c132cbf))
* **rb-alert:** document secondary kind ([411dac8](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/411dac8))
* **rb-button:** add secondary css variables ([b5d9666](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b5d9666))
* **rb-button:** document its css variables ([4685f21](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/4685f21))
* **rb-button:** document secondary kind ([bffe6a8](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/bffe6a8))
* **rb-checkboxes:** add it and create showcase it's pages ([b1e7176](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b1e7176))
* **rb-checkboxes:** add api for validation and multiple value types ([6c57824](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6c57824))
* **rb-checkboxes:** make it available to the world ([e4bd02e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/e4bd02e))
* **rb-modal:** add documentation for no-backdrop ([be1e55f](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/be1e55f))
* **rb-modal:** make it available to the world ([c975562](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c975562))
* **rb-modal:** update showcase page with better example content ([6e1a245](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6e1a245))
* **rb-popover:** document its css variables ([74ed1df](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/74ed1df))
* **validation example:** add rb-checkboxes ([3d07fc7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/3d07fc7))


### Dependencies

* **bump:** deps all rb components ([23521b7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/23521b7))



## [0.0.14](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.13...v0.0.14) (2018-11-13)


### Bug Fixes

* **builder:** remove extra quotes on rb-checkbox when value is a js primitive ([ec18f8c](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/ec18f8c))
* **form validation example:** add name property to rb-checkbox for form submission ([678e6e9](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/678e6e9))
* **icon spacing:** when beside text ([b1859dc](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b1859dc))
* **navigation:** on route change set window scroll position to top ([76d9804](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/76d9804))
* **rb event service:** from not removing event listeners ([f52aaab](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f52aaab))
* **rb-checkbox:** add bumper for inline option ([af4a819](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/af4a819))
* **resetting checkbox:** when clicking the reset button on the demo forms ([6846d9a](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6846d9a))
* **windows:** main nav from dropping to the next line ([9283c7c](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9283c7c))


### Features

* **automation:** automatically create two way binding with angular and rb form control's when they are inserted into the dom ([b9258d5](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b9258d5))
* **rb-checkbox:** add support for boolean, string, number and object types for value ([94b20c6](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/94b20c6))
* **crud example:** add it ([a589a39](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/a589a39))
* **rb-alert:** add documentation for rb-alert's css variables ([d4b5d25](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d4b5d25))
* **rb-checkbox:** add it to the showcase ([fa37007](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/fa37007))
* **rb-checkbox:** add options inline, horizontal and right and swap in rb-checkbox throughout the showcase ([1c62c9d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/1c62c9d))


### Performance Improvements

* **builder:** add a debounce for better performance ([d8b5a25](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/d8b5a25))


### Dependencies

* **bump:** deps all rb components ([5b4eb34](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/5b4eb34))



## [0.0.13](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.12...v0.0.13) (2018-09-26)


### Features

* **changelog:** add a changelog section on every component page ([019e8da](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/019e8da))
* **rb-icon:** add vertical option ([bb7b406](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/bb7b406))
* **rb-modal:** add header and footer options ([9d5735b](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9d5735b))
* **rb-radios:** add validation option ([f514358](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f514358))


### Dependencies

* **bump:** deps all rb components ([646291d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/646291d))



## [0.0.12](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.11...v0.0.12) (2018-09-14)


### Features

* **bump:** deps all rb components ([9d1a4f0](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9d1a4f0))
* **rb-modal:** add unclosable to api section ([945302e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/945302e))
* **rb-modal:** unclosable option ([66f9a35](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/66f9a35))



## [0.0.11](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.10...v0.0.11) (2018-09-08)


Quick release to remove the rb-modal link. It's not quite ready yet.



## [0.0.10](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.9...v0.0.10) (2018-09-08)


### Bug Fixes

* **rb-input:** [icon-source option](https://github.com/rapid-build-ui/rb-input/commit/18e5809) by bumping rb-input to v0.0.8 ([f97352e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f97352e))



## [0.0.9](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.8...v0.0.9) (2018-09-05)


### Bug Fixes

* **display:** main header nav from dropping down at smaller screen widths ([2d35846](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/2d35846))
* **layout:** wolverine's main content to extend full height when viewport is small ([81e9cac](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/81e9cac))


### Features

* **new site examples section:** add it with one page, form validation ([9275e8d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/9275e8d))
* **form validation:** add html for the example form ([4d0a4c8](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/4d0a4c8))
* **rb-modal:** add api description for content option ([fbb2b8e](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/fbb2b8e))
* **rb-modal:** add content option to showcase page ([f4f82e5](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/f4f82e5))
* **rb-modal:** add component ([6c2a5a4](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/6c2a5a4))
* **rb components:** bump all rb components to the versions that use rb-base v0.0.2 ([61e4eb2](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/61e4eb2))



## [0.0.8](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.7...v0.0.8) (2018-08-31)


Release only includes a couple verbiage tweaks.



## [0.0.7](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.6...v0.0.7) (2018-08-30)


### Features

* **homepage:** update with standout logo ([40bf1e7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/40bf1e7))
* **dog food:** use rb-radios instead of normal radios ([44723b9](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/44723b9))
* **rb radios showcase:** add api option to handle array of objects for data ([44c3ce7](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/44c3ce7))
* **source nav:** update urls on dev site to point to github continuous branch ([e6de8ea](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/e6de8ea))
* **rb components:** bump all rb components to the versions that use rb-base ([dbac498](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/dbac498))



## [0.0.6](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.5...v0.0.6) (2018-07-11)


### Features

* **radios api:** documentation complete ([3c4e0b4](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/3c4e0b4))
* **radios showcase page:** add horizontal api option ([70476f0](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/70476f0))
* **responsive table:** add responsive support for all tables, simple version ([512adb0](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/512adb0))
* **rb components:** bumped all of them which contain bug fixes and features ([b61551d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/b61551d))



## [0.0.5](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.4...v0.0.5) (2018-07-08)


Release includes rb-components that use web components library [SkateJS](http://skatejs.netlify.com/) and view renderer [lit-html](https://polymer.github.io/lit-html/) instead of Polymer 3.


### Features

* **rb-radios:** add initial showcase page



## [0.0.4](https://github.com/rapid-build-ui/rapid-build-ui.io/compare/v0.0.3...v0.0.4) (2018-06-22)


### Bug Fixes

* **safari support:** fix safari from crashing by updating @rapid-build-ui/rb-button dep ([0521e18](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/0521e18))
* **fix icons:** from not showing up for all evergreen browsers by updating @rapid-build-ui/rb-icon dep ([0521e18](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/0521e18))
* **polyfill:** add webcomponents-loader.js polyfill to somewhat fix firefox and edge ([c6a9c53](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c6a9c53))


### Features

* **dog food:** use rb-input component instead of angular directive rba-input ([17c26bb](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/17c26bb))
* **getting started page:** update it ([c37bc2d](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/c37bc2d))
* **browser support page:** update it ([3728539](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/3728539))
* **rb-input showcase page:** add inline option ([dfaa34f](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/dfaa34f))
* **copy component install button:** create it for easy copying of component install cli ([afb0468](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/afb0468))
* **copy component markup button:** create it for easy copying of component(s) markup ([2920c22](https://github.com/rapid-build-ui/rapid-build-ui.io/commit/2920c22))



