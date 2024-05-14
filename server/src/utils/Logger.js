class Logger {
  /**
   * Log message
   * @param args
   */
  static log(...args) {
    console.log(...args);
  }
  /**
   * Log warning message
   * @param ...args
   */
  static warning(...args) {
    console.warn(...args);
  }
  /**
   * Log error message
   * @param ...args
   */
  static error(...args) {
    console.error(...args);
  }
  /**
   * Log info message
   * @param ...args
   */
  static info(...args) {
    console.info(...args);
  }

  /**
   * Log info message
   * @param ...args
   */
  static debug(...args) {
    console.debug(...args);
  }
}

module.exports = Logger;
