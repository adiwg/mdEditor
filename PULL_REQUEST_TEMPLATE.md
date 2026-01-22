# Guidelines

## Licensing

_All contributions to this project will be released under the same terms as the default [repository license](https://github.com/adiwg/mdEditor/blob/master/LICENSE)_. Submission of a pull request
indicates that you consent to:
  - releasing the contributed code under the terms of the repository license,
  - you have the right to license the contributed code under the terms of the repository license,
  - and you agree to comply with the [GitHub Terms of Service](https://docs.github.com/site-policy/github-terms/github-terms-of-service).


## Create issue first

Please do not create a pull request unless it resolves one or more issues.
If there is no relevant issue then create one!
Any changes need to be discussed before proceeding.
Failure to do so may result in the rejection of the pull request.
Remember, **pull requests should close one or more issues**.


### Code formatting

All code should comply with current project style guidelines. See [CONTRIBUTING.md](https://github.com/adiwg/mdEditor/blob/develop/CONTRIBUTING.md) for details.

---

# Pull Request Template

## Please check if the PR fulfills these requirements:

  - [ ] The commit message follows [our guidelines](https://github.com/adiwg/mdEditor/blob/develop/CONTRIBUTING.md#commit-messages)
  - [ ] The PR addresses one, or several **closely related** issues
  - [ ] The PR contains a single commit (**squash locally before submission**)
  - [ ] Tests for the changes have been added (for bug fixes / features)
  - [ ] Docs have been added / updated (for bug fixes / features)
  - [ ] Code is formatted according to project style guidelines


## Description

Provide a brief summary of the changes introduced by the PR. The pull request title and description should follow the same [guidelines used to create commit messages](https://github.com/adiwg/mdEditor/blob/develop/CONTRIBUTING.md#commit-messages).


### Closing issues

Pull requests should close one or more **closely related** issues. Identify the issues that this pull request addresses by listing each on a single line. Use the keywords described by "[Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)". For example:

```
closes #XXXX
fixes #YYYY
etc.
```

_**Caution**: Pull requestd that close a large number of unrelated issues may be rejected (this makes it difficult to review changes)_.


## Test plan

Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes UI. Provide instructions so we can reproduce. 


## Does this PR introduce a breaking change?

If so, describe items that users should be aware of, or tasks they should perform to accommodate the change in functionality.


## [_OPTIONAL_] Other information:

Please provide any other information that may be needed, such as any post deployment tasks that should be performed, recommendations for items to include in updated documentation, or links to related issues/dependancies that may need to be addressed prior to, or after deployment.


### Does the PR require changes to other mdToolkit components?

Identify other mdToolkit components that require updates before the changes can be implemented. If dependancies exist with other repositories, describe the required release sequence (if applicable) or any other relevant issues.

  - [ ] Requires release updated schema (adiwg/mdschemas#xxxx)
  - [ ] Requires release of updated translator (adiwg/mdtranslator#xxxx)
  - [ ] Profiles (adiwg/msprofiles#xxxx)
  - [ ] Documentation
