import { Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "layouts/header";
import { QuotePage } from "pages/QuotePage";
import { SwapPage } from "pages/SwapPage";
import { Layer2Page } from "pages/Layer2Page";
import { MiningPage } from "pages/MiningPage";
import { OrderbookPage } from "pages/ProTradePage";
import {
  useTicker,
  ModalGroup,
  useDeposit,
  useForceWithdraw,
} from "@loopring-web/core";
import { LoadingBlock, LoadingPage } from "../pages/LoadingPage";
import { LandPage, WalletPage } from "../pages/LandPage";
import {
  ErrorMap,
  firebaseIOConfig,
  myLog,
  SagaStatus,
  setMyLog,
  ThemeType,
} from "@loopring-web/common-resources";
import { ErrorPage } from "../pages/ErrorPage";
import { useOpenModals, useSettings } from "@loopring-web/component-lib";
import {
  InvestMarkdownPage,
  MarkdownPage,
  NotifyMarkdownPage,
} from "../pages/MarkdownPage";
import { TradeRacePage } from "../pages/TradeRacePage";
import { GuardianPage } from "../pages/WalletPage";
import { NFTPage } from "../pages/NFTPage";
import { useGetAssets } from "../pages/Layer2Page/AssetPanel/hook";
import { Footer } from "../layouts/footer";
import { InvestPage } from "../pages/InvestPage";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";
import { getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseApp } from "@firebase/app";

const ContentWrap = ({
  children,
  state,
}: React.PropsWithChildren<any> & { state: keyof typeof SagaStatus }) => {
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
const WrapModal = () => {
  const { depositProps } = useDeposit(false);
  const { assetsRawData } = useGetAssets();
  const location = useLocation();
  const { setShowAccount } = useOpenModals();
  return (
    <ModalGroup
      assetsRawData={assetsRawData}
      depositProps={depositProps}
      isLayer1Only={
        /(guardian)|(depositto)/gi.test(location.pathname ?? "") ? true : false
      }
      onAccountInfoPanelClose={() => setShowAccount({ isShow: false })}
    />
  );
};

const RouterView = ({ state }: { state: keyof typeof SagaStatus }) => {
  const location = useLocation();

  const proFlag =
    process.env.REACT_APP_WITH_PRO && process.env.REACT_APP_WITH_PRO === "true";
  const { tickerMap } = useTicker();
  const { setTheme } = useSettings();

  // const { pathname } = useLocation();
  const query = new URLSearchParams(location.search);
  React.useEffect(() => {
    if (query.has("theme")) {
      query.get("theme") === ThemeType.dark
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [location.search]);

  React.useEffect(() => {
    if (state === SagaStatus.ERROR) {
      window.location.replace(`${window.location.origin}/error`);
    }
  }, [state]);
  if (query.has("___OhTrustDebugger___")) {
    // @ts-ignore
    setMyLog(true);
  }
  const analytics = getAnalytics();

  logEvent(analytics, "Route", {
    protocol: window.location.protocol,
    pathname: window.location.pathname,
    query: query,
  });
  // firebase.push("Route", {
  //   protocol: window.location.protocol,
  //   pathname: window.location.pathname,
  //   query: query,
  // });

  return (
    <>
      <Switch>
        <Route exact path="/wallet">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <WalletPage />
        </Route>

        <Route exact path="/loading">
          <LoadingPage />
        </Route>
        <Route path={["/guardian", "/guardian/*"]}>
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={false} />
          )}
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
              <GuardianPage />
            </Box>
          </Container>
        </Route>
        <Route exact path="/">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <LandPage />
        </Route>
        <Route exact path="/document/:path">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <Container
            maxWidth="lg"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <MarkdownPage />
          </Container>
        </Route>
        <Route exact path="/notification/:path">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <Container
            maxWidth="lg"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <NotifyMarkdownPage />
          </Container>
        </Route>

        <Route exact path="/investrule/:path">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} isLandPage />
          )}
          <Container
            maxWidth="lg"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <InvestMarkdownPage />
          </Container>
        </Route>

        <Route
          exact
          path={["/document", "/race-event", "/notification", "/investrule"]}
        >
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} />
          )}
          <ErrorPage messageKey={"error404"} />
        </Route>
        <Route exact path={["/race-event/:path"]}>
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} />
          )}
          <TradeRacePage />
        </Route>

        <Route path="/trade/pro">
          {query && query.has("noheader") ? (
            <></>
          ) : (
            <Header isHideOnScroll={true} />
          )}

          {state === "PENDING" && proFlag && tickerMap ? (
            <LoadingBlock />
          ) : (
            <Box display={"flex"} flexDirection={"column"} flex={1}>
              <OrderbookPage />
            </Box>
          )}
        </Route>
        <Route path="/trade/lite">
          <ContentWrap state={state}>
            <SwapPage />
          </ContentWrap>
        </Route>
        <Route exact path="/markets">
          <ContentWrap state={state}>
            <QuotePage />
          </ContentWrap>
        </Route>
        <Route exact path="/mining">
          <ContentWrap state={state}>
            <MiningPage />
          </ContentWrap>
        </Route>
        <Route exact path={["/layer2", "/layer2/*"]}>
          <ContentWrap state={state}>
            <Layer2Page />
          </ContentWrap>
        </Route>
        <Route exact path={["/nft", "/nft/*"]}>
          <ContentWrap state={state}>
            <NFTPage />
          </ContentWrap>
        </Route>
        <Route
          exact
          path={[
            "/invest",
            "/invest/mybalance",
            "/invest/balance",
            "/invest/ammpool",
          ]}
        >
          <ContentWrap state={state}>
            <InvestPage />
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
      {state === SagaStatus.DONE && <WrapModal />}
      {query && query.has("nofooter") ? <></> : <Footer />}
    </>
  );
};

export default RouterView;
