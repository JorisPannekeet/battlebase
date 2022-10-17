// @ts-nocheck
import { html, render } from "./web_modules/htm/preact/standalone.module.js";
import { Box } from "@mui/material";
import { useWalletLayer2NFT } from "@loopring-web/core";
import { useMyNFT } from "../NFTPage/MyNFT/useMyNFT";
import React, { useEffect, useMemo } from "react";
import {
  useMyCollection,
  useNFTMintAdvance,
  ViewAccountTemplate,
  useAccount,
} from "@loopring-web/core";
// import { WalletConnectL2Btn } from "./index";
import { SlayTheWeb } from "./ui/index";
import "./ui/index.css";

export const Game = () => {
  const allowedCollections = [
    "0xfe86f18373f116a1a4db56a0bde6ac638f36251b",
    "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a",
  ];
  const accountTotal = useAccount();
  const {
    status: walletLayer2NFTStatus,
    walletLayer2NFT,
    total: totalOrg,
    page: page_reudex,
    updateWalletLayer2NFT,
  } = useWalletLayer2NFT();

  const allowedNFTs = [];
  allowedCollections.forEach((filterValue) => {
    allowedNFTs.push(
      ...walletLayer2NFT.filter((val) => val.tokenAddress.includes(filterValue))
    );
  });

  const renderGame = useMemo(() => {
    setTimeout(() => {
      renderObject();
    }, 1000);
  }, []);
  const renderObject = () => {
    render(
      html`
        <${SlayTheWeb} connectedAccount=${accountTotal} nfts=${allowedNFTs} />
      `,
      document.querySelector("#SlayTheWeb")
    );
  };

  return (
    <div id="game-root">
      <div id="SlayTheWeb">{renderGame}</div>
    </div>
  );
};
