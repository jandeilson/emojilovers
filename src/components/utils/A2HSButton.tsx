import * as React from "react";
import { A2HSPrompt } from "./hooks/A2HSPrompt";

export function A2HSButton() {
  const [prompt, promptToInstall] = A2HSPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  if (!isVisible) {
    return <div />;
  }

  return (
    <div onClick={hide}>
      <button onClick={hide}>Close</button>
      Hello! Wanna add to homescreen?
      <button onClick={promptToInstall}>Add to homescreen</button>
    </div>
  );
}