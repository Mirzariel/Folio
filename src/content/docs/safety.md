---
title: How Folio keeps your archive safe
description: What is read-only, what is recoverable, and what Folio refuses to do.
order: 2
---

## Analysis never changes anything

Scanning, identification, duplicate analysis and previews are read-only. They do not modify
your files and do not create files inside your sources.

## Removal is recoverable

Cleanup you approve uses the Windows Recycle Bin. Duplicate copies are quarantined into a
`.Folio` folder on the same drive first, where you can put them back.

Until you explicitly reclaim, Folio reports that it has freed nothing, because it has.

## Evidence, not guesses

Two files are called duplicates only when they are byte-for-byte identical. A shared filename
or matching size is a hint, never proof. Folio says **likely** before verification and
**verified** after.

## Backups stay backups

A copy on a different physical drive may be a deliberate backup. Folio distinguishes copies by
volume and lets you mark them as protected.

Marking a copy protected records your intention. It is not evidence that a backup exists or
has been checked, and Folio will not claim otherwise.
