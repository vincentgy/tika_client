/*eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 * @flow
 */

//https://github.com/facebook/react-native/issues/18899

'use strict';

import type {Server as HTTPServer} from 'http';
import type {Server as HTTPSServer} from 'https';

type WebsocketServiceInterface<T> = {
  +onClientConnect: (
    url: string,
    sendFn: (data: string) => mixed
  ) => Promise<T>,
  +onClientDisconnect?: (client: T) => mixed,
  +onClientError?: (client: T, e: Error) => mixed,
  +onClientMessage?: (client: T, message: string) => mixed,
};

type HMROptions<TClient> = {
  httpServer: HTTPServer | HTTPSServer,
  websocketServer: WebsocketServiceInterface<TClient>,
  path: string,
};

/**
 * Attaches a WebSocket based connection to the Packager to expose
 * Hot Module Replacement updates to the simulator.
 */
function attachWebsocketServer<TClient: Object>({
  httpServer,
  websocketServer,
  path,
}: HMROptions<TClient>) {
  const WebSocketServer = require('ws').Server;
  const wss = new WebSocketServer({
    server: httpServer,
    path: path,
  });

  let oldClient = null;

  wss.on('connection', async ws => {
    let connected = true;
    const url = ws.upgradeReq.url;

    const sendFn = (...args) => {
      if (connected) {
        ws.send(...args);
      }
    };

    if (oldClient) {
      websocketServer.onClientDisconnect(oldClient);
    }

    const client = await websocketServer.onClientConnect(url, sendFn);
    oldClient = client;

    ws.on('error', e => {
      websocketServer.onClientError && websocketServer.onClientError(client, e);
    });

    ws.on('close', () => {
      websocketServer.onClientDisconnect &&
        websocketServer.onClientDisconnect(client);
      connected = false;
    });

    ws.on('message', message => {
      websocketServer.onClientMessage &&
        websocketServer.onClientMessage(client, message);
    });
  });
}

module.exports = attachWebsocketServer;
