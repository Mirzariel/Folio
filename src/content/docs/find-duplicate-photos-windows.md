---
title: How to find duplicate photos on Windows
description: Why file names and sizes mislead, how byte-for-byte matching proves two photos are identical, and how to remove extra copies without losing the original.
order: 3
---

Duplicate photos pile up quietly. A folder gets copied to a backup drive, a phone import runs
twice, an editor saves a "Copy" next to the original. Over a few years the same photograph can
exist in five places, and Windows has no built-in way to tell you.

## Why names and sizes are not enough

The usual advice is to sort a folder by name or size and look for matches. That fails in both
directions:

- Two different photographs can share a name. Cameras restart their numbering, so `IMG_4821.jpg`
  from one trip and `IMG_4821.jpg` from another are unrelated files.
- Two copies of one photograph can have different names. `IMG_4821 (1).jpg` and
  `IMG_4821 - Copy.jpg` are the same picture under new labels.
- A matching size or timestamp is a hint, never proof. Different photographs can match on both.

## What proves two files are identical

The only reliable test is to compare what is inside the files. Two photographs are duplicates
when they are byte-for-byte identical. Folio treats a shared name, size or date as a reason to
look closer, and shows a group of duplicates only once its copies are verified identical. There is
no "probably the same" list to trust.

Folio does not detect photographs that merely look alike, such as burst shots or an original and
an edited version. Those are different files, and removing one would lose something.

## Find duplicates with Folio

1. **Add your locations.** Add the folders and drives that hold your photos, including backup
   drives. Folio reads them without changing anything.
2. **Let it read.** The scan only reads. You can stop it, close Folio, and choose Resume later.
3. **Open Find duplicates.** Each group lists every copy and where it lives.
4. **Mark your backups.** A copy you mark **Keep as backup** is never offered for removal.
5. **Choose, or let Folio choose.** Let Folio choose keeps exactly one copy of each photograph,
   preferring a copy you marked as a backup.
6. **Read the plan, then approve.** Folio shows what it will do in plain language. Nothing on
   your drives changes until you approve.

## Removal is recoverable

Cleanup you approve moves copies to the Windows Recycle Bin, where you can put them back. Folio
never proposes removing every copy of a photograph, so at least one always remains. There is no
permanent delete in Folio: emptying the Recycle Bin stays your decision, made in Windows.

Where Windows cannot guarantee that a copy can be restored, Folio refuses the cleanup and says
why. That applies to USB flash drives and SD cards, exFAT drives, a Recycle Bin that is off or too
full, and files larger than the Recycle Bin.

## Before you start

Mark your backups first. Marking a copy to keep records your intention. It is not evidence that
a backup exists or has been checked, and Folio will not claim otherwise.

See also [How Folio keeps your archive safe](/docs/safety) and
[how to organize photos by date](/docs/organize-photos-by-date-windows).
