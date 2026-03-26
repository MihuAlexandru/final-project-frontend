export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
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
  return newFavorites;
};
