import van from "vanjs-core"
const { a, style, span } = van.tags

export const extStyle = () =>
  style(
    {},
    `
      .xttps-link:hover {
        text-decoration: underline;
      }
      `
  )

export const tweetTextBold = "r-b88u0q"
export const tweetTextSpanClasses = [
  "css-1qaijid",
  "r-bcqeeo",
  "r-qvutc0",
  "r-1tl8opc",
]

export const tweetTextSpan = (
  text: string,
  {
    bold = false,
  }: {
    bold?: boolean
  } = {}
) =>
  span(
    {
      class:
        "css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc" +
        (bold ? " " + tweetTextBold : ""),
      style: "text-overflow: unset;",
    },
    text
  )
const ellipsis = () =>
  span(
    {
      "aria-hidden": "true",
      class: "css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc r-lrvibr",
      style: "text-overflow: unset;",
    },
    "…"
  )

export const tweetTextLink = (url: string) => {
  const prePathMatch = url.match(/https?:\/\/([^/]+)/)
  if (!prePathMatch) return undefined
  const prePathRaw = prePathMatch[1]
  const pathRaw = url.substring(prePathMatch[0].length)

  const longPrePath = prePathRaw.length >= 27
  const longPath = pathRaw.length >= 16

  const prePath = longPrePath
    ? prePathRaw.substring(prePathRaw.length - 25)
    : prePathRaw
  const path = longPath ? pathRaw.substring(0, 14) : pathRaw
  const pathString = path.length <= 1 ? prePath : prePath + path
  return a(
    {
      dir: "ltr",
      href: url,
      rel: "noopener noreferrer nofollow",
      target: "_blank",
      role: "link",
      class: "css-1qaijid r-bcqeeo r-qvutc0 r-poiln3 r-1loqt21" + " xttps-link",
      style: "color: rgb(29, 155, 240); text-overflow: unset;",
    },
    span(
      {
        style: "text-overflow: unset; opacity: 0.5; font-size: 80%;",
      },
      url.startsWith("https://") ? "ttps://" : "ttp://"
    ),
    longPrePath ? ellipsis : "",
    pathString,
    longPath ? ellipsis : ""
  )
}
