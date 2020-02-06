YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "array-required",
        "array-valid",
        "base",
        "codelist",
        "contact",
        "custom-profile",
        "dictionary",
        "input/md-select-profile",
        "make-range",
        "md-address",
        "md-array-table",
        "md-boolean",
        "md-button",
        "md-button-modal",
        "md-card",
        "md-citation",
        "md-citation-array",
        "md-codelist",
        "md-codelist-multi",
        "md-contact-link",
        "md-contact-title",
        "md-date-range",
        "md-datetime",
        "md-definition",
        "md-edit-table",
        "md-graphic-array",
        "md-identifier-array",
        "md-identifier-object-table",
        "md-import-csv",
        "md-indicator",
        "md-indicator--related",
        "md-input",
        "md-input-confirm",
        "md-json-viewer",
        "md-maintenance",
        "md-markdown-editor",
        "md-modal",
        "md-object-table",
        "md-online-resource-array",
        "md-phone-array",
        "md-scroll-spy",
        "md-select",
        "md-select-contacts",
        "md-select-table",
        "md-select-thesaurus",
        "md-simple-array-table",
        "md-spotlight",
        "md-textarea",
        "md-toggle",
        "md-wrap",
        "object-template",
        "profile",
        "record",
        "schema",
        "setting",
        "tree-branch",
        "tree-label",
        "tree-leaf",
        "tree-search",
        "tree-view"
    ],
    "modules": [
        "components-control",
        "components-input",
        "components-layout",
        "components-object",
        "data-models",
        "ember-json-tree",
        "helpers",
        "mdeditor",
        "mixins",
        "service",
        "tree-search",
        "tree-view",
        "validator"
    ],
    "allModules": [
        {
            "displayName": "components-control",
            "name": "components-control",
            "description": "Components used as UI controls."
        },
        {
            "displayName": "components-input",
            "name": "components-input",
            "description": "Input that displays available record profiles."
        },
        {
            "displayName": "components-layout",
            "name": "components-layout",
            "description": "Component that renders a Bootstrap card.\n\n```handlebars\n\\{{#layout/md-card\n  title=\"title\"\n  collapsible=true\n  collapsed=false\n  profilePath=\"card\"\n  data-spy=\"Card\"\n  shadow=true\n}}\n  Content\n{{/layout/md-card}}\n```"
        },
        {
            "displayName": "components-object",
            "name": "components-object",
            "description": "mdEditor class for input and edit of mdJSON 'citation' objects.\n\n```handlebars\n\\{{object/md-citation\n model=citation\n profilePath=\"path\"\n simpleIdentifier=false\n embedded=false\n}}\n```"
        },
        {
            "displayName": "data-models",
            "name": "data-models",
            "description": "Models for the mdEditor data store"
        },
        {
            "displayName": "ember-json-tree",
            "name": "ember-json-tree",
            "description": "Renders JSON tree structures. Also provides a seach component."
        },
        {
            "displayName": "helpers",
            "name": "helpers",
            "description": "Create an array with the index defined by the start and end params"
        },
        {
            "displayName": "mdeditor",
            "name": "mdeditor",
            "description": "The mdEditor application instance."
        },
        {
            "displayName": "mixins",
            "name": "mixins",
            "description": "Mixins."
        },
        {
            "displayName": "service",
            "name": "service",
            "description": "Codelist Service\n\nThis service provides controlled value lists for use in the editor. The\nservice may be customized by modifing the object in init. The existing\nproperty names should be maintained."
        },
        {
            "displayName": "tree-search",
            "name": "tree-search",
            "description": "Renders a search form and results for JSON trees."
        },
        {
            "displayName": "tree-view",
            "name": "tree-view",
            "description": "Renders JSON tree structures."
        },
        {
            "displayName": "validator",
            "name": "validator",
            "description": "Validation that checks array length"
        }
    ],
    "elements": []
} };
});