# Xttps / Make ttps:// links clickable in Twitter (or X)

![demo](./demo.png)

This extension makes `ttps://` links clickable in Twitter.
This is useful when you want to avoid X's "Tombstone" blocker.

## Installation

### via Tampermonkey

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Open [xttps.user.js](https://github.com/sevenc-nanashi/xttps/raw/release/xttps.user.js) and click "Install" button.

Alternatively, you can add the script via URL in Tampermonkey dashboard (Utilities > Install from URL):
```
https://raw.githubusercontent.com/sevenc-nanashi/xttps/release/xttps.user.js
```

### via Chrome Web Store

TODO. Waiting for review.

### via Firefox Add-ons

TODO. Waiting for review.

## Development

### Requirements

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/) (v18)

```
# Live re-build
pnpm dev

# Build zip
pnpm build
```

## License

This extension is licensed under the MIT License. See [LICENSE](LICENSE) for details.
