# Complex refactor

Two modules contain nearly identical validation. Extract a helper only after
quoting both call sites. Preserve existing public signatures.
