///<reference types="cypress" />
//import { forEach } from "lodash";
//import BuyPage from ".../cypress/pageObjects/buyPage"
import BuyPage from "../../pageObjects/buyPage";

describe("Buy Feature", function () {
  let globalVariable;
  beforeEach(() => {
    cy.visit("/");
  });

  before(function () {
    cy.fixture("cryptoList").then(function (data) {
      globalVariable = data;
    });
  });

  it("validates we are on the buy page", function () {
    cy.url().should("include", "//trader-beta.vercel.app/");
  });

  it("validates that logo exist", function () {
    cy.get("h1").contains("Drypto");
  });

  it("Buy cryptos", function () {
    const myBuyPage = new BuyPage();
    globalVariable.List.forEach(function (value) {
      myBuyPage.openCryptoList();
      myBuyPage.selectCrypto(value.cryptoName);
      myBuyPage.enterAmount(value.amount);
      myBuyPage.clickBuy();
      const str = `Purchased $${value.amount} ${value.cryptoName}!`;
      cy.contains(str).should("exist");
      cy.wait(5000);
    });
  });

  it("Validates zero amount", function () {
    const myBuyPage = new BuyPage();
    globalVariable.Zero.forEach(function (value) {
      myBuyPage.openCryptoList();
      myBuyPage.selectCrypto(value.cryptoName);
      myBuyPage.enterAmount(value.zeroValue);
      myBuyPage.elements.buyButton().should("be.disabled");
    });
  });

  it("Validates None Numeric Values", function () {
    const myBuyPage = new BuyPage();
    globalVariable.Negative.forEach(function (value) {
      myBuyPage.openCryptoList();
      myBuyPage.selectCrypto(value.cryptoName);
      myBuyPage.enterAmount(value.invalidValues);
      myBuyPage.elements.buyButton().should("be.disabled");
    });
  });
});
