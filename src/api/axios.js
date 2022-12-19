import axios from 'axios';

// const BASE_URL = 'https://localhost:7186/api/v1/';
const BASE_NOTIFY_URL = 'https://fcm.googleapis.com/fcm/send';
const BASE_URL = 'http://207.180.223.113:8975/api/v1/';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const axiosNotify = axios.create({
  baseURL: BASE_NOTIFY_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAIRnHHpk:APA91bFbtvY4AtEhJ9t7_l66JIdcmPYxh1ZVLdF6MgPDSTQljb4pnv620CdiGCkMTavbYUxGRVXbSablDf7wDKEFqpaBBsztZSiBwuXOl_rwT00FuqF4q79ivy0oeMvrQmzHp-MZWY5G'
  }
});
