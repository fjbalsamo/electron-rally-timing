import { partial, penalty, timestamp, start, arrival } from '../util/vue.filter';

/**
 * @returns {String} html headers
 */
export const htmlHeaders = (data) => {
  const { title } = data;
  let head = [];

  if (!title) throw new Error(`title is required`);

  head.push(`<!DOCTYPE html>`);
  head.push(`<html lang="en">`);
  head.push(`<head>`);
  head.push(` <meta charset="UTF-8">`);
  head.push(
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  );
  head.push(
    `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />`
  );
  head.push(`<title>Report</title>`);
  head.push(`</head>`);
  head.push(`<style>`);
  head.push(`html, body {font-size: 10pt;}`);
  head.push(`</style>`);
  head.push(`<body>`);

  head.push(`<div class="container-fluid">`);
  head.push(`<div class="row">`);
  head.push(`<div class="col">`);
  head.push(`<h2 class="text-center text-uppercase">${title}</h2>`);
  head.push(`</div>`);
  head.push(`</div>`);

  return head.join("\n");
};

/**
 * @returns {String} html footer
 */
export const htmlFooter = (data) => {
  const { sportCheck, technicalCheck } = data;
  let footer = [];

  footer.push(`<footer class="container-fluid">`);
  footer.push(`<div class="row">`);
  footer.push(`<div class="col">`);
  footer.push(`<div class="alert alert-${sportCheck ? 'success' : 'danger'}">`)
  footer.push(`<h6 class="text-center text-uppercase">Sport Auth</h6>`);
  footer.push(
    `<p class="text-center text-uppercase"><strong>${sportCheck ? "yes" : "no"}</strong></p>`
  );
  footer.push(`</div>`);
  footer.push(`</div>`);
  footer.push(`<div class="col">`);
  footer.push(`<div class="alert alert-${technicalCheck ? 'success' : 'danger'}">`);
  footer.push(`<h6 class="text-center text-uppercase">Technical Auth</h6>`);
  footer.push(
    `<p class="text-center text-uppercase"><strong>${technicalCheck ? "yes" : "no"}</strong></p>`
  );
  footer.push(`</div>`);
  footer.push(`</div>`);
  footer.push(`<div class="col">`);
  footer.push(`<h6 class="text-center text-uppercase">timestamp</h6>`);
  footer.push(
    `<p class="text-center text-uppercase">${timestamp((new Date()).getTime())}</p>`
  );
  footer.push(`</div>`);
  footer.push(`</div>`);
  footer.push(`</footer>`);
  footer.push(`</body>`);
  footer.push(`</html>`);
  return footer.join("\n");
};

/**
 * parse a single repot to html table format
 * @param {Array} data
 * @returns {String} html table format
 */
export const parseToHtmlTable = (data) => {
  let container = [];

  container.push(`<table class="table table-striped">`);
  container.push(`<thead>`);
  container.push(`<tr>`);
  container.push(`<th class="text-center">&nbsp;</th>`);
  container.push(`<th class="text-center">Class</th>`);
  container.push(`<th class="text-center" colspan="4">Crew</th>`);
  container.push(`<th class="text-center">Partial</th>`);
  container.push(`<th class="text-center">Pen</th>`);
  container.push(`<th class="text-center">Total</th>`);
  container.push(`<th class="text-center">Diff w/prev.</th>`);
  container.push(`<th class="text-center">Diff w/first</th>`);
  container.push(`<th class="text-center">Vel</th>`);
  container.push(`</tr>`);
  container.push(`</thead>`);
  container.push(`<tbody>`);
  if (data.length == 0) {
    container.push(
      `<tr class="table-info"><td colspan="12" class="text-center">Empy Report</td></tr>`
    );
  } else {
    let tbody = data.map((value, index) => {

      return (`
      <tr>

        <td class="text-uppercase text-center GeneralPosition">
        <small>${index+1}</small>
        </td>

        <td class="text-uppercase text-center className">
        <small>
        ${value.crew.category.name}
        <sub>
        &nbsp;${value.classPosition}
        </sub>
        </small>
        </td>
        
        <td class="text-uppercase text-center crewNumber">
        <small>${value.crew.number}</small>
        </td>

        <td class="text-uppercase text-justify crewName">
        <small>${value.crew.name}</small>
        </td>
        <td class="text-uppercase text-justify crewLocation">
        <small>${value.crew.location}</small>
        </td>
        <td class="text-uppercase text-justify crewVehicle">
        <small>${value.crew.vehicle}</small>
        </td>

        <td class="text-uppercase text-center partialTime">
        <small>${partial(value.partial)}</small>
        </td>
        
        <td class="text-uppercase text-center penaltyTime">
        <small>${value.penalty>0 ? penalty(value.penalty) : '-'}</small>
        </td>

        <td class="text-uppercase text-center totalTime">
        <small>${value.partial == value.total ? '-' : partial(value.total)}</small>
        </td>

        <td class="text-uppercase text-center prevDiff">
        <small>${value.prevDiff>0 ? partial(value.prevDiff) : '-'}</small>
        </td>

        <td class="text-uppercase text-center firstDiff">
        <small>${value.firstDiff>0 ? partial(value.firstDiff): '-'}</small>
        </td>

        <td class="text-uppercase text-center velocity">
        <small>${value.velocity}Km/h</small>
        </td>
      
      </tr>
      `);
      
    });

    container.push(...tbody);
  }
  container.push(`</tbody>`);
  container.push(`</table>`);

  return `<div class="container-fluid"><div class="row"><div class="col">
    ${container.join("\n")}
    </div></div></div>`;
};



