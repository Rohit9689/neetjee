import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Cookies from "es-cookie";


import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
const httpLink = new HttpLink({ uri: 'https://neetjee.el91.com/api/graphql' });

let client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


//  cache: new InMemoryCache() 

if (Cookies.get("studenttoken") != undefined && Cookies.get("studentrefreshtoken") != undefined) {


  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = Cookies.get("studenttoken");

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });


  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()

  });


}




const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

