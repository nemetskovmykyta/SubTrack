describe("SubTrack Application E2E Flow", () => {
  it("renders login page and allows signing in to dashboard", () => {
    cy.visit("/");
    cy.contains("SubTrack").should("be.visible");
    cy.contains("Sign In").should("be.visible");
    cy.contains("Sign In to Dashboard").should("be.visible");

    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
  });

  it("supports direct navigation to /login", () => {
    cy.visit("/login");
    cy.contains("Sign in to SubTrack").should("be.visible");
  });

  it("navigates across all core application pages using navigation links", () => {
    cy.visit("/dashboard");
    cy.get('[data-testid="dashboard-nav"]').should("be.visible");
    cy.get('[data-testid="summary-grid"]').should("be.visible");
    cy.get('[data-testid="subscriptions-table-section"]').should("be.visible");

    cy.get('[data-testid="nav-analytics"]').click();
    cy.url().should("include", "/analytics");
    cy.contains("Understand where your money goes").should("be.visible");
    cy.contains("Savings Calculator").should("be.visible");

    cy.get('[data-testid="nav-calendar"]').click();
    cy.url().should("include", "/calendar");
    cy.contains("Payment Calendar").should("be.visible");
    cy.get('[data-testid="calendar-card"]').should("be.visible");

    cy.get('[data-testid="nav-settings"]').click();
    cy.url().should("include", "/settings");
    cy.contains("Account Settings").should("be.visible");
    cy.contains("Profile Information").should("be.visible");
    cy.contains("Preferences & Currency").should("be.visible");

    cy.contains("SubTrack").click();
    cy.url().should("include", "/dashboard");
  });

  it("displays 404 page for unknown paths and provides navigation back", () => {
    cy.visit("/nonexistent-page-url");
    cy.contains("404").should("be.visible");
    cy.contains("Page Not Found").should("be.visible");

    cy.contains("Back to Dashboard").click();
    cy.url().should("include", "/dashboard");
  });
});
