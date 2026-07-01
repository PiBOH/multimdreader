import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface DocumentStatsProps {
  content: string;
}

export const DocumentStats: React.FC<DocumentStatsProps> = ({ content }) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    if (!content || !content.trim()) {
      return { words: 0, chars: 0, lines: 0, readingTime: 0 };
    }

    const chars = content.length;
    const lines = content.split('\n').length;
    const wordsArray = content.trim().split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const readingTime = Math.ceil(words / 200); // Average 200 words per minute

    return { words, chars, lines, readingTime };
  }, [content]);

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium select-none bg-gray-100/80 dark:bg-gray-800/80 px-2.5 py-1 rounded-md border border-gray-200/60 dark:border-gray-700/60">
      <span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold">{stats.words}</strong> {t('stats.words', 'words')}
      </span>
      <span className="text-gray-300 dark:text-gray-600">•</span>
      <span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold">{stats.chars}</strong> {t('stats.characters', 'characters')}
      </span>
      <span className="text-gray-300 dark:text-gray-600">•</span>
      <span>
        <strong className="text-gray-700 dark:text-gray-300 font-semibold">{stats.lines}</strong> {t('stats.lines', 'lines')}
      </span>
      {stats.words > 0 && (
        <>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-teal-600 dark:text-teal-400">
            ~{stats.readingTime} {t('stats.readingTime', 'min read')}
          </span>
        </>
      )}
    </div>
  );
};
