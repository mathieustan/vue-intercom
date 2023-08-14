import type { IntercomStatic } from '@/types';

declare global {
  interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    Intercom: IntercomStatic;
  }
}
