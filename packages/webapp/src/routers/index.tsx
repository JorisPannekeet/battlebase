import { Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "layouts/header";
import { useTicker, ModalGroup, useDeposit } from "@loopring-web/core";
import { LoadingPage } from "../pages/LoadingPage";
import { LandPage, WalletPage } from "../pages/LandPage";
import {
  ErrorMap,
  SagaStatus,
  setMyLog,
  ThemeType,
} from "@loopring-web/common-resources";
import { ErrorPage } from "../pages/ErrorPage";
import {
  useOpenModals,
  useSettings,
  LoadingBlock,
} from "@loopring-web/component-lib";
import { NFTPage } from "../pages/NFTPage";
import { Game } from "../pages/GamePage";
import { Footer } from "../layouts/footer";
import { getAnalytics, logEvent } from "firebase/analytics";

const ContentWrap = ({
  children,
  state,
}: React.PropsWithChildren<any> & { state: keyof typeof SagaStatus }) => {
  const page = window.location.href.split("/").pop();
  if (page === "game") {
    return (
      <>
        {/* <Header isHideOnScroll={false} /> */}
        {children}
      </>
    );
  }
  return (
    <>
      <Header isHideOnScroll={false} />
      {state === "PENDING" ? (
        <LoadingBlock />
      ) : state === "ERROR" ? (
        <ErrorPage {...ErrorMap.NO_NETWORK_ERROR} />
      ) : (
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            display={"flex"}
            flex={1}
            alignItems={"stretch"}
            flexDirection={"row"}
            marginTop={3}
          >
            {children}
          </Box>
        </Container>
      )}
    </>
  );
};

const RouterView = ({ state }: { state: keyof typeof SagaStatus }) => {
  const location = useLocation();

  const proFlag =
    process.env.REACT_APP_WITH_PRO && process.env.REACT_APP_WITH_PRO === "true";
  const { tickerMap } = useTicker();
  const { setTheme } = useSettings();

  // const { pathname } = useLocation();
  const searchParams = new URLSearchParams(location.search);
  React.useEffect(() => {
    if (searchParams.has("theme")) {
      searchParams.get("theme") === ThemeType.dark
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [location.search]);

  React.useEffect(() => {
    if (state === SagaStatus.ERROR) {
      window.location.replace(`${window.location.origin}/error`);
    }
  }, [state]);
  if (searchParams.has("___OhTrustDebugger___")) {
    // @ts-ignore
    setMyLog(true);
  }
  const analytics = getAnalytics();

  logEvent(analytics, "Route", {
    protocol: window.location.protocol,
    pathname: window.location.pathname,
    query: searchParams,
  });

  return (
    <>
      <Switch>
        <Route exact path="/wallet">
          {searchParams && searchParams.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <WalletPage />
        </Route>

        <Route exact path="/loading">
          <LoadingPage />
        </Route>
        <Route exact path="/">
          {searchParams && searchParams.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <LandPage />
        </Route>
        <Route exact path={["/nft", "/nft/*"]}>
          <ContentWrap state={state}>
            <NFTPage />
          </ContentWrap>
        </Route>
        <Route exact path={["/game", "/game/*"]}>
          <ContentWrap state={state}>
            <Game />
          </ContentWrap>
        </Route>
        <Route
          path={["/error/:messageKey", "/error"]}
          component={() => (
            <>
              <Header isHideOnScroll={true} isLandPage />
              <ErrorPage {...ErrorMap.NO_NETWORK_ERROR} />
            </>
          )}
        />
        <Route
          component={() => (
            <>
              <Header isHideOnScroll={true} isLandPage />
              <ErrorPage messageKey={"error404"} />
            </>
          )}
        />
      </Switch>

      {searchParams && searchParams.has("nofooter") ? <></> : <Footer />}
    </>
  );
};

export default RouterView;
