import { STORAGE_NAMESPACE } from "../const";

export default class StorageAPI {
  constructor(namespace = STORAGE_NAMESPACE, storage = window.localStorage) {
    this._storage = storage;
    this._namespaceKey = namespace;
  }

  getEntries() {
    return JSON.parse(this._storage.getItem(this._namespaceKey));
  }

  setEntries(entries) {
    this._storage.setItem(this._namespaceKey, JSON.stringify(entries));
  }

  getItem(key) {
    const entries = this.getEntries();
    return entries && entries[key];
  }

  setItem(key, item) {
    this.setEntries({ ...this.getEntries(), [key]: item });
  }

  removeItem(key) {
    const entries = this.getEntries();
    delete entries[key];
    this.setEntries(entries);
  }
}
