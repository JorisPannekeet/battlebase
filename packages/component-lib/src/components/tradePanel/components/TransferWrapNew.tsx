import { Trans, WithTranslation } from 'react-i18next';
import React, { ChangeEvent } from 'react';
import { Grid, ListItemText, Typography, Box } from '@material-ui/core';
import { bindHover } from 'material-ui-popup-state/es';
import { bindPopper, usePopupState } from 'material-ui-popup-state/hooks';
// import { Link as RouterLink } from 'react-router-dom';
import { CloseIcon, DropDownIcon, globalSetup, IBData, HelpIcon } from '@loopring-web/common-resources';
import { Button, IconClearStyled, MenuItem, TextField, TradeBtnStatus, TypographyGood } from '../../index';
import { PopoverPure } from '../../'
import { TransferViewProps } from './Interface';
import { BasicACoinTrade } from './BasicACoinTrade';
import * as _ from 'lodash'
import { ToggleButtonGroup } from '../../basic-lib';
import styled from '@emotion/styled'

const FeeTokenItemWrapper = styled(Box)`
    background-color: var(--color-global-bg);
`

const DropdownIconStyled = styled(DropDownIcon)`
    transform: rotate(${({status}: any) => {
        return status === 'down' ? '0deg': '180deg'
    }});
` as any

