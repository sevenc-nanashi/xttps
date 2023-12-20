import packageJson from "../package.json"
import * as dom from "./dom.mjs"

export const main = async () => {
  const mainElement = document.querySelector("main[role=main]")
  if (!mainElement) {
    setTimeout(main, 100)
    return
  }
  document.head.appendChild(dom.extStyle())

  const replacer = new MutationObserver(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve))
    const tweets = document.querySelectorAll(
      "div[data-testid='tweetText']:not([data-xttps-replaced])"
    )
    for (const tweet of Array.from(tweets)) {
      const spans = tweet.querySelectorAll(
        'span[class="css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc"]'
      )
      for (const span of Array.from(spans)) {
        const text = span.textContent
        if (!text) continue
        const urls = Array.from(text.matchAll(/ttps?:\/\/[^\s　]+/g))
        if (urls.length === 0) continue

        const textSegments: string[] = []
        let lastIndex = 0
        for (const url of urls) {
          const before = text.substring(lastIndex, url.index)
          textSegments.push(before)
          lastIndex = url.index + url[0].length
          textSegments.push(url[0])
        }
        const after = text.substring(lastIndex)
        textSegments.push(after)
        let index = -1
        const spanNextSibling = span.nextSibling
        for (const segment of textSegments) {
          index++
          if (segment.match(/^ttps?:\/\//)) {
            span.parentElement?.insertBefore(
              dom.tweetTextLink("h" + segment),
              spanNextSibling
            )
          } else {
            span.parentElement?.insertBefore(
              dom.tweetTextSpan(segment),
              spanNextSibling
            )
          }
        }

        span.remove()
      }
      tweet.setAttribute("data-xttps-replaced", "true")
    }
  })

  replacer.observe(mainElement, {
    childList: true,
    subtree: true,
  })
}
export const init = () => {
  const isInit = document.body.getAttribute("data-xttps-init")
  if (isInit === "true") return
  document.body.setAttribute("data-xttps-init", "true")

  console.log(
    "" +
      "%c== Xttps ----------------------------------------\n" +
      `  Xttps / ${packageJson.description}\n` +
      `  %cVersion: %cv${packageJson.version}\n` +
      `  %cDeveloped by %cNanashi.\n` +
      `  %c${packageJson.homepage}\n` +
      "%c--------------------------------------------------",
    "color: #1d9bf0",
    "color: auto",
    "color: #1d9bf0",
    "color: auto",
    "color: #48b0d5",
    "color: auto",
    "color: #1d9bf0"
  )
  main()
}

init()
