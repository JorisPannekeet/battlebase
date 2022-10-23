import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled/";
import {
  DropDownIcon,
  getValuePrecisionThousand,
} from "@loopring-web/common-resources";
import { withTranslation } from "react-i18next";
import { Card } from "./Card";
import { useHistory } from "react-router-dom";
import { LoopringAPI } from "@loopring-web/core";
import { useSettings } from "@loopring-web/component-lib";
import { ContainerStyle, TitleTypography, ContainerStyled } from "./style";

const ButtonStyled = styled(Button)`
  display: flex;
  justify-content: space-around;
  background: linear-gradient(94.92deg, #4169ff 0.91%, #a016c2 103.55%);
  padding-left: 4rem;
  height: 6.4rem;
  fontsize: 1.4rem;
`;

const BottomBanner = styled(Box)`
  background: hsl(43deg 100% 18%);
` as typeof Box;

export const LandPage = withTranslation(["landPage", "common"])(
  ({ t }: any) => {
    const [value, setValue] =
      React.useState<
        | {
            timestamp: string;
            tradeVolume: string;
            totalUserNum: string;
            tradeNum: string;
            layerTwoLockedVolume: string;
          }
        | undefined
      >();
    const history = useHistory();
    const { isMobile } = useSettings();

    const result = React.useCallback(async () => {
      if (LoopringAPI.exchangeAPI) {
        const {
          timestamp,
          tradeVolume,
          totalUserNum,
          tradeNum,
          layerTwoLockedVolume,
        } = await LoopringAPI.exchangeAPI.getProtocolPortrait();
        setValue({
          timestamp,
          tradeVolume,
          totalUserNum,
          tradeNum,
          layerTwoLockedVolume,
        });
      }
    }, []);
    React.useEffect(() => {
      result();
    }, [result, LoopringAPI.exchangeAPI]);

    return (
      <ContainerStyle className="landingpage">
        <Box className="landpage-hero">
          <ContainerStyled isMobile={isMobile}>
            <Grid item xs={12}>
              <Box
                display={"flex"}
                flex={1}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  component={"h2"}
                  color={"var(--color-primary)"}
                  style={{
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                  }}
                >
                  Lvl5Mage presents
                </Typography>
                <Typography
                  component={"h1"}
                  fontWeight={700}
                  fontSize={isMobile ? 24 : 64}
                  marginTop={3}
                  whiteSpace={"pre-line"}
                  lineHeight={"100px"}
                >
                  Downfall
                </Typography>
                <Typography
                  component={"h2"}
                  fontSize={isMobile ? 20 : 38}
                  lineHeight={"46px"}
                  marginTop={1}
                >
                  The NFT Dungeon Crawler Card Game
                </Typography>
                <Typography marginTop={8.5} width={260}>
                  <button
                    style={{ width: "100%" }}
                    onClick={() => history.push("/game")}
                  >
                    Play now!
                  </button>
                </Typography>
              </Box>
            </Grid>
          </ContainerStyled>
        </Box>
        <Box style={{ background: "hsl(43deg 100% 18%)" }}>
          <ContainerStyled isMobile={isMobile}>
            <Grid item xs={12}>
              <TitleTypography isMobile={isMobile}>
                Collectible NFT cards
              </TitleTypography>
              <Typography
                marginTop={1.5}
                variant={isMobile ? "h5" : "h4"}
                lineHeight={"24px"}
                whiteSpace={"pre-line"}
                textAlign={"center"}
              >
                TODO: NFT playcards here in a slider
              </Typography>
            </Grid>
          </ContainerStyled>
        </Box>
        {/*)}*/}
        <Box style={{ background: "hsl(43deg 96% 27%)" }}>
          <ContainerStyled isMobile={isMobile}>
            <Grid item xs={12}>
              <TitleTypography isMobile={isMobile}>
                Use your existing NFT collections in-game!
              </TitleTypography>
              <Typography
                marginTop={1.5}
                variant={isMobile ? "h5" : "h4"}
                lineHeight={"24px"}
                whiteSpace={"pre-line"}
                textAlign={"center"}
              >
                TODO: show relics
              </Typography>
            </Grid>
          </ContainerStyled>
        </Box>
        <BottomBanner height={isMobile ? 400 : 500}>
          <ContainerStyled isMobile={isMobile}>
            <Grid
              item
              xs={12}
              display={"flex"}
              position={"relative"}
              style={{ minHeight: "auto" }}
            >
              <Box
                height={isMobile ? 400 : 500}
                // marginTop={isMobile ? 2 : 4}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  color={"#fff"}
                  component={"h4"}
                  whiteSpace={"pre-line"}
                  lineHeight={"56px"}
                  variant={isMobile ? "h2" : "h2"}
                >
                  About
                </Typography>

                <Typography
                  marginTop={1.5}
                  variant={isMobile ? "h5" : "h4"}
                  lineHeight={"24px"}
                  whiteSpace={"pre-line"}
                  textAlign={"center"}
                >
                  TODO: about the game and the team
                </Typography>
              </Box>
            </Grid>
          </ContainerStyled>
        </BottomBanner>
      </ContainerStyle>
    );
  }
);
