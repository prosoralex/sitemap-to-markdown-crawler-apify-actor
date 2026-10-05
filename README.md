# Sitemap to Markdown Crawler — Website to Markdown for LLM & RAG — Apify Actor usage guide

[![Run on Apify](https://img.shields.io/badge/Apify-Run%20this%20Actor-24C1E0)](https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara)
[![Try Apify free](https://img.shields.io/badge/Apify-Try%20it%20free-24C1E0)](https://console.apify.com/sign-up?fpr=aupara)

Website to markdown crawler: give a domain, it finds the sitemap, fetches pages over plain HTTP and returns clean Markdown, headings, links, lastmod and content hash. Incremental re-crawls. Export JSON/CSV/Excel.

> **This repository does not contain the Actor's source code.** The Actor is closed-source and
> runs on Apify's infrastructure. This repo is documentation plus ready-to-run client examples
> (curl, Python, JavaScript) that call the hosted Actor with **your own** Apify API token.

**Run it on Apify →** [https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara](https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara)

## What it does

Website to markdown crawler: give a domain, it finds the sitemap, fetches pages over plain HTTP and returns clean Markdown, headings, links, lastmod and content hash. Incremental re-crawls. Export JSON/CSV/Excel.

## Use cases

- Index a documentation site from its sitemap.xml into a vector database for RAG
- Weekly knowledge-base refresh that exports only pages whose lastmod or content hash changed
- Content audit of a site: word counts, headings, meta descriptions, internal/external link counts
- Feed a support chatbot with a help centre converted to Markdown
- Export a blog to Markdown for migration or LLM fine-tuning datasets


## Input

| Field | Type | Required | Description |
|---|---|---|---|
| `startUrls` | array | yes | Websites or pages to convert. A homepage or bare domain triggers robots.txt/sitemap discovery; a sitemap URL is used directly; other URLs are crawl seeds. |
| `maxResults` | integer | no | Maximum number of pages delivered (and billed) in this run. |
| `discoveryMode` | string | no | Sitemap first with link-following fallback, sitemap only, or link-following only. |
| `includeUrlPatterns` | array | no | Glob patterns (e.g. https://crawlee.dev/js/docs/**). When set, only matching URLs are converted. |
| `excludeUrlPatterns` | array | no | Glob patterns of URLs to skip (e.g. **/tags/**, **/*.pdf). |
| `maxCrawlDepth` | integer | no | Link depth from start URLs when following links (not used for sitemap URLs). |
| `changedSince` | string | no | ISO date (e.g. 2026-09-01). Only sitemap URLs with lastmod on/after this date are crawled; URLs without lastmod are kept. |
| `skipUnchanged` | boolean | no | Store a content hash per URL and skip (not output, not billed) pages unchanged since the previous run with the same state key. |
| `stateKey` | string | no | Name of the incremental state. Defaults to the first start URL hostname. |
| `contentSelector` | string | no | Optional CSS selector of the main content. Otherwise main/article/[role=main] heuristics are used. |
| `removeSelectors` | array | no | Extra CSS selectors removed before conversion (e.g. .cookie-banner). |
| `includeHtml` | boolean | no | Also output the cleaned HTML of the main content. |
| `respectRobotsTxt` | boolean | no | Skip URLs disallowed by robots.txt. |
| `maxConcurrency` | integer | no | Parallel requests. |
| `proxyConfiguration` | object | no | Only needed if the target blocks direct requests (datacenter proxy is usually enough). |

The full input form (with defaults and validation) is on the [Actor page](https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara).


## Output (sample item)

Sample trimmed for readability (long texts and lists are shortened) — a real run returns the complete data.

```json
{
  "url": "https://crawlee.dev/blog",
  "requestedUrl": "https://crawlee.dev/blog",
  "domain": "crawlee.dev",
  "title": "Crawlee Blog - learn how to build better scrapers | Crawlee for JavaScript · Build reliable crawlers. Fast.",
  "description": "Guides and tutorials on using Crawlee, the most reliable open-source web scraping and browser automation library for JavaScript and Node.js developers.",
  "language": "en",
  "markdown": "> 👉 This article was written by [feder-cr](https://github.com/feder-cr) as part of [Write for Apify](https://apify.com/resources/write-for-apify) - a program for developers sharing original articles about what they built with Crawlee.\n\nYou open the page by hand and it loads. You…",
  "html": null,
  "headings": [
    {
      "level": 2,
      "text": "What JobOps does​"
    },
    {
      "level": 2,
      "text": "What's new in Crawlee for Python v1​"
    }
  ],
  "wordCount": 1208,
  "links": {
    "internal": 9,
    "external": 36
  },
  "canonicalUrl": "https://crawlee.dev/blog",
  "lastmod": null,
  "lastModifiedHeader": "2026-10-02T13:44:42.000Z",
  "contentHash": "fb4d59215c29e94afe4bf1ac87fbfd784854abe54c42a716daf9f48d98a67520",
  "changeStatus": "unknown",
  "discoveredFrom": "sitemap",
  "httpStatus": 200,
  "crawledAt": "2026-10-04T08:50:16.431Z"
}
```

## Pricing

Pay only for results: about **$1.20 per 1,000 results** on the Apify Free plan, down to **$0.80 per 1,000** on paid Apify plans.

Apify platform usage (compute) is billed by Apify on top of the per-result price — about **$0.08 per 1,000 results** in our measured test runs (estimate, varies with input). Tip: keep only the output formats and options you need to reduce it.

Prices can change — the [Actor page](https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara) always shows the current pricing.

## Quick start

You need an Apify account and an API token (Apify Console → **Settings → API & Integrations**).
Never commit your token: export it as the `APIFY_TOKEN` environment variable.

### cURL

```bash
curl -X POST "https://api.apify.com/v2/acts/leadsbrary~sitemap-to-markdown-crawler/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
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
```

### Python (`apify-client`)

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run_input = {
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
    "skipUnchanged": False,
    "removeSelectors": [],
    "includeHtml": False,
    "respectRobotsTxt": True,
    "maxConcurrency": 10,
    "proxyConfiguration": {
        "useApifyProxy": False
    }
}

run = client.actor("leadsbrary/sitemap-to-markdown-crawler").call(run_input=run_input)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

### JavaScript (`apify-client`)

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

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
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

Runnable versions live in [`examples/`](./examples).

## Troubleshooting

- **401 / "User was not found or authentication token is not valid"** — check that `APIFY_TOKEN` is set and copied completely.
- **The run finished but the dataset is empty** — widen your search input or check the run log on the Apify Console.
- **Run stops early** — you may have reached the maximum cost per run you set in Apify; raise it in the run options.
- **Need something else?** Open an issue in this repository or use the Issues tab on the Actor page.

## Don't have an Apify account yet?

[Sign up here](https://console.apify.com/sign-up?fpr=aupara) — new accounts get $5 of free platform usage every month, enough to try most Actors without paying upfront.
Browse the full [Apify Store](https://apify.com/store?fpr=aupara) or [all Actors from this developer](https://apify.com/leadsbrary?fpr=aupara).

## Links

- Actor page: [https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara](https://apify.com/leadsbrary/sitemap-to-markdown-crawler?fpr=aupara)
- All Actors from this developer: [https://apify.com/leadsbrary?fpr=aupara](https://apify.com/leadsbrary?fpr=aupara)
- Apify API reference: [https://docs.apify.com/api/v2](https://docs.apify.com/api/v2)

## Keywords

website to markdown crawler, sitemap to markdown, sitemap crawler, website to markdown, html to markdown, llm docs scraper, rag website crawler, crawl4ai alternative, firecrawl alternative, docs to markdown, knowledge base crawler, incremental website crawler, website content crawler, content audit crawler

#markdown #webcrawler #sitemap #llm #rag #webscraping #knowledgebase #contentaudit #ai #apify

## License

The example code in this repository is released under the MIT License — see [LICENSE](./LICENSE).
It does not cover the Actor itself, which remains closed-source and is operated by its developer on Apify.
