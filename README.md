<!--
 * This code is to be used exclusively in connection with Ping Identity Corporation software or services. Ping Identity Corporation only offers such software or services to legal entities who have entered into a binding license agreement with Ping Identity Corporation.
 *
 * Copyright 2024 Ping Identity Corporation. All Rights Reserved
-->

# PingOne AIC \- ID Dataweb Journey

This AIC Journey creates a custom Prefill URL containing the PII data of the user to be verified, directs the user to ID Dataweb's hosted UI for verification, and then redirects them back to AIC with the results of the verification (“approve", "obligation", or "deny”).

# High-Level Flow

[https://docs.iddataweb.com/docs/gateway-overview](https://docs.iddataweb.com/docs/gateway-overview)

1. Obtain an AXN Admin access token.  
   1. [https://docs.iddataweb.com/reference/admin-generate-bearer-token](https://docs.iddataweb.com/reference/admin-generate-bearer-token)  
2. With the AXN Admin access token, make a request to the [Verification Link API](https://docs.iddataweb.com/reference/generate-oidc-url) with the PII data to get the IDDW Prefill URL ([Option 1: Use the Admin API to generate a JWT for prefill](https://docs.iddataweb.com/docs/prefill-pii-from-source\#option-1-use-the-admin-api-to-generate-a-jwt-for-prefill)).  
   1. The output from the Verification Link API contains the full IDDW Prefill URL that AIC will use to redirect to IDDW. This Prefill URL includes a fully formed JSON Web Token containing your PII data, which is used as the **login\_hint** value to prefill PII into your IDDW verification workflow.  
   2. [https://docs.iddataweb.com/reference/authorize](https://docs.iddataweb.com/reference/authorize)  
3. AIC Redirects to IDDW using the IDDW Prefill URL generated above.  
4. Once you complete the IDDW verification workflow, you are Redirected back to AIC with a one-time token.  
   1. For example: https://*\<AIC URL\>*/am/XUI**?code=xQ5Ld5PDIRz8N1S8xw-qLiLu827qyRdPcbHaOnnfWgA**  
5. You exchange this token (via a "back channel" API call) in order to retrieve the transaction details (i.e. id\_token and access\_token).  
   1. The /token response is a JSON Web Token, and will include all authentication and verification results configured by the client  
   2. [https://docs.iddataweb.com/reference/token](https://docs.iddataweb.com/reference/token)  
6. With the id\_token and access\_token returned, you then have two options:  
   1. Decode the id\_token JWT and extract the policyDecision  
      1. *Journey: IDDW Identity Proofing \- ID Token.json*  
   2. Use the access\_token to make an API call to the /userinfo endpoint to get the policyDecision  
      1. *Journey: IDDW Identity Proofing \- Userinfo.json*  
   3. [https://docs.iddataweb.com/reference/userinfo](https://docs.iddataweb.com/reference/userinfo)

# Implementation Steps

1. Create the following in **Environment Secrets & Variables**  
   1. **Secrets**  
      1. esv-iddw-admin-password  
      2. esv-iddw-admin-username  
         1. [https://docs.iddataweb.com/reference/getting-started-with-your-api](https://docs.iddataweb.com/reference/getting-started-with-your-api)  
      3. esv-iddw-client-id  
         1. [https://docs.iddataweb.com/docs/verification-service](https://docs.iddataweb.com/docs/verification-service)  
      4. esv-iddw-client-secret  
   2. **Variables**  
      1. esv-iddw-jwt-audience  
         1. *Example: 1234567890abcdef*  
      2. esv-iddw-jwt-issuer  
         1. *Example: https://preprod1.iddataweb.com*  
      3. esv-iddw-redirecturl  
         1. *Example: https://\<AIC URL\>/am/XUI/*  
      4. esv-iddw-signingkey  
         1. *Example: eyJrZXlzIjpbey…dfQ==*  
2. Import the provided Journeys:  
   1. **IDDW Identity Proofing \- ID Token.json**  
      1. This Journey will decode the id\_token JWT and extract the policyDecision  
   2. **IDDW Identity Proofing \- Userinfo.json**  
      1. This Journey will use the access\_token to make an API call to the /userinfo endpoint to get the policyDecision  
   3. *Optional: **IDDW Identity Proofing \- ID Token \- Debug.json***  
      1. *Contains Debug outputs for troubleshooting*  
   4. *Optional: **IDDW Identity Proofing \- Userinfo \- Debug.json***  
      1. *Contains Debug outputs for troubleshooting*  
3. Modify the respective Journey to include your PII data:  
   1. Select the node titled “AXN Admin /verification/link”  
   2. In the “Body Content” section, modify the **userAttributes** parameter to include the Prefill PII data you require for your verification workflow.  
      1. [https://docs.iddataweb.com/reference/generate-oidc-url](https://docs.iddataweb.com/reference/generate-oidc-url)

<!-- SUPPORT -->
## Support

If you encounter any issues, be sure to check our **[Troubleshooting](https://backstage.forgerock.com/knowledge/kb/article/a68547609)** pages.

Support tickets can be raised whenever you need our assistance; here are some examples of when it is appropriate to open a ticket (but not limited to):

* Suspected bugs or problems with Ping Identity software.
* Requests for assistance

You can raise a ticket using **[BackStage](https://backstage.forgerock.com/support/tickets)**, our customer support portal that provides one stop access to Ping Identity services.

BackStage shows all currently open support tickets and allows you to raise a new one by clicking **New Ticket**.

<!-- COLLABORATION -->

## Contributing

This Ping Identity project does not accept third-party code submissions.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LEGAL -->

## Disclaimer

> **This code is provided by Ping Identity on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law.
>Ping Identity does not represent or warrant or make any guarantee regarding the use of this code or the accuracy,
>timeliness or completeness of any data or information relating to this code, and Ping Identity hereby disclaims all warranties whether express,
>or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose,
>and any warranty of non-infringement. Ping Identity shall not have any liability arising out of or related to any use,
>implementation or configuration of this code, including but not limited to use for any commercial purpose.
>Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein
>Ping Identity resides or in which Ping Identity conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

&copy; Copyright 2024 Ping Identity. All Rights Reserved

[pingidentity-logo]: https://www.pingidentity.com/content/dam/picr/nav/Ping-Logo-2.svg "Ping Identity Logo"
