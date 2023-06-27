/// <reference types="cypress" />

const album = {
  id: "album-id-01",
  title: "テストアルバムタイトル01",
};
describe("/albums", () => {
  const url = "http://localhost:3000/albums.html";
  it("タイトルを表示すること", () => {
    cy.visit(url);
    cy.get("h1").should("contain", "UFO societyの楽曲");
  });
  it("2件のアルバムを表示すること", () => {
    cy.visit(url);
    cy.get("ul").children().should("have.length", 2);
  });

  it("アルバムをクリックするとページ遷移すること", () => {
    cy.visit(url);
    cy.get("li").first().click();
    cy.url().should("include", `albums.html#/detail/${album.id}`);
  });
});

// todo: urlが変わる想定
describe("/albums/:id", () => {
  const url = "http://localhost:3000/albums.html#/detail/album-id-01";

  it("タイトルにアルバムのタイトルを表示すること", () => {
    cy.visit(url);
    cy.get("h1").should("contain", "テストアルバムタイトル01");
  });

  it("3件分の楽曲情報を表示する", () => {
    cy.visit(url);
    cy.get("tbody").children("tr").should("have.length", 3);
  });
});
