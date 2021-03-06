'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    getPosts: (data, callback) => {
        // Authentication: Optionally any scope
        // Required Parameters: channelID
        // Optional Parameters: limit, cursor, comments

        if(!data.channelID) return callback('channelID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.cursor) params.cursor = data.cursor;
        if(data.comments) params.comments = data.comments;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts?${querystring.stringify(params)}`;
        if(data.auth) options.auth = data.auth;

        request('GET', options, callback);
    },

    getPost: (data, callback) => {
        // Authentication: Optional, any scope
        // Required Parameters: channelID, postID
        // Optional Parameters: comments

        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');

        let params = {};
        if(data.comments) params.comments = data.comments;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}?${querystring.stringify(params)}`;
        if(data.auth) options.auth = data.auth;

        request('GET', options, callback);
    },

    createPost: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, post
        // Optional Parameters: share

        if(data.content) data.post = data.content;

        if(!data.auth) return callback('auth is required');
        if(!data.post) return callback('post is required');
        if(!data.channelID) return callback('channelID is required');

        let params = {};
        if(data.share) params.share = data.share;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts?${querystring.stringify(params)}`;
        options.auth = data.auth;
        options.form = { content: data.post };

        request('POST', options, callback);
    },

    deletePost: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}`;
        options.auth = data.auth;

        request('DELETE', options, callback);
    },

    createReaction: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, emoteID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.emoteID) return callback('emoteID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/reactions?emote_id=${data.emoteID}`;
        options.auth = data.auth;

        request('POST', options, callback);
    },

    deleteReaction: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, emoteID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.emoteID) return callback('emoteID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/reactions?emote_id=${data.emoteID}`;
        options.auth = data.auth;

        request('DELETE', options, callback);
    },

    getComments: (data, callback) => {
        // Authentication: Optional, any scope
        // Required Parameters: channelID, postID
        // Optional Parameters: limit, cursor

        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.cursor) params.cursor = data.cursor;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/comments?${querystring.stringify(params)}`;
        if(data.auth) options.auth = data.auth;
        
        request('GET', options, callback);
    },

    createComment: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, comment
        // Optional Parameters: none

        if(data.content) data.comment = data.content;

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.comment) return callback('comment is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/comments`;
        options.auth = data.auth;
        options.form = { content: data.comment };

        request('POST', options, callback);
    },

    deleteComment: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, commentID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.commentID) return callback('commentID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/comments/${data.commentID}`;
        options.auth = data.auth;

        request('DELETE', options, callback);
    },

    createCommentReaction: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, commentID, emoteID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.commentID) return callback('commentID is required');
        if(!data.emoteID) return callback('emoteID is required');

        let params = {};
        params.emote_id = data.emoteID;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/comments/${data.commentID}/reactions?emote_id=${data.emoteID}`;
        options.auth = data.auth;

        request('POST', options, callback);
    },

    deleteCommentReaction: (data, callback) => {
        // Authentication: channel_feed_edit
        // Required Parameters: channelID, postID, comment ID, emoteID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.postID) return callback('postID is required');
        if(!data.commentID) return callback('commentID is required');
        if(!data.emoteID) return callback('emoteID is required');

        let params = {};
        params.emote_id = data.emoteID;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/feed/${data.channelID}/posts/${data.postID}/comments/${data.commentID}/reactions?emote_id=${data.emoteID}`;
        options.auth = data.auth;

        request('DELETE', options, callback);
    }
};