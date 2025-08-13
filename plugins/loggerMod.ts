import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
import logger from "./logger";

export default class CustomReporterConfig implements Reporter {

    onTestBegin(test: TestCase): void {
        logger.info(`Test Case Started   : ${test.title}`);

    }

    onTestEnd(test: TestCase, result: TestResult): void {
        logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === 'test.step') {
            logger.info(`Executing Step      : ${step.title}`);
        }
    }

    onError(error: TestError): void {
        logger.error(error.message);
    }
}

// console.log( "\u001b[1;31m Red message" );
// console.log( "\u001b[1;32m Green message" );
// console.log( "\u001b[1;33m Yellow message" );
// console.log( "\u001b[1;34m Blue message" );
// console.log( "\u001b[1;35m Purple message" );
// console.log( "\u001b[1;36m Cyan message" );
