/// <reference types="cypress" />
class BuyPage {
  //page elements
  elements = {
    logo: () => cy.get("h1"),
    buttonSelect: () => cy.get(".Home_asset__Qbco_"),
    inputAmount: () => cy.get(".Home_amount__ImoJo"),
    buyButton: () => cy.get(".Home_buy__ZvRus"),
    assetList: () => cy.get(".Home_assetList__"),
    cryptoETH: () => cy.get("div").contains("Ethereum"),
    cryptoBTC: () => cy.get("div").contains("Bitcoin"),
    cryptoSOL: () => cy.get("div").contains("Solona"),
  };

  //Actions

  openCryptoList() {
    this.elements.buttonSelect().click();
  }

  selectCrypto(abbr) {
    //cy.get(cryptoName).click();
    cy.contains(abbr).click();
  }

  enterAmount(amount) {
    this.elements.inputAmount().click();
    this.elements.inputAmount().clear();
    this.elements.inputAmount().type(amount);
  }

  clickBuy() {
    this.elements.buyButton().click();
  }
}
export default BuyPage;
