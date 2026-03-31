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

export const toggleFavoriteInStorage = (product, isCurrentlyFavorite) => {
  const savedFavorites = getFavorites();
  let newFavorites;

  if (isCurrentlyFavorite) {
    newFavorites = savedFavorites.filter((fav) => fav.id !== product.id);
  } else {
    newFavorites = [...savedFavorites, product];
  }

  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  return newFavorites;
};
