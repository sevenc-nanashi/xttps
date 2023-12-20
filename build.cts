import { cp, mkdir, rm, writeFile } from "fs/promises"
import { build } from "esbuild"
import packageJson from "./package.json"
import AdmZip from "adm-zip"
const buildJs = async (
  browser: "chrome" | "firefox",
  {
    production = false,
  }: {
    production?: boolean
  }
) => {
  await rm(`dist/${browser}`, { recursive: true, force: true })
  await mkdir("dist", { recursive: true })
  await cp("static", `dist/${browser}`, { recursive: true })
  await writeFile(
    `dist/${browser}/manifest.json`,
    JSON.stringify({
      manifest_version: 3,
      name: "Xttps",
      version: packageJson.version,
      description: packageJson.description,
      homepage_url: packageJson.homepage,
      icons: {
        48: "48.png",
      },

      content_scripts: [
        {
          matches: ["https://twitter.com/*", "https://x.com/*"],
          js: ["main.mjs"],
        },
      ],
    })
  )
  const options = {
    bundle: true,
    minify: true,
    sourcemap: !production,
    target: ["es2020"],
  }
  await build({
    entryPoints: ["src/main.mts"],
    outfile: `dist/${browser}/main.mjs`,
    ...options,
  })
  console.log("Build complete: dist/" + browser)
}

const pack = async (browser: "chrome" | "firefox") => {
  await mkdir("dist/pack", { recursive: true })
  const archive = new AdmZip()
  archive.addLocalFolder(`dist/${browser}`)
  await archive.writeZipPromise(`dist/pack/xttps-${browser}.zip`)
  console.log(`Pack complete: dist/pack/xttps-${browser}.zip`)
}

;(async () => {
  console.log("Building...")
  const packing = process.argv.includes("--pack")
  await buildJs("firefox", { production: packing })
  await buildJs("chrome", { production: packing })
  if (packing) {
    console.log("Packing...")
    await pack("firefox")
    await pack("chrome")
  }
})()
