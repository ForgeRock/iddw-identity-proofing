(function () {
  try {
    var jwtData = {
      jwtType: "SIGNED",
      issuer: systemEnv.getProperty("esv.iddw.jwt.issuer"),
      audience: systemEnv.getProperty("esv.iddw.client.id"),
      signingKey: systemEnv.getProperty("esv.iddw.signingkey")
    };

    var assertionJwt = nodeState.get("id_token");

    if (assertionJwt !== null && assertionJwt.length > 0) {
      jwtData["jwt"] = assertionJwt;
      var jwtClaims = jwtValidator.validateJwtClaims(jwtData);
      if (jwtClaims !== null) {
        var policyDecision = jwtClaims.get("policyDecision");
        nodeState.putShared("policyDecision", policyDecision);
        action.goTo('Success');
      } else {
        action.goTo('Failure').withErrorMessage("Invalid JWT claims");
      }
    } else {
      action.goTo('Failure').withErrorMessage("Error getting assertionJwt");
    }
  }
  catch (error) {
    nodeState.putShared("errorMessage", error.toString());
    action.goTo('Failure').withErrorMessage(error);
  }
}());
