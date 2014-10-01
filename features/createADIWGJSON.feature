Feature: Gather content for a data metadata record.
	As a data provider or their representative to some content management system.
	I need a set of easy to use forms to enter documentation about my dataset.
	So that my dataset's metadata is useful and conforms to the policies of my funder.
	The forms/interface should only display the fields appropriate to my purpose.
	The forms/interface be organized according to the organization of my documentation workflow.
	Reuse of people entered elsewhere in the metadata record should be possible.
	ISO 'code lists' should be used as controlled vocabularies where appropriate.
	Global Change Master Directory Keywords should be available for selection where appropriate.
	
	Scenario: Keyword exploration
		Given I don't have any keywords
		When I need to find keywords for my dataset from the GCMD hierarchy
		Then I should be able to explore the hierarchy
		And the child terms become available when the parent term is selected
		
	Scenario: GCMD Keyword selection
		Given I've found a keyword I like from the GCMD
		When I select it
		Then it gets added to my record's list of keywords from the GCMD thesaurus
		And I don't need to enter the thesaurus my keyword came from
		
	Scenario: Keyword addition from known thesaurus
		Given I can't find an appropriate keyword from a supported controlled list
		When I add it to my list
		Then it gets added to a keyword list
		And I have to declare the thesaurus the keyword is from
		
	Scenario: Keyword addition from unknown thesaurus
		Given I can't find an appropriate keyword from a supported controlled list
		And I don't have a thesaurus to reference handy
		Then I have a hard problem to solve, potentially use ScienceBase vocab services
		
	
	
	