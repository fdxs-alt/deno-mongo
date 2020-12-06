import React, { useState } from "react";

const App: React.FC = (): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <h1>{clicked ? "Clicked" : "Click button please"}</h1>
      <button onClick={() => setClicked((prev) => !prev)}>
        Click me to change h1
      </button>
    </div>
  );
};

export default App;
