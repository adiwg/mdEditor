export default function createTaxonomy() {

  const taxonomies = [{
      "taxonomicClassification": [{
          "taxonomicSystemId": "555705",
          "taxonomicLevel": "Kingdom",
          "taxonomicName": "Fungi",
          "subClassification": [{
            "taxonomicSystemId": "936287",
            "taxonomicLevel": "Subkingdom",
            "taxonomicName": "Dikarya",
            "subClassification": [{
              "taxonomicSystemId": "623881",
              "taxonomicLevel": "Division",
              "taxonomicName": "Basidiomycota",
              "isITIS": true
            }],
            "isITIS": true
          }],
          "isITIS": true,
          "commonName": ["Kingdom"]
        },
        {
          "taxonomicSystemId": "202423",
          "taxonomicLevel": "Kingdom",
          "taxonomicName": "Animalia",
          "subClassification": [{
            "taxonomicSystemId": "914153",
            "taxonomicLevel": "Subkingdom",
            "taxonomicName": "Radiata",
            "subClassification": [{
              "taxonomicSystemId": "48738",
              "taxonomicLevel": "Phylum",
              "taxonomicName": "Cnidaria",
              "subClassification": [{
                "taxonomicSystemId": "718920",
                "taxonomicLevel": "Subphylum",
                "taxonomicName": "Medusozoa",
                "subClassification": [{
                  "taxonomicSystemId": "51483",
                  "taxonomicLevel": "Class",
                  "taxonomicName": "Scyphozoa",
                  "subClassification": [{
                    "taxonomicSystemId": "718923",
                    "taxonomicLevel": "Subclass",
                    "taxonomicName": "Discomedusae",
                    "subClassification": [{
                      "taxonomicSystemId": "51756",
                      "taxonomicLevel": "Order",
                      "taxonomicName": "Rhizostomeae",
                      "subClassification": [{
                        "taxonomicSystemId": "51911",
                        "taxonomicLevel": "Family",
                        "taxonomicName": "Rhizostomatidae",
                        "subClassification": [{
                          "taxonomicSystemId": "51919",
                          "taxonomicLevel": "Genus",
                          "taxonomicName": "Rhopilema",
                          "subClassification": [{
                            "taxonomicSystemId": "51920",
                            "taxonomicLevel": "Species",
                            "taxonomicName": "Rhopilema verrilli",
                            "commonName": [
                              "mushroom jellyfish"
                            ],
                            "isITIS": true
                          }],
                          "isITIS": true
                        }],
                        "isITIS": true
                      }],
                      "isITIS": true
                    }],
                    "isITIS": true
                  }],
                  "isITIS": true
                }],
                "isITIS": true
              }],
              "isITIS": true
            }],
            "isITIS": true
          }],
          "isITIS": true
        }
      ],
      "taxonomicSystem": [{
        "citation": {
          "title": "Integrated Taxonomic Information System (ITIS)",
          "date": [{
            "date": "2019-02-26",
            "dateType": "transmitted",
            "description": "Taxa imported from ITIS"
          }],
          "presentationForm": [
            "webService",
            "webSite"
          ],
          "otherCitationDetails": [
            "Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov."
          ],
          "onlineResource": [{
            "uri": "https://www.itis.gov",
            "name": "ITIS website",
            "protocol": "HTTPS",
            "function": "information",
            "description": "ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world."
          }],
          "graphic": [{
            "fileName": "itis_logo.jpg",
            "fileType": "JPEG",
            "fileUri": [{
              "uri": "https://itis.gov/Static/images/itis_logo.jpg"
            }]
          }]
        }
      }],
      "observer": [{
        "party": [{
          "contactId": "CID003"
        }],
        "role": "pointOfContact"
      }],
      "voucher": [{
        "repository": {
          "party": [{
            "contactId": "CID003"
          }],
          "role": "custodian"
        },
        "specimen": "Specimen"
      }],
      "generalScope": "Scope",
      "identificationProcedure": "Id Procedure",
      "identificationCompleteness": "Id Completeness"
    },
    {
      "taxonomicSystem": [{
          "citation": {
            "title": "ITIS - Integrated Taxonomic Information System",
            "alternateTitle": [
              "Citation for ITIS"
            ],
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          },
          "modifications": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
          "citation": {
            "title": "Some OTHER Taxonomic System",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }
      ],
      "generalScope": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationReference": [{
          "title": "citation",
          "identifier": [{
            "identifier": "identifier0",
            "namespace": "namespace0",
            "version": "version0",
            "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "authority": {
              "title": "title0",
              "date": [{
                "date": "2013-06-22",
                "dateType": "publication"
              }],
              "responsibleParty": [{
                "role": "originator",
                "party": [{
                  "contactId": "CID004"
                }]
              }]
            }
          }]
        },
        {
          "title": "citation1",
          "identifier": [{
            "identifier": "identifier1",
            "namespace": "namespace1",
            "version": "version1",
            "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "authority": {
              "title": "title1",
              "date": [{
                "date": "2013-06-22",
                "dateType": "publication"
              }],
              "responsibleParty": [{
                "role": "originator",
                "party": [{
                  "contactId": "CID004"
                }]
              }]
            }
          }]
        }
      ],
      "observer": [{
          "party": [{
              "contactId": "CID006"
            },
            {
              "contactId": "CID004"
            }
          ],
          "role": "coPrincipalInvestigator"
        },
        {
          "party": [{
            "contactId": "CID001"
          }],
          "role": "editor"
        }
      ],
      "identificationProcedure": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationCompleteness": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "voucher": [{
          "repository": {
            "role": "custodian",
            "party": [{
              "contactId": "CID002"
            }]
          },
          "specimen": "bear claw"
        },
        {
          "repository": {
            "role": "custodian",
            "party": [{
              "contactId": "CID002"
            }]
          },
          "specimen": "moose tooth"
        }
      ],
      "taxonomicClassification": [{
          "taxonomicLevel": "taxonomicLevel0",
          "taxonomicName": "taxonomicName",
          "commonName": [
            "commonName0",
            "commonName1"
          ],
          "subClassification": [{
              "taxonomicSystemId": "taxonomicSystemId00",
              "taxonomicLevel": "taxonomicLevel00",
              "taxonomicName": "taxonomicName",
              "commonName": [
                "commonName0",
                "commonName1"
              ],
              "subClassification": [{
                "taxonomicLevel": "taxonomicLevel000",
                "taxonomicName": "taxonomicName",
                "commonName": [
                  "commonName0",
                  "commonName1"
                ],
                "subClassification": [{
                    "taxonomicSystemId": "taxonomicSystemId0000.1",
                    "taxonomicLevel": "taxonomicLevel0000.1",
                    "taxonomicName": "taxonomicName",
                    "commonName": [
                      "commonName0",
                      "commonName1"
                    ]
                  },
                  {
                    "taxonomicSystemId": "taxonomicSystemId0000.2",
                    "taxonomicLevel": "taxonomicLevel0000.2",
                    "taxonomicName": "taxonomicName",
                    "commonName": [
                      "commonName0",
                      "commonName1"
                    ]
                  }
                ]
              }]
            },
            {
              "taxonomicLevel": "taxonomicLevel01",
              "taxonomicName": "taxonomicName",
              "commonName": [
                "commonName0",
                "commonName1"
              ],
              "subClassification": [{
                "taxonomicLevel": "taxonomicLevel010",
                "taxonomicName": "taxonomicName",
                "commonName": [
                  "commonName0",
                  "commonName1"
                ]
              }]
            }
          ]
        },
        {
          "taxonomicLevel": "taxonomicLevel0201",
          "taxonomicName": "taxonomicName"
        }
      ]
    }
  ];

  return taxonomies;
}
