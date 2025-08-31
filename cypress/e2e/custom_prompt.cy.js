describe("Create a custom prompt to generate a slide, verify that the prompt generates the correct type of slide", () => {

    before(() => {
        cy.clearCookies()
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('/slideAIDemo')
    })

    context("Generate a slide using a custom prompt", () => {
        it("Verify slide generation for live calls", () => {
            cy.intercept('POST', '/api/gptDemo').as('aiResponse')
            cy.enterCustomPrompt("Why Have a Cat? with five evidence-based benefits in bullet points.")
            // Verify the slide title is correct
            cy.verifyHeaderText("Why Have a Cat?")

            cy.wait('@aiResponse').then((interceptedCall) => {
                expect(interceptedCall.response.statusCode).to.be.equal(200)
                // Verify slide type is bullet list
                expect(interceptedCall.response.body.response.slideType).to.be.equal('bullet-list')
                // Verify slide has 5 items
                const slideItems = interceptedCall.response.body.response.slide.items
                expect(slideItems).to.have.length(5)
                // Verify slide bullet points text and details are correct
                slideItems.forEach(item => {
                    cy.ensureSlideHasText(item.bullet)
                    cy.ensureSlideHasText(item.details)
                })
            })
        })

        it("Verify slide generation with stubbed response", () => {
            cy.intercept('POST', '/api/gptDemo', { fixture: 'ai_stubbed_response.json' }).as('aiResponse')
            cy.enterCustomPrompt("4 Popular Desserts Around the World, with images and names of each dessert.")
            cy.verifyHeaderText("4 Popular Desserts Around the World")
            cy.verifyContentForStubbedResponse()
        })
    })
})
