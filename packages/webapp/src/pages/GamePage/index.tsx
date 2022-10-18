// @ts-nocheck
import { html, render } from "./web_modules/htm/preact/standalone.module.js";
import { useWalletLayer2NFT, store } from "@loopring-web/core";
import React, { useEffect, useMemo } from "react";
import { useAccount, unlockAccount } from "@loopring-web/core";
import { SlayTheWeb } from "./ui/index";
import { useHeader } from "../../layouts/header/hook";
import "./ui/index.css";

export const Game = () => {
  const account = store.getState().account;
  const { headerToolBarData } = useHeader();
  const allowedCollections = [
    "0xfe86f18373f116a1a4db56a0bde6ac638f36251b",
    "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a",
  ];
  const accountTotal = useAccount();
  const { walletLayer2NFT } = useWalletLayer2NFT();

  const allowedNFTs = [];
  allowedCollections.forEach((filterValue) => {
    allowedNFTs.push(
      ...walletLayer2NFT.filter((val) => val.tokenAddress.includes(filterValue))
    );
  });
  const connectAccount = async () => {
    headerToolBarData[4].handleClick();
  };

  useEffect(() => {
    console.log("rendering game");
    setTimeout(() => {
      renderObject();
    }, 1000);
  }, [account.readyState, walletLayer2NFT]);

  const renderGame = useMemo(() => {
    setTimeout(() => {
      renderObject();
    }, 1000);
  }, []);
  const renderObject = () => {
    render(
      html`
        <${SlayTheWeb}
          connectedAccount=${accountTotal}
          accountState=${account.readyState}
          nfts=${allowedNFTs}
          connectEvent=${connectAccount}
          unlockEvent=${unlockAccount}
        />
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
