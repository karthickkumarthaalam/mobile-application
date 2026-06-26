export const ERROR_MESSAGES = {
  offline: {
    title: "You're Offline",
    description:
      "Turn on your mobile data or connect to Wi-Fi to continue listening to Thaalam Radio.",
    button: "Try Again",
  },

  timeout: {
    title: "Connection Timed Out",
    description:
      "Your internet connection seems slow. Please check your network and try again.",
    button: "Try Again",
  },

  server: {
    title: "Thaalam Radio is Currently Unavailable",
    description:
      "We're experiencing a temporary issue with our live stream. Please try again in a few moments.",
    button: "Reconnect",
  },

  stream: {
    title: "Unable to Play Live Stream",
    description: "The live stream couldn't be started. Please try again.",
    button: "Play Again",
  },

  generic: {
    title: "Something Went Wrong",
    description:
      "We couldn't load the latest programme information. Please try again.",
    button: "Retry",
  },
} as const;
