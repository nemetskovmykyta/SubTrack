describe("SubTrack Application E2E Flow", () => {
  it("renders login page and allows signing in to dashboard", () => {
    cy.visit("/");
    cy.contains("SubTrack").should("be.visible");
    cy.contains("Sign In").should("be.visible");
    cy.contains("Sign In to Dashboard").should("be.visible");

    // Click submit to navigate to dashboard
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
  });

  it("navigates across all core application pages", () => {
    // 1. Dashboard
    cy.visit("/dashboard");
    cy.get('[data-testid="dashboard-nav"]').should("be.visible");
    cy.get('[data-testid="summary-grid"]').should("be.visible");
    cy.get('[data-testid="subscriptions-table-section"]').should("be.visible");

    // 2. Analytics Page
    cy.get('[data-testid="nav-analytics"]').click();
    cy.url().should("include", "/analytics");
    cy.contains("Understand where your money goes").should("be.visible");
    cy.contains("Savings Calculator").should("be.visible");

    // 3. Calendar Page
    cy.get('[data-testid="nav-calendar"]').click();
    cy.url().should("include", "/calendar");
    cy.contains("Payment Calendar").should("be.visible");
    cy.get('[data-testid="calendar-card"]').should("be.visible");

    // 4. Settings Page
    cy.get('[data-testid="nav-settings"]').click();
    cy.url().should("include", "/settings");
    cy.contains("Account Settings").should("be.visible");
    cy.contains("Profile Information").should("be.visible");
    cy.contains("Preferences & Currency").should("be.visible");
  });
});
