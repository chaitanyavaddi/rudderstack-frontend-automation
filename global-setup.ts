import { rimraf } from 'rimraf';

async function globalSetup(): Promise<void> {
    console.log('🧹 Cleaning previous test results...');
    
    await rimraf('./output/allure-results');
    await rimraf('./output/*/allure-results');
    await rimraf('./output/*/test-results');
    
    console.log('Global setup completed');
}

export default globalSetup;