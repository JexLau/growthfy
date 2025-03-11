import React from "react";
import { HomePageClient } from "./(components)/client";
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
