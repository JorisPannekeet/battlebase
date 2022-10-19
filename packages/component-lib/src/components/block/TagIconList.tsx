import { Avatar, Typography } from "@mui/material";
import React from "react";
import { CAMPAIGN_TAG } from "@loopring-web/common-resources";
import { useTheme } from "@emotion/react";

export const TagIconList = React.memo(
  ({
    campaignTagConfig,
    symbol,
    scenario,
    size,
  }: {
    campaignTagConfig: CAMPAIGN_TAG[];
    symbol: string;
    size?: string;
    scenario: "market" | "AMM" | "orderbook" | "Fiat";
  }) => {
    const theme = useTheme();
    return (
      <Typography
        component={"span"}
        display={"inline-flex"}
        className={"tagIconList"}
      >
        nah
      </Typography>
    );
  }
);
