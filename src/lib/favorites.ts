export function getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  
  export function toggleFavorite(imdbID: string) {
    if (typeof window === 'undefined') return;
    const current = getFavorites();
    const updated = current.includes(imdbID)
      ? current.filter(id => id !== imdbID)
      : [...current, imdbID];
    localStorage.setItem('favorites', JSON.stringify(updated));
  }
  
  export function isFavorite(imdbID: string): boolean {
    if (typeof window === 'undefined') return false;
    return getFavorites().includes(imdbID);
  }