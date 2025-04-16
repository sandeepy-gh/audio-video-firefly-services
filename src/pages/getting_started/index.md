---
title: Getting Started
description: This is the content to get started with TTS APIs, including authentication and set up.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---
# Authentication

<InlineAlert slots="text" />

Server-to-server authentication credentials let your application's server generate access tokens and make API calls on behalf of your application. This is sometimes referred to as "two-legged OAuth".

For your application to generate an access token, an end user does not need to sign in or provide consent to your application. Instead, your application can use its credentials (client ID and secrets) to authenticate itself and generate access tokens. Your application can then use these to call Adobe APIs and services on its behalf.

## Access tokens

Each access token is valid for 24 hours. To adhere to OAuth best practices, you should generate a new token every 23 hours.

Generate access tokens programmatically by sending a POST request:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id={<client_id>}&client_secret={<client_secret>}&scope=openid,AdobeID,firefly_enterprise'
```

The required parameters are:

- ```client_id```: The Client ID.
- ```client_secret```: The Client secret.
- ```scope```: ```openid,AdobeID,firefly_enterprise```

Automate your token generation by calling the IMS endpoint above using standard OAuth2 libraries. Using industry-standard libraries is the quickest and most secure way of integrating with OAuth.

Be diligent when choosing the OAuth 2.0 library that works best for your application. Your teams' projects likely leverage OAuth libraries already to connect with other APIs. It's recommended to use these libraries to automatically generate tokens when they expire.

The token endpoint also returns an expiry date, and the token itself (when decoded) contains the expiry time.

## Storage solution

You'll need some type of user-owned storage for the video/audio/image/text files (i.e., Amazon S3 buckets) in order to generate a pre-signed URL to supply as the input for the APIs.

There are a few ways to set this up, described below.

### Using Amazon S3 buckets

1. Log in to your AWS account.
2. Go to s3.
3. Create a new bucket and name it (for example, ```adobeapitesting```).
4. Drag and drop the video/audio/image/text file you want to test in the bucket.
5. Once the upload completes, select the file and go to **Actions**.
6. Select the **Share with presigned url** option and enter the duration for the pre-signed URL to be valid.
7. Copy the generated pre-signed URL (it may also automatically be copied when you create it).

### Using Frame.io account

1. Log in to your Frame.io account.
2. Create a project (for example, ```AdobeApiTesting```).
3. Open the inspect view of your browser. In Chrome, press f12 and go to the **Network** tab.
4. Drag and drop the video/audio/image/text file that you want to test in the bucket.
5. Select the file and click **Download**.
6. In the **Network** tab, you will see a ```GET``` call using a pre-signed URL to download the file.
7. Copy that URL to use for your API testing.

### Use Google's direct link service

1. You can use [Google's direct link service](https://sites.google.com/site/gdocs2direct/?authuser=1&pli=1) to generate downloadable public links for your files.
2. Before generating a link, you'll need to make sure your file's visibility in your Google Drive is set to **Anyone with the link**.
3. Then try the `curl` requests for the APIs directly from terminal.

Alternatively, you can use an HTTP client like [Postman](https://www.postman.com/) to try out the APIs.
