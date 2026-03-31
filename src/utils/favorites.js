export const getFavorites = (userId) => {
  if (!userId) return [];
  
  try {
    const parsedFavorites = JSON.parse(
      localStorage.getItem(`favorites_${userId}`) || "[]",
    );
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
};

export const toggleFavoriteInStorage = (product, isCurrentlyFavorite, userId) => {
  if (!userId) return [];
  
  const savedFavorites = getFavorites(userId);
  let newFavorites;

  if (isCurrentlyFavorite) {
    newFavorites = savedFavorites.filter((fav) => fav.id !== product.id);
  } else {
    newFavorites = [...savedFavorites, product];
  }

  localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
  window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  return newFavorites;
};