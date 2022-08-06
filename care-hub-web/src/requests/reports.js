import fetch from '~/utils/fetch';
import { buildUrlParamsString } from '~/utils';
import { REPORT_URL, GRAPH_URL, CARENEEDS_URL } from '~/consts/urls';

export const getReportDataRequest = (data) => {
  const params = data ? `?${buildUrlParamsString(data)}` : '';
  return fetch(`${REPORT_URL}${params}`, {
    method: 'GET',
  });
};

export const getGraphDataRequest = (data) => {
  return fetch(`${GRAPH_URL}?${buildUrlParamsString(data)}`, {
    method: 'GET',
  });
};

export const postCareNeedsRequest = (data) => {
  return fetch(CARENEEDS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getCareNeedsRequest = (data) => {
  return fetch(`${CARENEEDS_URL}?${buildUrlParamsString(data)}`, {
    method: 'GET',
  });
};
