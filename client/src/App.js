import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { SearchPhotos } from "./pages/SearchPhotos";
import { Upload } from "./pages/Upload";
import { SinglePhoto } from "./pages/SinglePhoto";

import { Copyright } from "./components/Copyright";
import { Navbar } from "./components/Navbar";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

const uploadLink = createUploadLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // TODO: do we still need the httpLink?
  link: from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <SearchPhotos />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/upload" component={Upload} />
            {/* <Route exact path="/singlephoto" component={SinglePhoto} /> */}
            <Route exact path="/singlephoto">
              <SinglePhoto />
            </Route>
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
          <Copyright />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
