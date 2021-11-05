import React from 'react';
import './RewardTokensBlock.css';
import {useTranslation} from "react-i18next";
import {Card} from "../../shared/Card";
import {H2} from "../../shared/H2";
import {Link} from "../../shared/Link";
import urls from "../../../config/constants/urls";
import chains from "../../../config/constants/chains";
import RewardTokenSelect from "../../shared/RewardTokenSelect/RewardTokenSelect";

function RewardTokensBlock(props: any) {
    const {t} = useTranslation('common');
    const chainId = (process.env.REACT_APP_CHAIN_ID != null) ? process.env.REACT_APP_CHAIN_ID
        : chains.mainnet.toString();
    let rewardTokensBlock;

    if (props.currentRewardToken.symbol === "BNB") {
        rewardTokensBlock = <p>(
            {t('rewards.reward_tokens.current', {
                name: props.currentRewardToken.name,
                symbol: props.currentRewardToken.symbol
            })}</p>;
    } else {
        rewardTokensBlock = <p>
            <Link href={
                // @ts-ignore
                `${urls.baseBscScanURL[chainId]}/token/${props.currentRewardToken.address}`}>
                {t('rewards.reward_tokens.current', {
                    name: props.currentRewardToken.name,
                    symbol: props.currentRewardToken.symbol
                })}
            </Link>
        </p>;
    }

    const selected = props.rewardTokens.filter((elt: any) => {
        return elt.value === props.displayedRewardToken.address;
    })[0];

    return (
        <Card className="card">
            <H2>{t('rewards.reward_tokens.title')}</H2>
            <div className="card-content">
                {rewardTokensBlock}
                <div className={"select-block"}>
                    <p>
                        {t('rewards.reward_tokens.token_select')}
                    </p>
                    <RewardTokenSelect
                        rewardTokenChanged={props.rewardTokenChanged}
                        selected={selected}
                        options={props.rewardTokens}/>
                </div>
            </div>
        </Card>
    );
}

export default RewardTokensBlock;
