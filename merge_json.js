const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- Configuration ---
const SOURCE_DIR = './SKSE/Plugins/DynamicPricing'; // Where your split JSONs are
const OUTPUT_BASE_DIR = './release'; // The root of the release folder
// The full path for the output file based on the structure you requested
const OUTPUT_FILE_PATH = path.join(OUTPUT_BASE_DIR, 'SKSE/Plugins/DynamicPricing', 'The_Gilded_Road_Config.json');

// Resolve absolute paths for safety
const absSourceDir = path.resolve(SOURCE_DIR);
const absOutputFile = path.resolve(OUTPUT_FILE_PATH);
const absOutputDir = path.dirname(absOutputFile);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    console.log(`\n--- TGR JSON Merger ---`);
    console.log(`Scanning: ${absSourceDir}`);

    // 1. Check if source directory exists
    if (!fs.existsSync(absSourceDir)) {
        console.error(`\n[ERROR] Source directory not found: ${absSourceDir}`);
        console.error(`Make sure you run this script from the correct location.`);
        process.exit(1);
    }

    // 2. Find all JSON files
    const files = fs.readdirSync(absSourceDir).filter(file => 
        file.toLowerCase().endsWith('.json')
    );

    if (files.length === 0) {
        console.error(`\n[ERROR] No .json files found in source folder.`);
        process.exit(1);
    }

    console.log(`Found ${files.length} files to merge:`);
    files.forEach(f => console.log(` - ${f}`));

    // 3. Check/Create Output Directory Structure
    // recursive: true ensures it creates ./release/SKSE/Plugins/DynamicPricing if they don't exist
    if (!fs.existsSync(absOutputDir)) {
        console.log(`\n[INFO] Creating directory structure: ${absOutputDir}`);
        fs.mkdirSync(absOutputDir, { recursive: true });
    }

    // 4. Check if Output File Exists
    if (fs.existsSync(absOutputFile)) {
        rl.question(`\n[WARNING] Output file already exists:\n${absOutputFile}\nOverwrite? (y/n): `, (answer) => {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                mergeJsonFiles(files);
            } else {
                console.log('[ABORTED] No changes made.');
                process.exit(0);
            }
        });
    } else {
        mergeJsonFiles(files);
    }
}

function mergeJsonFiles(files) {
    console.log(`\n[INFO] Merging arrays...`);
    
    let combinedArray = [];
    let filesProcessed = 0;
    let errors = 0;

    files.forEach(file => {
        const filePath = path.join(absSourceDir, file);
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(rawData);

            if (Array.isArray(jsonData)) {
                // Combine the arrays
                combinedArray = combinedArray.concat(jsonData);
                filesProcessed++;
            } else {
                console.warn(`[SKIP] ${file}: Root element is not an Array [].`);
                errors++;
            }

        } catch (err) {
            console.error(`[ERROR] Failed to parse ${file}: ${err.message}`);
            errors++;
        }
    });

    try {
        // Write the final file with pretty formatting (2 spaces indentation)
        fs.writeFileSync(absOutputFile, JSON.stringify(combinedArray, null, 2));
        
        console.log(`\n[SUCCESS] Merge complete.`);
        console.log(` - Files processed: ${filesProcessed}`);
        console.log(` - Errors/Skips: ${errors}`);
        console.log(` - Total Rules Merged: ${combinedArray.length}`);
        console.log(` - Location: ${absOutputFile}`);

    } catch (err) {
        console.error(`\n[FATAL ERROR] Failed to write output file: ${err.message}`);
    } finally {
        rl.close();
    }
}

// Run the script
main();