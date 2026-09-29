# Ember Upgrade: 4.12 → 5.x

## Overview

- **Source LTS**: Ember 4.12
- **Target LTS**: TBD (5.4 is the first 5.x LTS)
- **Status**: Planned — not started
- **Prerequisite**: `ember-3.28-to-4.0.md` upgrade complete and merged to develop

---

## Pre-Migration Checklist

- [ ] All tests green on Ember 4.12
- [ ] Embroider compatibility assessed (classic pipeline vs Embroider)
- [ ] `@classic` audit — identify components ready to convert to native Glimmer
- [ ] ember-data 4.x → 5.x API changes reviewed (RequestManager, etc.)
- [ ] Run `ember-cli-update` from 4.12 → 5.x to surface config/blueprint diffs

---

## Known Ember 5.x Changes to Prepare For

- `ember-data` 5.x introduces `RequestManager` as the default networking layer
- Further deprecation of `ArrayProxy`, `ObjectProxy` patterns
- Continued push toward Glimmer components (no `@classic`)
- Potential removal of remaining classic class APIs

---

*Populate this file as the upgrade progresses.*
