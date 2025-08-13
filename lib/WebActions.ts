import * as CryptoJS from 'crypto-js';
import type { Locator, Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import { step } from "@plugins/allureMod"

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async goto(url: string, options?: { timeout?: number, waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }) {
        await step(`Goto: ${url}`, async () => {
            await this.page.goto(url, { 
                waitUntil: 'domcontentloaded', // Change from networkidle
                timeout: 30000,
                ...options 
            });
        });
    }       

    async delay(time: number, locatorDesc?: string): Promise<void> {
        await step(`Delay: ${locatorDesc || ''}`, async () => {
            return new Promise(resolve => setTimeout(resolve, time));
        });
    }

    async click(locator: Locator, locatorDesc?: string, options?: { timeout?: number }) {
        await step(`Click element: ${locatorDesc || ''}`, async () => {
            await locator.waitFor({ state: 'visible', ...options });
            await locator.click(options);
            await this.page.waitForLoadState('load')
        });
    }

    async focusAndFill(locator: Locator, text: string, locatorDesc?: string, options?: { timeout?: number }) {
        await step(`Focus and fill "${text}": ${locatorDesc || ''}`, async () => {
            await locator.waitFor({ state: 'visible', ...options });
            await locator.fill(text, options);
        });
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', options?: { timeout?: number }) {
        await step(`Wait for load state`, async () => {
            await this.page.waitForLoadState(state, options);
        });
    }

    async clickByText(text: string, locatorDesc?: string): Promise<void> {
        await step(`Click element by text "${text}": ${locatorDesc || ''}`, async () => {
            await this.page.getByText(text, { exact: true }).click();
        });
    }

    async clickElementJS(locator: Locator, locatorDesc?: string): Promise<void> {
        await step(`Click element using JS: ${locatorDesc || ''}`, async () => {
            await locator.evaluate((element: HTMLElement) => element.click());
        });
    }

    async clearAndFill(locator: Locator, text: string, locatorDesc?: string): Promise<void> {
        await step(`Clear and fill ${locatorDesc || ''}: "${text}"`, async () => {
            await locator.clear(); // Clear the field
            await locator.fill(text); // Fill with new text
        });
    } // Clear and fill username textbox : akugsda@gmail.com

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await step(`Verify page title: "${expectedTitle}"`, async () => {
            const title = await this.page.title();
            if (title !== expectedTitle) {
                throw new Error(`Expected title to be "${expectedTitle}", but got "${title}"`);
            }
        });
    }

    async verifyElementToContain(locator: Locator, expectedText: string, locatorDesc?: string): Promise<void> {
        await step(`Expect ${locatorDesc || ''} to Contain:  "${expectedText}"`, async () => {
            expect(locator).toContainText(expectedText)
        });
    } 

    async verifyElementText(locator: Locator, expectedText: string, locatorDesc?: string): Promise<void> {
        await step(`Verify element text "${expectedText}": ${locatorDesc || ''}`, async () => {
            const text = await locator.innerText();
            if (text !== expectedText) {
                throw new Error(`Expected text to be "${expectedText}", but got "${text}"`);
            }
        });
    }

    async verifyElementTextIgnoreCase(locator: Locator, expectedText: string, locatorDesc?: string): Promise<void> {
        await step(`Verify element text ignore case "${expectedText}": ${locatorDesc || ''}`, async () => {
            const text = await locator.innerText();
            if (text.toLowerCase() !== expectedText.toLowerCase()) {
                throw new Error(`Expected text to be "${expectedText.toLowerCase()}", but got "${text.toLowerCase()}"`);
            }
        });
    }

    async isElementInteractable(locator: Locator, locatorDesc?: string): Promise<void> {
        await step(`Is element interactable: ${locatorDesc || ''}`, async () => {
            await locator.isEnabled() && await locator.isVisible();
        });
    }

}