const SELECTORS = {
    promptExample: 'div[class^="SlideAiDemo__ExampleButton"]',
    promptTextArea: 'textarea[placeholder="Try a prompt to create your own slide..."]',
    slideHeader: 'div#header',
    slidePrimaryArea: 'div#primary',
    gridItem: 'div.IconTextGridItem',
    generateSlideButton: 'div[class^="SlideAiDemo__GenerateButton"]',
    photoTextCard: 'div.PhotoTextListItem',
    mediaCard: 'div#media',
    textCard: 'div#text'
};

Cypress.Commands.add("clickPromptExample", (exampleText) => {
    cy.log(`Clicking prompt example: "${exampleText}"`)
    // need to wait for the prompt text area to be empty before I select next prompt example
    cy.get(SELECTORS.promptTextArea).should('be.empty')
    cy.get(SELECTORS.promptExample).contains(exampleText).click()
    cy.log(`Successfully clicked prompt example: "${exampleText}"`)
})

Cypress.Commands.add("verifyHeaderText", (text) => {
    cy.log(`Verifying header contains text: "${text}"`)
    cy.get(SELECTORS.slideHeader).contains(text).should('be.visible')
    cy.log(`Successfully verified header text: "${text}"`)
})

Cypress.Commands.add("verifyGridItems", (expectedAmount) => {
    cy.log(`Verifying grid has ${expectedAmount} items`)
    cy.get(SELECTORS.slidePrimaryArea).find(SELECTORS.gridItem).should('have.length', expectedAmount)
    cy.log(`Successfully verified ${expectedAmount} grid items`)
})

Cypress.Commands.add("ensureSlideHasText", (expectedText) => {
    cy.log(`Checking for text: "${expectedText}"`)
    cy.get(SELECTORS.slidePrimaryArea).contains(expectedText).should('be.visible')
    cy.log(`Successfully found text: "${expectedText}"`)
})

Cypress.Commands.add("enterCustomPrompt", (prompt) => {
    cy.log(`Entering custom prompt: "${prompt}"`)
    cy.get(SELECTORS.promptTextArea).clear()
    cy.get(SELECTORS.promptTextArea).type(prompt)
    cy.get(SELECTORS.generateSlideButton).click()
    cy.log(`Successfully entered custom prompt: "${prompt}"`)
})

Cypress.Commands.add("verifyContentForStubbedResponse", () => {
    cy.log("Starting verification of stubbed response content")
    cy.log("Verifying there are exactly 4 photo text cards")
    cy.get(SELECTORS.photoTextCard).should('have.length', 4)

    const expectedDeserts = [
        {
            title: 'Tiramisu',
            text: 'A classic Italian dessert with layers of espresso-soaked ladyfingers, creamy mascarpone cheese, and a dusting of cocoa powder.'
        },
        {
            title: 'Baklava',
            text: 'A rich and flaky Greek pastry made with layers of phyllo dough, chopped nuts, and a sweet honey syrup.'
        },
        {
            title: 'Churros',
            text: 'A popular Mexican fried-dough pastry, often coated in cinnamon sugar and served with a thick chocolate dipping sauce.'
        },
        {
            title: 'Mochi',
            text: 'Chewy Japanese rice cakes filled with sweet, creamy fillings like ice cream, red bean paste, or fruit.'
        }
    ]
    expectedDeserts.forEach(desert => {
        cy.log(`Checking for dessert title: "${desert.title}"`)
        cy.get(SELECTORS.photoTextCard).find(SELECTORS.textCard).should('contain', desert.title)
        cy.log(`Checking for dessert description: "${desert.text.substring(0, 50)}..."`)
        cy.get(SELECTORS.photoTextCard).find(SELECTORS.textCard).should('contain', desert.text)
    })

    cy.log("Verifying all photo text cards have visible images")
    cy.get(SELECTORS.photoTextCard).each(($card) => {
        cy.wrap($card).find(SELECTORS.mediaCard).find('image').should('be.visible')
    })

    cy.log("Successfully verified all stubbed response content")
})