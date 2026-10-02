const cache = {};

const TTL = 60 * 1000; 


function cacheMiddleware(req, res, next) {
    
    const key = req.originalUrl;

    const cachedData = cache[key];

    if (!cachedData) {
        res.set("X-Cache", "MISS");
        return next();
    }


    const age = Date.now() - cachedData.createdAt;

    if (age >= TTL) {

        delete cache[key];

        res.set("X-Cache", "MISS");

        return next();
    }

    res.set("X-Cache", "HIT");

    return res.json(cachedData.data);
}


function setCache(key, data) {

    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}


function invalidateCache() {

    for (const key in cache) {
        delete cache[key];
    }
}


module.exports = {
    cacheMiddleware,
    setCache,
    invalidateCache
};