import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
const Navigation = lazy(() => import("./routes/Navigation"));

function App() {
  return (
    <ApolloProvider client={client} store={store}>
      <Provider store={store}>
        <div className="app">
          <Suspense fallback={<span>Loading from suspense ...</span>}>
            <Navigation />
          </Suspense>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
