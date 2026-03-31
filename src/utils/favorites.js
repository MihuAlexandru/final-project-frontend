export const getFavorites = () => {
  try {
    const parsedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
};

export const toggleFavoriteInStorage = (productId, isCurrentlyFavorite) => {
  const savedFavorites = getFavorites();
  let newFavorites;

  if (isCurrentlyFavorite) {
    newFavorites = savedFavorites.filter((id) => id !== productId);
  } else {
    newFavorites = [...savedFavorites, productId];
  }

  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  return newFavorites;
};
