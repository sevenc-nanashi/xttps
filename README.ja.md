# Xttps / Twitter（X）のttps://をクリックできるようにする拡張機能。

**[English](./README.md)** / **日本語**

![demo](./demo.png)

Twitter（X）のttps://をクリックできるようにする拡張機能。
Tombstoneでリンクが消されるのを回避するのに使えます。

## インストール

### Tampermonkey（ほとんどのブラウザ）

1. [Tampermonkey](https://www.tampermonkey.net/) をブラウザにインストールします。
2. [xttps.user.js](https://github.com/sevenc-nanashi/xttps/raw/release/xttps.user.js) を開きます。
3. `インストール` ボタンをクリックします。

または、Tampermonkeyのダッシュボード（ユーティリティ > URLからインストール）で以下のURLを追加することでもインストールできます。

```
https://raw.githubusercontent.com/sevenc-nanashi/xttps/release/xttps.user.js
```

### Userscripts（Safari）

1. [Userscripts](https://itunes.apple.com/us/app/userscripts/id1463298887) をSafariにインストールします。
2. [xttps.user.js](https://github.com/sevenc-nanashi/xttps/raw/release/xttps.user.js) を開きます。
3. `</>` アイコン（または `ぁあ` > `</> Userscripts`）をクリック/タップします。
4. `Userscript detected. Click (Tap) to Install.` をクリック/タップします。

### Chrome Web Store（ChromeやEdgeなど）

TODO。レビュー待ち。

### Firefox Add-ons（Firefox）

<https://addons.mozilla.org/ja/firefox/addon/xttps/> からインストールできます。

## 開発

### 必要なもの

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/)（v18）

```
# 監視ビルド
pnpm dev

# zipをビルド
pnpm build
```

## ライセンス

この拡張機能はMITライセンスのもとで公開されています。詳細は[LICENSE](LICENSE)を参照してください。
