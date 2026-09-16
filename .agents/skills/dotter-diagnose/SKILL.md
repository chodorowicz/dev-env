---
name: dotter-diagnose
description: Diagnose failed Dotter deployments and show the exact cache-to-target diff behind changed-target or skipped-file errors. Use when investigating Dotter cache drift or deciding how to reconcile deployed dotfiles.
---

# Diagnose Dotter deployment conflicts

Run from the dotfiles repository root. Check `dotter --version` and `dotter --help` when flags or behavior are uncertain; this workflow was verified with 0.13.5.

## Start with the built-in diff

```sh
dotter -d deploy
```

Preserve the failing invocation's configuration, cache-path overrides, and input patch if present. Dry-run implies verbose output and prints the diff responsible for a changed-target refusal, along with the source and target paths. Exit status 1 can mean files were skipped; read the accompanying error before diagnosing the cache. Use `dotter --diff-context-lines 10 -d deploy` for more context.

Never add `--force` to a diagnostic dry-run: Dotter documents that force overrides dry-run. Inspect configured deployment hooks and template command helpers if their side effects are relevant; dry-run is not a sandbox for arbitrary code.

## Compare the right pair of files

Dotter has three distinct inputs to understand:

- Repository source: may contain template expressions and variables.
- Cached rendered file: the deployment baseline, normally `.dotter/cache/<source-relative-path>`.
- Target: the file currently installed on the machine.

`.dotter/cache.toml` records source-to-target mappings in `[templates]` and `[symlinks]`; it is not the cached file content. Respect `--cache-file` and `--cache-directory` overrides. Use the error's mapping and the manifest instead of guessing a destination from the basename, especially for recursively deployed directories.

For a changed template target, compare cached content to the actual target:

```sh
diff -u -- .dotter/cache/git/config/ignore "$HOME/.config/git/ignore"
```

Substitute the reported paths. Minus lines are the cached baseline; plus lines are the current target. `diff` status 0 means identical, 1 means differences, and greater than 1 means an error. This comparison isolates local target edits that `git diff` in the repository cannot show.

If needed, separately compare cache to repository source to distinguish repository edits from target edits. This is a literal comparison, not a rendered preview: template substitutions can legitimately differ. Use Dotter's dry-run output to assess proposed rendered changes. A cache-to-target mismatch alone does not establish cache corruption, even if the target already matches the current source.

For other failures, follow the actual error: an untracked existing target, missing cache content, incorrect symlink destination, template parsing failure, or permissions error needs a different diagnosis. For symlinks inspect `ls -ld` and `readlink`; a content diff does not establish whether the link points to the expected source.

## Explain the finding and choose a reconciliation

Report the failing source/target pair, the meaningful added or removed lines, and whether the evidence shows target edits, repository edits, or missing/inconsistent cache state. Avoid dumping unrelated configuration or secrets.

For a diagnosis-only request, stop after showing the diff and explaining the options. Do not delete the cache or deploy as a diagnostic shortcut. The cache preserves the baseline needed to identify local changes.

When repair is requested, preserve desired target changes in the repository source while retaining template expressions. Merging those edits into the source alone may still leave the target different from the cached baseline. After preserving the target, reconcile that specific target with its baseline and run a normal deployment, or use an authorized force deployment after reviewing every affected file. Force can overwrite other conflicts in the selected deployment. Re-run dry-run after reconciliation to verify that the refusal is gone, and distinguish that check from a completed real deployment.

Reference: [Dotter upstream CLI documentation](https://github.com/SuperCuber/dotter#usage). Prefer the installed binary's help when its version differs.
