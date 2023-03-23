const pdf = require("html-pdf");

const fs = require("fs");

const path = require("path");

// const generateFile = async (file, options) => {
//   const diff = Math.floor(Math.random() * 10000) + 1;
//   return new Promise((resolve, reject) => {
//     pdf.create(file, options).toStream((err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         fs.createWriteStream(`output${diff}.pdf`)
//       }
//     });
//   });
// };

// generatePdf(path.join(__dirname, '/template.html'));

const generatePdf = async (templates) => {
  try {
    console.time("Generate Pdf");

    const file = fs.readFileSync(templates, "utf-8");
    const options = { format: "Letter", timeout: 600000 };
    const stream = await createStream(file, options);
    stream.pipe(fs.createWriteStream("output.pdf"));
    console.timeEnd("Generate Pdf");
  } catch (error) {
    console.log(`Error generating PDF: ${error}`);
  }
};

const createStream = async (file, options) => {
  return new Promise((resolve, reject) => {
    pdf.create(file, options).toStream((err, stream) => {
      if (err) {
        reject(err);
      } else {
        resolve(stream);
      }
    });
  });
};
generatePdf(path.join(__dirname, "./test.html"));
