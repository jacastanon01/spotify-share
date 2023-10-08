import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dark:dark-200 bg-light-850">
      <nav>Navbar</nav>
      <div className="flex"></div>
    </main>
  );
}
