import Script from "next/script"

export const GTag = () => {
  if (process.env.NODE_ENV !== "production") {
    return null
  }
  const gtagId = "G-P220E7161H"
  return <>
    <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} />
    <Script id="gtag" async dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gtagId}');`}} />
  </>
}