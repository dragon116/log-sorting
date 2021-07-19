"use strict";

// Your mission is to print out all of the entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {

  const findPositionModule = require('./find-position');

  // Generate log list with first logs of logSources.
  const logList = logSources.map((logSource, index) => ({
      blockIndex: index,
      log: logSource.pop()
  }))

  // Sort logs by date
  logList.sort((a, b) => a.log.date > b.log.date ? 1 : -1)

  while(logList.length > 0) {
    // Print the first log
    const firstItem = logList.shift();
    printer.print(firstItem.log);

    // Pop new log data
    const newLog = logSources[firstItem.blockIndex].pop();

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

  return console.log("Sync sort complete.");
};