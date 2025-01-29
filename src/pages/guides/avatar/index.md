---
title: Getting started with Avatar
contributors:
  - https://github.com/BaskarMitrah
---

import AvartarPDF from "../../../images/Avatar-Catalog.pdf";

# Getting Started with Avatar API

## Overview

The Avatar API offers automated video creation at scale. This guide shows you how to get started using the asynchronous APIs for:

- Generating an avatar video via text input.
- Generating an avatar video via an audio input.

### API features

- Select an avatar from a catalog of stock actors.
- Select a voice from a catalog of stock voices.
- Use your own voice file to create avatar videos.
- Set your own image/video as a video background.

## Prerequisites

### API credentials

The required credentials were provided as part of the private beta.
You'll need these for this guide:
- ```client_id``` 
- ```client_secret```

### Storage solution

You'll need some type of user-owned storage for the video/audio/image/text files (i.e., Amazon S3 buckets) in order to generate a pre-signed URL to supply as the input for the APIs.

There are a few ways to set this up, described below.

#### Using Amazon S3 buckets

1. Log in to your AWS account.
2. Go to s3.
3. Create a new bucket and name it (for example, ```adobeapitesting```).
4. Drag and drop the video/audio/image/text file you want to test in the bucket.
5. Once the upload completes, select the file and go to **Actions**.
6. Select the **Share with presigned url** option and enter the duration for the pre-signed URL to be valid.
7. Copy the generated pre-signed URL (it may also automatically be copied when you create it).

#### Using Frame.io account

1. Log in to your Frame.io account.
2. Create a project (for example, ```AdobeApiTesting```).
3. Open the inspect view of your browser. In Chrome, press f12 and go to the **Network** tab.
4. Drag and drop the video/audio/image/text file that you want to test in the bucket.
5. Select the file and click **Download**.
6. In the **Network** tab, you will see a ```GET``` call using a pre-signed URL to download the file.
7. Copy that URL to use for your API testing.

#### Use Google's direct link service

1. You can use [Google's direct link service](https://sites.google.com/site/gdocs2direct/?authuser=1&pli=1) to generate downloadable public links for your files.
2. Before generating a link, you'll need to make sure your file's visibility in your Google Drive is set to **Anyone with the link**.
3. Then try the `curl` requests for the APIs directly from terminal.

Alternatively, you can use an HTTP client like [Postman](https://www.postman.com/) to try out the APIs.

## API walkthrough

<InlineAlert slots="text" />

There is a limit of 2 RPM for Avatar and TTS API endpoints and x100 RPM for the Get Result API, per user.

This endpoint enables you to generate an avatar video. You can provide a text or audio input via a pre-signed URL for generation.

##### Step 1

Ensure you have reference to a valid access token. See the [Prerequisites](#prerequisites).

##### Step 2 (Optional)

If you choose to use a text or audio file to generate the video - Upload the input audio file/text file to storage location and generate a presigned url to access the same (Refer to the [Prerequisites](#prerequisites) section for more details).

##### Step 3

In the curl command below, update the **Authorization** with the bearer token in step 1, **x-api-key** as per the prerequisite, **mediaType** as per input type and url with the generated presigned url and run the curl.

Select the curl for `avatar_curl_simple_text` for text input, `avatar_curl_text_file` for text file input or `avatar_curl_audio_file` for audio input.

`avatarId` specifies the unique ID of the avatar to be used for avatar generation. Users should refer to the <a href={AvartarPDF} target="_blank">Catalog</a> to select and retrieve the appropriate avatarId.

**avatar_curl_simple_text**

```bash
curl 'https://audio-video-api.adobe.io/beta/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script_text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "avatarId": "<avatar_id>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

**avatar_curl_text_file**

```bash
curl 'https://audio-video-api.adobe.io/beta/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' \
  --data-raw '{
    "script": {
        "source": {
            "url": "pre-signed url of text file"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "avatarId": "<avatar_id>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

**voice_avatar_curl_audio_file**

```bash
curl 'https://audio-video-api.adobe.io/beta/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' \
  --data-raw '{
    "audio": {
        "source": {
            "url": "pre-signed url of input audio"
        },
        "mediaType": "audio/x-wav",
        "localeCode": "en-US"
    },
    "avatarId": "<avatar_id>",
    "output": {
        "mediaType": "video/mp4"
    }
}'  
```

### Using an image or video as background

You can choose to change the background of the avatar video by providing a pre-signed url of a video or image.

<InlineAlert slots="text" />

**Note**: Please refer to [API Usage](../usage/) notes to understand the supported formats,aspect ratio etc. for video and image backgrounds.

**avatar_curl_video_background**

```bash
curl 'https://audio-video-api.adobe.io/beta/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script_text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "avatarId": "<avatar_id>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "video",
            "source": {
                "url": "<pre-signed url of background video>"
            }        
        }
    }
}'  
```

**avatar_curl_image_background**

```bash
curl 'https://audio-video-api.adobe.io/beta/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script_text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice_id>",
    "avatarId": "<avatar_id>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "image",
            "source": {
                "url": "<pre-signed url of background image>"
            }        
        }
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

**Note**: The ```result_url``` was returned in the response of the Avatar API call.

```bash
curl --location '<result_url>' \
  -H 'Authorization: Bearer <token>' \
  -H 'x-api-key: <client_id>' 
```

When the job is complete , you will see the result for the operation.

##### Sample Avatar API response

```bash
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