/**
 * parse a grouped repot to html table format
 * @param {[Array]} matrix
 * @returns {String} html table format
 */
export const groupedParseToHtmlTable = (matrix) => {
  const vector = matrix.map(data => data.length>0 ? parseToHtmlTable(data) : '' );
  
  return vector.join('\n');
};

/**
 * parse a single report to CSV Format
 * @param {Array} data 
 * @returns {string}
 */
export const parseToCSVFormat = (data) => {
  const header = `"GP";"CLASS";"CP";"NUM";"CREW";"LOCATION";"VEHICLE";"PARTIAL";"PEN";"TOTAL","PREV";"FIRST";"VEL"`;

  const vector = data.map((value, index) => {
    return [
      index+1,
      `"${value.crew.category.name.toUpperCase()}"`,
      `${value.classPosition}`,
      `${value.crew.number}`,
      `"${value.crew.name.toUpperCase()}"`,
      `"${value.crew.location.toUpperCase()}"`,
      `"${value.crew.vehicle.toUpperCase()}"`,
      `"${partial(value.partial)}"`,
      `"${value.penalty>0 ? penalty(value.penalty) : '-'}"`,
      `"${value.partial == value.total ? '-' : partial(value.total)}"`,
      `"${value.prevDiff>0 ? partial(value.prevDiff) : '-'}"`,
      `"${value.firstDiff>0 ? partial(value.firstDiff) : '-'}"`,
      `"${value.velocity}Km/h"`
    ].join(';');
  });

  return [
    header,
    ...vector
  ].join('\n');
}

/**
 *  parse a grouped repot to CSV format
 * @param {[Array]} matrix 
 */
export const groupedParseToCSVFormat = (matrix) => {
  let vector = matrix.map((value, index) => {
    return `${parseToCSVFormat(value)}\n`;
  });

  return vector.join('\n');
}

/**
 * document control parser
 * @param {Array} data 
 */
export const documentControlToCSVFormat = (data) => {
  const header = `"NUM";"CLASS";"STAGE";"START";"ARRIVAL";"TIME";"DESC";"R. PEN";"C. PEN"`;

  const vector = data.map(value => {
    return [
      `${value.crew.number}`,
      `"${value.crew.category.name.toUpperCase()}"`,
      `${value.stage.priority}`,
      `"${start(value.start)}"`,
      `"${value.arrival>0 ? arrival(value.arrival) : '-'}"`,
      `"${value.partial>0 ? partial(value.partial) : '-'}"`,
      `"${(value.partial>0 && value.hook) ? 'BAD TIME': '-'}"`,
      `"${value.penalty_race>0 ? penalty(value.penalty_race) : '-'}"`,
      `"${value.penalty_control>0 ? penalty(value.penalty_control) : '-'}"`
    ].join(';');
  });

  return [
    header, 
    ...vector
  ].join('\n');
}
