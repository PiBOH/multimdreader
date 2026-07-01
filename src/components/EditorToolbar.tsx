import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  content: string;
  onContentChange: (newContent: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  textareaRef,
  content,
  onContentChange,
}) => {
  const { t } = useTranslation();

  const insertFormat = useCallback(
    (prefix: string, suffix: string = '', defaultText: string = '', block: boolean = false) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      const selectedText = content.substring(start, end);
      const replacementText = selectedText || defaultText;

      let newText = '';
      let newCursorStart = start;
      let newCursorEnd = end;

      if (block) {
        // Ensure newlines before and after for block elements
        const before = content.substring(0, start);
        const after = content.substring(end);
        const prefixNewLine = before.length > 0 && !before.endsWith('\n') ? '\n' : '';
        const suffixNewLine = after.length > 0 && !after.startsWith('\n') ? '\n' : '';

        newText = before + prefixNewLine + prefix + replacementText + suffix + suffixNewLine + after;
        newCursorStart = start + prefixNewLine.length + prefix.length;
        newCursorEnd = newCursorStart + replacementText.length;
      } else {
        const before = content.substring(0, start);
        const after = content.substring(end);
        newText = before + prefix + replacementText + suffix + after;
        newCursorStart = start + prefix.length;
        newCursorEnd = newCursorStart + replacementText.length;
      }

      onContentChange(newText);

      // Restore focus and cursor selection after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorStart, newCursorEnd);
      }, 0);
    },
    [content, onContentChange, textareaRef]
  );

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto select-none shrink-0 text-gray-600 dark:text-gray-300">
      {/* Bold */}
      <button
        type="button"
        onClick={() => insertFormat('**', '**', 'bold text')}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.bold', 'Bold')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        </svg>
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => insertFormat('*', '*', 'italic text')}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.italic', 'Italic')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="4" x2="10" y2="4" />
          <line x1="14" y1="20" x2="5" y2="20" />
          <line x1="15" y1="4" x2="9" y2="20" />
        </svg>
      </button>

      {/* Strikethrough */}
      <button
        type="button"
        onClick={() => insertFormat('~~', '~~', 'strikethrough text')}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.strikethrough', 'Strikethrough')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4H9a3 3 0 0 0-2.83 4" />
          <path d="M14 12a4 4 0 0 1 0 8H6" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      </button>

      <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1" />

      {/* Heading 1 */}
      <button
        type="button"
        onClick={() => insertFormat('# ', '', 'Heading 1', true)}
        className="px-1.5 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-bold text-xs"
        title={t('toolbar.heading1', 'Heading 1')}
      >
        H1
      </button>

      {/* Heading 2 */}
      <button
        type="button"
        onClick={() => insertFormat('## ', '', 'Heading 2', true)}
        className="px-1.5 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-semibold text-xs"
        title={t('toolbar.heading2', 'Heading 2')}
      >
        H2
      </button>

      {/* Heading 3 */}
      <button
        type="button"
        onClick={() => insertFormat('### ', '', 'Heading 3', true)}
        className="px-1.5 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-medium text-xs"
        title={t('toolbar.heading3', 'Heading 3')}
      >
        H3
      </button>

      <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1" />

      {/* Inline Code */}
      <button
        type="button"
        onClick={() => insertFormat('`', '`', 'code')}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-mono text-xs"
        title={t('toolbar.inlineCode', 'Inline code')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </button>

      {/* Code Block */}
      <button
        type="button"
        onClick={() => insertFormat('```\n', '\n```', 'console.log("Hello world!");', true)}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors font-mono text-xs"
        title={t('toolbar.code', 'Code block')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="8 10 12 14 8 18" />
        </svg>
      </button>

      <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1" />

      {/* Link */}
      <button
        type="button"
        onClick={() => insertFormat('[', '](https://example.com)', 'link text')}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.link', 'Link')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>

      {/* Table */}
      <button
        type="button"
        onClick={() => insertFormat('| Col 1 | Col 2 |\n| --- | --- |\n| Val 1 | Val 2 |\n', '', '', true)}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.table', 'Table')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      </button>

      {/* Checkbox */}
      <button
        type="button"
        onClick={() => insertFormat('- [ ] ', '', 'Task item', true)}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.checkbox', 'Task list')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </button>

      {/* Quote */}
      <button
        type="button"
        onClick={() => insertFormat('> ', '', 'Quote text', true)}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.quote', 'Blockquote')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        </svg>
      </button>

      {/* Horizontal Rule */}
      <button
        type="button"
        onClick={() => insertFormat('---', '', '', true)}
        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title={t('toolbar.hr', 'Horizontal rule')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
};
