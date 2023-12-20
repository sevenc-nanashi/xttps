import packageJson from "../package.json"
import * as dom from "./dom.mjs"
const spanClasses = ["css-1qaijid", "r-bcqeeo", "r-qvutc0", "r-1tl8opc"]

export const main = async () => {
  const mainElement = document.querySelector("main[role=main]")
  if (!mainElement) {
    setTimeout(main, 100)
    return
  }
  document.head.appendChild(dom.extStyle())

  let respondCount = 0
  const replacer = new MutationObserver(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve))
    if (respondCount > 0) return
    respondCount++
    while (respondCount > 0) {
      try {
        const tweets = document.querySelectorAll(
          "div[data-testid='tweetText']:not([data-xttps-replaced])"
        )
        for (const tweet of Array.from(tweets)) {
          tweet.setAttribute("data-xttps-replaced", "true")
          const spanSegments: HTMLSpanElement[][] = [[]]
          for (const tweetElement of Array.from(tweet.childNodes)) {
            if (!(tweetElement instanceof HTMLSpanElement)) {
              spanSegments.push([])
              continue
            }

            if (spanClasses.every((c) => tweetElement.classList.contains(c))) {
              spanSegments[spanSegments.length - 1].push(tweetElement)
            } else {
              spanSegments.push([])
            }
          }

          for (const spanSegment of Array.from(
            spanSegments.filter((s) => s.length > 0)
          )) {
            const text = spanSegment.map((s) => s.textContent).join("")
            if (!text) continue
            const spanSegmentLength: {
              start: number
              length: number
              type: "text" | "bold"
              text: string
            }[] = []
            let spanSegmentIndex = 0
            for (const span of spanSegment) {
              spanSegmentLength.push({
                start: spanSegmentIndex,
                length: span.textContent.length,
                type: span.classList.contains(dom.tweetTextBold)
                  ? "bold"
                  : "text",
                text: span.textContent,
              })
              spanSegmentIndex += span.textContent.length
            }

            const urls = Array.from(text.matchAll(/ttps?:\/\/[^\s　]+/g))
            if (urls.length === 0) continue
            const textSegments: {
              text: string
              type: "text" | "bold" | "link"
            }[] = []
            let lastIndex = 0
            for (const url of urls) {
              const correspondingSpans = spanSegmentLength.filter(
                (s) => s.start < url.index + url[0].length
              )
              if (correspondingSpans.length === 0) continue
              for (const span of correspondingSpans) {
                if (span.start < url.index) {
                  textSegments.push({
                    text: span.text.substring(0, url.index - span.start),
                    type: span.type,
                  })
                }
              }
              lastIndex = url.index + url[0].length
              textSegments.push({
                text: url[0],
                type: "link",
              })
            }
            const lastText = text.substring(lastIndex)
            if (lastText) {
              textSegments.push({
                text: lastText,
                type: spanSegmentLength[spanSegmentLength.length - 1].type,
              })
            }
            console.debug(
              ...[
                `Fixing ttps:\n%c${textSegments.map((s) => s.text).join("%c")}`,
                ...textSegments.map((s) =>
                  s.type === "link"
                    ? "color: #1d9bf0; text-decoration: underline; font-weight: auto;"
                    : s.type === "bold"
                      ? "color: auto; font-weight: bold; text-decoration: underline;"
                      : "color: auto; font-weight: auto; text-decoration: auto;"
                ),
              ]
            )

            let index = -1
            const spanNextSibling =
              spanSegment[spanSegment.length - 1].nextSibling
            for (const segment of textSegments) {
              index++
              if (segment.type === "link") {
                tweet.insertBefore(
                  dom.tweetTextLink("h" + segment.text),
                  spanNextSibling
                )
              } else {
                tweet.insertBefore(
                  dom.tweetTextSpan(segment.text, {
                    bold: segment.type === "bold",
                  }),
                  spanNextSibling
                )
              }
            }

            spanSegment.forEach((s) => s.remove())
          }
        }
      } finally {
        respondCount--
      }
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
