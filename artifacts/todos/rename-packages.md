# RENAME PACKAGES

* **@rapid-build-ui/cli**
	* renamed from utils
	* convert to global npm package
* **@rapid-build-ui/base**
	* renamed from rb-base

## CLI (name: rapid-build-ui)

#### EXISTING
* rapid-build-ui ci component continuous
* rapid-build-ui ci component release
* rapid-build-ui ci showcase  continuous
* rapid-build-ui ci showcase  release
* rapid-build-ui ci utils     continuous
* rapid-build-ui ci utils     release

* rapid-build-ui bump component patch src/client/scripts/rb-input.js
* rapid-build-ui bump showcase  patch
* rapid-build-ui bump utils     patch

#### NEW TODO (move from showcase)
* rapid-build-ui link-component
	* runs yarn link on dist/client
* rapid-build-ui link-component-deps
	* cd's to all component dir then runs link-component
* rapid-build-ui install-linked-components
	* runs yarn link @rapid-build-ui/rb-alert...
	* names from src/client/package.json
* rapid-build-ui setup-components
	* cd's to all component dir then runs git pull then link-component
* rapid-build-ui create-component
* rapid-build-ui create-mixin