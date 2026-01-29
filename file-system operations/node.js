const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log(`
1. Read File
2. Write File
3. Copy File
4. Delete File
5. List Directory
6. Exit
`);
  rl.question("Choose an option: ", handleChoice);
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      rl.question("Enter file path: ", file => {
        fs.readFile(file, "utf8", (err, data) => {
          if (err) console.log("Error:", err.message);
          else console.log(data);
          menu();
        });
      });
      break;

    case "2":
      rl.question("Enter file path: ", file => {
        rl.question("Enter content: ", content => {
          fs.writeFile(file, content, err => {
            if (err) console.log("Error:", err.message);
            else console.log("File written successfully.");
            menu();
          });
        });
      });
      break;

    case "3":
      rl.question("Source file: ", src => {
        rl.question("Destination file: ", dest => {
          fs.copyFile(src, dest, err => {
            if (err) console.log("Error:", err.message);
            else console.log("File copied successfully.");
            menu();
          });
        });
      });
      break;

    case "4":
      rl.question("Enter file path: ", file => {
        fs.unlink(file, err => {
          if (err) console.log("Error:", err.message);
          else console.log("File deleted successfully.");
          menu();
        });
      });
      break;

    case "5":
      rl.question("Enter directory path: ", dir => {
        fs.readdir(dir, (err, files) => {
          if (err) console.log("Error:", err.message);
          else files.forEach(f => console.log(f));
          menu();
        });
      });
      break;

    case "6":
      rl.close();
      break;

    default:
      console.log("Invalid choice.");
      menu();
  }
}

menu();