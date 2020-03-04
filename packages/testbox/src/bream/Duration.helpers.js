// @flow

export const DURATION_RE = /^((?<D>\d+)\s)?(((?<H>\d+):)?((?<M>\d+):)?)?(?<s>\d+)(\.(?<u>\d+))?$/;

export type ParsedDuration = {
  D: string,
  H: string,
  M: string,
  s: string,
  u: string,
};

/**
 * @description Parses duration formatted as [DD] [HH:[MM:]]ss[.uuuuuu]
 * @param {string} duration
 * @returns {ParsedDuration}
 */
export function parseDuration(duration: string): ParsedDuration {
  const matched = duration.match(DURATION_RE);
  const { D = '0', H = '0', M = '0', s = '0', u = '0' } = matched
    ? matched.groups
    : {};
  return { D, H, M, s, u };
}

/**
 * @description Get full hours of duration.
 * @param {string} duration
 * @returns {number}
 */
export function getDurationHours(duration: string): number {
  const { D, H } = parseDuration(duration);
  return +D * 24 + +H;
}

/**
 * @description Get full minutes of duration.
 * @param {string} duration
 * @returns {number}
 */
export function getDurationMinutes(duration: string): number {
  const { D, H, M } = parseDuration(duration);
  return (+D * 24 + +H) * 60 + +M;
}

/**
 * @description Get full seconds of duration.
 * @param {string} duration
 * @returns {number}
 */
export function getDurationSeconds(duration: string): number {
  const { D, H, M, s } = parseDuration(duration);
  return ((+D * 24 + +H) * 60 + +M) * 60 + +s;
}

/**
 * @description Get full milliseconds of duration.
 * @param {string} duration
 * @returns {number}
 */
export function getDurationTime(duration: string): number {
  const { D, H, M, s, u } = parseDuration(duration);
  return (((+D * 24 + +H) * 60 + +M) * 60 + +s) * 1000 + parseInt(+u / 1000);
}
