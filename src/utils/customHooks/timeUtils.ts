const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

export function secondsToFuzzy(seconds: number): string {
    if (seconds < SECONDS_IN_MINUTE) {
      return "less than a minute";
    }
    if (seconds < SECONDS_IN_MINUTE * 2) {
      return "about a minute";
    }
    if (seconds < SECONDS_IN_MINUTE * 60) {
      return `about ${Math.floor(seconds/SECONDS_IN_MINUTE)} minutes`
    }
    return `about ${Math.round(seconds/SECONDS_IN_HOUR)} hours`
}