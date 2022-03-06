import React from "react";
import styled from "@emotion/styled";
import { Box, BoxProps, Typography } from "@mui/material";
import { WithTranslation, withTranslation } from "react-i18next";
import moment from "moment";
import { Column, TablePagination, Table } from "../../basic-lib";
import {
  CompleteIcon,
  DepositIcon,
  EmptyValueTag,
  EXPLORE_TYPE,
  Explorer,
  getFormattedHash,
  getShortAddr,
  getValuePrecisionThousand,
  MintIcon,
  TransferIcon,
  WaitingIcon,
  WarningIcon,
  WithdrawIcon,
} from "@loopring-web/common-resources";
import { TableFilterStyled, TablePaddingX } from "../../styled";

import {
  NFTTableFilter,
  NFTTableProps,
  TsTradeStatus,
  TxnDetailProps,
} from "./Interface";
import { Filter } from "./components/Filter";
import { TxNFTType } from "@loopring-web/loopring-sdk";
import { useSettings } from "../../../stores";

const TYPE_COLOR_MAPPING = [
  { type: TsTradeStatus.processed, color: "success" },
  { type: TsTradeStatus.processing, color: "warning" },
  { type: TsTradeStatus.received, color: "warning" },
  { type: TsTradeStatus.failed, color: "error" },
];

const CellStatus = ({ row: { status } }: any) => {
  const RenderValue = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) =>
      theme.colorBase[
        `${TYPE_COLOR_MAPPING.find((o) => o.type === status)?.color}`
      ]};

    & svg {
      width: 24px;
      height: 24px;
    }
  `;
  const svg =
    status === "processed" ? (
      <CompleteIcon />
    ) : status === "processing" || status === "received" ? (
      <WaitingIcon />
    ) : (
      <WarningIcon />
    );
  const RenderValueWrapper = <RenderValue>{svg}</RenderValue>;
  return RenderValueWrapper;
};

const TableStyled = styled(Box)<BoxProps & { isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;

  .rdg {
    ${({ isMobile }) =>
      isMobile ? `--template-columns: 60% 40% !important;` : ``}
    .rdgCellCenter {
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    .textAlignRight {
      text-align: right;
    }

    .textAlignCenter {
      text-align: center;
    }

    .textAlignLeft {
      text-align: left;
    }
  }

  ${({ theme }) =>
    TablePaddingX({ pLeft: theme.unit * 3, pRight: theme.unit * 3 })}
` as (props: { isMobile?: boolean } & BoxProps) => JSX.Element;

