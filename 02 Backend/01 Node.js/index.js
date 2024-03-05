import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      name: "url",
      message: "Enter the URL: ",
    }
  ])
  .then((answers) => {
    const url = answers.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    console.log("QR code generated successfully");

    fs.writeFile("02_qr_img.txt", url, (err) => {
      if (err) throw err;
      console.log("QR code URL saved in 02_qr_img.txt");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

