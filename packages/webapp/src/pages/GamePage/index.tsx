// @ts-nocheck
import { html, render } from "./web_modules/htm/preact/standalone.module.js";
import React, { useEffect, useMemo } from "react";
import {
  useAccount,
  unlockAccount,
  useMyNFTCollection,
  useWalletLayer2NFT,
  store,
} from "@loopring-web/core";
import { SlayTheWeb } from "./ui/index";
import { useHeader } from "../../layouts/header/hook";
import { useMyNFT } from "../NFTPage/MyNFT/useMyNFT";
import { walletServices } from "@loopring-web/web3-provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  gql,
} from "@apollo/client";
import "./ui/index.css";
import { info } from "console";

const httpLink = new HttpLink({
  uri: "https://gamedata.betty.app/api/runtime/0c3b5088fa0147eda7d5eecd58348f7e",
});
export const client = new ApolloClient({
  link: httpLink as any,
  fetchOptions: {
    mode: "no-cors",
  },
  cache: new InMemoryCache(),
});

export const Game = () => {
  const account = store.getState().account;
  const { headerToolBarData } = useHeader();
  const allowedCreators = [
    "0xfe86f18373f116a1a4db56a0bde6ac638f36251b",
    "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a",
    "free",
    "0x1d006a27bd82e10f9194d30158d91201e9930420",
  ]; // creators filtered for relics .. not used
  const allowedCollections = ["749", "835", "2040", "838", "2509", "1991"]; // Collections filtered for relics
  const accountTotal = useAccount();
  const { copyToastOpen, isLoading, ...collectionListProps } =
    useMyNFTCollection();
  const { nftList, walletLayer2NFT } = useMyNFT({});
  // let nftData = [];

  // nftList.map((item) => {
  //   const collectionMeta = collectionListProps.collectionList?.find(
  //     (_item: any) => {
  //       return (
  //         _item?.contractAddress?.toLowerCase() ===
  //         item?.tokenAddress?.toLowerCase()
  //       );
  //     }
  //   );
  //   nftData.push({ ...item, collectionMeta });
  // });
  // console.log({ nftData });
  let runs = [];

  const getRuns = () => {
    return client
      .query({
        query: gql`
          query GetRuns {
            allRuns(take: 5) {
              results {
                id
                nickname
                gamedata
                walletAddress
                score
              }
            }
          }
        `,
      })
      .then((result) => {
        runs.push(result.data.allRuns.results);
        return result.data.allRuns.results;
      });
  };
  const f2pRelics = [
    {
      metadata: {
        base: { name: "Sacred frog" },
        imageSize: {
          original:
            "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
        },
      },
      tokenAddress: "free",
    },
    {
      metadata: {
        base: { name: "Good luck cat" },
        imageSize: {
          original:
            "https://a.pinatafarm.com/312x296/ae7f8ccd22/sad-thumbs-up-cat.jpg/m/522x0",
        },
      },
      tokenAddress: "free",
    },
  ];
  const allowedNFTs = [];
  allowedCreators.forEach((filterValue) => {
    allowedNFTs.push(
      ...walletLayer2NFT.filter((val) => val.tokenAddress.includes(filterValue))
    );
  });
  allowedNFTs.push(...f2pRelics);
  // allowedCollections.forEach((filterValue) => {
  //   allowedNFTs.push(
  //     ...collectionListProps.collectionList.filter((val) =>
  //       val.id?.toString().includes(filterValue)
  //     )
  //   );
  // });
  const connectAccount = async () => {
    headerToolBarData[4].handleClick();
  };
  const handleDisconnect = () => {
    walletServices.sendDisconnect("", "customer click disconnect");
  };

  useEffect(() => {
    console.log("rendering game");

    setTimeout(() => {
      renderObject();
    }, 1000);
  }, [account.readyState, collectionListProps.collectionList]);

  const renderGame = useMemo(() => {
    setTimeout(() => {
      renderObject();
    }, 1000);
  }, []);
  getRuns();
  const renderObject = () => {
    render(
      html`
        <${SlayTheWeb}
          connectedAccount=${accountTotal}
          accountState=${account.readyState}
          nfts=${allowedNFTs}
          connectEvent=${connectAccount}
          unlockEvent=${unlockAccount}
          disconnectEvent=${handleDisconnect}
          getRuns=${getRuns}
          runs=${runs}
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
