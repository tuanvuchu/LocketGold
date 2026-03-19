async function getToken() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/tuanvuchu/27defb21461ef720a30edd88b58d06b1/raw/locketToken.json",
      {
        method: "GET",
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getUid(userName) {
  try {
    const response = await fetch(`https://locket.cam/${userName}`);
    const html = await response.text();
    const matchWithImg = html.match(/users%2F([^%]+)%2Fpublic/);
    const matchWithUrl = html.match(/invites%2F([A-Za-z0-9]{28})/);
    return matchWithImg?.[1] || matchWithUrl?.[1] || null;
  } catch (error) {
    return null;
  }
}

async function locketGold(app_user_id, app_transaction, fetch_token) {
  if (!app_user_id) {
    return "app_user_id không tồn tại";
  }
  const data = {
    observer_mode: false,
    app_transaction: app_transaction,
    currency: "VND",
    price: "49000",
    is_restore: true,
    offers: [],
    initiation_source: "restore",
    fetch_token: fetch_token,
    subscription_group_id: "21419447",
    store_country: "VNM",
    attributes: {
      $attConsentStatus: {
        value: "denied",
        updated_at_ms: Date.now(),
      },
    },
    product_id: "locket_199_1m",
    app_user_id: app_user_id,
    normal_duration: "P1M",
  };
  try {
    const response = await fetch("https://api.revenuecat.com/v1/receipts", {
      method: "POST",
      headers: {
        "User-Agent": "Locket/2 CFNetwork/3826.600.41 Darwin/24.6.0",
        "Content-Type": "application/json",
        authorization: "Bearer appl_JngFETzdodyLmCREOlwTUtXdQik",
        "x-nonce": "DRiV2cyU7bUDu86Z",
        "x-revenuecat-etag": "4977a063b70546bf",
        "x-preferred-locales": "vi_VN",
        "x-platform-flavor": "native",
        "x-storekit-version": "2",
        "x-client-build-version": "2",
        "x-platform-device": "iPhone11,8",
        "x-platform-version": "Version 18.7.1 (Build 22H31)",
        "x-storekit2-enabled": "true",
        "x-post-params-hash":
          "app_user_id,fetch_token,app_transaction:sha256:41cbb77ad46c902e219af52e9432e26b4bf88720c3622c2118c56e33ca798061",
        "x-storefront": "VNM",
        "x-apple-device-identifier": "61F12574-720B-4E85-9AEA-785DE345DBD3",
        "x-is-sandbox": "false",
        "x-headers-hash":
          "X-Is-Sandbox:sha256:fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa",
        "accept-language": "vi-VN,vi;q=0.9",
        "x-client-bundle-id": "com.locket.Locket",
        "sentry-trace": "a85c0eb1fb2f465c9a6f5f2aefb41d28-219d426da0cf4b9f-0",
        "x-platform": "iOS",
        "x-version": "5.41.0",
        "x-observer-mode-enabled": "false",
        "x-is-backgrounded": "false",
        "x-client-version": "2.33.0",
        "x-retry-count": "0",
        "x-is-debug-build": "false",
        baggage:
          "sentry-environment=production,sentry-public_key=78fa64317f434fd89d9cc728dd168f50,sentry-release=com.locket.Locket%402.33.0%2B2,sentry-trace_id=a85c0eb1fb2f465c9a6f5f2aefb41d28",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

const data = await getToken();
const app_transaction = data.app_transaction;
const fetch_token = data.fetch_token;

locketGold(await getUid("chutuanvu0206"), app_transaction, fetch_token);
