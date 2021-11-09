import React from "react";
import "antd/dist/antd.css";
import UploadQueue from "./Pages/UploadQueue.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Initial from "./Components/Initial.jsx";
import {QueryClient,QueryClientProvider} from 'react-query';
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Message from "./Pages/Message.jsx";
import Error from "./Pages/Error.jsx";
import UploadPage from "./Pages/Upload.jsx";
import Background from "./Components/Background.jsx";
import Test from "./Pages/Test.jsx";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
      <Background />
      <div id={"App"}>
        <div id={"AppBack"} />
        <Initial />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/message">
            <Message />
          </Route>
          <Route path="/uploadqueue">
            <UploadQueue />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
