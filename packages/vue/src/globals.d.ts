import type { IntercomStatic } from '@mathieustan/intercom';

declare global {
  export const __VERSION__: string;

  interface Window {
    Intercom: IntercomStatic;
  }
}
