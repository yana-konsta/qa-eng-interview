## QA Engineer Tech Screen

### Setup & submission:

1. Fork or clone this repository to your own Github account
2. Invite `lauren@beautiful.ai` and `ben@beautiful.ai` as collaborators to your repo
3. Include the link to your repo + link to your Beautiful.ai presentation in your take-home assessment submission

### Using the provided Cypress project, write an automated test that performs the following:

1. Using one of the example prompts to generate a slide, verify that the prompt generates the correct type of slide
2. Create a useful test with your own prompt, ensuring the test is repeatable and maintainable. Validate the resulting slide that is created
3. (Optional but encouraged) Set up GitHub Actions using (free) Github-hosted runners to run the tests

_Hint: This feature utilizes Anthropic to generate the slides + content, and loosely-defined prompts will be unpredictable. More precise, instructive prompts will produce more consistent results._  

In its initial state, the provided spec file will navigate you to the page you'll write tests against.  

#### Evaluation points

- Test case readability
- Test case maintainability
- Efficiency and reliability; no flaky tests :)
