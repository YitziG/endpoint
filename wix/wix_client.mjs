import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from '@wix/api-client';
import { products } from "@wix/stores";
import { currentCart, checkout } from "@wix/ecom";

dotenv.config();

export const wixClient = createClient({
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID
    }),
    modules: {
        products,
        currentCart,
        checkout
    }
});