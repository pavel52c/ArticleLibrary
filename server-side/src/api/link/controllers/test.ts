import ControllerActions from "../services/parseSerive"

/**
 * link controller
 */
export default {
  async parseInput(ctx) {
    const { request: {header: { input }} } = ctx;
    const request = await ControllerActions.parseLinks(input) || {};
    return ctx.body = request;
  }
};
// Название дипломной
// Разработка веб приложения, сопровождения каталога литературы по специальности.
