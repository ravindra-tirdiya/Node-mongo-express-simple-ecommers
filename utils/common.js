const formatUrl = (url) => {
  return url
    .trim()
    .toLowerCase()
    .replace(/[-_@]+/g, "_")
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
};

module.exports = { formatUrl };
