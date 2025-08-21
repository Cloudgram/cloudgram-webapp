import type { Icons } from '../assets/icons';

// 🎨 Дизайнерские форматы
const EXTENSIONS_FIGMA = ['fig'] as const;

const EXTENSIONS_PHOTOSHOP = ['psd', 'psb'] as const;

const EXTENSIONS_ILLUSTRATOR = ['ai'] as const;

const EXTENSIONS_INDESIGN = ['indd', 'idml', 'indt', 'inx'] as const;

const EXTENSIONS_AFTEREFFECTS = ['aep', 'aepx'] as const;

const EXTENSIONS_SKETCH = ['sketch'] as const;

const EXTENSIONS_PDF = ['pdf'] as const;

// 📄 Документы Word
const EXTENSIONS_WORD = [
    'doc',
    'docx',
    'docm',
    'dot',
    'dotx',
    'dotm',
    'odt',
    'ott',
    'rtf',
    'wps',
    'pages',
] as const;

// 📊 Электронные таблицы Excel
const EXTENSIONS_EXCEL = [
    'xls',
    'xlsx',
    'xlsm',
    'xlsb',
    'xlt',
    'xltx',
    'xltm',
    'ods',
    'ots',
    'csv',
    'tsv',
    'numbers',
] as const;

// 📋 Другие офисные документы
const EXTENSIONS_OFFICE = [
    // LibreOffice Writer
    'odt',
    'ott',
    'oth',
    'odm',

    // LibreOffice Calc
    'ods',
    'ots',

    // LibreOffice Impress
    'odp',
    'otp',

    // LibreOffice Draw
    'odg',
    'otg',

    // LibreOffice Math
    'odf',
    'odb',

    // WordPerfect
    'wpd',
    'wp',
    'wp5',
    'wp6',

    // Другие форматы документов
    'pages', // Apple Pages
    'numbers', // Apple Numbers
    'key', // Apple Keynote (уже есть в презентациях)
    'wps', // Kingsoft Writer
    'et', // Kingsoft Spreadsheets
    'dps', // Kingsoft Presentation
    'epub', // E-book
    'mobi', // E-book
    'azw', // Amazon e-book
    'azw3', // Amazon e-book
    'fb2', // FictionBook
    'lit', // Microsoft Reader
    'prc', // Palm Reader
    'djvu', // DjVu
    'djv', // DjVu
    'xps', // XML Paper Specification
] as const;

const EXTENSIONS_TEXT = ['txt', 'log', 'md', 'markdown', 'mdx', 'nfo', 'asc', 'rtf'] as const;

const EXTENSIONS_EMAIL = ['eml', 'msg', 'mbox', 'pst'] as const;

const EXTENSIONS_CALENDAR = ['ics', 'ical', 'ifb'] as const;

const EXTENSIONS_HTML = ['html', 'htm', 'xhtml'] as const;

const EXTENSIONS_IMAGE = [
    'svg',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'bmp',
    'webp',
    'tiff',
    'ico',
    'heic',
    'avif',
    'jfif',
    'pjpeg',
    'pjp',
    'raw',
    'cr2',
    'nef',
    'orf',
    'sr2',
] as const;

const EXTENSIONS_AUDIO = [
    'mp3',
    'wav',
    'flac',
    'aac',
    'ogg',
    'oga',
    'm4a',
    'wma',
    'aiff',
    'ape',
    'opus',
    'amr',
] as const;

const EXTENSIONS_VIDEO = [
    'mp4',
    'mov',
    'avi',
    'wmv',
    'flv',
    'webm',
    'mkv',
    'm4v',
    '3gp',
    'mpeg',
    'mpg',
    'ogv',
    'mts',
    'm2ts',
    'ts',
] as const;

const EXTENSIONS_POWERPOINT = [
    'ppt',
    'pptx',
    'pptm',
    'pot',
    'potx',
    'potm',
    'pps',
    'ppsx',
    'ppsm',
    'odp',
    'key',
] as const;

