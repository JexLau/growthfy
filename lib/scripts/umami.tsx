import Script from "next/script"

// Umami 平台
export const Umami = () => {
  if (process.env.NODE_ENV !== "production") {
    return null
  }
  
  return <>
    <Script async src="https://aibrower.com/script.js" data-website-id="fd8bc2f2-cdb7-46cd-b882-e02fe7af5db9"></Script>
  </>
}