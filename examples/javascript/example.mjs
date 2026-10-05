// Run the "Sitemap to Markdown Crawler — Website to Markdown for LLM & RAG" Apify Actor and print its results.
// Setup: npm install  &&  export APIFY_TOKEN=your_apify_token  &&  node example.mjs
// This repository only documents the Actor; its source code runs on Apify's infrastructure.
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first (Apify Console > Settings > API & Integrations).');
    process.exit(1);
}

const client = new ApifyClient({ token });

const runInput = {
  "startUrls": [
    {
      "url": "https://crawlee.dev"
    }
  ],
  "maxResults": 3,
  "discoveryMode": "sitemap_then_links",
  "includeUrlPatterns": [],
  "excludeUrlPatterns": [],
  "maxCrawlDepth": 3,
  "skipUnchanged": false,
  "removeSelectors": [],
  "includeHtml": false,
  "respectRobotsTxt": true,
  "maxConcurrency": 10,
  "proxyConfiguration": {
    "useApifyProxy": false
  }
};

const run = await client.actor('leadsbrary/sitemap-to-markdown-crawler').call(runInput);
console.log(`Run finished with status: ${run.status}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(JSON.stringify(items, null, 2));
