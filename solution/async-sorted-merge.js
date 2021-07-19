"use strict";

// Your mission is to print out all of the entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    
    const findPositionModule = require('./find-position');

    // Generate log list with first logs of logSources.
    const logList = await Promise.all(logSources.map(async (logSource, index) => {
      const log = await logSource.popAsync();
      return {
        blockIndex: index,
        log
      }
    }))

    // Sort logs by date
    logList.sort((a, b) => a.log.date > b.log.date ? 1 : -1)

    while(logList.length > 0) {
      // Print the first log
      const firstItem = logList.shift();
      printer.print(firstItem.log);

      // Pop new log data
      const newLog = await logSources[firstItem.blockIndex].popAsync();

      // Insert the new element to sorted logList
      if (newLog !== false) {
        const newElement = {
          blockIndex: firstItem.blockIndex,
          log: newLog
        }
        const insertPosition = findPositionModule(logList, newElement);
        logList.splice(insertPosition, 0, newElement);
      }
    }

    printer.done();

    resolve(console.log("Async sort complete."));
  });
};