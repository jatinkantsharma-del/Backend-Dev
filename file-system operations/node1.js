const fs = require("fs");
const path = require("path");

function syncDirectories(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  fs.readdir(source, (err, files) => {
    if (err) {
      console.log("Error reading source directory:", err.message);
      return;
    }

    files.forEach(file => {
      const srcFile = path.join(source, file);
      const tgtFile = path.join(target, file);

      fs.stat(srcFile, (err, srcStat) => {
        if (err || !srcStat.isFile()) return;

        fs.stat(tgtFile, (err, tgtStat) => {
          if (!err && tgtStat.mtime >= srcStat.mtime) return;

          fs.copyFile(srcFile, tgtFile, err => {
            if (err) console.log(`Error syncing ${file}:`, err.message);
            else console.log(`Synced: ${file}`);
          });
        });
      });
    });
  });
}

syncDirectories("./file-system operations/sourcedir","./file-system operations/backupdir");
