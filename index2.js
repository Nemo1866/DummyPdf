const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express=require("express")
const app=express()
const {Worker}=require("worker_threads")

const generatePdf = async (template) => {
  try {
    console.time("Generate Pdf")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = fs.readFileSync(template, 'utf-8');
    await page.setContent(content);
    await page.emulateMediaType('print');
    await page.pdf({
      path: 'outputTest.pdf',
      format: 'letter',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      displayHeaderFooter:true
    });
    await browser.close();
    console.timeEnd("Generate Pdf")
  } catch (error) {
    console.log(`Error generating PDF: ${error}`);
  }
}

app.get("/",(req,res)=>{
  res.send("Hello")
})


app.get("/heavy",async(req,res)=>{

  await generatePdf(path.join(__dirname, './test.txt'));
  res.status(200).json({msg:"Sucessfully Downloaded the pdf"})
 
})

app.get("/chinmay",(req,res)=>{
 const worker=new Worker("./worker.js")
 worker.on("message",(err,data)=>{

   res.json({msg:data})
 })
})


app.listen(3000,()=>console.log("Server is running on port 3000"))