export const TsNFTTable = withTranslation(["tables", "common"])(
  <Row extends TxnDetailProps>({
    accAddress,
    showFilter = true,
    rawData,
    page,
    pagination,
    txType,
    getTxnList,
    duration,
    showloading,
    etherscanBaseUrl,
    t,
    ...props
  }: NFTTableProps<Row> & WithTranslation) => {
    const getColumnModeTransaction = React.useCallback(
      (): Column<Row, Row>[] => [
        {
          key: "side",
          name: t("labelTxSide"),
          formatter: ({ row }) => {
            return (
              <Box className="rdg-cell-value" title={row.nftTxType}>
                {t(`labelNFTType${TxNFTType[row.nftTxType]}`)}
              </Box>
            );
          },
        },
        {
          key: "amount",
          name: t("labelTxAmount"),
          headerCellClass: "textAlignRight",
          formatter: ({ row }: { row: Row }) => {
            const hasSymbol =
              row.nftTxType === TxNFTType[TxNFTType.TRANSFER]
                ? row?.receiverAddress?.toUpperCase() ===
                  accAddress?.toUpperCase()
                  ? "+"
                  : "-"
                : row.nftTxType === TxNFTType[TxNFTType.DEPOSIT] ||
                  row.nftTxType === TxNFTType[TxNFTType.MINT]
                ? "+"
                : row.nftTxType === TxNFTType[TxNFTType.WITHDRAW]
                ? "-"
                : "";
            return (
              <>
                <Typography
                  variant={"body1"}
                  component={"span"}
                  marginRight={1}
                >
                  {hasSymbol}
                  {row.amount ?? EmptyValueTag}
                </Typography>
                <Typography variant={"body1"} component={"span"}>
                  {getFormattedHash(row.nftData)}
                </Typography>
              </>
            );
          },
        },

        {
          key: "from",
          name: t("labelTxFrom"),
          cellClass: "textAlignRight",
          formatter: ({ row }) => {
            const receiverAddress = getShortAddr(row.receiverAddress);
            const senderAddress = getShortAddr(row.senderAddress);
            const [from, to] =
              row.nftTxType === TxNFTType[TxNFTType.TRANSFER]
                ? row.receiverAddress?.toUpperCase() ===
                  accAddress?.toUpperCase()
                  ? [senderAddress, "L2"]
                  : ["L2", receiverAddress]
                : row.nftTxType === TxNFTType[TxNFTType.DEPOSIT] ||
                  row.nftTxType === TxNFTType[TxNFTType.MINT]
                ? ["L2 Mint", "L2"]
                : row.nftTxType === TxNFTType[TxNFTType.WITHDRAW]
                ? ["L2", receiverAddress]
                : ["", ""];
            const hash = row.txHash !== "" ? row.txHash : row.hash;
            let path =
              row.txHash !== ""
                ? etherscanBaseUrl + `/tx/${row.txHash}`
                : Explorer +
                  `tx/${row.hash}-${
                    EXPLORE_TYPE["NFT" + row.nftTxType.toUpperCase()]
                  }`;
            return (
              <Box
                className="rdg-cell-value textAlignRight"
                display={"inline-flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Typography
                  style={{
                    cursor: "pointer",
                  }}
                  color={"var(--color-primary)"}
                  onClick={() => window.open(path, "_blank")}
                  title={hash}
                >
                  {from + " -> " + to}
                  {/*{hash ? getFormattedHash(hash) : EmptyValueTag}*/}
                </Typography>
                <Box marginLeft={1}>
                  <CellStatus {...{ row }} />
                </Box>
              </Box>
            );
          },
        },
        {
          key: "fee",
          name: t("labelTxFee"),
          headerCellClass: "textAlignRight",
          formatter: ({ row }) => {
            const fee = row["fee"] ?? {};
            const renderValue = `${getValuePrecisionThousand(
              fee.value,
              undefined,
              undefined,
              undefined,
              false,
              {
                floor: false,
                isTrade: true,
              }
            )} ${fee.unit}`;
            return (
              <Box className="rdg-cell-value textAlignRight">{renderValue}</Box>
            );
          },
        },
        {
          key: "memo",
          name: t("labelTxMemo"),
          headerCellClass: "textAlignCenter",
          formatter: ({ row }) => (
            <Box title={row.memo} className="rdg-cell-value textAlignCenter">
              {row["memo"] || EmptyValueTag}
            </Box>
          ),
        },
        {
          key: "time",
          name: t("labelTxTime"),
          headerCellClass: "textAlignRight",
          formatter: ({ row }) => {
            const value = row.updatedAt;
            const hasValue = Number.isFinite(value);
            const renderValue = hasValue
              ? moment(new Date(value), "YYYYMMDDHHMM").fromNow()
              : EmptyValueTag;
            return (
              <Box className="rdg-cell-value textAlignRight">{renderValue}</Box>
            );
          },
        },
      ],
      [etherscanBaseUrl]
    );
    const { isMobile } = useSettings();

    const handleFilterChange = (filter: Partial<NFTTableFilter>) => {
      getTxnList({
        page: filter.page ?? page,
        txType:
          filter.txType !== undefined
            ? // @ts-ignore
              filter.txType == 0
              ? undefined
              : filter.txType
            : txType,
        duration: filter.duration ?? duration,
      });
    };

    const getColumnMobileTransaction = React.useCallback(
      (): Column<any, unknown>[] => [
        {
          key: "amount",
          name: t("labelTxAmount") + " / " + t("labelTxFee"),
          cellClass: "textAlignRight",
          headerCellClass: "textAlignLeft",
          formatter: ({ row }) => {
            const hasValue = Number.isFinite(row.amount);
            let side, hasSymbol, sideIcon;

            switch (row.nftTxType) {
              case TxNFTType[TxNFTType.DEPOSIT]:
                side = t("labelDeposit");
                hasSymbol = "+";
                sideIcon = <DepositIcon fontSize={"inherit"} />;
                break;
              case TxNFTType[TxNFTType.TRANSFER]:
                side = t("labelTransfer");
                hasSymbol =
                  row.receiverAddress?.toUpperCase() ===
                  accAddress?.toUpperCase()
                    ? "+"
                    : "-";
                sideIcon = <TransferIcon fontSize={"inherit"} />;
                break;
              case TxNFTType[TxNFTType.MINT]:
                side = t("labelMint");
                sideIcon = <MintIcon fontSize={"inherit"} />;
                hasSymbol = "+";
                break;
              case TxNFTType[TxNFTType.WITHDRAW]:
              default:
                hasSymbol = "-";
                sideIcon = <WithdrawIcon fontSize={"inherit"} />;
                side = t("labelWithdraw");
            }
            const renderValue = hasValue
              ? `${getValuePrecisionThousand(
                  Number(row.amount),
                  undefined,
                  undefined,
                  undefined,
                  false,
                  { isTrade: true }
                )}`
              : EmptyValueTag;

            const renderFee = `Fee: ${getValuePrecisionThousand(
              row.fee.value,
              undefined,
              undefined,
              undefined,
              false,
              {
                floor: false,
                isTrade: true,
              }
            )} ${row.fee.unit}`;
            return (
              <Box
                flex={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                title={side}
              >
                {/*{side + " "}*/}
                <Typography
                  display={"flex"}
                  marginRight={1}
                  variant={"h3"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  width={"60px"}
                >
                  {sideIcon}
                  <Typography fontSize={10} marginTop={-1}>
                    {side}
                  </Typography>
                </Typography>
                <Box display={"flex"} flex={1} flexDirection={"column"}>
                  <Typography
                    display={"inline-flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    {hasSymbol}
                    {renderValue}
                  </Typography>
                  <Typography color={"textSecondary"} variant={"body2"}>
                    {renderFee}
                  </Typography>
                </Box>
              </Box>
            );
          },
        },
        {
          key: "from",
          name: t("labelTxFrom") + " / " + t("labelTxTime"),
          headerCellClass: "textAlignRight",
          cellClass: "textAlignRight",
          formatter: ({ row }) => {
            const receiverAddress = getShortAddr(row.receiverAddress, isMobile);
            const senderAddress = getShortAddr(row.senderAddress, isMobile);

            const [from, to] =
              row.nftTxType === TxNFTType[TxNFTType.TRANSFER]
                ? row.receiverAddress?.toUpperCase() ===
                  accAddress?.toUpperCase()
                  ? [senderAddress, "L2"]
                  : ["L2", receiverAddress]
                : TxNFTType[TxNFTType.DEPOSIT]
                ? ["L1", "L2"]
                : TxNFTType[TxNFTType.MINT]
                ? ["Mint", "L2"]
                : TxNFTType[TxNFTType.WITHDRAW]
                ? ["L2", receiverAddress]
                : ["", ""];
            const hash = row.txHash !== "" ? row.txHash : row.hash;
            const path =
              row.txHash !== ""
                ? etherscanBaseUrl + `/tx/${row.txHash}`
                : Explorer +
                  `tx/${row.hash}-${EXPLORE_TYPE[row.nftTxType.toUpperCase()]}`;

            const hasValue = Number.isFinite(row.updatedAt);
            const renderTime = hasValue
              ? moment(new Date(row.updatedAt), "YYYYMMDDHHMM").fromNow()
              : EmptyValueTag;

            return (
              <Box
                display={"flex"}
                flex={1}
                flexDirection={"column"}
                onClick={() => window.open(path, "_blank")}
              >
                <Typography
                  display={"inline-flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Typography
                    style={{
                      cursor: "pointer",
                    }}
                    color={"var(--color-primary)"}
                    title={hash}
                  >
                    {from + " -> " + to}
                    {/*{hash ? getFormattedHash(hash) : EmptyValueTag}*/}
                  </Typography>
                  <Typography marginLeft={1}>
                    <CellStatus {...{ row }} />
                  </Typography>
                </Typography>
                <Typography color={"textSecondary"} variant={"body2"}>
                  {renderTime}
                </Typography>
              </Box>
            );
          },
        },
      ],
      [etherscanBaseUrl, isMobile, t]
    );
    const defaultArgs: any = {
      columnMode: isMobile
        ? getColumnMobileTransaction()
        : getColumnModeTransaction(),
      generateRows: (rawData: any) => rawData,
      generateColumns: ({ columnsRaw }: any) =>
        columnsRaw as Column<any, unknown>[],
    };

    return (
      <TableStyled isMobile={isMobile}>
        {showFilter && (
          <TableFilterStyled>
            <Filter
              {...{
                rawData,
                handleFilterChange,
                filterType: txType,
                filterDate: duration,
              }}
            />
          </TableFilterStyled>
        )}
        <Table
          className={"scrollable"}
          {...{ ...defaultArgs, ...props, rawData, showloading }}
        />
        {pagination && pagination.total && (
          <TablePagination
            page={page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onPageChange={(page) => {
              handleFilterChange({ page });
            }}
          />
        )}
      </TableStyled>
    );
  }
);
