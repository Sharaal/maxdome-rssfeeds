export default (channel, proxy) => async (ctx) => {
  const items = await proxy();
  ctx.body = await ctx.render('rssfeed.xml.twig', { channel, items });
};
