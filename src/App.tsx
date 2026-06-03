import React from "react";
import { ThemeToggle } from "@/components";
import { HomePage } from "@/pages";
import "@/App.css";

function App() {
  return (
    <React.Fragment>
      <HomePage />
      <ThemeToggle />
    </React.Fragment>
  );
}

export default App;
