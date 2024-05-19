import { useMemo } from "react";
import { useGlobalProvider } from "./hooks";
import { CreateQuiz, Loader, Quiz , Results } from "./components";
import { View } from "./types";

function App() {
  const { showLoader, view } = useGlobalProvider();

  const renderView = useMemo(() => {
    switch (view) {
      case View.Quiz:
        return <Quiz />;
      case View.Done:
        return <Results />;
      default:
        return <CreateQuiz />;
    }
  }, [view]);

  return (
    <>
      {renderView}
      {showLoader && <Loader />}
    </>
  );
}

export default App;