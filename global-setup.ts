// global-setup.ts
import { rimraf } from 'rimraf';

async function globalSetup(): Promise<void> {
    console.log('🧹 Cleaning previous test results...');
    
    // Clean output directories
    await rimraf('./output/allure-results');
    await rimraf('./output/*/allure-results');
    await rimraf('./output/*/test-results');
    
    console.log('✅ Global setup completed');
}

export default globalSetup;