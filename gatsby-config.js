/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/audio-video-firefly-services/',
  siteMetadata: {
    pages: [
      {
        title: 'Overview',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/guides/'
      },
      {
        title: 'API References',
        path: '/api/'
      },
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/guides/',
        header: true,
        pages: [
          {
            title: 'Authentication',
            path: '/guides/'
          },
          // TODO: Editrorial Review By Alex
          /*
          {
            title: 'Getting Started with Avatar',
            path: '/guides/avatar'
          },
          {
            title: 'Getting Started with TTS',
            path: '/guides/tts'
          },
          */
          {
            title: 'API Usage Notes',
            path: '/guides/usage'
          },
        ]
      }

    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
