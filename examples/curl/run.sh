#!/usr/bin/env bash
# Run the "Sitemap to Markdown Crawler — Website to Markdown for LLM & RAG" Apify Actor synchronously and print the dataset items.
# Usage: export APIFY_TOKEN=your_apify_token && ./run.sh
set -euo pipefail
: "${APIFY_TOKEN:?Set APIFY_TOKEN first (Apify Console > Settings > API & Integrations)}"

curl -sS -X POST "https://api.apify.com/v2/acts/leadsbrary~sitemap-to-markdown-crawler/run-sync-get-dataset-items" \
  -H "Authorization: Bearer ${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON'
{
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
}
JSON
