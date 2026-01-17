const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const SOURCE_EXTENSION = '_KID.ini';
const OUTPUT_FOLDER_NAME = 'release';
const OUTPUT_FILE_NAME = 'TGR_Compiled_KID.ini';

// Setup paths
const currentDir = process.cwd();
const outputDir = path.join(currentDir, OUTPUT_FOLDER_NAME);
const outputFile = path.join(outputDir, OUTPUT_FILE_NAME);

// Setup User Input Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    console.log(`\n--- TGR INI Merger ---`);
    console.log(`Scanning: ${currentDir}`);

    // 1. Find all matching INI files
    // Filters for files ending in "_KID.ini" (case insensitive)
    const files = fs.readdirSync(currentDir).filter(file => 
        file.toLowerCase().endsWith(SOURCE_EXTENSION.toLowerCase())
    );

    if (files.length === 0) {
        console.error(`\n[ERROR] No files ending in '${SOURCE_EXTENSION}' found.`);
        process.exit(1);
    }

    console.log(`Found ${files.length} files to merge:`);
    files.forEach(f => console.log(` - ${f}`));

    // 2. Check/Create Output Directory
    if (!fs.existsSync(outputDir)) {
        console.log(`\n[INFO] Creating '${OUTPUT_FOLDER_NAME}' directory...`);
        fs.mkdirSync(outputDir);
    }

    // 3. Check if Output File Exists
    if (fs.existsSync(outputFile)) {
        rl.question(`\n[WARNING] '${OUTPUT_FILE_NAME}' already exists inside /${OUTPUT_FOLDER_NAME}. Overwrite? (y/n): `, (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                mergeFiles(files);
            } else {
                console.log('[ABORTED] No changes made.');
                process.exit(0);
            }
        });
    } else {
        mergeFiles(files);
    }
}

function mergeFiles(files) {
    console.log(`\n[INFO] Merging content...`);
    
    // Header for the new file
    let mergedContent = `; TGR Compiled Configuration\n; Generated on ${new Date().toISOString()}\n; ----------------------------------------\n\n`;

    try {
        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Add comments to separate sections clearly
            mergedContent += `; --- START OF ${file} ---\n`;
            mergedContent += content;
            
            // Ensure there is a newline between files to prevent syntax errors
            // (e.g. preventing the last line of file A merging with first line of file B)
            if (!content.endsWith('\n')) {
                mergedContent += '\n';
            }
            mergedContent += `; --- END OF ${file} ---\n\n`;
        });

        // Write the final file
        fs.writeFileSync(outputFile, mergedContent);
        console.log(`\n[SUCCESS] Successfully created: ${outputFile}`);
        console.log(`Total size: ${(mergedContent.length / 1024).toFixed(2)} KB`);

    } catch (err) {
        console.error(`\n[FATAL ERROR] Failed to write file: ${err.message}`);
    } finally {
        rl.close();
    }
}

// Run the script
main();