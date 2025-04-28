---
title: TTS and Avatar API Usage Notes
description: This doc provides details about using the APIs, including what's currently supported, limitations and workarounds, and the current usage limits.
contributors:
  - https://github.com/BaskarMitrah
---

# API Usage Notes

This doc provides details about using the Avatar and TTS (Text-to-Speech) APIs, including what's currently supported, limitations and workarounds, and the current usage limits.

## Understanding limitations and workarounds

These are some known limitations of the these APIs and their workarounds:

- **Gesture mismatch**: Output videos may occasionally feature gesture mismatches.
- **TTS voice modulation**: The output may have signification modulation in pitch or voice. Regenerating the audio can often resolve this issue.
- **Limited voice controls**: Currently voice controls like emphasis, speed or pitch modulation are not supported.
- **Mispronunciation**: The audio output might mispronounce certain uncommon words or proper nouns. This can be addressed by using phonetic spellings.

## Language support

Audio and video generation is supported for the following languages:

- German ```(de-DE)```
- Danish (Denmark) ```(da-DK)```
- English (American) ```(en-US)```
- English (British) ```(en-GB)```
- English (Indian) ```(en-IN)```
- Spanish (Spanish) ```(es-ES)```
- Spanish (Latin America) ```(es-419)```
- Spanish (Argentina) ```(es-AR)```
- French (France) ```(fr-FR)```
- French (Canada) ```(fr-CA)```
- Hindi (India) ```(hi-IN)```
- Italian ```(it-IT)```
- Japanese (Japan) ```(ja-JP)```
- Korean (South Korea) ```(ko-KR)```
- Norwegian (Norway) ```(nb-NO)```
- Dutch (Netherlands) ```(nl-NL)```
- Portuguese (Brazil) ```(pt-BR)```
- Portuguese (Portugal) ```(pt-PT)```
- Swedish (Sweden) ```(sv-SE)```
- Chinese (Simplified) ```(zh-CN)```

Change the ```localeCode``` parameter to get the results in the desired language/accent.

## Input text specifications

**Transcript length**: Up to ```20000``` characters.

**Input Medium**: Plain text, or ```.txt``` file via a pre-signed URL.

## For Avatar API only

### Avatar input audio specifications

**Duration (max)**: 30 mins.

**CODEC**: MPEG, PCM.

**Formats/container**: audio/wav, audio/x-wav, audio/aac.

**Input Medium**: Pre-signed URL.

### Avatar background video specifications

**Duration (max)**: 30 mins.

**FPS**: 24 fps, 25 fps, 29.97, 30, 50, 59.94, 60.

**Resolution (max)**: Full HD.

**Aspect Ratio**: 1,920*1,080px.

**CODEC**: H.264.
  
**Formats/container**: video/mp4, video/mov.

**Input Medium**: Pre-signed URL.

### Avatar background image specifications

**Formats**: JPEG,PNG.

**Input Medium**: Pre-signed URL.

**Aspect Ratio**: 1,920*1,080px.

## API render time

   2X the output audio length for TTS API.

   10X the output video length for Avatar API.

## API parameters

| API                   | Parameter       | Default       | All values                               | Requirement |
|-----------------------|-----------------|---------------|------------------------------------------|-------------|
| Text-to-Speech        | Voice ID        | -             | Refer to catalog                         | Mandatory   |
|                       | Output format   | .wav          | .wav                                     | Optional    |
| Avatar  (audio input) | Actor ID        | -             | Refer to catalog                         | Mandatory   |
|                       | Output format   | .mp4          | .mp4, .webm                              | Optional    |
|                       | Background type | -             | "image", "video", "color", "transparent" | Optional    |
|                       | Background      | -             | Pre-signed URL                           | Optional    |
| Avatar (text input)   | Voice ID        | -             | Refer catalog                            | Mandatory   |
|                       | Actor ID        | -             | Refer to catalog                         | Mandatory   |
|                       | Output format   | .mp4          | .mp4, .webm                              | Optional    |
|                       | Background type | -             | "image", "video", "color", "transparent" | Optional    |
|                       | Background      | -             | Pre-signed URL                           | Optional    |

## Request limits per API

To be sure everyone enjoys peak performance with these APIs, Adobe sets limits on the volume, frequency, and concurrency of API calls. Adobe monitors your API usage and will contact you proactively to resolve any risks to API performance.

<InlineAlert variant="warning" slots="text" />

Be aware that these usage limits apply to your entire organization.

These are the current rate limits for API requests:

**Get Voices API**: 50 requests per minute.

**Get Actors API**: 50 requests per minute.

**Avatar API**: 5 requests per minute.

**TTS API**: 10 requests per minute.

**Get Result API**: 100 requests per minute.

You may encounter a `HTTP 429 "Too Many Requests"` error if usage exceeds either the per minute or per day limits. We recommend using the `retry-after` header to determine the number of seconds you should wait before trying again.
