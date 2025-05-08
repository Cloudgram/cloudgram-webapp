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
    'txt',
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

const EXTENSION_EXE = 'exe' as const;

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
    'JPG',
    'JPEG',
    'PNG',
    'SVG',
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
] as const;

const EXTENSIONS_WORD = [
    'doc',
    'docx',
    'docm',
    'dot',
    'dotx',
    'dotm',
    'odt',
    'rtf',
    'wps',
] as const;

const EXTENSIONS_EXCEL = ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm', 'ods', 'csv', 'tsv'] as const;

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
] as const;

export const programmingExtensions = [...EXTENSIONS_PROGRAMMING];
export const exeExtension = EXTENSION_EXE;
export const imageExtensions = [...EXTENSIONS_IMAGE];
export const videoExtensions = [...EXTENSIONS_VIDEO];
export const wordExtensions = [...EXTENSIONS_WORD];
export const excelExtensions = [...EXTENSIONS_EXCEL];
export const archiveExtensions = [...EXTENSIONS_ARCHIVE];
export const powerpointExtensions = [...EXTENSIONS_POWERPOINT];
