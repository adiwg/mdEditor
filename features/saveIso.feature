Feature: Save ISO Metadata
	As a user of mdEditor
	I would like to be able to save the metadata I've created
	So I can use the metadata for whatever my purpose is
	
	Scenario: Save ISO metadata to a file
		Given I have filled in as much of the form as I'm going to
		And the content has been validated and converted to ISO
		When I choose to save a file to my local machine
		Then I should be given the option to download the XML metadata
		And I should be given the option to download the ADIWG JSON
		
	Scenario: Save ISO metadata to originating catalog
		Given I have filled in as much of the form as I'm going to
		And the content has been validated and converted to ISO
		When I choose to save ISO metadata to the catalog I came from
		Then I should be prompted for required credentials
		And ISO metadata should be passed to the originating catalog
		And ADIWG JSON should also be passed to the originating catalog (if applicable)
		
	Scenario: Save ISO metadata to catalog without originating catalog information
		Given I have filled in as much of the form as I'm going to
		And the content has been validated and converted to ISO
		When I choose to save the ISO metadata to a catalog I have access to
		Then I should be able to enter the catalog's information
		And I should be prompted for required credentials
		And ISO metadata should be passed to the catalog
		And ADIWG JSON should also be passed to the catalog (if applicable)
		
	Scenario: Failure to save to catalog
		Given I have tried to save some metadata to a catalog
		And something went wrong
		When the error is cought
		Then I should be given information about the failure
		And given the option to save the content I created locally