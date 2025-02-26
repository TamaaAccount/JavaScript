const { exec } = require("child_process");
const fs = require("fs");

// Baca semua file di folder saat ini
const files = fs.readdirSync(__dirname);

// Filter file yang berakhiran .js (kecuali main.js)
const jsFiles = files.filter(file => file.endsWith(".js") && file !== "exec.js");

if (jsFiles.length === 0) {
    console.log("No .js files found.");
} else {
    console.log(`Running ${jsFiles.length} .....`);
    
    jsFiles.forEach(file => {
        console.log(`Mengeksekusi: ${file}`);
        exec(`node ${file}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error di ${file}: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr di ${file}: ${stderr}`);
                return;
            }
            console.log(`Output dari ${file}:\n${stdout}`);
        });
    });
}