const EXTENSIONS_3D = [
    'obj',
    'fbx',
    'blend',
    'stl',
    'dae',
    '3ds',
    'gltf',
    'glb',
    'ply',
    'usd',
    'usdz',
    'step',
    'iges',
] as const;

const EXTENSIONS_DATABASE = [
    'db',
    'sqlite',
    'sqlite3',
    'accdb',
    'mdb',
    'sql',
    'dbf',
    'frm',
    'myd',
    'myi',
    'ndf',
    'ldf',
] as const;

const EXTENSIONS_SECURITY = [
    'pem',
    'key',
    'crt',
    'cer',
    'pfx',
    'p12',
    'asc',
    'gpg',
    'sig',
    'der',
] as const;

const EXTENSIONS_ARCHIVE = [
    'zip',
    '7z',
    'rar',
    'tar',
    'gz',
    'bz2',
    'xz',
    'lz',
    'lzma',
    'z',
    'iso',
    'cab',
    'ar',
    'cpio',
    'rpm',
    'deb',
    'dmg',
    'pkg',
    'tgz',
    'tbz2',
] as const;

const EXTENSIONS_TEXT_CONFIG = [
    'conf',
    'cfg',
    'ini',
    'env',
    'properties',
    'toml',
    'yaml',
    'yml',

    'txt',
    'log',
    'text',
    'md',
    'markdown',
    'mdx',
    'rst',
    'adoc',
    'asc',
    'csv',
    'tsv',
] as const;

const EXTENSIONS_PROGRAMMING = [
    // Web
    'js',
    'jsx',
    'ts',
    'tsx',
    'html',
    'htm',
    'css',
    'scss',
    'sass',
    'less',
    'styl',
    'vue',
    'astro',
    'svelte',

    // Python & Jupyter
    'py',
    'pyc',
    'pyo',
    'ipynb',

    // Java
    'java',
    'class',
    'jar',
    'war',

    // C/C++
    'c',
    'h',
    'cpp',
    'hpp',
    'cc',
    'cxx',
    'hxx',
    'hh',

    // C#
    'cs',
    'csx',

    // PHP
    'php',
    'phtml',
    'php3',
    'php4',
    'php5',
    'php7',
    'phps',
    'php8',

    // Ruby
    'rb',
    'erb',
    'rake',
    'gemspec',

    // Go, Rust, Swift, Kotlin, Dart
    'go',
    'mod',
    'sum',
    'rs',
    'swift',
    'kt',
    'kts',
    'dart',

    // Shell & scripting
    'sh',
    'bash',
    'zsh',
    'bat',
    'cmd',
    'fish',

    // Perl
    'pl',
    'pm',
    't',
    'pod',

    // R
    'r',
    'rmd',
    'rproj',

    // Lua & Haskell
    'lua',
    'hs',
    'lhs',
    'cabal',

    // Scala
    'scala',
    'sc',
    'sbt',

    // SQL & config
    'sql',
    'toml',
    'yaml',
    'yml',
    'json',
    'ini',
    'env',
    'conf',
    'cfg',
    'properties',

    // Markdown & text
    'md',
    'markdown',
    'mdx',
    'log',

    // XML
    'xml',
    'xsl',
    'xsd',
    'xslt',

    // Others
    'coffee',
    'litcoffee',
    'elm',
    'clj',
    'cljs',
    'edn',
    'groovy',
    'jl',
    'mat',
    'm',
    'v',
    'sv',
    'svh',
    'vhd',
    'vhdl',
    'nix',
    'tex',
] as const;

