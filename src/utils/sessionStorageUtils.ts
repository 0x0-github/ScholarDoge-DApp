import {RewardTokenInfo} from "../models/RewardTokenInfo";

const REWARD_TOKEN_KEY = "reward_token";

export const setRewardToken = (rewardToken: RewardTokenInfo) => {
    sessionStorage.setItem(REWARD_TOKEN_KEY,  JSON.stringify(rewardToken));
};

export const getRewardToken = () => {
    const serialized = sessionStorage.getItem(REWARD_TOKEN_KEY);

    return serialized != null ? Object.assign(new RewardTokenInfo(), JSON.parse(serialized)) : null;
};
