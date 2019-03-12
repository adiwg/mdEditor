YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "contact",
        "make-range",
        "md-address",
        "md-array-table",
        "md-boolean",
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
        "md-graphic-array",
        "md-identifier-array",
        "md-identifier-object-table",
        "md-import-csv",
        "md-input",
        "md-input-confirm",
        "md-maintenance",
        "md-markdown-editor",
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
        "tree-search",
        "tree-view"
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
            "description": "Components used to input scalar or arrays of scalar values."
        },
        {
            "displayName": "components-layout",
            "name": "components-layout",
            "description": "Component that renders a Bootstrap card.\n\n```handlebars\n\\{{#layout/md-card\n  title=\"title\"\n  collapsible=true\n  collapsed=false\n  profilePath=\"card\"\n  data-spy=\"Card\"\n  shadow=true\n}}\n  Content\n{{/layout/md-card}}\n```"
        },
        {
            "displayName": "components-object",
            "name": "components-object",
            "description": "mdEditor class for input and edit of mdJSON 'citation' objects.\n\n```handlebars\n\\{{object/md-citation\n model=citation\n profilePath=\"path\"\n simpleIdentifier=false\n embedded=false\n}}"
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
            "displayName": "tree-search",
            "name": "tree-search",
            "description": "Renders a search form and results for JSON trees."
        },
        {
            "displayName": "tree-view",
            "name": "tree-view",
            "description": "Renders JSON tree structures."
        }
    ],
    "elements": []
} };
});