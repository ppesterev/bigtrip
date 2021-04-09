export default class DestinationCollection {
  static toRemoteShape(dest) {
    return JSON.parse(JSON.stringify(dest));
  }

  static toLocalShape(remoteDest) {
    return JSON.parse(JSON.stringify(remoteDest));
  }
}
