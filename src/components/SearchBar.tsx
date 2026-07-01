import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  content,
  textareaRef,
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search bar opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery('');
      setCurrentIndex(0);
    }
  }, [isOpen]);

  // Find all match indices
  const matches = useMemo(() => {
    if (!query.trim() || !content) return [];
    const results: number[] = [];
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let idx = lowerContent.indexOf(lowerQuery);
    while (idx !== -1) {
      results.push(idx);
      idx = lowerContent.indexOf(lowerQuery, idx + lowerQuery.length);
    }
    return results;
  }, [content, query]);

  // Reset index when query changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [query, matches.length]);

  // Highlight and scroll to match in textarea
  const highlightMatch = useCallback(
    (index: number) => {
      if (matches.length === 0 || !textareaRef?.current) return;
      const matchStart = matches[index];
      const matchEnd = matchStart + query.length;
      const textarea = textareaRef.current;
      
      textarea.focus();
      textarea.setSelectionRange(matchStart, matchEnd);
      
      // Calculate scroll position to keep match in view
      const textBefore = content.substring(0, matchStart);
      const lineNumber = textBefore.split('\n').length;
      const totalLines = content.split('\n').length || 1;
      const ratio = lineNumber / totalLines;
      
      textarea.scrollTop = ratio * (textarea.scrollHeight - textarea.clientHeight) - 50;
    },
    [content, matches, query.length, textareaRef]
  );

  // Trigger highlight whenever index changes
  useEffect(() => {
    if (isOpen && matches.length > 0) {
      highlightMatch(currentIndex);
    }
  }, [currentIndex, highlightMatch, isOpen, matches.length]);

  const handleNext = () => {
    if (matches.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % matches.length);
  };

  const handlePrev = () => {
    if (matches.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md text-sm transition-all z-20 shrink-0">
      <div className="relative flex items-center flex-1 max-w-sm">
        <svg className="w-4 h-4 text-gray-400 absolute left-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('search.placeholder', 'Search in document...')}
          className="w-full pl-9 pr-3 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {query.trim() && (
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 px-2 min-w-[5rem] text-center">
          {matches.length > 0
            ? `${currentIndex + 1} ${t('search.of', 'of')} ${matches.length}`
            : t('search.noResults', 'No results')}
        </span>
      )}

      <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={matches.length === 0}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 disabled:opacity-40 transition-colors"
          title={t('search.previous', 'Previous match') + ' (Shift+Enter)'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={matches.length === 0}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 disabled:opacity-40 transition-colors"
          title={t('search.next', 'Next match') + ' (Enter)'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors ml-1"
        title={t('search.close', 'Close search') + ' (Esc)'}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};
