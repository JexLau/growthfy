import Script from "next/script"

// Umami 平台
export const Umami = () => {
  if (process.env.NODE_ENV !== "production") {
    return null
  }
  
  return <>
    <Script async src="https://aibrower.com/script.js" data-website-id="8d65925a-3e32-4739-ab7c-077f4ea903b6"></Script>
  </>
}