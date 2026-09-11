/**
 * The feedback form, sent in place. Without scripting the form still posts to
 * Web3Forms directly and the visitor lands on its confirmation page; this only
 * keeps them here and says plainly what happened.
 *
 * Two rules: never report a send the service did not confirm, and never clear
 * what someone wrote unless it went.
 */
import { copyEmailNode } from './copyEmail';

interface Web3FormsReply {
  success?: boolean;
}

export function initFeedback(): void {
  const form = document.querySelector<HTMLFormElement>('#feedbackForm');
  const status = document.querySelector<HTMLElement>('#fbStatus');
  if (!form || !status) return;

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const subject = form.querySelector<HTMLInputElement>('input[name="subject"]');
  const fallback = form.dataset.fallback ?? '';

  const setBusy = (busy: boolean) => {
    if (button) button.disabled = busy;
    form.setAttribute('aria-busy', busy ? 'true' : 'false');
  };

  const say = (text: string, state: 'busy' | 'ok' | 'error') => {
    status.textContent = text;
    status.dataset.state = state;
  };

  const sayFailed = () => {
    say('That did not send, and nothing you wrote was lost. Try again, or write to ', 'error');
    status.append(copyEmailNode(fallback));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button?.disabled) return;

    /* The inbox sorts on the subject, so it follows the chosen topic. Read at
       send time rather than on change: form.reset() puts the radios back but
       not a hidden input's value, which would file the next message wrongly. */
    const topic = form.querySelector<HTMLInputElement>('input[name="topic"]:checked');
    if (subject && topic?.dataset.subject) subject.value = topic.dataset.subject;

    setBusy(true);
    say('Sending…', 'busy');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const reply = (await response.json().catch(() => ({}))) as Web3FormsReply;
      if (response.ok && reply.success === true) {
        form.reset();
        say('Thanks. Your message was sent.', 'ok');
      } else {
        sayFailed();
      }
    } catch {
      sayFailed();
    } finally {
      setBusy(false);
    }
  });
}
