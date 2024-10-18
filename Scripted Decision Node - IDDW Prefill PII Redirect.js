(function() {
  try {
    var redirectMethod = "GET";
    var redirectUrl = nodeState.get("prefill_url");

    if (!requestParameters.get("code")) {
      callbacksBuilder.redirectCallback(redirectUrl, {}, redirectMethod, true);
    } else {
      var gateway_auth_token = requestParameters.get("code").get(0);
      nodeState.putShared("gateway_auth_token", gateway_auth_token);
      action.goTo('Success');
    }
  }
  catch (error) {
    nodeState.putShared("errorMessage", error.toString());
    action.goTo('Failure').withErrorMessage(error);
  }
}());
