import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SinglePhotocardPage from "./components/SinglePhotocardPage";
import CreatePhotocardForm from "./components/CreatePhotocard";
import UpdatePhotocardForm from "./components/UpdatePhotocard";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/photocards/:photocardId/update">
            <UpdatePhotocardForm />
          </Route>
          <Route path="/photocards/create">
            <CreatePhotocardForm />
          </Route>
          <Route path="/photocards/:id">
            <SinglePhotocardPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
