'use strict';

const request = require('./request');
const querystring = require('querystring');
const index = require('../index');

module.exports = {
    // Use an authorization code to recieve an access_token
    getAccessToken: (data, callback) => {
        // Authentication: none
        // Required Parameters: clientSecret, redirectURI, code
        // Optional Parameters: state

        if(!data.clientSecret) return callback('clientSecret is required');
        if(!data.redirectURI) return callback('redirectURI is required');
        if(!data.code) return callback('code is required');

        let options = {};
        options.url = `https://id.twitch.tv/oauth2/token`;
        options.form = {
            client_id: index.clientID,
            client_secret: data.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: data.redirectURI,
            code: data.code,
            state: data.state || ''
        };

        request('POST', options, callback);
    },
    
    // Data on an OAuth token, including associated client-id, username and scopes
    checkToken: (data, callback) => {
        // Authentication: any
        // Required Parameters: none
        // Optional Parameters: none
        
        if(!data.auth) return callback('auth is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/`;
        options.auth = data.auth;

        request('GET', options, callback);

    },

    // Refresh a token
    refreshToken: (data, callback) => {
        // Authentication: none
        // Required Parameters: clientSecret, refreshToken
        // Optional Parameters: state

        if(!data.clientSecret) return callback('clientSecret is required');
        if(!data.refreshToken) return callback('refreshToken is required');

        let options = {};
        options.url = `https://id.twitch.tv/oauth2/token`;
        options.form = {
            client_id: index.clientID,
            client_secret: data.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: data.refreshToken,
            state: data.state || ''
        };

        request('POST', options, callback);
    }
};