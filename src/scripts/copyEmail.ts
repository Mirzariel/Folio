/**
 * Copyable email addresses, used instead of mailto: links. A mailto: link hands
 * the visitor to whatever mail app the operating system has registered, which
 * on Windows is usually Mail whether or not anyone uses it. Copying lets them
 * paste the address into the inbox they actually use.
 *
 * Delegated from the document, so an address added later (the feedback form's
 * error line) works without registering anything. Plain timers, no
 * requestAnimationFrame: the confirmation must show in a tab that never paints.
 */
const CONFIRM_MS = 2000;

/**
 * Builds the same markup as src/components/primitives/CopyEmail.astro, for an
 * address added at runtime. Change both together.
 */
export function copyEmailNode(email: string): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = 'copy-email';

  const address = document.createElement('span');
  address.className = 'copy-email__addr';
  address.textContent = email;

  const label = document.createElement('span');
  label.className = 'copy-email__label';
  label.textContent = 'Copy';

  const hint = document.createElement('span');
  hint.className = 'vh';
  hint.textContent = ' email address';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-email__btn';
  button.dataset.copy = email;
  button.append(label, hint);

  wrap.append(address, button);
  return wrap;
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Without clipboard access, select the address so the keyboard can copy it. */
function selectContents(node: Node): void {
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function initCopyEmail(): void {
  const announcer = document.createElement('span');
  announcer.className = 'vh';
  announcer.setAttribute('role', 'status');
  document.body.append(announcer);

  const timers = new WeakMap<HTMLElement, number>();

  document.addEventListener('click', async (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('.copy-email__btn');
    if (!button) return;

    const label = button.querySelector<HTMLElement>('.copy-email__label');
    const copied = await writeClipboard(button.dataset.copy ?? '');
    if (!copied) {
      const address = button.closest('.copy-email')?.querySelector('.copy-email__addr');
      if (address) selectContents(address);
    }

    if (label) label.textContent = copied ? 'Copied' : 'Selected';
    announcer.textContent = copied
      ? 'Email address copied.'
      : 'Email address selected. Copy it with your keyboard.';

    window.clearTimeout(timers.get(button));
    timers.set(
      button,
      window.setTimeout(() => {
        if (label) label.textContent = 'Copy';
        announcer.textContent = '';
      }, CONFIRM_MS),
    );
  });
}
