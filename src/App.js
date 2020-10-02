import React, { lazy, Suspense } from "react";

const Navigation = lazy(() => import("./routes/Navigation"));

function App() {
  return (
    <div className="app">
      <Suspense fallback={<span>Loading...</span>}>
        <Navigation />
      </Suspense>
    </div>
  );
}

export default App;
