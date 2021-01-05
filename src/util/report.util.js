
/**
 * calcuate defferences 
 * @param {number} index 
 * @param {Array} vector 
 * @returns {{prevDiff:number, firstDiff:number}} object with prev and first difference
 */
const getDifferences = (index, vector) => {
  let item = vector[index];

  if (index == 0) {
    return {
      prevDiff: 0,
      firstDiff: 0,
    };
  } else if (index == 1) {
    return {
      prevDiff: 0,
      firstDiff: item.partial - vector[0].partial,
    };
  } else {
    return {
      prevDiff: item.partial - vector[index - 1].partial,
      firstDiff: item.partial - vector[0].partial,
    };
  }
};

/**
 * calculate car velocity
 * @param {number} index 
 * @param {Array} vector 
 * @returns {number} car velocity
 */
const getVelocity = (index, vector) => {
  let item = vector[index];

  let parseHours = item.total / (1000 * 60 * 60);

  return Math.floor(item.stage.long / parseHours);
};

/**
 * calculate class position
 * @param {number} index 
 * @param {Array} vector 
 * @returns {number} classPosition
 */
const getClassPosition = (index, vector) => {
  let item = vector[index];
  let filter = vector.filter(
    (v, i) => v.crew.category.id == item.crew.category.id && i < index
  );

  return filter.length + 1;
};

/**
 * add Object Format
 * @param {Array} data  query results
 * @returns {Array} Common Array Object
 */
export const addReportFormat = (data) => {

  return data.map((value, index) => {
    let differences = getDifferences(index, data);
    let velocity = getVelocity(index, data);
    let classPosition = getClassPosition(index, data);

    return {
      ...value,
      ...differences,
      velocity,
      classPosition,
    };
  });
};

/**
 * Add Object format ad grouped by class
 * @param {Array} data 
 * @param {Array} categories 
 * @returns {[Array]} common matrix object
 */
export const addReportFormatGrouped = (data, categories) => {
  let group = categories.map(category => {
    return data.filter(item => item.crew.category.id == category)
  });

  return group.map(el => addReportFormat(el));
}
