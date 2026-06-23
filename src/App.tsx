import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface RecentFile {
  name: string;
  content: string;
  lastOpened: number;
  size: number;
}

const SUPPORTED_EXTENSIONS = ['.md', '.markdown', '.mdown', '.mkd', '.mkdn', '.mdwn', '.mdtxt', '.mdtext', '.txt'];

function isSupportedFile(name: string): boolean {
  return SUPPORTED_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext));
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('multimdreader-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
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

  const MAX_RECENT_CONTENT_SIZE = 100_000;

  const openFile = useCallback((file: File) => {
    if (!isSupportedFile(file.name)) return;
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
        return [{ name: file.name, content: storedContent, lastOpened: Date.now(), size: file.size }, ...filtered].slice(0, 20);
      });
    };
    reader.readAsText(file);
  }, []);

  const closeFile = useCallback(() => {
    setCurrentContent('');
    setCurrentFileName('');
    setCurrentFileSize(0);
    setCurrentFileModified(0);
  }, []);

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
    setIsDragging(false);
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

  const languages = [
    { code: 'it', label: t('language.it'), flag: '🇮🇹' },
    { code: 'en-GB', label: t('language.enGB'), flag: '🇬🇧' },
    { code: 'en-US', label: t('language.enUS'), flag: '🇺🇸' },
    { code: 'es', label: t('language.es'), flag: '🇪🇸' },
    { code: 'de', label: t('language.de'), flag: '🇩🇪' },
    { code: 'fr', label: t('language.fr'), flag: '🇫🇷' },
  ];

  return (
    <div
      className="h-screen flex flex-col"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-3 shrink-0 z-20">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
            MultiMDReader
          </h1>
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          title={t('header.toggleSidebar')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Open File */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">{t('header.openFile')}</span>
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

        {/* Language Selector */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="hidden md:inline">
              {languages.find(l => l.code === i18n.language)?.flag} {' '}
              {languages.find(l => l.code === i18n.language)?.label || 'English (US)'}
            </span>
          </button>
          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                    i18n.language === lang.code ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          title={t('header.theme')}
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* About */}
        <button
          onClick={() => setAboutOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          title={t('header.about')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0 overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {t('sidebar.recentFiles')}
              </h2>
              {recentFiles.length > 0 && (
                <button
                  onClick={clearRecentFiles}
                  className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  {t('sidebar.clearAll')}
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {recentFiles.length === 0 ? (
                <div className="p-4 text-sm text-gray-400 dark:text-gray-500 text-center">
                  {t('sidebar.noRecentFiles')}
                </div>
              ) : (
                recentFiles.map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => openRecentFile(file)}
                    className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 ${
                      file.name === currentFileName ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate font-medium">
                        {file.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 ml-6">
                      {formatFileSize(file.size)} · {formatDate(file.lastOpened)}
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>
        )}

        {/* Main Area */}
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 relative">
          {isDragging && (
            <div className="absolute inset-0 z-10 bg-blue-500/10 dark:bg-blue-500/20 border-4 border-dashed border-blue-500 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
                <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('welcome.dropHere')}</p>
              </div>
            </div>
          )}

          {currentContent ? (
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* File info bar */}
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('reader.fileName')}: <strong className="text-gray-700 dark:text-gray-300">{currentFileName}</strong>
                </span>
                <span>{t('reader.fileSize')}: {formatFileSize(currentFileSize)}</span>
                <span>{t('reader.lastModified')}: {formatDate(currentFileModified)}</span>
                <div className="flex-1" />
                <button
                  onClick={closeFile}
                  className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Close file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Markdown Content */}
              <article className="prose prose-gray dark:prose-invert max-w-none
                prose-headings:scroll-mt-4
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-lg
                prose-table:border
                prose-th:border prose-th:px-3 prose-th:py-2
                prose-td:border prose-td:px-3 prose-td:py-2
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {currentContent}
                </ReactMarkdown>
              </article>
            </div>
          ) : (
            <WelcomeScreen onOpenFile={() => fileInputRef.current?.click()} />
          )}
        </main>
      </div>

      {/* About Dialog */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setAboutOpen(false)}>
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                M
              </div>
              <h2 className="text-2xl font-bold">{t('app.name')}</h2>
              <p className="text-blue-100 mt-1">{t('app.tagline')}</p>
            </div>
            <div className="px-6 py-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t('about.version')}</span>
                <span className="font-medium text-gray-900 dark:text-white">0.0.2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t('about.author')}</span>
                <a href="https://piboh.github.io/" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  PiBOH
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t('about.website')}</span>
                <a href="https://piboh.github.io/" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  piboh.github.io
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t('about.repository')}</span>
                <a href="https://github.com/PiBOH/multimdreader" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  GitHub
                </a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                {t('about.description')}
              </p>
            </div>
            <div className="px-6 pb-5">
              <button
                onClick={() => setAboutOpen(false)}
                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium text-sm"
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

function WelcomeScreen({ onOpenFile }: { onOpenFile: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-5xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/25">
          M
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('welcome.title')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          {t('welcome.subtitle')}
        </p>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group"
          onClick={onOpenFile}
        >
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium">
            {t('welcome.dropHere')}
          </p>
          <p className="text-gray-400 dark:text-gray-500 mb-4">
            {t('welcome.or')}
          </p>
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('welcome.clickToOpen')}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          {t('welcome.supportedFormats')}
        </p>
      </div>
    </div>
  );
}
