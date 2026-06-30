import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { invoke } from '@tauri-apps/api/core';
import { getCurrentWebview } from '@tauri-apps/api/webview';
import { listen } from '@tauri-apps/api/event';

// ─── Constants ────────────────────────────────────────────────────
const APP_VERSION = '0.0.8_BETA4';
const APP_AUTHOR = 'PiBOH';
const APP_WEBSITE = 'https://piboh.github.io/';
const APP_REPO = 'https://github.com/PiBOH/multimdreader';

const SUPPORTED_EXTENSIONS = [
  '.md', '.markdown', '.mdown', '.mkd', '.mkdn', '.mdwn', '.mdtxt', '.mdtext', '.txt'
];

const MAX_RECENT_CONTENT_SIZE = 100_000;
const MAX_RECENT_FILES = 20;

// ─── Types ────────────────────────────────────────────────────────
interface RecentFile {
  name: string;
  content: string;
  lastOpened: number;
  size: number;
}

// ─── Utility Functions ────────────────────────────────────────────
function isSupportedFile(name: string): boolean {
  return SUPPORTED_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext));
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(timestamp: number, locale: string): string {
  if (!timestamp) return '—';
  try {
    return new Date(timestamp).toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return new Date(timestamp).toLocaleString();
  }
}

function getLocaleForDateFormat(i18nLang: string): string {
  const map: Record<string, string> = {
    'it': 'it-IT',
    'en-GB': 'en-GB',
    'en-US': 'en-US',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
  };
  return map[i18nLang] || 'en-US';
}

// ─── Icons (inline SVG components) ───────────────────────────────
function IconOpenFile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

function IconSidebar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 112-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Code Block Component with Copy Button ────────────────────────
function CodeBlock({ children, className, ...props }: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = useCallback(() => {
    const codeElement = codeRef.current;
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || '').then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Fallback for older browsers
        const range = document.createRange();
        range.selectNodeContents(codeElement);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, []);

  return (
    <div className="code-block-wrapper relative">
      <button
        onClick={handleCopy}
        className="copy-btn absolute top-2 right-2 p-1.5 rounded-md bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors z-10"
        title={t('reader.copyCode')}
      >
        {copied ? <IconCheck /> : <IconCopy />}
      </button>
      <code ref={codeRef} className={className} {...props}>
        {children}
      </code>
    </div>
  );
}

