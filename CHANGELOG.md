# Changelog for [mdEditor](https://github.com/adiwg/mdEditor)

## v1.3.2 (2006-02-05)

### Bug fixes

  - Can not add organization contact [#796](https://github.com/adiwg/mdEditor/issues/796)
  - Dates-time values not displayed with proper precision [#804](https://github.com/adiwg/mdEditor/issues/804)

### Associated Pull requests

  - https://github.com/adiwg/mdEditor/pull/688
  - https://github.com/adiwg/mdEditor/pull/801

**GitHub Changelog**: https://github.com/adiwg/mdEditor/compare/v1.3.1...v1.3.2


## v1.3.1 (2026-01-22)

Minor documentation updates. This is the last release that is based on the Ember 3.15 framework.
Future development will move to using [Ember 3.28](https://emberjs.com/releases/lts/), an intermediate
step to provide backward compatibility before upgrading to a newer LTS version of Ember.


  - Minor updates to [CHANGELOG.md](https://github.com/adiwg/mdEditor/blob/develop/CHANGELOG.md)
  - Minor updates to [PULL_REQUEST_TEMPLATE.md](https://github.com/adiwg/mdEditor/blob/develop/PULL_REQUEST_TEMPLATE.md)
  - Remove unused ISSUE_TEMPLATE.md from root directory
  - Bump version to 1.3.1

**GitHub Changelog**: https://github.com/adiwg/mdEditor/compare/v1.3.0...v1.3.1


## v1.3.0 (2026-01-16)

### New features

  - Support temporal extents (EX_TemporalExtent) [#95](https://github.com/adiwg/mdEditor/issues/95)
  - Support vertical extents (EX_VerticalExtent) [#95](https://github.com/adiwg/mdEditor/issues/95)
  - Support PouchDB storage [#700](https://github.com/adiwg/mdEditor/issues/170)
  - Support publishing to CouchDB [#170](https://github.com/adiwg/mdEditor/pull/700)
  - Update dateUpdated when dirtyHash changes [#339](https://github.com/adiwg/mdEditor/issues/339)
  - Support import and export of reduced resolution ISO dates YYYY and YYYY-MM [#483](https://github.com/adiwg/mdEditor/issues/483)
  - Support full Lineage Source Citation [#491](https://github.com/adiwg/mdEditor/issues/491)
  - Support Releasability element (MD_Releasability) [#570](https://github.com/adiwg/mdEditor/issues/570)
  - Load Custom Profiles from URL [#584](https://github.com/adiwg/mdEditor/issues/584)
  - Specify Custom thesauri within profiles [#584](https://github.com/adiwg/mdEditor/issues/584)
  - Support Data Quality Reports (DQ_Element) [#604](https://github.com/adiwg/mdEditor/issues/604)
  - Support Data Quality Results (DQ_Result) [#604](https://github.com/adiwg/mdEditor/issues/604)
  - Add enhanced error reporting [#696](https://github.com/adiwg/mdEditor/pull/696)
  - Define ScienceBase metadata publishing endpoint in user settings [#708](https://github.com/adiwg/mdEditor/issues/708)
  - Allow user to set default CouchDB parameters [#756](https://github.com/adiwg/mdEditor/issues/756)
  - Expose the `itis-proxy-url` as a user setting [#762](https://github.com/adiwg/mdEditor/issues/762)

### Updates

  - Display citation dates in ISO YYYY-MM-DD format [#205](https://github.com/adiwg/mdEditor/issues/205)
  - Taxonomy Modifications [#528](https://github.com/adiwg/mdEditor/issues/528)
  - Update internal data model to include dictionaryId within dataDictionary object [#705](https://github.com/adiwg/mdEditor/issues/705)
  - Refactor default mdTranslator and itisProxy URLs [#725](https://github.com/adiwg/mdEditor/issues/725)
  - Refactor publish-options in user settings to support multiple endpoints [#726](https://github.com/adiwg/mdEditor/issues/726)
  - Derive itisProxyUrl from the mdTranslatorAPI value [#736](https://github.com/adiwg/mdEditor/issues/736)
  - Remove the default mdTranslatorAPI value from the setting.js file [#737](https://github.com/adiwg/mdEditor/issues/737)
  - Open ScienceBase Manager in new window [#745](https://github.com/adiwg/mdEditor/issues/745)
  - Remove trailing slash from publishing endpoint specified in user settings [#751](https://github.com/adiwg/mdEditor/issues/751)
  - Update CONTRIBUTING.md (no trailing slash for user specified settings) [#752](https://github.com/adiwg/mdEditor/issues/752)
  - Refactor ScienceBase user setting to support updated "publish-options" schema [#764](https://github.com/adiwg/mdEditor/issues/764)
  - Update gh-pages-deploy.yml to use Node version 18 and enable corepack
  - Update mdCodes to 2.10.1
  - Update mdJson-schemas to 2.10.2

### Bug fixes

  - Date control should be datetime [#246](https://github.com/adiwg/mdEditor/issues/246)
  - Assign ember record identifiers ("id") based on UUID's [#481](https://github.com/adiwg/mdEditor/issues/481)
  - Adding a data distribution causes save and cancel buttons to become unresponsive [#610](https://github.com/adiwg/mdEditor/issues/610)
  - White dot of death [#659](https://github.com/adiwg/mdEditor/issues/659)
  - Import CSV not working for data dictionary creation [#665](https://github.com/adiwg/mdEditor/issues/665)
  - Export mdJSON function does not write dictionaryId [#679](https://github.com/adiwg/mdEditor/issues/679)
  - Excess data embedded into mdEditor-Json record object on import [#682](https://github.com/adiwg/mdEditor/issues/682)
  - Wrong timestamp applied to exported files [#694](https://github.com/adiwg/mdEditor/issues/694)
  - Import mdJSON function does not read dictionaryId [#704](https://github.com/adiwg/mdEditor/issues/704)
  - If AutoSave is On, record edits not synced to Pouch [#711](https://github.com/adiwg/mdEditor/issues/711)
  - Form data not committed to datastore [#712](https://github.com/adiwg/mdEditor/issues/712)
  - CSDGM import throws ReferenceError: uuidV4 is not defined [#714](https://github.com/adiwg/mdEditor/issues/714)
  - Data dictionary identifier is not imported [#716](https://github.com/adiwg/mdEditor/issues/716)
  - Update mdEditor to use mdJson-schemas v2.10.2 [#717](https://github.com/adiwg/mdEditor/issues/717)
  - Can not copy metadata, contact, or dictionary records [#718](https://github.com/adiwg/mdEditor/issues/718)
  - Console error: You must include an 'id' for dictionary in an object passed to 'push' [#722](https://github.com/adiwg/mdEditor/issues/722)
  - Manually saving a record throws error updatePouchRecord [#723](https://github.com/adiwg/mdEditor/issues/723)
  - Validation error "Minimum Items Required for Contacts" links to wrong path [#724](https://github.com/adiwg/mdEditor/issues/724)
  - Selecting Add Schema results in unresponsive browser [#728](https://github.com/adiwg/mdEditor/issues/728)
  - Custom profile names do not display in profile pick list [#729](https://github.com/adiwg/mdEditor/issues/729)
  - Go To Error Button Does Not Work When Viewing a Record [#731](https://github.com/adiwg/mdEditor/issues/731)
  - Custom schemas do not import [#734](https://github.com/adiwg/mdEditor/issues/734)
  - Trap for missing mdTranslator API URL [#738](https://github.com/adiwg/mdEditor/issues/738)
  - Profiles do not load properly from mdEditor-json file and cause unresponsive browser [#740](https://github.com/adiwg/mdEditor/issues/740)
  - After publishing a record to ScienceBase, Pouch record is not updated with latest published date and time [#742](https://github.com/adiwg/mdEditor/issues/742)
  - Cannot save new metadata record with multiple resource types [#743](https://github.com/adiwg/mdEditor/issues/743)
  - Entering Raster Description throws console error and can not be saved [#744](https://github.com/adiwg/mdEditor/issues/744)
  - Save button not activated when copying record [#748](https://github.com/adiwg/mdEditor/issues/748)
  - Records from imported mdEditor file are not shown in Pouch [#750](https://github.com/adiwg/mdEditor/issues/750)
  - Dictionary records do not import [#754](https://github.com/adiwg/mdEditor/issues/754)
  - Contacts not displayed by metadata records [#759](https://github.com/adiwg/mdEditor/issues/759)
  - Export functions assign wrong schema version [#768](https://github.com/adiwg/mdEditor/issues/768)
  - Dictionaries imported from mdJson are not linked to metadata record [#770](https://github.com/adiwg/mdEditor/issues/770)

### Removed

  - Removed unused file: app/services/data-mapper.js

### Associated Pull requests

  - https://github.com/adiwg/mdEditor/pull/637
  - https://github.com/adiwg/mdEditor/pull/655
  - https://github.com/adiwg/mdEditor/pull/656
  - https://github.com/adiwg/mdEditor/pull/657
  - https://github.com/adiwg/mdEditor/pull/661
  - https://github.com/adiwg/mdEditor/pull/662
  - https://github.com/adiwg/mdEditor/pull/667
  - https://github.com/adiwg/mdEditor/pull/669
  - https://github.com/adiwg/mdEditor/pull/671
  - https://github.com/adiwg/mdEditor/pull/678
  - https://github.com/adiwg/mdEditor/pull/685
  - https://github.com/adiwg/mdEditor/pull/690
  - https://github.com/adiwg/mdEditor/pull/696
  - https://github.com/adiwg/mdEditor/pull/697
  - https://github.com/adiwg/mdEditor/pull/700
  - https://github.com/adiwg/mdEditor/pull/706
  - https://github.com/adiwg/mdEditor/pull/707
  - https://github.com/adiwg/mdEditor/pull/709
  - https://github.com/adiwg/mdEditor/pull/719
  - https://github.com/adiwg/mdEditor/pull/730
  - https://github.com/adiwg/mdEditor/pull/732
  - https://github.com/adiwg/mdEditor/pull/739
  - https://github.com/adiwg/mdEditor/pull/746
  - https://github.com/adiwg/mdEditor/pull/747
  - https://github.com/adiwg/mdEditor/pull/749
  - https://github.com/adiwg/mdEditor/pull/753
  - https://github.com/adiwg/mdEditor/pull/757
  - https://github.com/adiwg/mdEditor/pull/760
  - https://github.com/adiwg/mdEditor/pull/763
  - https://github.com/adiwg/mdEditor/pull/765
  - https://github.com/adiwg/mdEditor/pull/766
  - https://github.com/adiwg/mdEditor/pull/767
  - https://github.com/adiwg/mdEditor/pull/769
  - https://github.com/adiwg/mdEditor/pull/771
  - https://github.com/adiwg/mdEditor/pull/772
  - https://github.com/adiwg/mdEditor/pull/773
  - https://github.com/adiwg/mdEditor/pull/774

**GitHub Changelog**: https://github.com/adiwg/mdEditor/compare/v1.2.1...v1.3.0


---
# This is when we weren't really good at summarizing changes!

## v1.2.1 (2024-02-18)

  - https://github.com/adiwg/mdEditor/commits/v1.2.1


## [v0.10.0](https://github.com/adiwg/mdEditor/tree/v0.10.0)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.9.0...v0.10.0)

**Implemented enhancements:**

- Add domain indicator to attribute list [#350](https://github.com/adiwg/mdEditor/issues/350)
- Input validation icons should not overlap placeholders  [#338](https://github.com/adiwg/mdEditor/issues/338)
- Blocks of text with line breaks are not imported correctly [#294](https://github.com/adiwg/mdEditor/issues/294)

**Fixed bugs:**

- Metadata Repositories potential bug [#368](https://github.com/adiwg/mdEditor/issues/368)

**Closed issues:**

- Sourceforge mdtoolkit-announcement link [#375](https://github.com/adiwg/mdEditor/issues/375)
- Associated Resource [#367](https://github.com/adiwg/mdEditor/issues/367)
- Add basic visual style guide [#364](https://github.com/adiwg/mdEditor/issues/364)
- "Position" misspelled in Contact metadata [#362](https://github.com/adiwg/mdEditor/issues/362)
- Add ID column to dictionary dashboard [#336](https://github.com/adiwg/mdEditor/issues/336)
- Copy dictionary does not generate new dictionaryId [#335](https://github.com/adiwg/mdEditor/issues/335)
- Upgrade to EmberJS 3.12 LTS [#317](https://github.com/adiwg/mdEditor/issues/317)
- Remove "Attribute" from "Primary" and "Foreign" element names [#278](https://github.com/adiwg/mdEditor/issues/278)
- Rename Attribute "Name" to "Code Name" [#276](https://github.com/adiwg/mdEditor/issues/276)
- Remove the word "content" from domain item reference [#273](https://github.com/adiwg/mdEditor/issues/273)
- Add support for custom profiles [#176](https://github.com/adiwg/mdEditor/issues/176)

**Merged pull requests:**

- Feature 350 and 176 [#377](https://github.com/adiwg/mdEditor/pull/377) ([jlblcc](https://github.com/jlblcc))
- Feature/375 sourceforge [#376](https://github.com/adiwg/mdEditor/pull/376) ([dvonanderson](https://github.com/dvonanderson))
- Merge in fix-368 [#373](https://github.com/adiwg/mdEditor/pull/373) ([jlblcc](https://github.com/jlblcc))
- Minor spelling and label fixes [#371](https://github.com/adiwg/mdEditor/pull/371) ([dvonanderson](https://github.com/dvonanderson))
- Fix 368 metadata repo [#370](https://github.com/adiwg/mdEditor/pull/370) ([jlblcc](https://github.com/jlblcc))
- Fixed "Postion" in contact.show.index route [#365](https://github.com/adiwg/mdEditor/pull/365) ([dvonanderson](https://github.com/dvonanderson))
- maintenance-317-upgrade-ember-3-12-lts [#363](https://github.com/adiwg/mdEditor/pull/363) ([jlblcc](https://github.com/jlblcc))
- - Added css overflow to inputs to help truncate longer text. [#357](https://github.com/adiwg/mdEditor/pull/357) ([dvonanderson](https://github.com/dvonanderson))
- Changed domain-item from md-input over to md-textarea [#356](https://github.com/adiwg/mdEditor/pull/356) ([dvonanderson](https://github.com/dvonanderson))

## [v0.9.0](https://github.com/adiwg/mdEditor/tree/v0.9.0) (2019-11-05)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.8.0...v0.9.0)

**Implemented enhancements:**

- Support longer profile names [#333](https://github.com/adiwg/mdEditor/issues/333)
- Add applicationProfile and protocolRequest to onlineResource [#332](https://github.com/adiwg/mdEditor/issues/332)
- Check for properties.id when importing features [#330](https://github.com/adiwg/mdEditor/issues/330)
- Support collapsible text-area [#329](https://github.com/adiwg/mdEditor/issues/329)
- Show alerts when tables are empty [#327](https://github.com/adiwg/mdEditor/issues/327)
- Transfer Option in distributor should be an array [#324](https://github.com/adiwg/mdEditor/issues/324)
- Re-factor Extent section [#320](https://github.com/adiwg/mdEditor/issues/320)
- Add 19115-1 to translation options [#316](https://github.com/adiwg/mdEditor/issues/316)
- Distribution page layout [#290](https://github.com/adiwg/mdEditor/issues/290)
- Duplicate Allocation buttons [#282](https://github.com/adiwg/mdEditor/issues/282)
- Change empty array view [#253](https://github.com/adiwg/mdEditor/issues/253)
- Copy and delete actions for models [#53](https://github.com/adiwg/mdEditor/issues/53)
- Add version\(dev\) badge? [#50](https://github.com/adiwg/mdEditor/issues/50)
- Add not found route [#40](https://github.com/adiwg/mdEditor/issues/40)

**Fixed bugs:**

- The back button in ...distributor.transfer is broken [#343](https://github.com/adiwg/mdEditor/issues/343)
- Add navigation button to dictionary.show.edit.entity.import [#337](https://github.com/adiwg/mdEditor/issues/337)
- Fix rendering of secondary navigation bar [#334](https://github.com/adiwg/mdEditor/issues/334)
- Route model setup is not run after cancel [#326](https://github.com/adiwg/mdEditor/issues/326)
- Typo in bbox west longitude placeholder text [#325](https://github.com/adiwg/mdEditor/issues/325)
- Scroll spy length limited by displayed page length [#312](https://github.com/adiwg/mdEditor/issues/312)
- Content is lost or not being saved [#306](https://github.com/adiwg/mdEditor/issues/306)
- Secondary Navigation Bar does not adjust with page resize [#280](https://github.com/adiwg/mdEditor/issues/280)
- ScrollSpy highlighting wrong menu item [#196](https://github.com/adiwg/mdEditor/issues/196)

**Closed issues:**

- Add support for validating with custom schema [#299](https://github.com/adiwg/mdEditor/issues/299)
- Lineage Process Step description [#292](https://github.com/adiwg/mdEditor/issues/292)
- Attributes array panel "Code Name" not indicated 'required' [#277](https://github.com/adiwg/mdEditor/issues/277)
- Metadata Record Distribution starts with view [#271](https://github.com/adiwg/mdEditor/issues/271)
- Remove "Back to Overview" button from Dictionary windows [#268](https://github.com/adiwg/mdEditor/issues/268)
- Fast Scrolling list doesn't completely display on a small monitor [#236](https://github.com/adiwg/mdEditor/issues/236)
- Spatial extent component [#49](https://github.com/adiwg/mdEditor/issues/49)

**Merged pull requests:**

- v0.9.0 [#355](https://github.com/adiwg/mdEditor/pull/355) ([jlblcc](https://github.com/jlblcc))
- Feature 176 custom profile [#323](https://github.com/adiwg/mdEditor/pull/323) ([jlblcc](https://github.com/jlblcc))
- Feature 299 custom schema [#318](https://github.com/adiwg/mdEditor/pull/318) ([jlblcc](https://github.com/jlblcc))

## [v0.8.0](https://github.com/adiwg/mdEditor/tree/v0.8.0) (2019-04-23)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.7.1...v0.8.0)

**Implemented enhancements:**

- Rename Allocation Description to Comment [#283](https://github.com/adiwg/mdEditor/issues/283)

**Fixed bugs:**

- Version bound to incorrect property in md-transfer template  [#305](https://github.com/adiwg/mdEditor/issues/305)
- Once Date Type is set it cannot be blanked out; mismatch between date and date type [#304](https://github.com/adiwg/mdEditor/issues/304)
- Incorrect title on Import Data section [#295](https://github.com/adiwg/mdEditor/issues/295)
- Incorrect field mapping in allocation [#279](https://github.com/adiwg/mdEditor/issues/279)

**Closed issues:**

- Taxonomy [#101](https://github.com/adiwg/mdEditor/issues/101)
- Replace render with ember-elsewhere [#96](https://github.com/adiwg/mdEditor/issues/96)

**Merged pull requests:**

- Update CHANGELOG [#311](https://github.com/adiwg/mdEditor/pull/311) ([jlblcc](https://github.com/jlblcc))
- More Bug fixes for v0.8.0 [#310](https://github.com/adiwg/mdEditor/pull/310) ([jlblcc](https://github.com/jlblcc))
- v0.8.0 [#309](https://github.com/adiwg/mdEditor/pull/309) ([jlblcc](https://github.com/jlblcc))

## [v0.7.1](https://github.com/adiwg/mdEditor/tree/v0.7.1) (2019-03-12)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.7.0...v0.7.1)

**Fixed bugs:**

- Copy function is broken [#301](https://github.com/adiwg/mdEditor/issues/301)

**Merged pull requests:**

- Update CHANGELOG [#303](https://github.com/adiwg/mdEditor/pull/303) ([jlblcc](https://github.com/jlblcc))
- Fix copy, et. al [#302](https://github.com/adiwg/mdEditor/pull/302) ([jlblcc](https://github.com/jlblcc))
- Fix production build [#300](https://github.com/adiwg/mdEditor/pull/300) ([jlblcc](https://github.com/jlblcc))

## [v0.7.0](https://github.com/adiwg/mdEditor/tree/v0.7.0) (2019-03-11)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.6.1...v0.7.0)

**Implemented enhancements:**

- Update GCMD keywords to v8.6 [#265](https://github.com/adiwg/mdEditor/issues/265)
- Metadata Identifier lacking "Delete" function [#261](https://github.com/adiwg/mdEditor/issues/261)
- Use ember-ajax instead of jQuery.ajax [#238](https://github.com/adiwg/mdEditor/issues/238)
- Replace ember-pollboy with ember-concurrency  [#187](https://github.com/adiwg/mdEditor/issues/187)

**Fixed bugs:**

- In process-step template stepSource.value should be stepSource.description [#291](https://github.com/adiwg/mdEditor/issues/291)
- Changing 'resourceType' icon [#252](https://github.com/adiwg/mdEditor/issues/252)

**Closed issues:**

- Upgrade to Ember 3 [#255](https://github.com/adiwg/mdEditor/issues/255)
- Migrate bower dependencies to npm or yarn [#111](https://github.com/adiwg/mdEditor/issues/111)
- Upgrade to latest ember-leaflet [#71](https://github.com/adiwg/mdEditor/issues/71)
- Update to Ember 2.11.1 [#46](https://github.com/adiwg/mdEditor/issues/46)

**Merged pull requests:**

- Maintenance 255 ember3 [#298](https://github.com/adiwg/mdEditor/pull/298) ([jlblcc](https://github.com/jlblcc))
- Update bootstrap-sass [#297](https://github.com/adiwg/mdEditor/pull/297) ([jlblcc](https://github.com/jlblcc))
- maintenance-255-ember3 [#266](https://github.com/adiwg/mdEditor/pull/266) ([jlblcc](https://github.com/jlblcc))

## [v0.6.1](https://github.com/adiwg/mdEditor/tree/v0.6.1) (2018-11-09)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.6.0...v0.6.1)

**Implemented enhancements:**

- Change icon when help is active in the sidebar [#234](https://github.com/adiwg/mdEditor/issues/234)
- Import Metadata home page [#232](https://github.com/adiwg/mdEditor/issues/232)

**Fixed bugs:**

- Remove mdRecordId when generating mdJSON [#244](https://github.com/adiwg/mdEditor/issues/244)
- Locale required elements [#233](https://github.com/adiwg/mdEditor/issues/233)
- Attribute.allowMany is deprecated in mdJSON [#229](https://github.com/adiwg/mdEditor/issues/229)

**Closed issues:**

- Add Dictionary to product profile [#245](https://github.com/adiwg/mdEditor/issues/245)

**Merged pull requests:**

- Update CHANGELOG [#248](https://github.com/adiwg/mdEditor/pull/248) ([jlblcc](https://github.com/jlblcc))
- 0.6.1 [#247](https://github.com/adiwg/mdEditor/pull/247) ([jlblcc](https://github.com/jlblcc))

## [v0.6.0](https://github.com/adiwg/mdEditor/tree/v0.6.0) (2018-11-05)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.5.0...v0.6.0)

**Fixed bugs:**

- Don't strip sourceId from lineage when formatting mdJSON [#240](https://github.com/adiwg/mdEditor/issues/240)
- In Distribution, cannot edit or delete online option after creation [#239](https://github.com/adiwg/mdEditor/issues/239)
- "Point of Contacts" vs "Points of Contact" [#230](https://github.com/adiwg/mdEditor/issues/230)
- Contacts inherited from associated records [#225](https://github.com/adiwg/mdEditor/issues/225)

**Closed issues:**

- Increase Scroll Spy top offset amount [#241](https://github.com/adiwg/mdEditor/issues/241)
- Point of Contacts mislabeled  [#237](https://github.com/adiwg/mdEditor/issues/237)
- Citation window grayed out [#218](https://github.com/adiwg/mdEditor/issues/218)

**Merged pull requests:**

- Feature 101 taxonomy [#243](https://github.com/adiwg/mdEditor/pull/243) ([jlblcc](https://github.com/jlblcc))
- Feature 101 taxonomy [#242](https://github.com/adiwg/mdEditor/pull/242) ([jlblcc](https://github.com/jlblcc))
- Update CHANGELOG [#228](https://github.com/adiwg/mdEditor/pull/228) ([jlblcc](https://github.com/jlblcc))
- FGDC import, fiscal year improvements [#227](https://github.com/adiwg/mdEditor/pull/227) ([jlblcc](https://github.com/jlblcc))
- Update CHANGELOG [#214](https://github.com/adiwg/mdEditor/pull/214) ([jlblcc](https://github.com/jlblcc))
- v0.4.1 [#213](https://github.com/adiwg/mdEditor/pull/213) ([jlblcc](https://github.com/jlblcc))
- Bump version to 0.4.0 [#211](https://github.com/adiwg/mdEditor/pull/211) ([jlblcc](https://github.com/jlblcc))
- Support mdTranslator API v3 [#210](https://github.com/adiwg/mdEditor/pull/210) ([jlblcc](https://github.com/jlblcc))

## [v0.5.0](https://github.com/adiwg/mdEditor/tree/v0.5.0) (2018-09-04)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.4.1...v0.5.0)

**Closed issues:**

- Support direct import of FGDC CSDGM [#226](https://github.com/adiwg/mdEditor/issues/226)
- Need to be able to add a scale denominator for a source citation [#215](https://github.com/adiwg/mdEditor/issues/215)
- Add cooperator to role code list [#204](https://github.com/adiwg/mdEditor/issues/204)

## [v0.4.1](https://github.com/adiwg/mdEditor/tree/v0.4.1) (2018-07-31)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.4.0...v0.4.1)

**Fixed bugs:**

- Typo in Award ID field [#212](https://github.com/adiwg/mdEditor/issues/212)

## [v0.4.0](https://github.com/adiwg/mdEditor/tree/v0.4.0) (2018-07-23)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.3.1...v0.4.0)

**Merged pull requests:**

- Released v0.3.1 [#202](https://github.com/adiwg/mdEditor/pull/202) ([jlblcc](https://github.com/jlblcc))

## [v0.3.1](https://github.com/adiwg/mdEditor/tree/v0.3.1) (2018-05-23)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.3.0...v0.3.1)

**Implemented enhancements:**

- Add support for messaging in Translator [#206](https://github.com/adiwg/mdEditor/issues/206)

**Fixed bugs:**

- Ensure memberOfOrganization IDs are unique [#200](https://github.com/adiwg/mdEditor/issues/200)

**Merged pull requests:**

- Fix Contacts in mdJSON [#201](https://github.com/adiwg/mdEditor/pull/201) ([jlblcc](https://github.com/jlblcc))

## [v0.3.0](https://github.com/adiwg/mdEditor/tree/v0.3.0) (2018-05-21)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.2.1...v0.3.0)

**Implemented enhancements:**

- Default record ID namespace persists [#194](https://github.com/adiwg/mdEditor/issues/194)
- Display breadcrumbs in page titles [#192](https://github.com/adiwg/mdEditor/issues/192)

**Fixed bugs:**

- Contacts from memberOfOrganization missing [#195](https://github.com/adiwg/mdEditor/issues/195)
- mis-spelling in LCC Project Category thesaurus [#191](https://github.com/adiwg/mdEditor/issues/191)

**Closed issues:**

- No JSON object could be decoded error when publishing [#163](https://github.com/adiwg/mdEditor/issues/163)
- Publishing to update an existing item fails [#149](https://github.com/adiwg/mdEditor/issues/149)
- Permission Denied [#148](https://github.com/adiwg/mdEditor/issues/148)
- Parent Metadata Title not created when publishing child item  [#138](https://github.com/adiwg/mdEditor/issues/138)
- Parent and child items no longer publishing together  [#135](https://github.com/adiwg/mdEditor/issues/135)
- Patrick's publishing errors log [#132](https://github.com/adiwg/mdEditor/issues/132)

**Merged pull requests:**

- v0.3.0 [#199](https://github.com/adiwg/mdEditor/pull/199) ([jlblcc](https://github.com/jlblcc))
- Breadcrumb Titles and memberOfOrganization fix [#198](https://github.com/adiwg/mdEditor/pull/198) ([jlblcc](https://github.com/jlblcc))
- Released v0.2.1 [#190](https://github.com/adiwg/mdEditor/pull/190) ([jlblcc](https://github.com/jlblcc))
- Tweaks and bug fixes [#189](https://github.com/adiwg/mdEditor/pull/189) ([jlblcc](https://github.com/jlblcc))

## [v0.2.1](https://github.com/adiwg/mdEditor/tree/v0.2.1) (2018-05-08)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.2.0...v0.2.1)

**Implemented enhancements:**

- Support importing features from .geojson files [#186](https://github.com/adiwg/mdEditor/issues/186)
- Add mdTranslator API url to Settings [#184](https://github.com/adiwg/mdEditor/issues/184)

**Fixed bugs:**

- Fix rendering error in list views [#188](https://github.com/adiwg/mdEditor/issues/188)

**Merged pull requests:**

- v0.2.0 [#183](https://github.com/adiwg/mdEditor/pull/183) ([jlblcc](https://github.com/jlblcc))

## [v0.2.0](https://github.com/adiwg/mdEditor/tree/v0.2.0) (2018-04-24)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.1.1...v0.2.0)

**Implemented enhancements:**

- Please make source citation in linage editable [#164](https://github.com/adiwg/mdEditor/issues/164)

**Fixed bugs:**

- Extra links in ScrollSpy in distributor  [#180](https://github.com/adiwg/mdEditor/issues/180)
- Fix initial scroll on routes without scrollspy [#171](https://github.com/adiwg/mdEditor/issues/171)

**Closed issues:**

- Resource Maintenance [#99](https://github.com/adiwg/mdEditor/issues/99)

**Merged pull requests:**

- Feature 178 import dictionary csv [#181](https://github.com/adiwg/mdEditor/pull/181) ([jlblcc](https://github.com/jlblcc))

## [v0.1.1](https://github.com/adiwg/mdEditor/tree/v0.1.1) (2018-04-17)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/v0.1.0...v0.1.1)

**Implemented enhancements:**

- Use SSL compatible stamen map tiles [#182](https://github.com/adiwg/mdEditor/issues/182)
- Add support for dataType codelist [#179](https://github.com/adiwg/mdEditor/issues/179)
- Feature Request:  Additional pointOfcontact fields in Funding section [#174](https://github.com/adiwg/mdEditor/issues/174)
- Add select/unselect all function to imports & list [#143](https://github.com/adiwg/mdEditor/issues/143)
- Translate mdJSON awardID to SB  Agreement Number [#131](https://github.com/adiwg/mdEditor/issues/131)
- Fix funding preview [#114](https://github.com/adiwg/mdEditor/issues/114)
- Add support for mdTranslator API [#107](https://github.com/adiwg/mdEditor/issues/107)
- Update Custom Keywords interface [#80](https://github.com/adiwg/mdEditor/issues/80)
- Clean JSON before saving [#78](https://github.com/adiwg/mdEditor/issues/78)
- Make contacts mdJSON 2.0 compatible [#64](https://github.com/adiwg/mdEditor/issues/64)

**Fixed bugs:**

- In lineage template source.value should be source.description  [#172](https://github.com/adiwg/mdEditor/issues/172)
- Keyword Thesaurus Update [#169](https://github.com/adiwg/mdEditor/issues/169)

**Closed issues:**

- Import entity from CSV file [#178](https://github.com/adiwg/mdEditor/issues/178)
- Persistent problem posting two particular projects [#162](https://github.com/adiwg/mdEditor/issues/162)
- Resource type does not update [#110](https://github.com/adiwg/mdEditor/issues/110)
- Citation Support [#102](https://github.com/adiwg/mdEditor/issues/102)
- Constraint [#100](https://github.com/adiwg/mdEditor/issues/100)
- Keyword Support [#97](https://github.com/adiwg/mdEditor/issues/97)
- Metadata Repository Support [#93](https://github.com/adiwg/mdEditor/issues/93)
- Funding Support [#92](https://github.com/adiwg/mdEditor/issues/92)
- Additional Documentation Support [#91](https://github.com/adiwg/mdEditor/issues/91)
- Associated Resource Support [#90](https://github.com/adiwg/mdEditor/issues/90)
- Resource Distribution Support [#89](https://github.com/adiwg/mdEditor/issues/89)
- Metadata Info Support [#86](https://github.com/adiwg/mdEditor/issues/86)
- Contact Support [#85](https://github.com/adiwg/mdEditor/issues/85)
- Rename Add Keywords button [#83](https://github.com/adiwg/mdEditor/issues/83)
- Implement Bootstrap ScrollSpy or similar [#70](https://github.com/adiwg/mdEditor/issues/70)
- Add Markdown enabled text-area input [#66](https://github.com/adiwg/mdEditor/issues/66)

**Merged pull requests:**

- Update ember-try, travis config [#175](https://github.com/adiwg/mdEditor/pull/175) ([jlblcc](https://github.com/jlblcc))

## [v0.1.0](https://github.com/adiwg/mdEditor/tree/v0.1.0) (2018-02-15)

[Full Changelog](https://github.com/adiwg/mdEditor/compare/d2caeb32435d835929b2d7fcd1675982eba3f71d...v0.1.0)

**Implemented enhancements:**

- fiscal year 2011 [#122](https://github.com/adiwg/mdEditor/issues/122)
- Problems with validation and unsupported mdJSON when importing [#119](https://github.com/adiwg/mdEditor/issues/119)
- Refactor associated resource implementation [#115](https://github.com/adiwg/mdEditor/issues/115)
- Move ISO Topic categories to keywords [#106](https://github.com/adiwg/mdEditor/issues/106)
- Replace Bootstrap tooltips with ember-tooltips [#74](https://github.com/adiwg/mdEditor/issues/74)
- Update API docs theme [#72](https://github.com/adiwg/mdEditor/issues/72)
- Replace select2 with ember-power-select-with-create [#65](https://github.com/adiwg/mdEditor/issues/65)
- Add ember-cli-deploy-git [#38](https://github.com/adiwg/mdEditor/issues/38)
- Update Ember to 2.3.0 [#19](https://github.com/adiwg/mdEditor/issues/19)

**Fixed bugs:**

- Contact Display in mdEditor in "Point of Contacts" section [#166](https://github.com/adiwg/mdEditor/issues/166)
- contact.address.administrativeArea not saved [#165](https://github.com/adiwg/mdEditor/issues/165)
- mdEditor locks when adding Online Resource in Metadata tab [#161](https://github.com/adiwg/mdEditor/issues/161)
- Contact - word "Phone" is duplicated in menu [#151](https://github.com/adiwg/mdEditor/issues/151)
- Linked association contacts are not scanned [#130](https://github.com/adiwg/mdEditor/issues/130)
- mdEditor Associated "linked association type"  [#129](https://github.com/adiwg/mdEditor/issues/129)
- Saving mdJSON from mdEditor does not include contacts referenced by other contacts [#127](https://github.com/adiwg/mdEditor/issues/127)
- Bug in mdEditor saving funding start/end when fiscal year drop down is used to populate start/end dates [#126](https://github.com/adiwg/mdEditor/issues/126)
- Do not copy metadata identifiers [#121](https://github.com/adiwg/mdEditor/issues/121)
- Fix uuid generation for spatial features  [#68](https://github.com/adiwg/mdEditor/issues/68)

**Closed issues:**

- Budget facet merge issue is back [#156](https://github.com/adiwg/mdEditor/issues/156)
- Publishing Error Address Type is Missing [#154](https://github.com/adiwg/mdEditor/issues/154)
- don't populate the short abstract from the regular abstract [#145](https://github.com/adiwg/mdEditor/issues/145)
- 500 Server Error [#141](https://github.com/adiwg/mdEditor/issues/141)
- Publishing a record with invalid\(deleted\) id creates a new item [#140](https://github.com/adiwg/mdEditor/issues/140)
- Remove "Additional Information/Identifiers" for SB ID's [#137](https://github.com/adiwg/mdEditor/issues/137)
- Translate two major mdJSON URIs to ScienceBase weblinks [#136](https://github.com/adiwg/mdEditor/issues/136)
- Associations not transferring to ScienceBase [#134](https://github.com/adiwg/mdEditor/issues/134)
- 400: BAD REQUEST [#133](https://github.com/adiwg/mdEditor/issues/133)
- Data Dictionary Support [#94](https://github.com/adiwg/mdEditor/issues/94)
- Stuff [#82](https://github.com/adiwg/mdEditor/issues/82)
- Update Ember to 2.7.x [#41](https://github.com/adiwg/mdEditor/issues/41)
- Add contacts object [#37](https://github.com/adiwg/mdEditor/issues/37)
- Add record dashboards [#33](https://github.com/adiwg/mdEditor/issues/33)
- Add create new records [#32](https://github.com/adiwg/mdEditor/issues/32)
- Add object components [#30](https://github.com/adiwg/mdEditor/issues/30)
- Add input components [#29](https://github.com/adiwg/mdEditor/issues/29)
- Add basic UI for CRUD operations [#27](https://github.com/adiwg/mdEditor/issues/27)
- Implement basic layout and navigation [#24](https://github.com/adiwg/mdEditor/issues/24)
- Add localstorage support [#21](https://github.com/adiwg/mdEditor/issues/21)
- Add primary routes and resources [#20](https://github.com/adiwg/mdEditor/issues/20)
- How come I can't find any code in the repository [#14](https://github.com/adiwg/mdEditor/issues/14)
- Add mdCodes service [#12](https://github.com/adiwg/mdEditor/issues/12)
- have you looked at the OpenGeoportal Metadata toolkit activity? [#8](https://github.com/adiwg/mdEditor/issues/8)

**Merged pull requests:**

- v0.1.0 [#167](https://github.com/adiwg/mdEditor/pull/167) ([jlblcc](https://github.com/jlblcc))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
