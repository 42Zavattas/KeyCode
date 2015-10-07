export default {

  isClient: () => {
    return process.env.BROWSER === true;
  },

  isServer: () => {
    return process.env.BROWSER !== true;
  },

  get: () => {
    return this.isClient() ? 'client': 'server';
  }

};