// ─── Main App Component ──────────────────────────────────────────
export default function App() {
  const { t, i18n } = useTranslation();
  const [currentContent, setCurrentContent] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [currentFileSize, setCurrentFileSize] = useState<number>(0);
  const [currentFileModified, setCurrentFileModified] = useState<number>(0);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>(() => {
    try {
      const stored = localStorage.getItem('multimdreader-recent-files');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('multimdreader-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [fileReadError, setFileReadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top when content changes
  useEffect(() => {
    if (currentContent && mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [currentContent, currentFileName]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('multimdreader-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist recent files
  useEffect(() => {
    localStorage.setItem('multimdreader-recent-files', JSON.stringify(recentFiles));
  }, [recentFiles]);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      // Ctrl/Cmd + O: Open file
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        fileInputRef.current?.click();
      }
      // Ctrl/Cmd + B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
      // Ctrl/Cmd + D: Toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setDarkMode(prev => !prev);
      }
      // Escape: Close about dialog
      if (e.key === 'Escape') {
        setAboutOpen(false);
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Open file via Tauri backend (CLI args, macOS events, Tauri drag & drop)
  const openTauriPath = useCallback(async (path: string) => {
    if (!isSupportedFile(path)) {
      setFileReadError(t('errors.unsupportedFile'));
      setTimeout(() => setFileReadError(null), 3000);
      return;
    }
    setFileReadError(null);
    try {
      const data = await invoke<{ name: string; content: string; size: number; modified: number }>('read_file_data', { path });
      setCurrentContent(data.content);
      setCurrentFileName(data.name);
      setCurrentFileSize(data.size);
      setCurrentFileModified(data.modified);
      setRecentFiles(prev => {
        const filtered = prev.filter(f => f.name !== data.name);
        const storedContent = data.content.length > MAX_RECENT_CONTENT_SIZE
          ? data.content.slice(0, MAX_RECENT_CONTENT_SIZE) + '\n\n... [content truncated for storage]'
          : data.content;
        return [{ name: data.name, content: storedContent, lastOpened: Date.now(), size: data.size }, ...filtered].slice(0, MAX_RECENT_FILES);
      });
    } catch (err) {
      console.error(err);
      setFileReadError(t('errors.fileReadError'));
      setTimeout(() => setFileReadError(null), 3000);
    }
  }, [t]);

  // Tauri Setup Hook
  useEffect(() => {
    let unlistenDragDrop: (() => void) | undefined;
    let unlistenOpened: (() => void) | undefined;

    async function setupTauri() {
      try {
        if (!('__TAURI_INTERNALS__' in window)) return;

        // 1. Check for files passed via CLI args or macOS startup
        const openedFiles = await invoke<string[]>('get_opened_files');
        if (openedFiles && openedFiles.length > 0) {
          const targetPath = openedFiles.find(p => isSupportedFile(p)) || openedFiles[0];
          if (targetPath) {
            openTauriPath(targetPath);
          }
        }

        // 2. Listen for runtime opened files (macOS open event)
        unlistenOpened = await listen<string[]>('opened-files', (event) => {
          const paths = event.payload;
          if (paths && paths.length > 0) {
            const targetPath = paths.find(p => isSupportedFile(p)) || paths[0];
            if (targetPath) {
              openTauriPath(targetPath);
            }
          }
        });

        // 3. Listen for Tauri Drag & Drop events
        unlistenDragDrop = await getCurrentWebview().onDragDropEvent((event) => {
          if (event.payload.type === 'over') {
            setIsDragging(true);
          } else if (event.payload.type === 'drop') {
            setIsDragging(false);
            const paths = event.payload.paths;
            if (paths && paths.length > 0) {
              const targetPath = paths.find(p => isSupportedFile(p)) || paths[0];
              if (targetPath) {
                openTauriPath(targetPath);
              }
            }
          } else {
            setIsDragging(false);
          }
        });
      } catch (err) {
        console.error('Tauri setup error:', err);
      }
    }

    setupTauri();

    return () => {
      if (unlistenDragDrop) unlistenDragDrop();
      if (unlistenOpened) unlistenOpened();
    };
  }, [openTauriPath]);

  const openFile = useCallback((file: File) => {
    if (!isSupportedFile(file.name)) {
      setFileReadError(t('errors.unsupportedFile'));
      setTimeout(() => setFileReadError(null), 3000);
      return;
    }
    setFileReadError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCurrentContent(content);
      setCurrentFileName(file.name);
      setCurrentFileSize(file.size);
      setCurrentFileModified(file.lastModified);
      setRecentFiles(prev => {
        const filtered = prev.filter(f => f.name !== file.name);
        const storedContent = content.length > MAX_RECENT_CONTENT_SIZE
          ? content.slice(0, MAX_RECENT_CONTENT_SIZE) + '\n\n... [content truncated for storage]'
          : content;
        return [{ name: file.name, content: storedContent, lastOpened: Date.now(), size: file.size }, ...filtered].slice(0, MAX_RECENT_FILES);
      });
    };
    // BUG FIX: Added onerror handler for FileReader
    reader.onerror = () => {
      setFileReadError(t('errors.fileReadError'));
      setTimeout(() => setFileReadError(null), 3000);
    };
    reader.readAsText(file);
  }, [t]);

  const closeFile = useCallback(() => {
    setCurrentContent('');
    setCurrentFileName('');
    setCurrentFileSize(0);
    setCurrentFileModified(0);
  }, []);

  // BUG FIX: Properly typed as React.ChangeEvent<HTMLInputElement>
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) openFile(file);
    e.target.value = '';
  }, [openFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isSupportedFile(file.name)) {
      openFile(file);
    }
  }, [openFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Only set dragging false if we're leaving the main area
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragging(false);
    }
  }, []);

  const openRecentFile = useCallback((file: RecentFile) => {
    setCurrentContent(file.content);
    setCurrentFileName(file.name);
    setCurrentFileSize(file.size);
    setCurrentFileModified(file.lastOpened);
  }, []);

  const clearRecentFiles = useCallback(() => {
    setRecentFiles([]);
  }, []);

  const removeRecentFile = useCallback((fileName: string) => {
    setRecentFiles(prev => prev.filter(f => f.name !== fileName));
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  }, [i18n]);

  const languages = [
    { code: 'it', label: t('language.it'), flag: '🇮🇹' },
    { code: 'en-GB', label: t('language.enGB'), flag: '🇬🇧' },
    { code: 'en-US', label: t('language.enUS'), flag: '🇺🇸' },
    { code: 'es', label: t('language.es'), flag: '🇪🇸' },
    { code: 'de', label: t('language.de'), flag: '🇩🇪' },
    { code: 'fr', label: t('language.fr'), flag: '🇫🇷' },
  ];

  const localeForDates = getLocaleForDateFormat(i18n.language);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            M
          </div>
          <span className="font-semibold text-lg hidden sm:inline">MultiMDReader</span>
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={t('header.toggleSidebar') + ' (Ctrl+B)'}
        >
          <IconSidebar />
        </button>

        {/* Open File */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={t('header.openFile') + ' (Ctrl+O)'}
        >
          <IconOpenFile />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_EXTENSIONS.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Error notification */}
        {fileReadError && (
          <div className="px-3 py-1.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm animate-pulse">
            {fileReadError}
          </div>
        )}

        {/* Language Selector */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setLangDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <IconGlobe />
            <span className="max-w-[120px] truncate">{languages.find(l => l.code === i18n.language)?.label || 'English (US)'}</span>
            <IconChevronDown />
          </button>
          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px] py-1">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm ${
                    i18n.language === lang.code ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : ''
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={t('header.theme') + ' (Ctrl+D)'}
        >
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>

        {/* About */}
        <button
          onClick={() => setAboutOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={t('header.about')}
        >
          <IconInfo />
        </button>
      </header>

      {/* ─── Main Content ───────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t('sidebar.recentFiles')}
              </h2>
              {recentFiles.length > 0 && (
                <button
                  onClick={clearRecentFiles}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-red-500"
                  title={t('sidebar.clearAll')}
                >
                  <IconTrash />
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {recentFiles.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                  {t('sidebar.noRecentFiles')}
                </div>
              ) : (
                <ul className="py-1">
                  {recentFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`} className="group">
                      <button
                        onClick={() => openRecentFile(file)}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm ${
                          currentFileName === file.name ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        <IconFile />
                        <span className="truncate flex-1">{file.name}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeRecentFile(file.name); }}
                          className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-gray-400 hover:text-red-500"
                          title="Remove"
                        >
                          <IconClose />
                        </button>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Shortcuts hint */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
              <div className="font-semibold mb-1">{t('shortcuts.title')}</div>
              <div className="space-y-0.5">
                <div><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Ctrl+O</kbd> {t('shortcuts.openFile')}</div>
                <div><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Ctrl+B</kbd> {t('shortcuts.toggleSidebar')}</div>
                <div><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Ctrl+D</kbd> {t('shortcuts.toggleDark')}</div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Area */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-40 bg-blue-500/10 dark:bg-blue-400/10 border-2 border-dashed border-blue-500 dark:border-blue-400 rounded-lg m-2 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <IconOpenFile />
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                {t('welcome.dropHere')}
              </p>
            </div>
          )}

          {currentContent ? (
            <div className="flex flex-col h-full">
              {/* File info bar */}
              <div className="flex items-center gap-4 px-6 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 shrink-0 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <IconFile />
                  <span>{t('reader.fileName')}: <strong className="text-gray-700 dark:text-gray-300">{currentFileName}</strong></span>
                </div>
                <span>{t('reader.fileSize')}: {formatFileSize(currentFileSize)}</span>
                <span>{t('reader.lastModified')}: {formatDate(currentFileModified, localeForDates)}</span>
                <div className="flex-1" />
                <button
                  onClick={closeFile}
                  className="px-3 py-1 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  title={t('reader.closeFile')}
                >
                  {t('reader.closeFile')}
                </button>
              </div>

              {/* Markdown Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-4 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:p-0">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code({ className, children, ...props }) {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono" {...props}>
                              {children}
                            </code>
                          );
                        }
                        return (
                          <CodeBlock className={className} {...props}>
                            {children}
                          </CodeBlock>
                        );
                      },
                    }}
                  >
                    {currentContent}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          ) : (
            <WelcomeScreen onOpenFile={() => fileInputRef.current?.click()} />
          )}
        </main>
      </div>

      {/* ─── About Dialog ───────────────────────────────────── */}
      {aboutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold mx-auto mb-3 shadow-lg">
                M
              </div>
              <h2 className="text-2xl font-bold">{t('app.name')}</h2>
              <p className="text-white/80 mt-1">{t('app.tagline')}</p>
            </div>

            {/* Info */}
            <div className="px-8 py-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">{t('about.version')}</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{APP_VERSION}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">{t('about.author')}</span>
                <a
                  href={APP_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {APP_AUTHOR}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">{t('about.repository')}</span>
                <a
                  href={APP_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  GitHub
                </a>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.description')}
                </p>
              </div>
            </div>

            {/* Close button */}
            <div className="px-8 pb-6">
              <button
                onClick={() => setAboutOpen(false)}
                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                {t('about.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Welcome Screen Component ─────────────────────────────────────
function WelcomeScreen({ onOpenFile }: { onOpenFile: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white mx-auto mb-6 shadow-xl">
          M
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('welcome.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          {t('welcome.subtitle')}
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onOpenFile}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <IconOpenFile />
            {t('welcome.clickToOpen')}
          </button>
          <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm">{t('welcome.or')}</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-600" />
          </div>
          <p className="text-gray-400 dark:text-gray-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {t('welcome.dropHere')}
          </p>
        </div>
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
          {t('welcome.supportedFormats')}
        </p>
      </div>
    </div>
  );
}
