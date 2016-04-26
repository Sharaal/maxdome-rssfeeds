export default (configs) => async (ctx) => {
  ctx.body = await ctx.render('index.html.twig', { configs });
};
