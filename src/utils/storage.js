/* @flow */

import SInfo from 'react-native-sensitive-info';
import { Platform } from 'react-native';

const STORAGE_KEY_NAME = 'podmeStorage';
const STORAGE_OPTIONS = {
  sharedPreferencesName: STORAGE_KEY_NAME,
  keychainService: STORAGE_KEY_NAME,
};

const setStorageItem = async (key, value) => SInfo.setItem(key, value, STORAGE_OPTIONS);
const getStorageItem = async (key) => SInfo.getItem(key, STORAGE_OPTIONS);
const delStorageItem = async (key) => SInfo.deleteItem(key, STORAGE_OPTIONS);
const getAllStorageItems = async () => SInfo.getAllItems(STORAGE_OPTIONS);
const hasEnrolledFingerprints = SInfo.hasEnrolledFingerprints;
const isSensorAvailable = SInfo.isSensorAvailable;

const createPersistStorage = () => {
  const extractKeys = Platform.select({
    ios: (items) => items[0].map((item) => item.key),
    android: Object.keys,
  });
  const noop = () => null;
  return {
    async getItem(key, callback = noop) {
      try {
        let result = await getStorageItem(key);
        if (typeof result === 'undefined') result = null;
        callback(null, result);
        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async setItem(key, value, callback = noop) {
      try {
        await setStorageItem(key, value);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async removeItem(key, callback = noop) {
      try {
        await delStorageItem(key);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async getAllKeys(callback = noop) {
      try {
        const values = await getAllStorageItems();
        const result = extractKeys(values);

        callback(null, result);

        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    },
  };
};

export {
  createPersistStorage,
  setStorageItem,
  getStorageItem,
  delStorageItem,
  getAllStorageItems,
  hasEnrolledFingerprints,
  isSensorAvailable,
};
