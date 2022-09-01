import { DeFiCalcData, MarketType } from "@loopring-web/common-resources";
import * as sdk from "@loopring-web/loopring-sdk";
import { TokenInfo } from "@loopring-web/loopring-sdk";
import { DeFiChgType } from "@loopring-web/component-lib";
import { TradeDefi } from "@loopring-web/common-resources";

export type TradeDefiStatus<C> = {
  tradeDefi: TradeDefi<C>;
  __DAYS__: 30;
  __SUBMIT_LOCK_TIMER__: 1000;
  __TOAST_AUTO_CLOSE_TIMER__: 3000;
};
