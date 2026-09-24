---
title: How Folio keeps your archive safe
description: What is read-only, what is recoverable, and what Folio refuses to do.
order: 2
---

## Analysis never changes anything

Scanning, identification, duplicate analysis and previews are read-only. They do not modify
your files and do not create files inside your sources.

## Removal is recoverable

Cleanup you approve moves copies to the Windows Recycle Bin, where you can put them back. Folio
counts a copy as removed only when Windows confirms it is in the Recycle Bin, and it refuses to
remove from a drive that has no Recycle Bin, such as most network shares.

Folio will not propose removing every copy of a photograph. At least one always remains. There is
no permanent delete in Folio: emptying the Recycle Bin is your decision, made in Windows.

## Evidence, not guesses

Two files are called duplicates only when they are byte-for-byte identical. A shared filename
or matching size is a hint, never proof. Folio says **likely** before verification and
**verified** after.

## Backups stay backups

A copy on a different physical drive may be a deliberate backup. Folio distinguishes copies by
volume and lets you mark them as protected.

Marking a copy protected records your intention. It is not evidence that a backup exists or
has been checked, and Folio will not claim otherwise.
