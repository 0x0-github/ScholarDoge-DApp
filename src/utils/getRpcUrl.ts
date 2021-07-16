import random from 'lodash/random';
import urls from "../config/constants/urls";

const getNodeUrl = (mainnet = true) => {
    const nodes = mainnet ? urls.mainnetRpcs : urls.testnetRpcs;
    const randomIndex = random(0, nodes.length - 1);

    return nodes[randomIndex];
}

export default getNodeUrl;
