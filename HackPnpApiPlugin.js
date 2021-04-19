const prevVirtuals = {};
function dedupeSameCacheVirtual(resolved) {
  const matched = resolved.match(/\$\$virtual\/.*?\/cache\/(.*?\.zip)/i);
  if (matched && matched[1]) {
    const cacheKey = matched[1];
    if (prevVirtuals[cacheKey]) {
      const deduped = prevVirtuals[cacheKey];
      return deduped;
    }
    prevVirtuals[cacheKey] = resolved;
  }
  return resolved;
}

const pnpApi = require('pnpapi');
const origResolveToUnqualified = pnpApi.resolveToUnqualified;
pnpApi.resolveToUnqualified = (...args) => {
  const result = origResolveToUnqualified(...args);
  const deduped = dedupeSameCacheVirtual(result);
  // if (deduped !== result) {
  //   console.log('found duplicate and deduped', result, deduped);
  // }
  return deduped;
}
class HackAtPnpApiPlugin {
  apply(args) {
    args.pnpApi = pnpApi;
  }
}

exports.HackAtPnpApiPlugin = HackAtPnpApiPlugin;