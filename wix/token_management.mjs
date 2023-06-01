import {wixClient} from "./wix_client.mjs";

const userTokensMap = new Map();

const setTokensForUser = async (userId) => {
    let userTokens = userTokensMap.get(userId);
    if (!userTokens) {
        // Generate new access and refresh tokens for the new visitor
        userTokens = await wixClient.auth.generateVisitorTokens();
        userTokensMap.set(userId, userTokens);
    } else {
        // Confirm or renew the existing access token
        userTokens = await wixClient.auth.generateVisitorTokens(userTokens);
        userTokensMap.set(userId, userTokens);
    }

    wixClient.auth.setTokens(userTokens);
};

export {setTokensForUser};