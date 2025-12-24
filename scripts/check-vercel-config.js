
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function checkFileExists(filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`✅ Found ${filePath}`);
        return true;
    } else {
        console.log(`❌ Missing ${filePath}`);
        return false;
    }
}

function checkEnvVars() {
    console.log('\n--- Checking Environment Variables ---');
    // Check .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
        const hasKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');

        if (hasUrl) console.log('✅ NEXT_PUBLIC_SUPABASE_URL found in .env.local');
        else console.log('❌ NEXT_PUBLIC_SUPABASE_URL missing in .env.local');

        if (hasKey) console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY found in .env.local');
        else console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY missing in .env.local');

        console.log('⚠️  IMPORTANT: Make sure these variables are also added to your Vercel Project Settings!');
    } else {
        console.log('❌ .env.local file not found. You need this for local development.');
    }
}

function checkGitStatus() {
    console.log('\n--- Checking Git Status ---');
    try {
        const status = execSync('git status --porcelain').toString();
        if (status.trim() === '') {
            console.log('✅ Git working directory is clean.');
        } else {
            console.log('⚠️  Uncommitted changes found. You must commit and push these for Vercel to see them:');
            console.log(status);
        }
    } catch (error) {
        console.log('❌ Error checking git status. Is this a git repository?');
    }
}

function checkBuildScript() {
    console.log('\n--- Checking package.json ---');
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (pkg.scripts && pkg.scripts.build === 'next build') {
            console.log('✅ Build script correctly set to "next build"');
        } else {
            console.log('⚠️  Build script might be non-standard. Vercel expects "next build".');
            console.log(`Current build script: ${pkg.scripts ? pkg.scripts.build : 'undefined'}`);
        }
    } else {
        console.log('❌ package.json not found');
    }
}

function runChecks() {
    console.log('🔍 Starting Vercel Configuration Check...\n');

    checkFileExists('next.config.ts');
    checkFileExists('package-lock.json');

    checkBuildScript();
    checkGitStatus();
    checkEnvVars();

    console.log('\n----------------------------------------');
    console.log('✅ Check Complete.');
    console.log('If all checks passed locally but Vercel fails, check the Vercel Project Logs online.');
}

runChecks();
