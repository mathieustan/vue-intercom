/* istanbul ignore file */
export function loadAsyncScript (appId: string, callback: () => void) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://widget.intercom.io/widget/${appId}`;
  script.onload = callback;

  const firstScript = document.getElementsByTagName('script')[0] as HTMLElement;
  firstScript?.parentNode?.insertBefore?.(script, firstScript);
}
