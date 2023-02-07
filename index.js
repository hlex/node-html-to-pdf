const fs = require("fs")
const html_to_pdf = require('html-pdf-node');
// const QRCode = require('qrcode')
const qrcode = require('yaqrcode');

const destination = "./output"

let options = {
  // format: 'A4'
  height: "15cm",
  width: "10cm",
};
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

const arr = Array(1).fill(0);

let files = arr.map((i) => {
  const now = `${Date.now()}--${i}`
  const qrCodeBase64 = qrcode('hello world', {
    size: 50
  });
  const fileHtml = `
  <div class="item">
    <br />
    <br />
    <div class="logo">
      <p class="font-bold">PK Express</p>
    </div>
    <div class="center">
      <p class="font-bold text-xl">ใบส่งของ</p>
    </div>
    <div class="flex justify-between">
      <div>
        <p>เลขพัสดุ: <span>12345123451234512345</span></p>
        <p>เวลา: <span>2023-01-31 12:55:48</span></p>
        <p>รับฝากโดย: <span>ABC DEFG</span></p>
      </div>
      <div>
        <th><img src=${qrCodeBase64} /></th>
      </div>
    </div>
    <br />
    <table>
      <tr>
        <td class="center">ต้นทาง</td>
        <td class="center">ปลายทาง</td>
      </tr>
      <tr>
        <td colspan="2" class="center">A > B</td>
      </tr>
      <tr>
        <td class="left">
          <p>ID: <span>12345</span></p>
          <p>ID: <span>12345</span></p>
          <p>ID: <span>12345</span></p>
        </td>
        <td class="left">
          <p>ID: <span>12345</span></p>
          <p>ID: <span>12345</span></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, hic?</p></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, hic?</p></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, hic?</p></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, hic?</p></p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, hic?</p></p>
        </td>
      </tr>
    </table>
    <div class="center">
      <p class="font-bold">PK Express</p>
    </div>
  </div>
  `
  const html = `
  <html>
    <head>
    <style>
      * {
        font-size: 12px;
      }
      .center {
        text-align: center;
      }
      .left {
        text-align: left;
      }
      .font-bold {
        font-weight: 700;
      }
      .text-xl {
        font-size: 1.5rem;
      }
      .item {
        height: 566.93px;
        width: 377.95px;
      }
      .flex {
        display: flex;
      }
      .justify-between {
        justify-content: space-between;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        vertical-align: top;
      }
      tr:nth-child(even) {
        background-color: #dddddd;
      }
      p {
        margin: 0;
        margin: 2px 0;
      }
      </style>
    </head>
    ${fileHtml}
    ${fileHtml}
    ${fileHtml}
  </html>
  `
  return { content: html, name: `order-${now}.pdf` }
});

const createPdf = async (file) => {
  return new Promise(async (resolve) => {
    try {
      const pdfBuffer = await html_to_pdf.generatePdf(file, options)
      console.log(file.name, "PDF Buffer:-", pdfBuffer);
      const created = await fs.writeFileSync(`${destination}/${file.name}`, pdfBuffer, 'utf-8')
      resolve(created)
    } catch (error) {
      reject(error.message)
    }
  })
}

const main = async () => {
  // await createPdf(files[0])
  await Promise.all(files.map((file) => createPdf(file)))
}

main()