export const TransferWrapNew = <T extends IBData<I>,
    I>({
           t, disabled, walletMap, tradeData, coinMap, transferI18nKey,
           chargeFeeToken = 'ETH',
           chargeFeeTokenList,
           onTransferClick,
           handleFeeChange,
           transferBtnStatus,
           addressDefault,
           handleOnAddressChange,
           handleAddressError,
           wait = globalSetup.wait,
           assetsData,
           ...rest
       }: TransferViewProps<T, I> & WithTranslation & { assetsData: any[] }) => {
    // const [_chargeFeeToken, setChargeFeeToken] = React.useState<any | undefined>(
    //     chargeFeeToken && chargeFeeTokenList.length ? chargeFeeTokenList[ chargeFeeToken as any ] : undefined);
    const inputBtnRef = React.useRef();
    const getDisabled = () => {
        if (disabled || tradeData === undefined || walletMap === undefined || coinMap === undefined || isFeeNotEnough) {
            return true
        } else {
            return false
        }
    };
    const inputButtonDefaultProps = {
        label: t('transferLabelEnterToken'),
    }


    const [address, setAddress] = React.useState<string | undefined>(addressDefault ? addressDefault : '');
    const [addressError, setAddressError] = React.useState<{ error: boolean, message?: string | React.ElementType<HTMLElement> } | undefined>();
    // const [feeIndex, setFeeIndex] = React.useState<any | undefined>(0);
    const [memo, setMemo] = React.useState('');
    const [feeToken, setFeeToken] = React.useState('')
    const [dropdownStatus, setDropdownStatus] = React.useState<'up' | 'down'>('down')
    const [isFeeNotEnough, setIsFeeNotEnough] = React.useState(false)

    const popupState = usePopupState({variant: 'popover', popupId: `popupId-transfer`});
    
    const toggleData: any[] = chargeFeeTokenList.map(({belong, fee}) => ({
        key: belong,
        value: belong,
        fee,
    }))

    const getTokenFee = React.useCallback((token: string) => {
        return toggleData.find(o => o.key === token)?.fee || 0
    }, [toggleData])

    // const fee = toggleData.find(o => o.key === feeToken)?.fee || '--'
    
    const debounceAddress = React.useCallback(_.debounce(({address}: any) => {
        if (handleOnAddressChange) {
            handleOnAddressChange(address)
        }
    }, wait), [])
    const _handleOnAddressChange = (event:ChangeEvent<HTMLInputElement>) => {
        const address = event.target.value;
        if (handleAddressError) {
            const error = handleAddressError(address)
            if (error?.error) {
                setAddressError(error)
            }
        }
        setAddress(address);
        debounceAddress({address})
    }

    const _handleOnMemoChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMemo(e.target.value)
    }, [])

    // const _handleFeeChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     const index = e.target ? Number(e.target.value) : 0;
    //     setFeeIndex(index)
    //     if (handleFeeChange) {
    //         handleFeeChange(chargeFeeTokenList[ index ]);
    //     }
    // }, [chargeFeeTokenList, handleFeeChange]);

    // const addressInput = React.useRef();
    const handleClear = React.useCallback(() => {
        // @ts-ignore
        // addressInput?.current?.value = "";
        setAddress('')
    }, [])

    // const getTokenFee = React.useCallback(())

    // const getToggleData = React.useCallback(() => {
    //     if (!!chargeFeeTokenList.length) {
    //         return chargeFeeTokenList.map(({belong, fee}) => {
    //             console.log({belong, fee})
    //             return ({
    //                 key: belong,
    //                 value: belong,
    //             })
    //         })
    //     }
    //     return []
    // }, [chargeFeeTokenList])

    React.useEffect(() => {
        if (!!chargeFeeTokenList.length && !feeToken && assetsData) {
            const defaultToken = chargeFeeTokenList.find(o => assetsData.find(item => item.name === o.belong)?.available > o.fee)?.belong || 'ETH'
            setFeeToken(defaultToken)
            const currFee = toggleData.find(o => o.key === defaultToken)?.fee || '--'
            handleFeeChange({
                belong: defaultToken,
                fee: currFee,
            })
        }
    }, [chargeFeeTokenList, feeToken, assetsData, handleFeeChange, toggleData])

    const checkFeeTokenEnough = React.useCallback((token: string, fee: number) => {
        const tokenAssets = assetsData.find(o => o.name === token)?.available
        return tokenAssets && Number(tokenAssets) > fee
    }, [assetsData])

    const handleToggleChange = React.useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        if (value === null) return
        setFeeToken(value)
        handleFeeChange({
            belong: value,
            fee: getTokenFee(value),
        })
    }, [handleFeeChange, getTokenFee])

    React.useEffect(() => {
        if (!!chargeFeeTokenList.length && assetsData && !checkFeeTokenEnough(feeToken, Number(getTokenFee(feeToken)))) {
            setIsFeeNotEnough(true)
            return
        }
        setIsFeeNotEnough(false)
    }, [chargeFeeTokenList, assetsData, checkFeeTokenEnough, getTokenFee, feeToken])

    return <Grid className={walletMap ? '' : 'loading'} paddingLeft={5 / 2} paddingRight={5 / 2} container
                 direction={"column"}
                 justifyContent={'space-between'}
                 alignItems={"stretch"} flex={1} height={'100%'} flexWrap={'nowrap'}
    >
        <Grid item>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} marginBottom={2}>
                <Typography component={'h4'} variant={'h3'} marginRight={1}>{t('transferTitle')}</Typography>
                <HelpIcon {...bindHover(popupState)} fontSize={'large'} htmlColor={'var(--color-text-third)'} />
            </Box>
            <PopoverPure
                className={'arrow-center'}
                {...bindPopper(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box padding={2}>
                    <Trans i18nKey="transferDescription">
                        Transfer to any valid Ethereum addresses instantly. Please make
                        sure the recipient address accepts Loopring
                        layer-2 payments before you proceed.
                    </Trans>
                </Box>
            </PopoverPure>
            {/* <Typography component={'p'} variant="body1">
                <Trans i18nKey="transferDescription">
                    Transfer to any valid Ethereum addresses instantly. Please <TypographyGood component={'span'}>make
                    sure</TypographyGood> the recipient address <TypographyGood component={'span'}>accepts Loopring
                    layer-2 </TypographyGood> payments before you proceed.
                </Trans>
            </Typography> */}
        </Grid>
        <Grid item /* marginTop={3} */ alignSelf={"stretch"}>
            <BasicACoinTrade {...{
                ...rest,
                t,
                disabled,
                walletMap,
                tradeData,
                coinMap,
                inputButtonDefaultProps,
                inputBtnRef: inputBtnRef,
                
            }} />
        </Grid>
        <Grid item /* marginTop={4} */ alignSelf={"stretch"} position={'relative'}>
            <TextField
                value={address}
                error={addressError && addressError.error ? true : false}
                label={t('transferLabelAddress')}
                placeholder={t('transferLabelAddressInput')}
                onChange={_handleOnAddressChange}
                disabled={chargeFeeTokenList.length ? false : true}
                SelectProps={{IconComponent: DropDownIcon}}
                // required={true}
                // inputRef={addressInput}
                helperText={<Typography
                    variant={'body2'}
                    component={'span'}>{addressError && addressError.error ? addressError.message : ''}</Typography>}
                fullWidth={true}
            />
            {address !== '' ?
                <IconClearStyled color={'inherit'} size={'small'} style={{top: '28px'}} aria-label="Clear" onClick={handleClear}>
                    <CloseIcon  />
                </IconClearStyled> : ''}
        </Grid>

        <Grid item /* marginTop={4} */ alignSelf={"stretch"} position={'relative'}>
            <TextField
                value={memo}
                // error={addressError && addressError.error ? true : false}
                label={t('transferLabelMemo')}
                placeholder={t('transferLabelMemoPlaceholder')}
                onChange={_handleOnMemoChange}
                // disabled={chargeFeeTokenList.length ? false : true}
                // SelectProps={{IconComponent: DropDownIcon}}
                // required={true}
                // inputRef={addressInput}
                // helperText={<Typography
                //     variant={'body2'}
                //     component={'span'}>{addressError && addressError.error ? addressError.message : ''}</Typography>}
                fullWidth={true}
            />
        </Grid>

        <Grid item /* marginTop={4} */ alignSelf={"stretch"} position={'relative'}>
            <Typography component={'span'} display={'flex'} alignItems={'center'} variant={'body1'} color={'var(--color-text-secondary)'} marginBottom={1}>
                {t('transferLabelFee')}：
                <Box component={'span'} display={'flex'} alignItems={'center'} style={{ cursor: 'pointer' }} onClick={() => setDropdownStatus(prev => prev === 'up' ? 'down' : 'up')}>
                    {getTokenFee(feeToken) || '--'} {feeToken}
                    <DropdownIconStyled status={dropdownStatus} fontSize={'large'} />
                    <Typography marginLeft={1} component={'span'} color={'var(--color-error)'}>
                        {isFeeNotEnough && t('transferLabelFeeNotEnough')}
                    </Typography>
                </Box>
            </Typography>
            {dropdownStatus === 'up' && (
                <FeeTokenItemWrapper padding={2}>
                    <Typography variant={'body2'} color={'var(--color-text-third)'} marginBottom={1}>{t('transferLabelFeeChoose')}</Typography>
                    <ToggleButtonGroup exclusive size={'small'} {...{data: toggleData, value: feeToken, t, ...rest}} onChange={handleToggleChange} />
                </FeeTokenItemWrapper>
            )}
            
            {/* <TextField
                id="transferFeeType"
                select
                label={t('transferLabelFee')}
                value={feeIndex}
                onChange={(event: React.ChangeEvent<any>) => {
                    _handleFeeChange(event)
                }}
                disabled={chargeFeeTokenList.length ? false : true}
                SelectProps={{IconComponent: DropDownIcon}}
                fullWidth={true}
            >{chargeFeeTokenList.map(({belong, fee}, index) => {
                // @ts-ignore
                return <MenuItem key={index} value={index} withnocheckicon={'true'}>
                    <ListItemText primary={<Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body1"
                        color="text.primary"
                    >{belong}</Typography>} secondary={<Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body1"
                        color="text.primaryLight"
                    >{fee}</Typography>}/>
                </MenuItem>
            })
            }</TextField> */}
        </Grid>
        <Grid item marginTop={2} alignSelf={'stretch'}>
            <Button fullWidth variant={'contained'} size={'medium'} color={'primary'} onClick={() => {
                console.log(tradeData)
                onTransferClick(tradeData)
            }}
                    loading={!getDisabled() && transferBtnStatus === TradeBtnStatus.LOADING ? 'true' : 'false'}
                    disabled={getDisabled() || transferBtnStatus === TradeBtnStatus.DISABLED || transferBtnStatus === TradeBtnStatus.LOADING ? true : false}
            >{t(transferI18nKey ?? `transferLabelBtn`)}
            </Button>
        </Grid>
    </Grid>;
}
