import AppRouter from "./AppRouter";
import { AppSession } from "./hooks/withSession";

import "./stylesheets/semantic.css";
import "./stylesheets/styles.css";

function App() {
  return (
    <AppSession>
      <AppRouter />
    </AppSession>
  );
}

export default App;
