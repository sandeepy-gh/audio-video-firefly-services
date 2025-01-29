---
title: Getting started with TTS
contributors:
  - https://github.com/BaskarMitrah
---

import AvartarPDF from "../../../images/Avatar-Catalog.pdf";

# Getting Started with Text to Speech API

## Overview

The **Text to Speech (TTS)** API address the need for automated speech audio creation at scale. This guide shows you how to get started with using this asynchronous API for:

1. Generating an audio output via text input.
2. Generating an audio output via a text file.

### API Features

1. Use a voice of your choice from a catalog of stock voices
2. Choose from a wide variety of voices across genders, age groups and speaking styles

## Prerequisites

### API credentials

The required credentials were provided as part of the private beta in the form of a ```client_id``` and ```client_secret```. You will need them available to get started.

### Storage solution

You will need to be able to use some type of user owned storage (ie: Amazon S3 buckets) for the video/audio and edited transcripts to be able to generate a presigned URL to supply as the video/audio file input for the APIs.

Some ways to achieve this are described below.

#### Using Amazon S3 buckets

1. Login to your AWS account.
2. Go to s3.
3. Create a new bucket with some name (ex: ```adobeapitesting```).
4. Drag and drop the video/audio/text file you want to test in the bucket.
5. Once the upload completes, select the file and go to **Actions**.
6. Select the **Share with presigned url** option and give the duration you want the presigned url to be valid.
7. Copy the generated presigned url (it will also automatically be copied when you create it).

#### Using Frame.io account

1. Login to your Frame.io account
2. Create a project (ie: ```AdobeApiTesting```)
3. Open the inspect view of the browser. (In Chrome, press f12 and go to the "network" tab).
4. Drag and drop the video/audio/text file you want to test in the bucket.
5. Select the file and click on download.
6. In the "network" tab, you will see a ```GET``` call using a presigned url to download the file.
7. Copy that url to use in your API testing.

#### Use Google's direct link service

1. You can use [Google's direct link service](https://sites.google.com/site/gdocs2direct/?authuser=1&pli=1) to generate downloadable public links for your files.
2. Before generating, you'll need to make sure your file's visibility in your Google Drive is set to **Anyone with the link**.
3. You can try the curl requests for the APIs directly from terminal.

Optionally, you can use an http client like [Postman](https://www.postman.com/) to try out the APIs.

## API Walkthrough

<InlineAlert slots="text" />

There is a limit of 2 RPM for Avatar and TTS endpoints and x100 RPM for Get result API per user.

This endpoint enables you to generate an speech audio file. You can provide text or text file input via a presigned URL for generation.

##### Step 1

Ensure you have reference to a valid access token. See the [Prerequisites](#prerequisites).

##### Step 2 (Optional)

If you choose to use a text file to generate the audio - Upload the input text file to storage location and generate a presigned url to access the same (Refer to the [Prerequisites](#prerequisites) section for more details).

##### Step 3

In the curl command below, update the **Authorization** with the bearer token in step 1, **x-api-key** as per the prerequisite, **mediaType** as per input type and url with the generated presigned url and run the curl.

Select the curl for `tts_curl_text` for text input or `tts_curl_text_file` for text file input.

`voiceId` specifies the unique ID of the voice to be used for speech generation. Users should refer to the <a href={AvartarPDF} target="_blank">Catalog</a> to select and retrieve the appropriate voiceId.

**tts_curl_text**

```bash
curl --location 'https://audio-video-api.adobe.io/beta/generate-speech' \
-H 'Authorization: Bearer <token>' \
-H 'x-api-key: <client_id>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "script": {
        "source": {
            "text": "Your text goes here"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "output": {
        "mediaType": "audio/wav"
    }
}'
```

**tts_curl_text_file**

```bash
curl --location 'https://audio-video-api.adobe.io/beta/generate-speech' \
-H 'Authorization: Bearer <token>' \
-H 'x-api-key: <client_id>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "script": {
        "source": {
            "url": "<pre-signed url of text file>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "output": {
        "mediaType": "audio/wav"
    }
}'
```

##### Step 4

Check the `result_url` in the response and follow the steps in [Get Result API](#get-result-api) to get the final result.

```json
{
    "links": {
        "cancel": {
            "href": "<cancel_url>"
        },
        "result": {
            "href": "<result_url>"
        }
    }
} 
```

### GET Result API

##### Step 1

Update the ```result_url```, ```Authorization``` and ```x-api-key``` in the command below.

**Note**: The ```result_url``` was returned in the response of the TTS API call.

```bash
curl --location '<result_url>' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' 
```

When the job is complete , you will see the result for the operation.

#### Sample TTS API response

```json
{
    "status": "succeeded",
    "url": "<pre-signed url of the result>"
}
```

The ```url``` can be used to download the generated video for the input.

### Verifying the Content Credentials on output

Introduces a content authentication initiative for AI-generated assets, addressing concerns around content legitimacy.

##### Step 1

Download the final output video/audio using the presigned url in the success response of GET Result API.

##### Step 2

Upload the file <https://contentcredentials.org/verify> to check the credentials.
