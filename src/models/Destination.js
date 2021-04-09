export default class Destination {
  constructor({ name = "", description = "", pictures = [] }) {
    this.name = name;
    this.description = description;
    this.pictures = pictures.map(({ src, description }) => ({
      src,
      description
    }));
  }

  toRemoteShape() {
    return {
      name: this.name,
      description: this.description,
      pictures: this.pictures.map(({ src, description }) => ({
        src,
        description
      }))
    };
  }

  static fromRemoteShape(remoteDest) {
    return new Destination(remoteDest);
  }
}
