import moment from 'moment';

export const getInPercentage = value => {
  const percent = value * 100;
  const roundedoff = ` ${Math.round(percent)}%`;
  return roundedoff;
};

export const getMomentDate = value => {
  const date = moment(value).format('DD-MMM-YYYY hh:mm: a');
  return date;
};
export const getFreeStorage = value => {
  // value in bytes , 1 Bytes = 1.0×10-9 Gigabytes

  const storage = value / 1024000000;
  const roundedoff = ` ${storage.toFixed(2)}GB`;
  return roundedoff;
};
