import ParseActions from "./../services/parseArticle";

export default {
  async parseArticle(ctx) {
    const {
      request: {
        header: { url },
      },
    } = ctx;

    const request = (await ParseActions.parseArticle({ url })) || {};
    return (ctx.body = request);
  },
};
