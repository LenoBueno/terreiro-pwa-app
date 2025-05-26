import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    
    // Adiciona listener para mudanças no tamanho da tela
    window.addEventListener('resize', listener);
    
    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}
