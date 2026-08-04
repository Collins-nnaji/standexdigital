-- RenameColumn (data-safe: preserves existing StudioAccount rows)
ALTER TABLE "StudioAccount" RENAME COLUMN "surnameHash" TO "lastNameHash";
