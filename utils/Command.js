/* eslint-disable no-unused-vars */
/* eslint-disable require-await */

export default class Command {
  constructor() {}
  async run(client, ctx, args) {
    throw new Error(`Error`);
  }
}
