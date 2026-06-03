import React from "react";
import { ThemeToggle, ThemeSelector } from "@/components";
import { HomePage } from "@/pages";
import "@/App.css";

function App() {
  return (
    <React.Fragment>
      <HomePage />
      <ThemeSelector />
      <ThemeToggle />
    </React.Fragment>
  );
}

export default App;
