(function () {
  "use strict";
  let responseObj;

  try {
    responseObj = JSON.parse($response.body);

    if (!responseObj.subscriber) responseObj.subscriber = {};
    if (!responseObj.subscriber.subscriptions)
      responseObj.subscriber.subscriptions = {};
    if (!responseObj.subscriber.entitlements)
      responseObj.subscriber.entitlements = {};
  } catch (error) {
    responseObj = {
      subscriber: {
        subscriptions: {},
        entitlements: {},
        original_app_user_id: "",
        original_application_version: "",
      },
    };
  }

  const subscription = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2104-07-06T00:00:00Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2004-07-06T00:00:00Z",
    purchase_date: "2004-07-06T00:00:00Z",
    store: "app_store",
  };

  const entitlement = {
    grace_period_expires_date: null,
    purchase_date: "2004-07-06T00:00:00Z",
    product_identifier: "locket_199_1m",
    expires_date: "2104-07-06T00:00:00Z",
  };

  responseObj.subscriber.subscriptions["locket_199_1m"] = subscription;
  responseObj.subscriber.entitlements["Gold"] = entitlement;

  $done({ body: JSON.stringify(responseObj) });
})();
