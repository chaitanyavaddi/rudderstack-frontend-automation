
import { allure } from 'allure-playwright';
import "@plugins/loggerMod"
import logger from './logger';

export async function step(name: string, fn: () => Promise<void>) {
  logger.info(`Starting step: ${name}`);
  await allure.step(name, fn);
  logger.info(`Completed step: ${name}`);
}
