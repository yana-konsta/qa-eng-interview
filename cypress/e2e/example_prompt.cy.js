describe("Using one of the example prompts to generate a slide, verify that the prompt generates the correct type of slide", () => {

    before(() => {
        cy.clearCookies()
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('/slideAIDemo')
    })

    context("Generate a slide using a prompt from the examples list", () => {
        it("Verify slide generation for live calls", () => {
            cy.clickPromptExample("How to write a blog post in 4 easy steps")
            cy.verifyHeaderText("Writing a Blog Post in 4 Easy Steps")
            cy.verifyGridItems(4)
            const expectedItems = ["Choose a Topic", "Research", "Outline", "Write & Publish"]
            expectedItems.forEach(text => {
                cy.ensureSlideHasText(text)
            })
        })
    })
})
