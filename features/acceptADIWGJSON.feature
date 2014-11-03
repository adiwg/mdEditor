Feature: Accept already created ADIWG JSON metadata
	As a user of a metadata catalog that uses the mdEditor
	I need to be able to provide content to pre-populate the form fields
	So I can add to or edit the content of the record
	I want this to be in the ADIWG JSON format so
	I can apply my own rules to map between metadata records
	
	Scenario: New metadata record
		Given a user comes to the tool with no metadata content
		When a user initially loads the tool
		Then no content should be in the forms 
		and originating catalog's information should still be available
		
	Scenario: Existing metadata record from a catalog
		Given a user comes to the tool from a catalog with some already created ADIWG JSON
		When the user initially arrives at and loads the tool
		Then their content should be loaded into the forms
		And the originating catalog's information should still be available for later
	
	Scenario: Invalid existing metadata
		Given a user comes to the tool with some invalid ADIWG JASON
		When the user initially loads the tool
		Then they should be presented with feedback about what's wrong
		
	Scenario: Existing metadata record from local storage
		Given a user comes to the tool with some ADIWG JSON that they created previously
		When the user initially arrives at and loads the tool
		Then an option to upload existing metadata should be offered to them.
		And their content should be loaded into the forms