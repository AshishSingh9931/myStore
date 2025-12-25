import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 py-6">
      <div className="container mx-auto text-center text-sm">
        <p className="mb-2">© {new Date().getFullYear()} MyStore. All Rights Reserved.</p>
        <p className="text-gray-400">Built with React + TailwindCSS</p>
      </div>
    </footer>
  );
}
