/* istanbul ignore file */
import { warn } from 'vue';

export function consoleWarn (message: string): void {
  warn(`[VueIntercom]: ${message}`);
}

export function consoleError (message: string): void {
  warn(`[VueIntercom] error: ${message}`);
}

