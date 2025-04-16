---
title: Using the Avatar API
description: Learn how to use the Avatar API to generate avatar videos.
contributors:
  - https://github.com/BaskarMitrah
  - https://github.com/aeabreu-hub
---

# Using the Avatar API

The Avatar API offers automated video creation using a digital avatar speaking from a provided transcript. This guide shows you how to get started using the asynchronous API.

## Overview

Using the Avatar API you can generate an Avatar video with a text prompt or audio input.
Options with the endpoint allow you to:

- [Select an avatar from a catalog](/images/Avatar-Catalog.pdf) of stock actors.
- Select a voice from a catalog of stock voices.
- Use your own voice file to create avatar videos.
- Set your own image/video as a video background.

The endpoint returns a response object like the one below. Use the `result_url` from the response to [check the job result](#check-the-status-of-a-job).

```json
{
    "links": {
        "cancel": {
            "href": "<cancel URL>"
        },
        "result": {
            "href": "<result URL>"
        }
    }
}
```

## Prerequisites

[Review the Getting Started page](/getting_started/) for this API for authentication and setup.

### API credentials

You'll need:

- ```client_id```
- ```client_secret```

## Quickstart

Use the commands below to generate an Avatar video.

In the cURL commands, be sure to update:

-  `Authorization` with the bearer token.
-  `x-api-key` with the Client ID.
-  `mediaType` the correct input format.
-  `url` (where applicable) with the generated pre-signed URL.
-  `avatarId` with the unique ID of the avatar to be used for avatar generation. Users should [refer to the Avatar catalog](/images/Avatar-Catalog.pdf) to choose the appropriate Avatar ID.

### Generate a video from text input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client ID>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "avatarId": "<avatar ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

### Generate a video from a text file input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client_ID>' \
  --data-raw '{
    "script": {
        "source": {
            "url": "<pre-signed URL of text file>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "avatarId": "<avatar ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'
```

### Generate a video from an audio file input

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client_ID>' \
  --data-raw '{
    "audio": {
        "source": {
            "url": "<pre-signed URL of input audio>"
        },
        "mediaType": "audio/wav",
        "localeCode": "en-US"
    },
    "avatarId": "<avatar ID>",
    "output": {
        "mediaType": "video/mp4"
    }
}'  
```

### Use an image or video as a background

Change the background of the Avatar video by providing a pre-signed URL of a video or image to use as a replacement.

<InlineAlert slots="header,text" />

NOTE

[Refer to the Technical Usage notes](/usage/) to understand the supported formats, aspect ratio, etc. for video and image backgrounds.

#### Generate a video from text input with a video background

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client_ID>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "avatarId": "<avatar ID>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "video",
            "source": {
                "url": "<pre-signed URL of background video>"
            }        
        }
    }
}'  
```

#### Generate a video from text input with an image background

```bash
curl 'https://audio-video-api.adobe.io/v1/generate-avatar' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client_ID>' \
  --data-raw '{
    "script": {
        "source": {
            "text": "<script text>"
        },
        "mediaType": "text/plain",
        "localeCode": "en-US"
    },
    "voiceId": "<voice ID>",
    "avatarId": "<avatar ID>",
    "output": {
        "mediaType": "video/mp4",
        "background": {
            "type": "image",
            "source": {
                "url": "<pre-signed URL of background image>"
            }        
        }
    }
}'  
```

### Check the status of a job

Use the GET Result API to see the status of a job. In the command below, update:

- `result_url` with the URL returned in the response of the Avatar API call.
- `Authorization` with the bearer token.
- `x-api-key` with the Client ID.

```bash
curl --location '<result URL>' \
  -H 'Authorization: Bearer <Token>' \
  -H 'x-api-key: <Client ID>' 
```

**Sample Avatar API response**

```bash
{
    "status": "succeeded",
    "url": "<pre-signed URL of the result>"
}
```

Use the `url` to download the generated video.

### Verify with Content Credentials

Adobe participates in the content authentication initiative for AI-generated assets, addressing concerns around content legitimacy. Register your content by uploading the file at [ContentCredential.org](https://contentcredentials.org/verify).
