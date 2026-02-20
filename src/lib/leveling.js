const XP_PER_LEVEL = 100;

export function getLevelInfo(xp) {
  const safeXp = Math.max(0, Number.isFinite(xp) ? xp : 0);
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = safeXp % XP_PER_LEVEL;
  const nextLevelAt = XP_PER_LEVEL;
  const progress = currentLevelXp / nextLevelAt;

  return {
    xp: safeXp,
    level,
    currentLevelXp,
    nextLevelAt,
    progress,
  };
}

export function getBadges({ xp, answeredCount, totalQuestions, distinctTypes }) {
  const level = getLevelInfo(xp).level;
  const finished = answeredCount >= totalQuestions && totalQuestions > 0;

  return [
    {
      id: 'starter',
      icon: '✨',
      title: 'First step',
      description: 'Answer your first question.',
      unlocked: answeredCount >= 1,
    },
    {
      id: 'variety',
      icon: '🧩',
      title: 'Variety pack',
      description: 'Try multiple question types.',
      unlocked: distinctTypes >= 4,
    },
    {
      id: 'level2',
      icon: '🆙',
      title: 'Level up',
      description: 'Reach level 2.',
      unlocked: level >= 2,
    },
    {
      id: 'finisher',
      icon: '🏁',
      title: 'Finisher',
      description: 'Complete the survey.',
      unlocked: finished,
    },
  ];
}
