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
counts a copy as removed only when Windows confirms it is in the Recycle Bin. Where Windows cannot
guarantee a copy can be restored, Folio refuses and says why: on USB flash drives and SD cards, on
exFAT drives, when the Recycle Bin is off or too full, and for a file larger than the Recycle Bin.

Folio will not propose removing every copy of a photograph. At least one always remains. There is
no permanent delete in Folio: emptying the Recycle Bin is your decision, made in Windows.

## Evidence, not guesses

Two files are called duplicates only when they are byte-for-byte identical. A shared filename
or matching size is a hint, never proof. A group of duplicates appears only once its copies are
verified identical. Photographs that merely look alike are not detected.

## Backups stay backups

A copy on a different physical drive may be a deliberate backup. Folio notes which copies share a
drive, and a copy you mark **Keep as backup** is never offered for removal, including when you
let Folio choose. Without that mark, Let Folio choose keeps exactly one copy of each photograph.

Marking a copy to keep records your intention. It is not evidence that a backup exists or
has been checked, and Folio will not claim otherwise.
