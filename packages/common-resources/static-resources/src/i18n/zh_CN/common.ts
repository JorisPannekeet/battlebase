/* eslint-disable max-len */

export default {
  labelErrorTitle: "Error Detail:",
  labelNoContent: "No Content",
  labelError: "错误",
  tokenEnter: "输入币种",
  tokenEnterPaymentToken: "",
  tokenMax: "可用:",
  tokenNFTMaxMINT: "Max:",
  tokenHave: "可用:",
  tokenEnterReceiveToken: "",
  tokenSelectToken: "选择币种",
  tokenExchange: "转换",
  tokenNotEnough: "{{belong}}余额不足无法交易",
  tokenSearchCoin: "搜索交易币种",
  swapTitle: "兑换",
  swapTolerance: "滑点范围",
  labelSwapToleranceTooltips:
    "Your trade will revert if the price changes unfavorably by more than this percentage.",
  swapPriceImpact: "价格影响",
  labelSwapPriceImpactTooltips:
    "The difference between market price and estimated price due to trade size",
  swapMinReceive: "最少买入",
  swapMinReceiveS: "Min. Received",
  labelSwapMinReceiveTooltips:
    "Because the pool price changes dynamically, the price you see when placing an order may be inconsistent with the final transaction price, but the protocol can guarantee that you will receive at least this amount.",
  swapFee: "费用",
  swapFeeS: "Est. Fee",
  labelSwapFeeTooltips:
    "The trading fee is determined by your VIP level and the size of your trade. Small trades (below ~$100) incur a higher fee. Please review the fee before confirming.",
  swapBtn: "兑换",
  goBack: "返回",
  resetTitle: "重置二层账号密钥",
  resetLabelEnterToken: "请选择消耗代币",
  resetDescription:
    "创建一个新的二层身份验证签名密钥（无需备份），该操作将会<1>取消您的所有待定指令</1>。",
  resetFee: "{{count}} GAS ≈ ${{price}} 费用",
  resetLabelBtn: "重置",
  labelActiveEnterToken: "Select payment token",
  labelActiveAccountDescription:
    "You have enough balance to pay for Layer 2 creation as below.",
  labelActiveAccountFee: "Fee {{count}} GAS ≈ ${{price}}",
  labelActiveAccountBtn: "Reset",
  depositLabelEnterToken: "选择充值代币",
  depositDescription: "您的充值将会在以太坊<1>确认</1>后<3>两分钟</3>内到账。",
  depositAndActiveDescription:
    "完成一次充值来激活您的路印二层账号。您的充值将会在以太坊<1>确认</1>后<3>两分钟</3>内到账。",
  depositLabelRefer: "请输入推荐您的ENS，地址，或者账号ID。(选填)",
  depositLabelPlaceholder: "以太坊地址， 账号ID或ENS",
  withdrawDescription:
    "提现操作会被提交到以太坊的下一个区块，一般会在<1>30分钟到2小时</1>内到账。（如果以太坊的GAS价格<5>超过500GWei</5>的话，可能会存在<3>长时间的延迟</3>）",
  withdrawTypeLabelFast: "快速提现（最快15秒到账）",
  withdrawTypeLabelStandard: "普通提现（约25分钟）",
  labelConnectWallet: "连接钱包",

  labelCustomer: "自定义",
  labelChange24h: "{{timeUnit}} 涨幅",
  labelDepth: "深度",
  labelTrend: "价格",
  label1W: "1周",
  label1H: "1小时",
  label1D: "1日",
  labelCopyAddress: "复制地址",
  labelDisconnect: "断开",
  labelLockLayer2: "锁定",
  labelUnLockLayer2: "解锁",
  labelSwitchAccount: "切换钱包",
  labelViewEth: "跳转至Etherscan",
  labelQRCode: "查看二维码",
  labelShowAccountInfo: "查看,设置账号信息",
  labelAssetTitle: "总资产(路印二层)",
  labelAssetMobileTitle: "Layer 2 Total Assets",
  labelShowAccount: "显示或隐藏总资产",
  labelLevel: "VIP等级",
  labelOrderbook: "订单本",
  labelSetPublicKey: "设置 EdDSA 公钥",
  labelTitleSecurity: "安全设置",
  labelTitleResetL2Keypair: "重置二层账号密钥",
  labelBtnReset: "重置",
  labelHadChangPassword: "您在{{passDay}}修改了密码",
  labelTitleForceWithdraw: "强制提现",
  labelBtnForceWithdraw: "强制提现",
  labelTitleExportAccount: "导出账号",
  descriptionExportAccount: "你可以导出你的API密钥，在脚本中使用。",
  labelBtnExportAccount: "导出账号",
  labelTitlePreferences: "偏好设置",
  labelTitleLayout: "个性化设置",
  whichColorIsUp: "<0>{{up}} 上涨</0> -- <2>{{down}} 下跌</2>",
  labelTradeFeeLevel: "您的交易等级评定:",
  labelLanguage: "显示语言",
  labelCurrency: "结算货币",
  currencySetting: "货币设置",
  labelColors: "选择颜色",
  labelTheme: "暗黑模式",
  labelthemeLight: "明亮模式",
  labelthemeDark: "暗黑模式",
  labelgreen: "绿色",
  labelred: "红色",
  langZH: "中文",
  langEN: "英语",
  labelUSDollar: "美金结算",
  labelCNYYuan: "人民币结算",
  labelMaker: "挂单",
  labelTaker: "吃单",
  labelAssetsTitle: "资产清单",
  labelVolume: "总量",
  labelAmount: "成交量",
  labelLiquidityDeposit: "入金",
  labelLiquidityWithdraw: "出金",
  labelAvailable: "可用:",
  labelTokenAmount: "数量",
  labelRemoveLiquidityBtn: "立刻出金",
  labelAddLiquidityBtn: "立刻入金",
  labelEndLiquidityBtn: "活动已结束",
  labelTradePanelHideOtherPairs: "隐藏其他交易对",
  labelLPTokens: "权益代币",
  labelMyLPToken: "我的权益代币",
  labelMyLPAToken: "我的 {{symbol}}",
  labelMyLPBToken: "我的 {{symbol}}",
  labelMyLPAmountFor: "我的持有比",
  labelTrade: "兑换",
  labelAmmList: "AMM 列表",
  labelMyPoolShare: "我的份额",
  labelFee: "费用",
  labelLPTotal: "总资金池",
  labelReward: "奖励池",
  labelMyReward: "我的奖励",
  labelDate: "日期",
  labelBack: "返回",
  labelAPR: "APR",
  label24Volume: "24h 交易量",
  label24VolumeSimple: "24h Vol",
  labelTVL: "总锁仓量",
  labelAmmTotalToken: "池子中的代币",
  labelNoActiveEvent: "暂时没有活动",
  labelNew: "新的",
  labelAccount: "账户信息",
  labelAll: "所有",
  labelMe: "我的",
  labelMyTrade: "我的交易",
  labelRecent: "市场交易",
  labelMyAmm: "我的AMM流动性",
  labelMyAmmRecord: "我的AMM记录",
  labelCurrentActivities: "当前活动",
  labelPastActivities: "往期活动",
  labelTotalPositionValue: "我的流动性总价值",
  labelFeeRewards: "做市返佣",
  labelMiningRewards: "活动奖励",
  labelLiquidityValue: "流动性价值",
  labelCopyAddClip: "复制地址到剪切板！",
  labelPleaseInputWalletAddress: "请输入地址",
  labelEmptyDefault: "内容空空的～",
  labelUnlockAccount: "解锁账号",
  labelLockWallet: "Lock Wallet",
  labelAssetsDistribution: "资产分布",
  labelTotalAssets: "总资产",
  labelTxnPageTitle: "充值提现",
  labelTradePageTitle: "交易记录",
  labelAmmPageTitle: "AMM 出入金记录",
  labelSwapSuccess: "兑换成功！",
  labelOrderProcessing: "已下单！",
  labelSwapFailed: "兑换失败！",
  labelJoinAmmSuccess: "加入流动性池成功！",
  labelJoinAmmFailed: "加入流动性池失败！",
  labelExitAmmSuccess: "退出流动性池成功！",
  labelExitAmmFailed: "退出流动性池失败！",
  labelConnectBy: "当前连接 <1>{{connectBy}}</1>",
  labelWrongNetwork: "未识别网络",
  labelActivatedAccountDeposit: "首次开通二层钱包需充值并激活",
  labelActivatedAccountNotSupport: "Your wallet does not support Loopring L2.",
  labelActivatedAccountNotSupportDes:
    "  The wallet you have connected does not support Loopring Layer 2. Please use a different wallet to connect or download the Loopring Wallet app.",
  labelNotAllowForSmartWalletTitle: "Apologize",
  labelProcessing: "请稍等片刻",
  labelProviderProcessing: "{{name}}正在连接路印钱包",
  labelProviderCommonProcessDescribe:
    "请在{{name}}的弹出窗口内点击确定按钮。 如果{{name}}插件没有主动弹出窗口, 请在浏览器工具栏中点击 <1></1> 图标。",
  labelWalletConnectProcessDescribe:
    "正在等待WalletConnect确认相关信息，请耐心等待片刻。",
  labelWalletConnectQRCode:
    "请用移动端路印钱包（或支持WalletConnect的应用）扫描二维码",
  labelSuccessConnect: "使用{{providerName}}连接成功",
  labelSuccessConnectDescribe: "恭喜，连接成功",
  labelCopyClipBoard: "复制到剪切板",
  labelCopyManually: "Manually Selected & Copy:",
  labelRejectOrError: "用户拒绝或错误发生, 请<1>点击重试</1>。",
  labelWalletConnectProcessDescribe2: "请在你的移动应用上点击确认按钮。",
  labelUnlockProcessing: "正在解锁二层账号...",
  labelFailedConnect: "连接失败",
  // labelTokenAccess: '等待钱包确认{{symbol}}授权！',
  labelTokenAccess: "等待钱包确认授权！",
  labelFailedTokenAccess: "{{symbol}}授权失败！",
  labelSuccessTokenAccess: "恭喜, 你可以交易 {{symbol}} 了！",
  labelSuccessUnlockDescribe: "恭喜，解锁成功！",
  labelSuccessUnlock: "解锁成功",

  labelActivateAccount: "激活账户",
  labelClose: "关闭",
  labelRetry: "重试",
  labelTryNext: "尝试另一种签名",
  labelQuotePageFavourite: "自选",
  labelQuotePageAll: "全部",
  labelQuotePageTradeRanking: "交易竞赛",
  labelFailedUnlock: "解锁失败",
  labelFailedUpdateAcc: "更新账号失败",
  labelUpdateAccSigWarning:
    "你的钱包不支持当前签名方法，准备尝试另一种签名方式。",
  labelUpdateAccUserDenied: "签名被拒绝",
  labelCreateLayer2Title: "创建二层账号",
  labelCreateAccount: "创建二层账号",
  labelUpdateAccount: "激活二层账号",
  labelTryAnother: "尝试另一种签名方式",
  labelCancel: "取消",
  describeTitleNoAccount: "该账户还未开通路印二层，点击充值开通钱包。",
  describeTitleOpenAccounting: "您的充值已提交以太坊，\n等待以太坊确认。。。",
  describeTitleOnErrorNetwork:
    "路印暂不支持您当前登入的网络，\n请在{{connectName}}切换网络",
  describeTitleNotActive: "充值钱包, 激活账户, \n开始二层之旅.",
  describeTitleConnectToWallet: "点击按钮，连接路印钱包，\n开始二层之旅.",
  describeWhatIsGuardian: "what is Loopring guardian!",
  describeTitleConnectToWalletAsGuardian: "点击按钮，连接路印钱包，作为守护人",
  describeTitleLocked: "已连接您的钱包，\n点击解锁后查看账户信息",
  labelLiquidityPageTitle: "AMM 资金池",
  labelMinReceive: "最少接收量",
  labelFilter: "搜索",
  labelMiningPageTitle: "路印流动性挖矿",
  labelMiningPageViceTitle: "提供流动性以赚取奖励",
  labelMiningActiveDate: "奖励时间",
  labelMiningLiquidity: "流动性",
  labelMiningActivityReward: "活动奖励",
  labelMiningMyShare: "我的份额",
  labelMiningPlaceOrderBtn: "立刻下单",
  labelMiningViewDetails: "查看活动详情",
  labelMiningMaxSpread: "最大 spread",
  labelMiningMyReward: "我的奖励",
  labelMiningReward: "活动奖励",
  labelCookiesAgree: "同意",
  labelLimitMin: "最小下单量{{arg}}",
  labelLimitMax: "{{arg}} 最大下单量{{arg}}",
  labelOrderSmall: "Order too small (>= 100.5LRC)",
  labelEnterAmount: "请填写兑换数",
  labelAgreeLoopringTxt: "允许路印使用Cookies。",
  labelLayer2HistoryTransactions: "充值提现",
  labelLayer2HistoryTrades: "成交明细",
  labelLayer2HistoryAmmRecords: "出入金记录",
  labelTxnDetailHeader: "充值提现",
  labelDTxnDetailHeader: "充值记录",
  labelWTxnDetailHeader: "提现记录",
  labelTTxnDetailHeader: "转账记录",
  labelTxnDetailHash: "二层哈希值",
  labelTxnDetailHashLv1: "以太坊哈希值",
  labelTxnDetailStatus: "状态",
  labelTxnDetailTime: "时间",
  labelTxnDetailFrom: "付款方",
  labelTxnDetailTo: "收款方",
  labelTxnDetailAmount: "数量",
  labelTxnDetailFee: "费用",
  labelTxnDetailMemo: "备注",
  labelTxnDetailProcessed: "已完成",
  labelTxnDetailProcessing: "处理中",
  labelTxnDetailFailed: "失败",
  labelAgreeConfirm: "确认",
  labelDisAgreeConfirm: "取消",
  labelImpactAgree: '请输入大写"AGREE"再次确认。',
  labelImpactTitle: "兑换二次确认",
  labelPriceExtraGreat:
    "您设置的价格已经{{compare}}市价的20%，您确定执行此操作吗？",
  labelPriceCompareGreat: "大于",
  labelPriceCompareLess: "小于",
  labelImpactExtraGreat:
    "您的交易金额将影响池子价格<1> {{value}}</1>，您确定执行此操作吗？",
  labelCalculating: "计算中...",
  labelFeeCalculating: "费用计算中...",
  labelAmmMyTransactions: "我的交易",
  labelAmmAllTransactions: "所有交易",
  labelWaitForAuth: "等待钱包签名",
  labelSignDenied: "签名已被用户拒绝",
  labelFirstSignDenied: "您的钱包不支持当前签名方法",
  labelUpdateAccountSuccess: "恭喜你!",
  labelUpdateAccountSuccess2: "您已经成功激活路印二层账号!",
  labelResetAccountSuccess: "恭喜你!",
  labelResetAccountSuccess2: "您已经成功重置路印二层账号密钥!",
  labelUpdateAccountSubmit: "开户申请以提交",
  labelUnlockAccountSuccess: "解锁成功!",
  labelUnlockAccountFailed: "解锁失败!",
  labelNotSupportTitle: "告知",
  labelNotAllowTrade:
    "抱歉！尊敬的用户，根据我们的使用条款，我们无法为您的IP地址提供交易下单和AMM入金功能。",
  labelKnown: "知道了",
  labelResetAccount: "重置二层账号密钥",
  labelExportAccount: "导出账号",
  labelExportAccountNoPhotos: "请勿拍照",
  labelExportAccountDescription:
    "请对以下信息严格保密，不要明文存储到任何联网的电脑中；否则，您在交易所的资产可能会因为低价下单而受损失。",
  labelExportAccountCopy: "复制",
  labelExportAccountSuccess: "导出账号成功!",
  labelExportAccountFailed: "导出账号失败!",
  // labelCreateAccountApproveWaitForAuth: 'Waiting for <1>{{symbol}}</1> Approve...',
  labelCreateAccountApproveDenied: "Signature request rejected!",
  labelAmmSwitch: "切换",
  labelCreateAccountDepositDenied:
    "您以拒绝充值 {{value}} {{symbol}}, 账户未激活",
  labelSlippageAlert: "滑点过大将会影响您出金后收到的token数量",
  labelOrderTableOpenOrder: "当前委托",
  labelOrderTableOrderHistory: "历史委托",
  labelResetLayout: "重置布局",
  labelResetMobileLayout: "Reset",
  labelBtnFix: "重置",
  labelProSell: "卖",
  labelProBuy: "买",
  labelProLimit: "限价",
  labelProMarket: "市价",
  labelProPrice: "价格",
  labelProBaseLabel: "数量",
  labelProQuoteLabel: "成交额",
  labelProLimitBtn: "{{tradeType}} {{symbol}}",
  labelProMarketBtn: "{{tradeType}} {{symbol}}",
  labelProOrderbook: "订单",
  labelProTrades: "交易",

  labelProToolbar24hChange: "24h 涨跌",
  labelProToolbar24hHigh: "24h 最高价",
  labelProToolbar24hLow: "24h 最低价",
  labelProToolbar24hBaseVol: "24h 成交量（{{symbol}}）",
  labelProToolbar24hQuoteVol: "24h 成交量（{{symbol}}）",
  labelErrorPricePrecisionLimit:
    "限价 {{symbol}}，最多可保留小数点后 {{decimal} 位",
  labelDepthPrice: "价格({{symbol}})",
  labelDepthAmount: "数量({{symbol}})",
  labelDepthTotal: "累积",

  labelProChartTitle: "图表",
  labelProTimeDefault: "分时(1分钟)",
  labelProTime1m: "1分钟",
  labelProTime5m: "5分钟",
  labelProTime15m: "15分钟",
  labelProTime30m: "30分钟",
  labelProTime1H: "1小时",
  labelProTime2H: "2小时",
  labelProTime4H: "4小时",
  labelProTime12H: "12小时",
  labelProTime1D: "1天",
  labelProTime1W: "1周",
  labelProTime1M: "1月",
  labelProChartTradingView: "蜡烛图",
  labelProChartDepth: "深度图",
  labelProOrderPrice: "委托价",
  labelProOrderTotalAmount: "累积",

  labelSwapCancelled: "交易被取消",
  labelSuccessfully: "成功",
  labelWarning: "警告",
  labelFailure: "失败",
  labelPrompt: "提示",

  // labelSwapCancelled: '交易被取消',
  // labelSuccessfully: '成功',
  // labelWarning: '警告',
  // labelFailure: '失败',
  // labelPrompt: '提示',

  labelComingSoon: "敬请期待",
  labelTradeProHideOtherPairs: "隐藏其他交易对",
  labelCancelAllOrders: "确认撤销全部订单？",
  labelConfirm: "确定",
  labelSettingFee: "Token Order for Fees",
  descriptionSettingFee:
    "Change the token priority order to adjust which tokens will be used for fees first.",
  labelBtnEdit: "Edit",
  labelSettingChargeFeeOrder: "Token Order for Fees",
  desSettingChargeFeeOrder:
    "Loopring L2 will use this token order when processing fees.",
  labelReset: "Reset",
  labelQueryFeeOK: "Save",
  depositLimit:
    "Limit Orders \n Used to set the maximum or minimum price \n at which you are willing to buy or sell.",
  depositMarket:
    "Market Orders \n Used to buy or sell immediately \n at the current market price.",
  labelTransactions: "Transactions",
  labelMyRewards: "My Rewards",
  labelClearAll: "Clear All",
  labelProviderAgree:
    "I have read, understand, and agree to the <1> Terms of Service </1>.",
  labelNFTName: "Name:",
  labelNFTDetail: "Details",
  labelNFTTokenStandard: "Token Standard:",
  labelNFTTokenMinted: "Token Minted:",
  labelNFTDescription: "Description:",
  labelNFTDate: "Date:",
  labelNFTDeployContract: "Deploy",
  labelNFTSend: "Send:",
  labelNFTDeploy: "Deploy:",
  labelNFTDeploying: "Deploying",
  labelNFTMyNFT: "My NFT",
  labelNFTTokenID: "ID:",
  labelNFTTYPE: "Token Standard:",
  labelNFTID: "ID:",
  labelNFTMinter: "Minter:",
  labelNFTMint: "Mint NFT",
  labelNFTTitleMyNFT: "My NFT",
  labelNFTTOTAL: "Amount:",
  labelInformation: "Notification",
  labelNoticeForProvider:
    "Loopring currently supports the following wallet connections: {{name}}. Please make sure to use one of these when attempting to connect.",
  labelIKnow: "OK",
  labelYes: "Yes",
  labelNo: "No",
  labelNoticeForNoMetaNFT:
    "Your Minted NFT does not contain Metadata or media information. \n Are you sure you still wish to {{ method }} this NFT?",
  labelAgreeConfirmNotShowAgain: "I know & not show again",
  labelInvalidCID:
    "Invalid CID. CIDv0 is start with `Qm`, CIDv1 only works for dag-pb",
  labelInvalidAddress: "Invalid address, ENS",
  labelInvalidisCFAddress:
    "Loopring Counterfactual wallet is disabled {{way}} {{token}}",
  labelInvalidisContract1XAddress:
    "Loopring wallet 1.x is disabled {{way}} {{token}}",
  labelInvalidisContractAddress:
    "{{way}} of {{token}} to Contract wallet is not available ",
  labelInvalidisLoopringAddress:
    "This address does not yet have an active Loopring L2, {{way}} of {{token}} is disabled!",
  labelInvalidisSameAddress: "Cannot {{way}} to your own address.",
  labelTradeRaceRanking: "Trading Leaderboard",
  labelTradeRaceYourVolume: "Your trading volume",
  labelTradeRaceYourRanking: "Your ranking",
  labelTradeRaceGoTrading: "Go to trade",
  labelTradeReadRule: "Read Rules",
  labelTradeRaceRewards: "Rewards",
  labelTradeRaceRules: "Activity Rules",
  labelTradeRaceStart: "Activity ends in:",
  labelTradeRaceReady: "Activity starts in:",
  labelTradeRaceEnd: "Activity has ended",
  labelDay: "Days",
  labelHours: "Hours",
  labelMinutes: "Minutes",
  labelSeconds: "Seconds",
  labelIsNotFeeToken: "Please deposit {{symbol}} to activate Loopring L2.",
  labelIsETHDepositAlert: "Please reserve enough ETH for gas!",
  labelIsNotEnoughFeeToken:
    "Please deposit {{fee}} {{symbol}} to cover the Layer 2 activation fee",
  depositNFTAddressLabelPlaceholder: "please input NFT contract address...",
  mintNFTAddressLabelPlaceholder:
    "(CIDv0 or dag-pb CIDv1) eg: QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR",
  depositNFTIdLabelPlaceholder: "please input NFT id...",
  nftDepositDescription:
    "Creates a smart contract on Ethereum L1, \n which requires a gas fee. NFTs minted \nhere remain on Loopring L2 until deployed.",
  labelNFTDescribe: "Description:",
  labelNFTTitle: "Amount",
  labelNFTDepositInputTitle: "Amount:",
  labelNFTTId: "NFT Token ID:",
  labelNFTCid:
    "IPFS CIDv0 or dag-pb CIDv1:(Store Metadata Information) <1>Follow this Guide </1>",
  labelNFTType: "Token Standard:",
  labelNFTAccess: "Allow Loopring to spend {{symbol}}",
  labelDeployDenied: "Signature request was rejected",
  labelNFTTokenDeployWaitForAuth: "Allow Loopring to deploy {{symbol}}?",
  labelDeployFailed: "Deploy of {{symbol}} has failed!",
  labelDeploySubmit: "Deploy of {{symbol}} has been submitted!",
  labelMint: "Mint",
  labelMintDenied: "Signature request was rejected",
  labelNFTTokenMintWaitForAuth: "Allow Loopring to mint {{symbol}}?",
  labelMintFailed: "Mint of {{symbol}} has failed!",
  labelMintSuccess: "Mint of {{symbol}} has been submitted!",
  labelNFTMintBtn: "Mint My NFT",
  labelNFTMintNoMetaBtn: "Wrong Metadata",
  labelNFTMintNoMetaDetail:
    "Your NFT metadata should identify <1>name, image, and royalty_percentage (integer from 0 to 10)</1>.",
  nftDeployDescription: "Deploy NFT",
  nftDeployTitle: "Deploy NFT",
  nftMintTitle: "Mint NFT",
  nftMintBtn: "Mint NFT",
  labelMintInProgress: "Processing...",
  labelNFTDeployBtn: "Deploy NFT",
  labelNFTDeployBroker: "Deploy Broker:",
  labelDeployInProgress: "Processing...",
  labelNFTDeployTitle: "Deploy NFT",
  labelVendor: "Buy with Card",
  labelLock: "Lock",
  labelWalletToWallet:
    "The connected wallet is a contract address which cannot be used. If you are connecting a mobile Loopring Smart Wallet, you can protect it and manage guardians within the app.",
  labelWalletAddAsGuardian: "Add a guardian",
  labelWalletInputGuardianCode: "Input 6 digital Code and Approve",
  labelWalletScanQRCode: "Please use your Loopring wallet to scan the QR code",
  labelWalletInputGuardianCodeDes:
    "Please contact the owner to obtain the approval code and enter it below.",
  labelWalletGuardianList: "Guardian List",
  labelAddProtector: "add Guardian",
  labelUnknown: "Unknown",
  labelApprove: "Approve",
  labelReject: "Reject",
  labelWalletApprove: "Approve Signature",
  labelCommonList: "Waiting for your Approve List",
  labelLogList: "Log List",
  labelWalletReject: "Reject Signature",
  labelLockAccountSuccess: "Lock Account Success",
  labelLockAccountFailed: "Lock Account Failed",
  labelApproveSuccess: "Approve Signature Success",
  labelApproveFailed: "Approve Signature Failed",
  labelRejectSuccess: "Reject Signature Success",
  labelRejectFailed: "Reject Signature Failed",
  labelYourBalance: "Your Layer 2 have: {{balance}}",
  labelTxGuardianADD_GUARDIAN: "ADD GUARDIAN",
  labelTxGuardianGUARDIAN_CONFIRM_ADDITION: "GUARDIAN CONFIRM ADDITION",
  labelTxGuardianGUARDIAN_REJECT_ADDITION: "GUARDIAN REJECT ADDITION",
  labelTxGuardianGUARDIAN_APPROVE: "GUARDIAN APPROVE",
  labelTxGuardianAPPROVE_RECOVER: "RECOVER WALLET", // RECOVER  16
  labelTxGuardianAPPROVE_TRANSFER: "OVER DAILY QUOTA TRANSFER", // APPROVE TRANSFER 18
  labelTxGuardianAPPROVE_TOKEN_APPROVE: "TOKEN ACCESS", // 23
  labelTxGuardianADD_GUARDIAN_WA: "ADD GUARDIAN", // 34
  labelTxGuardianREMOVE_GUARDIAN_WA: "REMOVE GUARDIAN", // 35
  labelTxGuardianUNLOCK_WALLET_WA: "UNLOCK WALLET", // 37
  labelTxGuardianRESET_GUARDIANS_WA: "RESET GUARDIANS", // 200
  labelTxGuardian_recovery: "recovery wallet",
  labelTxGuardian_transfer: "over daily quota transfer",
  labelTxGuardian_add_guardian: "add guardian",
  labelTxGuardian_remove_guardian: "remove guardian",
  labelTxGuardian_unlock_wallet: "unlock wallet",
  labelTxGuardian_deposit_wallet: "deposit",
  labelTxGuardianApprove: "APPROVE",
  labelTxGuardianReject: "REJECT",
  labelReActiveAccount: "Re-Activate Account",
  labelWalletSignType: "Request for {{type}}",
  labelSpotTrading: "Spot Trading Volume (30d in ETH)",
  labelTradeSpot: "Trade Spot",
  labelBuyToken: "Buy {{token}}",
  labelCurrentlyLevel: "Currently {{value}} {{token}}",
  labelLRCBalance: "LRC Balance",
  labelNoticeForForAccountFrozen: "Please wait while {{ type }} is updating.",
  labelAction: "action",
  labelGoExplore: "View transactions on the <1>Loopring Block Explorer</1>.",
  labelNOETH: "Need ETH for gas",
  labelBanxaFeeFree: "zero fees for a limited time",
  labellimit: "limit",
  labelmarket: "Market",
  labelswap: "Swap",
  labelamm: "Amm",
  labelActiveAccountTitle: "Activate Loopring L2 Account",
  depositTitle: "Add Assets from my L1",
  depositTitleAndActive: "Add Asset from My L1 & Activate",
  depositAndActiveBtn: "Activate Loopring L2",
  depositTitleActive: "Activate Loopring L2",
  depositLabelBtn: "Receive",
  depositLabelLinkRecent: "Recent receive history from L1",
  labelL2ToL1Title: "Send to L1",
  labelL2ToMyL1Title: "Send to My L1",
  labelL2ToOtherL1Title: "Send to Another L1",
  labelL2ToL1DeployTitle: "Deploy & Send to L1",
  labelL2toL1EnterToken: "Select Token",
  labelSendL1Btn: "Send",
  labelSendL1DeployBtn: "Deploy & Send",
  labelL2toL1BtnExceed: "Exceed Max Fast Withdraw Amt{{amt}}!",
  labelL2toL1Address: "Ethereum Address",
  labelL2toL1MyAddress: "To my L1",
  labelL2toL1AddressInput: "Please input the address",
  labelL2toL1Fee: "Select payment token",
  labelL2toL1Fast: "Fast",
  labelL2toL1Standard: "Standard",
  labelL2toL1LinkRecent: "Recent withdrawal history",
  labelL2toL2Title: "Send to Another Loopring L2",
  labelL2toL2EnterToken: "Select Token",
  transferDescription:
    "Send assets to any valid Ethereum address instantly.\n Please make sure the recipient address accepts \n Loopring L2 payments before you proceed.",
  labelL2toL2Btn: "Send",
  labelL2toL2Address: "Recipient",
  labelL2toL2AddressInput: "Please input address / ens / account id",
  labelL2toL2Memo: "Memo (Optional)",
  labelL2toL2MemoPlaceholder: "Please input the memo",
  labelL2toL2FeeChoose: "Select payment token",
  labelL2toL2Fee: "Fee",
  labelL2toL2FeeNotEnough: "Insufficient balance",
  labelL2toL2LinkRecent: "Recent send history",
  labelActiveLayer2: "Activate Loopring L2",
  labelAddAsset: "Receive",
  labelAddAssetBtn: "Receive",
  labelSendAsset: "Send",
  labelSendAssetBtn: "Send",
  labelSend: "Send",
  labelReceive: "Receive",
  labelWaitingRefer: "Waiting for approval",
  labelL1toL2WaitForAuth:
    "Please confirm to receive {{value}} {{symbol}} to {{to}} Loopring L2.",
  labelL1toL2Denied: "You rejected to receive {{value}} {{symbol}}.",
  labelL1toL2Failed: "Add asset request of {{value}} {{symbol}} failed!",
  labelL1toL2Submit: "Add asset request has been submitted. <1></1>",
  labelL1toL2NeedApprove: "Allow Loopring Exchange to spend {{symbol}}",
  labelL2toL1InProgress: "Processing...",
  labelL2toL1Failed: "Sent {{value}} {{symbol}} to L1 has failed!",
  labelL2toL1Success: "Sent {{value}} {{symbol}} to L1 was successful!",
  labelL2toL2InProgress: "Processing...",
  labelL2toL2Failed:
    "Sent {{value}} {{symbol}} from my Loopring L2 to another Loopring L2 failed!",
  labelL2toL2Success: "Sent {{value}} {{symbol}} was successful!",
  labelUpdateAccountFailed: "Activate Loopring L2 has failed!",
  labelCreateAccountSubmit:
    "Activation of Loopring L2 with deposit of {{value}} {{symbol}} has been submitted! \n Approximately {{count}} minutes remaining...',",
  labelCreateAccountFailed:
    "Activation of Loopring L2 with deposit of {{value}} {{symbol}} has failed!",
  labelL1toL2Hash: " My L1 \u2192 Loopring L2 Transaction Hash",
  labelL1toL2HashEmpty:
    "My L1 \u2192 Loopring L2 transactions will show up here.",
  labelL1toL2Record: "Receive {{value}} {{symbol}}",
  labelNFTSendL2Btn: "To Another Loopring L2",
  labelNFTSendMyL1Btn: "To My L1",
  labelNFTSendOtherL1Btn: "To Other L1",
  labelNFTDeploySendMyL1: "To My L1 & Deploy Contract",
  labelNFTDeploySendAnotherL1: "To another L1 & Deploy Contract",
  labelGuid: "Go to Guide",
  labelOK: "Ok",
  labelL2toL2InvalidAddress: "Invalid address or ENS",
  labelL2toL2AddressNotLoopring:
    "This address has not yet activated Loopring L2. Please make sure that the recipient can access Loopring L2 since the funds will be sent there.",
  labelL2toL2AddressType: "Address Type",
  labelL2toL2OriginDesc:
    "Please select the address source. Note: the following trading platforms currently do not support Loopring L2 transfers (Binance, Huobi, Okex…)",
  labelL2toL2OriginBtnExchange: "Exchange",
  labelL2toL2OriginBtnWallet: "Wallet",
  labelL2toL2Confirm: "Confirm",
  labelL2toL2TokenAmount: "Token Amount",
  labelL1toL2ThirdPart: "Buy Crypto with",
  labelActiveAccountFeeNotEnough: "Insufficient balance <1>Add assets</1>",
  labelNFTTransferTX: "L2 \u2192 L2",
  labelNFTWithdrawTX: "L2 \u2192 L1",
  labelNFTDepositTX: "L1 \u2192 L2",
  labelNFTDeposit: "Receive Loopring L2 NFT",
  labelNFTDepositNeedApprove:
    "Allow Loopring to spend {{symbol}} and deposit it?",
  labelNFTDepositBtn: "Receive NFT",
  nftDepositTitle: "Receive NFT from my L1",
  labelNFTContractAddress: "Contract:",
  labelNFTAmount: "Amount:",
  labelNFTTokenDepositWaitForAuth:
    "Please confirm to send Loopring L2 {{symbol}}",
  nftMintDescription:
    "Paste in the CID that you obtained from uploading \n the metadata.json file (point 11 above) - if successful,\n the data from the metadata.json file you created contained\n within the folder will populate the Name\n and Image below.",
  labelNFTMintInputTitle: "Amount <1>\uFE61</1>",
  labelL1toL2Vendor:
    "Use a Loopring partner to deposit funds.\nOnce your order is confirmed by Loopring,\n it will be added to your balance within 2 minutes.",
  depositLabelTo: "To address, account id or ENS.",
  labelAddressNotLoopring: "Account doesn't have an active Loopring L2",
  labelMINTNFTTitle: "Create NFT (ERC1155)",
  labelIPFSUploadTitle: "Upload Image <1>\uFE61</1> ",
  labelLoadDes: "Drag or click to upload files ({{types}}, max size: 10MB)",
  labelUpload: "upload",
  labelMintNoImageBtn: "Please upload image",
  labelMintUserAgree: "Please agree to the terms of service",
  labelMintTradeValueBtn: "Please input amount(1 - 10,000)",
  labelMintNoRoyaltyPercentageBtn: "Please input Royalty",
  labelMintWrongRoyaltyBtn: "Royalty should be (0 - 10)",
  labelMintNoNameBtn: "Please input name",
  labelNFTMetaBtn: "Upload metadata & mint",
  labelMintName: "Name <1>\uFE61</1>",
  labelMintCollection: "Collection (coming soon) <1>\u2139</1>",
  labelMintCollectionTooltips:
    "This is the collection where your NFT will appear.",
  labelMintRoyaltyPercentage: "Royalty (%) <1>\u2139</1>",
  labelMintRoyaltyPercentageRange: "Max Int:",
  labelMintRoyaltyPercentageTooltips:
    "Represents the percentage to be received from each subsequent resale (max 10%).",
  labelMintDescription: "Description  <1>\u2139</1>",
  labelMintDescriptionTooltips:
    "The description will be included on the NFT's detail page beneath it's image.",
  labelMintProperty: "Properties (Limit 5) <1>\u2139</1>",
  labelMintPropertyTooltips:
    "Tags can be added to the NFT for easy searchability and distinction",
  labelPropertyAdd: "Add property",
  labelMintNFT: "Create NFT",
  labelL1toL2NFT: "Receive NFT",
  labelMyAssetsNFT: "My NFT",
  labelTransactionNFT: "Transactions",
  labelMintPropertyKey: "Key",
  labelMintPropertyValue: "Value",
  labelNFTProperty: "Properties:",
  labelConfirmMint: "Confirm Metadata",
  labelUseIpfsMintAgree:
    "I confirm that the NFT minted does not infringe on copyright laws or contain illegal, explicit, sensitive, adult themed, or any other content considered NSFW. We reserve the right to hide inappropriate content if an NFT is discovered to be harmful.",
  labelL1toL2TitleBridge: "Add Loopring L2 Assets",
  labelPayer: "My Wallet:",
  labelL1toL2TokenAmount: "Token Amount",
  labelL1toL2From: "From",
  labelL1toL2TO: "To Loopring L2",
  labelAddAssetTitle: "Add Loopring L2 {{symbol}} assets",
  labelSendAssetTitle: "Send Loopring L2 {{symbol}} assets",
  labelAddAssetHowto: "How would you like to add Loopring L2 assets?",
  labelAddAssetTitleActive: "Add assets & Activate",
  labelFromMyL1: "From my L1 account",
  labelFromOtherL1: "From another L1 account",
  labelBuyWithCard: "Buy with Card",
  labelFromOtherL2: "From another Loopring L2 account",
  labelFromExchange: "Buy from Exchange",
  labelOpenInWalletApp: "Open in wallet app/extension",
  labelConnectWithDapp: "Connect with Dapp",
  labelOpenInWalletTitle: "Open in wallet",
  labelOpenInWalletDetail: `URL for adding funds has been copied. You can choose either way to continue:`,
  labelOpenInWalletDetailLi1: `Open your wallet app and paste the URL into its internal Dapp browser`,
  labelOpenInWalletDetailLi2: `Open your desktop Chrome browser and paste the URL in Chrome`,
  labelActiveL2Btn: "Activate Loopring L2",
  labelWrongNetworkGuideTitle: "Wrong Network",
  labelWrongNetworkGuide:
    "Your chosen network is not currently supported on Loopring. Please choose Ethereum main Network or test Network Goerli",
  labelSenAssetTitle: "Send {{symbol}} from Loopring L2",
  labelSendTOL2: "To another Loopring L2 account",
  labelSendToMyL1: "To my L1 account",
  labelSendToOtherL1: "To another L1 account \n(incl. exchange)",
  labelSendAssetHowto: "Where would you like to send your crypto to",
  labelL1toL2: "Add Loopring L2 assets From My L1",
  labelActivatedAccountChargeFeeList:
    "Please make sure one of the below tokens with the minimum quantity is in your Loopring L2 account to proceed:",
  labelReceiveAddress: "Receive Address",
  labelAssets: "Loopring L2 Assets",
  labelReceiveAddressGuide:
    "Please send {{symbol}} funds from a Loopring L2 address",
  labelL2toL2: "Send to another Loopring L2",
  labelL2toL1: "Send to L1",
  labelBenefitL2:
    "As Ethereum's first ever zkRollup, Loopring L2 allows you to avoid costly gas fees and network congestion with the same security as mainnet - 100x cheaper and faster.\n\nActivating your Loopring L2 account requires a small payment fee. ",
  labelNotBalancePayForActive:
    "Insufficient balance in your Loopring L2 account",
  labelEnoughBalancePayForActive:
    "You have enough balance to pay for Loopring L2 creation.",
  labelHaveInProcessingL1toL2:
    "If you have already started the deposit, please be patient and recheck as transactions on Ethereum can take up to 30 minutes.",
  labelWaitingL1toL2: "Please wait",
  labelAddAssetGateBtn: "Add assets",
  labelActiveLayer2Btn: "Activate Loopring L2",
  labelActiveLayer2PayBtn: "Pay Activation Fee",
  labelBalanceActiveAccountFee:
    "{{symbol}}: <2>Fee {{fee}};</2><3>My Loopring L2 balance: {{count}}</3>",
  labelToAddressShouldLoopring: "To address is no Loopring L2",
  labelBridgeSendTo: "Send to (address, account id or ENS)",
  labelInvalidAddressClick:
    "Invalid Wallet Address, {{way}} of {{token}} is disabled! <1>Click to input another receive address </1>",
  labelENSShouldConnect:
    "Receive address is an ENS, please connect wallet to check real address",
  labelToken: "Token",
  labelMinRequirement: "Min Requirement",
  labelAvailability: "Availability",
  labelWhatProvider: "Which provider would you like to use?",
  labelMemo: "Memo",
  labelAdvanceMint: "Advance Create",
  labelWalletTypeDes:
    "Please confirm the address origin again to ensure the assets are not mistakenly sent to the exchange address. ",
  labelWalletTypeOptions: "{{type}} Wallet",
  labelWalletTypeOtherSmart: "Other Smart",
  labelWalletTypeLoopring: "Loopring",
  labelWalletTypeEOA: "EOA",
  labelWalletTypeExchange: "Exchange",
  labelEOADes:
    "There is no smart contract binds with this wallet address. (e.g. MetaMask, imtoken, Ledger, Trezor, etc....) ",
  labelLoopringDes:
    "This wallet is created using Loopring Wallet mobile app and binds with Loopring smart contract.",
  labelOtherSmartDes:
    "This wallet binds with smart contract that does not support Loopring Layer 2. You will need to send funds to the L1 account. ",
  labelExchangeDes:
    "The following trading platforms currently do not support Loopring L2 transfers (Binance, Coinbase, FTX, etc...). You will need to send funds to the L1 account. ",
  labelExchangeTypeDes: "Please select the address source:",
  labelNonExchangeTypeDes:
    "eg:Loopring Wallet,Metamask,Coinbase Wallet,imtoken,Ledger,Trezor... EOA wallet",
  labelNonExchangeType: "Non-Exchange Wallet",
  labelExchangeType: "Exchange",
  labelExchangeBinance: "Binance",
  labelExchangeBinanceDes: "",
  labelExchangeHuobi: "Huobi",
  labelExchangeHuobiDes: "Transactions need to wait 24 hours",
  labelExchangeCoinbase: "Coinbase",
  labelExchangeOthers: "Others",
  labelExchangeOthersDes: "",
  labelL2toL1AddressType: "Address Type",
  labelConfirmCEX: "Confirm CEX Support",
  labelConfirmDetail:
    "<0>Before withdrawing, please confirm with your CEX support that they accept deposits from smart contracts.</0>" +
    "<1>L2 to L1 withdrawing is performed via a smart contract. The CEX depositing address may not be able to automatically acknowledge the deposit.</1>" +
    "<2>If the deposit does not appear at the CEX address within 24 hours, please contact your CEX support and ask they manually acknowledge the transaction.</2>",
  labelCEXUnderstand: "I understand and acknowledge the risk",
  labelMintFee: "Mint Fee",
  labelMintFeeNotEnough: "Insufficient balance",
  labelMintFeeChoose: "Select payment token",
  labelLayerSwapUnderstand: "Acknowledge and understand the risk",
  labelIUnderStand: "I Understand",
  labelLayerSwapUnderstandDes:
    "LayerSwap is a 3rd party App service provider to help move tokens from exchange to Loopring L2 directly. If you have any concerns regarding their service, please check out their <1>TOS</1>.",
  labelInvestAmmTitle: "AMM Pools",
  labelInvestBalanceTitle: "Balance",
  labelTransactionsLink: "Transactions",
  labelAMMTransactionsLink: "View Pool Transactions",
  labelNFTMintWrongCIDBtn: "Wrong MetaData format",
  labelWithdrawBtn: "Withdraw",
  labelForceWithdrawTitle: "Force Withdraw",
  labelFWithdrawFee: "Fee",
  labelFWithdrawNotEnough: "Insufficient balance",
  labelForceWithdrawWaitForAuth: "Please confirm to force withdraw {{symbol}}",
  labelForceWithdrawDenied: "You rejected to force withdraw {{symbol}}.",
  labelForceWithdrawInProgress: "Processing...",
  labelForceWithdrawFailed: "Force withdraw has failed!",
  labelForceWithdrawSubmit: "Force withdraw has been submitted",
  labelForceWithdrawToken: "Token Amount",
  labelForceWithdrawFee: "Fee",
  labelForceWithdrawEnterToken: "Select Token",
  labelPleaseForceWithdrawAddress:
    "Please enter the address you wish to withdraw from",
  labelForceWithdrawAddress: "The address you wish to withdraw from",
  labelForceWithdrawDes:
    "An address that does not support Loopring L2 can use the Force Withdraw method to move tokens from Loopring L2 to Ethereum L1.\n In order to be eligible for a Force Withdraw, an account must not already have been activated for L2.\n Only in the case of sending a token to an L2 account associated with a CEX address that does not support Loopring L2, will you need to do this in order to recover the token.",
  labelForceWithdrawConfirm:
    "User can operate the token in L1 account of this address. Usually the target address must be either a wallet address or an exchange address.",
  labelForceWithdrawConfirm1:
    "This operation usually takes more than 30 minutes to take effect as it requires interaction with Ethereum Mainnet. Please be patient.",
  labelNFTSendBtn: "Send",
  labelNFTProperties: "Properties",
  labelNFTDescription2: "Description",
  labelForceWithdrawNotAvailable:
    "Loopring L2 account is activated in this address. For security reason, Loopring would not allow other user to force withdraw token from its L2 to L1 anymore",
  labelForceWithdrawNoToken:
    "No token is detected from this address to operate",
  labelForceWithdrawBtn: "Force Withdraw",
};