export const figmaExtensions = [...EXTENSIONS_FIGMA];
export const photoshopExtensions = [...EXTENSIONS_PHOTOSHOP];
export const illustratorExtensions = [...EXTENSIONS_ILLUSTRATOR];
export const indesignExtensions = [...EXTENSIONS_INDESIGN];
export const aftereffectsExtensions = [...EXTENSIONS_AFTEREFFECTS];
export const sketchExtensions = [...EXTENSIONS_SKETCH];
export const wordExtensions = [...EXTENSIONS_WORD];
export const excelExtensions = [...EXTENSIONS_EXCEL];
export const officeExtensions = [...EXTENSIONS_OFFICE];
export const imageExtensions = [...EXTENSIONS_IMAGE];
export const audioExtensions = [...EXTENSIONS_AUDIO];
export const videoExtensions = [...EXTENSIONS_VIDEO];
export const powerpointExtensions = [...EXTENSIONS_POWERPOINT];
export const pdfExtensions = [...EXTENSIONS_PDF];
export const textExtensions = [...EXTENSIONS_TEXT];
export const emailExtensions = [...EXTENSIONS_EMAIL];
export const threeDExtensions = [...EXTENSIONS_3D];
export const calendarExtensions = [...EXTENSIONS_CALENDAR];
export const htmlExtensions = [...EXTENSIONS_HTML];
export const databaseExtensions = [...EXTENSIONS_DATABASE];
export const securityExtensions = [...EXTENSIONS_SECURITY];
export const archiveExtensions = [...EXTENSIONS_ARCHIVE];
export const textConfigExtensions = [...EXTENSIONS_TEXT_CONFIG];
export const programmingExtensions = [...EXTENSIONS_PROGRAMMING];

const extensionToIconMap: Record<string, keyof typeof Icons> = {
    ...Object.fromEntries(figmaExtensions.map(e => [e, 'FigmaFileIcon'])),
    ...Object.fromEntries(photoshopExtensions.map(e => [e, 'PhotoshopFileIcon'])),
    ...Object.fromEntries(illustratorExtensions.map(e => [e, 'IllustrationFileIcon'])),
    ...Object.fromEntries(indesignExtensions.map(e => [e, 'InDessignFileIcon'])),
    ...Object.fromEntries(aftereffectsExtensions.map(e => [e, 'AfterEffectsFileIcon'])),
    ...Object.fromEntries(sketchExtensions.map(e => [e, 'SketchFileIcon'])),
    ...Object.fromEntries(wordExtensions.map(e => [e, 'TxtFileIcon'])),
    ...Object.fromEntries(excelExtensions.map(e => [e, 'XlsFileIcon'])),
    ...Object.fromEntries(officeExtensions.map(e => [e, 'TxtFileIcon'])),
    ...Object.fromEntries(imageExtensions.map(e => [e, 'ImageFileIcon'])),
    ...Object.fromEntries(audioExtensions.map(e => [e, 'AudioFileIcon'])),
    ...Object.fromEntries(videoExtensions.map(e => [e, 'VideoFileIcon'])),
    ...Object.fromEntries(powerpointExtensions.map(e => [e, 'PresentationFileIcon'])),
    ...Object.fromEntries(pdfExtensions.map(e => [e, 'PdfFileIcon'])),
    ...Object.fromEntries(textExtensions.map(e => [e, 'TxtFileIcon'])),
    ...Object.fromEntries(emailExtensions.map(e => [e, 'DefaultFileIcon'])),
    ...Object.fromEntries(threeDExtensions.map(e => [e, 'ThreeDFileIcon'])),
    ...Object.fromEntries(calendarExtensions.map(e => [e, 'CalendarFileIcon'])),
    ...Object.fromEntries(htmlExtensions.map(e => [e, 'HtmlFileIcon'])),
    ...Object.fromEntries(databaseExtensions.map(e => [e, 'DataBaseFileIcon'])),
    ...Object.fromEntries(securityExtensions.map(e => [e, 'SecurityFileIcon'])),
    ...Object.fromEntries(archiveExtensions.map(e => [e, 'ZipFileIcon'])),
    ...Object.fromEntries(textConfigExtensions.map(e => [e, 'TxtFileIcon'])),
    ...Object.fromEntries(programmingExtensions.map(e => [e, 'CodeFileIcon'])),
};

export function getFileIconName(ext: string): keyof typeof Icons {
    return extensionToIconMap[ext] || 'DefaultFileIcon';
}
