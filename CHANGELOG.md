<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.1](https://github.com/sanity-io/dashboard/compare/v4.1.0...v4.1.1) (2024-12-11)

### Bug Fixes

- **deps:** silence audit warnings ([957f4cf](https://github.com/sanity-io/dashboard/commit/957f4cf21f4e4b4534c87d37e3b19d4c2e619f00))
- **deps:** upgrade sanity dev dependency ([#64](https://github.com/sanity-io/dashboard/issues/64)) ([7b9ff32](https://github.com/sanity-io/dashboard/commit/7b9ff3290b40997539d50f7864a77fdedcbf8762))
- flag compatibility with React 19 ([f4ef8ed](https://github.com/sanity-io/dashboard/commit/f4ef8ed22dc230f97c050c2fb964f1999fe67816))

## [4.1.0](https://github.com/sanity-io/dashboard/compare/v4.0.0...v4.1.0) (2024-10-01)

### Features

- list all studios from user applications list ([#62](https://github.com/sanity-io/dashboard/issues/62)) ([f757d58](https://github.com/sanity-io/dashboard/commit/f757d58b7c7a6b5b61dd4c77de253102f22fda33))

### Bug Fixes

- **deps:** update non-major ([#60](https://github.com/sanity-io/dashboard/issues/60)) ([13b4b5a](https://github.com/sanity-io/dashboard/commit/13b4b5a499e22e54d3162b15757d54b3189f2170))

## [4.0.0](https://github.com/sanity-io/dashboard/compare/v3.1.6...v4.0.0) (2024-07-15)

### ⚠ BREAKING CHANGES

- This module now requires the peer dependency `styled-components` greater than or
  equal to version 6.1. This aligns with Sanity v3.37.0 and higher.
- This module now requires Node.js 18 or higher.
  This shouldn't really impact anyone beyond developers of the module, since this really only applies
  to the build tooling.

### Bug Fixes

- add request tags for all dashboard widget api requests ([528b92d](https://github.com/sanity-io/dashboard/commit/528b92dc2f1869d2d1fcff46000cb1b78aae675f))
- **projectInfo:** show external studio host if present ([36c6882](https://github.com/sanity-io/dashboard/commit/36c688211145e3dbed283b28f97898d13d6d77ef))
- **projectUsers:** show all of a users' roles, fix invite link + text ([4699add](https://github.com/sanity-io/dashboard/commit/4699add5706e3381d59c8d70353d30a7ce1b4123))
- require styled-components ^6.1, node >= 18 ([b0d9cb6](https://github.com/sanity-io/dashboard/commit/b0d9cb6726ec68d97550d1a465196835f463366d))
- upgrade build tooling, es/cjs export definitions ([21eaa29](https://github.com/sanity-io/dashboard/commit/21eaa29847b7157881d98c171fbaca74865cce17))
- use named import for styled-components ([5eec15a](https://github.com/sanity-io/dashboard/commit/5eec15ad6a9fdfae4d05b186576459bf302d3898))

## [3.1.6](https://github.com/sanity-io/dashboard/compare/v3.1.5...v3.1.6) (2023-11-30)

### Bug Fixes

- **deps:** Update dependency styled-components to v6 ([#41](https://github.com/sanity-io/dashboard/issues/41)) ([4db1ccb](https://github.com/sanity-io/dashboard/commit/4db1ccb64eff362e97c5c21d027f1fec9519f5db))

## [3.1.5](https://github.com/sanity-io/dashboard/compare/v3.1.4...v3.1.5) (2023-08-02)

### Bug Fixes

- **deps:** update dependencies (non-major) ([#18](https://github.com/sanity-io/dashboard/issues/18)) ([657bcfc](https://github.com/sanity-io/dashboard/commit/657bcfc631355b5f53727998e6d8ab75539ce577))

## [3.1.4](https://github.com/sanity-io/dashboard/compare/v3.1.3...v3.1.4) (2023-05-03)

### Bug Fixes

- **docs:** Update README.md ([#31](https://github.com/sanity-io/dashboard/issues/31)) ([c7450b9](https://github.com/sanity-io/dashboard/commit/c7450b98f417ed3f09e1f1a915ca59f082b0106a))

## [3.1.3](https://github.com/sanity-io/dashboard/compare/v3.1.2...v3.1.3) (2023-01-31)

### Bug Fixes

- **docs:** add instructions on customizing name, title, icon ([e7bb30b](https://github.com/sanity-io/dashboard/commit/e7bb30b34402d216d53a54fa65a37e098300fc6c))

## [3.1.2](https://github.com/sanity-io/dashboard/compare/v3.1.1...v3.1.2) (2023-01-04)

### Bug Fixes

- **deps:** applied npx @sanity/plugin-kit inject ([300067e](https://github.com/sanity-io/dashboard/commit/300067e12549d04817d1dae24a61992b57a426fa))

## [3.1.1](https://github.com/sanity-io/dashboard/compare/v3.1.0...v3.1.1) (2022-12-22)

### Bug Fixes

- **ui:** dashboard content overflowed layout ([0aa8cbe](https://github.com/sanity-io/dashboard/commit/0aa8cbed0d4775d667d51c86ea61e645c89c1b9a))

## [3.1.0](https://github.com/sanity-io/dashboard/compare/v3.0.0...v3.1.0) (2022-12-22)

### Features

- make name and icon configurable ([6db4c65](https://github.com/sanity-io/dashboard/commit/6db4c6573d558881621b764a4c124a431a1071d8))
- make title configurable ([36fcaf8](https://github.com/sanity-io/dashboard/commit/36fcaf8fa8274aa8724a2bd6ae33c0b50e5bfd6e))

## [3.0.0](https://github.com/sanity-io/dashboard/compare/v2.35.2...v3.0.0) (2022-11-25)

### ⚠ BREAKING CHANGES

- this version does not work in Sanity Studio v2
- this version does not work in Sanity Studio v2
- semantic-release is being difficult

### Features

- dummy breaking to trick semantic-release ([53dd9dc](https://github.com/sanity-io/dashboard/commit/53dd9dcae19e2d6db97e11302867c3838ff155c6))
- initial release for Sanity Studio v3 ([4e3db99](https://github.com/sanity-io/dashboard/commit/4e3db99e83e49c5876db83c3fc3fe0ff5c3d3725))
- initial Sanity Studio v3 release ([9ea2f0a](https://github.com/sanity-io/dashboard/commit/9ea2f0a7146464f197598a63336f2500ff836aae))

### Bug Fixes

- compiled for dev-preview.22 ([3b97135](https://github.com/sanity-io/dashboard/commit/3b97135143ee29f2e1c2bae6f8e6ae051a943d4b))
- compiled for sanity 3.0.0-rc.0 ([74dfd9a](https://github.com/sanity-io/dashboard/commit/74dfd9a3db922649f32e52f990a80c5de7d1a752))
- **deps:** dev-preview.21 ([730cc2a](https://github.com/sanity-io/dashboard/commit/730cc2a25a36f57e5c3310079e262b39d8412774))
- **deps:** pin dependencies ([5fc3f9d](https://github.com/sanity-io/dashboard/commit/5fc3f9d276116dffcc957ed39b3a3e876a479fbf))
- **deps:** pkg-utils & @sanity/plugin-kit ([7d63c7c](https://github.com/sanity-io/dashboard/commit/7d63c7c05d274ab5d26fefd3da7807264f17b468))
- **deps:** sanity ^3.0.0 (works with rc.3) ([eeb0c7c](https://github.com/sanity-io/dashboard/commit/eeb0c7cdfd628ead3dcab39f7ce3cb2df2f1f784))
- **deps:** sanity 3.0.0-dev-preview.17 ([bed90ee](https://github.com/sanity-io/dashboard/commit/bed90eeaa3c6d2f9a8cda3a9c597e792d2816cff))
- **deps:** update dependency @sanity/icons to v1.3.9-beta.3 ([#12](https://github.com/sanity-io/dashboard/issues/12)) ([b547871](https://github.com/sanity-io/dashboard/commit/b5478710f11d58d898e1eaf638b702dece12edaa))
- **deps:** update dependency rxjs to ^6.6.7 ([#4](https://github.com/sanity-io/dashboard/issues/4)) ([b79f4be](https://github.com/sanity-io/dashboard/commit/b79f4bec0661c32f8b1a797f82ea22195ec583d9))
- **deps:** updated deps and added semver workflow ([68d714e](https://github.com/sanity-io/dashboard/commit/68d714e2b3457fbd4ab112a7cbc6194057b61e36))

## [3.0.0-v3-studio.8](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.7...v3.0.0-v3-studio.8) (2022-11-04)

### Bug Fixes

- **deps:** pkg-utils & @sanity/plugin-kit ([7d63c7c](https://github.com/sanity-io/dashboard/commit/7d63c7c05d274ab5d26fefd3da7807264f17b468))

## [3.0.0-v3-studio.7](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.6...v3.0.0-v3-studio.7) (2022-11-04)

### Bug Fixes

- **deps:** pin dependencies ([5fc3f9d](https://github.com/sanity-io/dashboard/commit/5fc3f9d276116dffcc957ed39b3a3e876a479fbf))
- **deps:** update dependency @sanity/icons to v1.3.9-beta.3 ([#12](https://github.com/sanity-io/dashboard/issues/12)) ([b547871](https://github.com/sanity-io/dashboard/commit/b5478710f11d58d898e1eaf638b702dece12edaa))
- **deps:** update dependency rxjs to ^6.6.7 ([#4](https://github.com/sanity-io/dashboard/issues/4)) ([b79f4be](https://github.com/sanity-io/dashboard/commit/b79f4bec0661c32f8b1a797f82ea22195ec583d9))

## [3.0.0-v3-studio.6](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.5...v3.0.0-v3-studio.6) (2022-11-02)

### Bug Fixes

- compiled for sanity 3.0.0-rc.0 ([74dfd9a](https://github.com/sanity-io/dashboard/commit/74dfd9a3db922649f32e52f990a80c5de7d1a752))

## [3.0.0-v3-studio.5](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.4...v3.0.0-v3-studio.5) (2022-10-27)

### Bug Fixes

- compiled for dev-preview.22 ([3b97135](https://github.com/sanity-io/dashboard/commit/3b97135143ee29f2e1c2bae6f8e6ae051a943d4b))

## [3.0.0-v3-studio.4](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.3...v3.0.0-v3-studio.4) (2022-10-07)

### Bug Fixes

- **deps:** dev-preview.21 ([730cc2a](https://github.com/sanity-io/dashboard/commit/730cc2a25a36f57e5c3310079e262b39d8412774))

## [3.0.0-v3-studio.3](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.2...v3.0.0-v3-studio.3) (2022-09-15)

### Bug Fixes

- **deps:** sanity 3.0.0-dev-preview.17 ([bed90ee](https://github.com/sanity-io/dashboard/commit/bed90eeaa3c6d2f9a8cda3a9c597e792d2816cff))

## [3.0.0-v3-studio.2](https://github.com/sanity-io/dashboard/compare/v3.0.0-v3-studio.1...v3.0.0-v3-studio.2) (2022-09-14)

### ⚠ BREAKING CHANGES

- semantic-release is being difficult

### Features

- dummy breaking to trick semantic-release ([53dd9dc](https://github.com/sanity-io/dashboard/commit/53dd9dcae19e2d6db97e11302867c3838ff155c6))

### Bug Fixes

- **deps:** updated deps and added semver workflow ([68d714e](https://github.com/sanity-io/dashboard/commit/68d714e2b3457fbd4ab112a7cbc6194057b61e36))
