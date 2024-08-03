// utils/healthCheck.js
import { useCharacter } from '../CharacterContext';

export function useHealthCheck() {
  const { character, setCharacter, lastInn, setCurrentRegion, setCurrentArea, setCurrentLocalPosition, setCurrentActivity } = useCharacter();

  const checkHealth = () => {
    if (character.currentHp <= 0) {
      setCharacter(prev => ({
        ...prev,
        currentHp: prev.stats.maxHp,
        currentEn: prev.stats.maxEn,
        currentMag: prev.stats.maxMag,
      }));
      const { region, area, localPosition, activity } = lastInn;
      setCurrentRegion(region);
      setCurrentArea(area);
      setCurrentLocalPosition(localPosition);
      setCurrentActivity(activity);
      return true;
    }
    return false;
  };

  return { checkHealth };
}