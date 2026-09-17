Drop client logo files here to have them appear as real logos in the
"Trusted By" marquee instead of a text wordmark.

Naming: kebab-case matching the client's `name` in src/data/content.ts,
e.g. "Access Bank" -> access-bank.png (or .svg).

Any client without a matching file automatically falls back to the
styled text wordmark chip — nothing breaks if a logo is missing.
