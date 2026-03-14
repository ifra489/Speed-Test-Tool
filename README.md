# Website Speed Test CLI

A lightweight Node.js command line tool that measures the response time of multiple websites and compares their connection speeds.

The tool sends HTTP/HTTPS requests to each website, calculates how long the connection takes, and displays a comparison showing the fastest site.

---

## Features

- Test multiple websites from the command line
- Measure website response time in milliseconds
- Automatic HTTP and HTTPS support
- Timeout handling for slow websites
- Error handling for unreachable sites
- Fastest website comparison

---

## Installation

Clone the repository:
```
git clone https://github.com/yourusername/speedtest-cli.git
```
```
cd speedtest-cli
```
No external dependencies are required. The project uses only built-in Node.js modules.

---

## Usage

Run the script using Node.js:
```
node speed-test.js google.com github.com yahoo.com
```
You can test any number of websites.

---

## Example Output
```
Testing connection to google.com...
Status: 200
Response Time: 120 ms

Testing connection to github.com...
Status: 200
Response Time: 210 ms

Testing connection to yahoo.com...
Status: 200
Response Time: 180 ms

========== COMPARISON ==========
FASTEST: google.com - 120 ms
github.com - 180 ms
yahoo.com - 210 ms
```
---

## Project Structure
```
speedtest-cli
│
├── speed-test.js     # Main CLI script
└── README.md         # Project documentation
```
---

## Technologies Used

- Node.js
- HTTP module
- HTTPS module
- JavaScript (ES6)

---

## How It Works

1. The script takes website URLs as command line arguments.
2. It sends HTTP or HTTPS requests to each site.
3. The response time is calculated using timestamps.
4. Results are stored and sorted.
5. The fastest website is displayed in the comparison.

---

## Future Improvements

- Add color output in terminal
- Support JSON output
- Add repeat testing for more accurate results
- Export results to a file
- CLI options like `--timeout` and `--repeat`

---

## License

This project is open source and available under the MIT License.
