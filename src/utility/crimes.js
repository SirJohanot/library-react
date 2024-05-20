const title = document.evaluate("//td[text()='Заглавие']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
const titleContinuationNode = document.evaluate("//td[text()='Продолж. заглавия']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (titleContinuationNode) {
    title += " : " + titleContinuationNode.textContent;
}

const author = document.evaluate("//td[text()='Автор']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;

const editor = { role: "Главный редактор", name: "Джон Смит" };

const genre = "Научная литература";

const publisherName = document.evaluate("//td[text()='Издательство']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
const publisher = { name: publisherName, postalCode: "123456", address: "Moscow" };

const printingHouse = { name: "Белорусский дом печати", postalCode: "220013", address: "г. Минск, просп. Независимости 79/1" };

const publicationYear = document.evaluate("//td[text()='Дата издания']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;

const publicationLocation = document.evaluate("//td[text()='Место издания']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;

const descriptionNode = document.evaluate("//td[text()='Аннотация']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const description = descriptionNode ? descriptionNode.textContent : "Описание описание";

const pagesNumberLineNode = document.evaluate("//td[text()='Объем']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const pagesNumberLine = pagesNumberLineNode ? pagesNumberLineNode.textContent : "100 c.";
const pagesNumber = pagesNumberLine.substring(0, pagesNumberLine.length - 3);

const isbnNode = document.evaluate("//td[text()='ISBN']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const isbn = isbnNode ? isbnNode.textContent.replace(/\-/g, "").replace(/\p{L}/u, "1") : null;

const udcNode = document.evaluate("//td[text()='Индекс УДК']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const udc = udcNode ? udcNode.textContent : null;

const bbcNode = document.evaluate("//td[text()='Индекс другой классификации/Индекс ББК']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const bbc = bbcNode ? bbcNode.textContent : null;

const authorIndexNode = document.evaluate("//td[text()='Авторский знак']/../td[5]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const authorIndex = authorIndexNode ? authorIndexNode.textContent : null;

const amount = 10;

const book = JSON.stringify({
    title,
    authors: [author],
    editors: [editor],
    genre,
    publisher,
    printingHouse,
    publicationYear,
    publicationLocation,
    description,
    pagesNumber,
    isbn,
    udc,
    bbc,
    authorIndex,
    amount
});

console.log(book);

fetch("http://localhost:8080/books", {
    method: "POST",
    body: book,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbnVzIiwiaWF0IjoxNzE2MDE3MDYxLCJleHAiOjE3MTYwMjA2NjF9.9vWWk9_2MSWbSae8qAGYoHIWFgYmKy9gyv_XfzBxUq-vcGgEHUe-bT4dwg5O2yxR"
    }
});