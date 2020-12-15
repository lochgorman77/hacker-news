import axios from 'axios';

export const HackerNewsApi = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, must-revalidate',
    Pragma: 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Cache-Control, Pragma',
  },
});
