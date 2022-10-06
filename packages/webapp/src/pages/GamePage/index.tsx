// @ts-nocheck
import { html, render } from "./web_modules/htm/preact/standalone.module.js";
import { Box } from "@mui/material";
import { Toast, useSettings } from "@loopring-web/component-lib";
import { subMenuNFT, TOAST_TIME } from "@loopring-web/common-resources";
import React, { useEffect, useMemo } from "react";
import {
  useMyCollection,
  useNFTMintAdvance,
  ViewAccountTemplate,
  useAccount,
} from "@loopring-web/core";
import { SagaStatus } from "@loopring-web/common-resources";
import { useTranslation } from "react-i18next";
import { SlayTheWeb } from "./ui/index";
import "./ui/index.css";

export const Game = () => {
  const accountTotal = useAccount();
  const { status: accountStatus } = accountTotal;
  const isConnected = !accountStatus === SagaStatus.UNSET;

  const renderGame = useMemo(() => {
    setTimeout(() => {
      renderObject();
    }, 1000);
  }, []);
  const renderObject = () => {
    render(
      html` <${SlayTheWeb} connected=${isConnected} /> `,
      document.querySelector("#SlayTheWeb")
    );
  };

  return (
    <div id="game-root">
      <div id="SlayTheWeb">{renderGame}</div>
    </div>
  );
};
