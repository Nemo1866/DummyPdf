const path = require("path");
const { parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");
const fs = require("fs");

const generatePdf = async (template) => {
  try {
    console.time("Generate Pdf");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = fs.readFileSync(template, "utf-8");
    await page.setContent(content);
    await page.emulateMediaType("print");
    await page.pdf({
      path: "outputTest.pdf",
      format: "letter",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    await browser.close();
    console.timeEnd("Generate Pdf");
    parentPort.postMessage("Pdf Generated Successfully");
  } catch (error) {
    console.log(`Error generating PDF: ${error}`);
    parentPort.postMessage(error);
  }
};

parentPort.on("message", (template) => {
  generatePdf(template);
});