const http = require("http");
const https = require("https");

const results = [];
let completed = 0;
const websites = process.argv.slice(2);

/* =========================
   Ping Website Function
========================= */

function pingWebsite(url) {
  let formattedUrl = url;

  if (!url.startsWith("http")) {
    formattedUrl = "http://" + url;
  }

  const hostname = formattedUrl.replace(/^https?:\/\//, "");
  const protocol = formattedUrl.startsWith("https") ? https : http;

  console.log(`\nTesting connection to ${hostname}...`);

  const startTime = Date.now();

  const req = protocol.get(formattedUrl, (response) => {
    const responseTime = Date.now() - startTime;

    console.log(`Hostname: ${hostname}`);
    console.log(`Status: ${response.statusCode}`);
    console.log(`Response Time: ${responseTime} ms`);

    results.push({ hostname, responseTime });

    response.resume();

    completed++;
    checkFinished();
  });

  req.on("error", (error) => {
    const responseTime = Date.now() - startTime;

    console.log(`Failed to connect to ${hostname}`);
    console.log(`Error: ${error.message}`);
    console.log(`Time elapsed: ${responseTime} ms`);

    completed++;
    checkFinished();
  });

  req.setTimeout(3000, () => {
    req.destroy();

    const responseTime = Date.now() - startTime;

    console.log(`Timed out: ${hostname}`);
    console.log(`Time elapsed: ${responseTime} ms`);

    completed++;
    checkFinished();
  });
}

/* =========================
   Check if All Finished
========================= */

function checkFinished() {
  if (completed === websites.length) {
    showComparison();
  }
}

/* =========================
   Show Comparison
========================= */

function showComparison() {
  console.log("\n========== COMPARISON ==========");

  if (results.length === 0) {
    console.log("No successful connections.");
    return;
  }

  results.sort((a, b) => a.responseTime - b.responseTime);

  results.forEach((site, index) => {
    if (index === 0) {
      console.log(`🏆 FASTEST: ${site.hostname} - ${site.responseTime} ms`);
    } else {
      console.log(`🐢 ${site.hostname} - ${site.responseTime} ms`);
    }
  });
}

/* =========================
   CLI Usage Check
========================= */

if (websites.length === 0) {
  console.log("Usage: node speed-test.js <website1> <website2> ...");
  console.log("Example:");
  console.log("node speed-test.js google.com github.com yahoo.com");
} else {
  websites.forEach((site) => {
    pingWebsite(site);
  });
}
