import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'zh' | 'es' | 'ja' | 'fr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.calculators': 'Calculators',
        'nav.categories': 'Categories',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.allTools': 'All Tools',
        'nav.search': 'Search calculators...',
        
        // Hero
        'hero.badge': 'New Tools Added',
        'hero.title1': 'Smart calculators for your',
        'hero.title2': 'financial future.',
        'hero.subtitle': 'Make better decisions with our free, accurate, and easy-to-use tools. From salary taxes to investment growth, we\'ve got you covered.',
        'hero.searchPlaceholder': 'Search calculators... e.g. mortgage, tax, interest',
        'hero.trending': 'Trending:',
        
        // Popular Tools
        'popular.title': 'Popular Calculators',
        'popular.subtitle': 'Most used tools by our community',
        
        // Categories
        'categories.title': 'Browse by Category',
        'categories.subtitle': 'Find the right calculator for your needs',
        'categories.viewAll': 'View All',
        
        // Calculator
        'calc.calculate': 'Calculate',
        'calc.reset': 'Reset',
        'calc.result': 'Result',
        'calc.howItWorks': 'How It Works',
        'calc.formula': 'Formula',
        'calc.faq': 'FAQ',
        
        // Footer
        'footer.disclaimer': 'This website does not provide tax, legal, or investment advice. All calculations are estimates and should be used for informational purposes only.',
        'footer.copyright': 'All rights reserved.',
        'footer.calculators': 'Calculators',
        'footer.company': 'Company',
        'footer.salaryTax': 'Salary & Tax',
        'footer.loansDebt': 'Loans & Debt',
        'footer.investment': 'Investment',
        'footer.aboutUs': 'About Us',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.noResults': 'No results found',
        'common.readMore': 'Read More',
        'common.showLess': 'Show Less',
    },
    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.calculators': '计算器',
        'nav.categories': '分类',
        'nav.about': '关于我们',
        'nav.contact': '联系我们',
        'nav.allTools': '所有工具',
        'nav.search': '搜索计算器...',
        
        // Hero
        'hero.badge': '新工具上线',
        'hero.title1': '智能计算器，助力',
        'hero.title2': '财务未来',
        'hero.subtitle': '使用我们免费、准确且易用的工具做出更明智的决策。从工资税到投资增长，我们为您提供全方位服务。',
        'hero.searchPlaceholder': '搜索计算器... 例如：房贷、税务、利息',
        'hero.trending': '热门：',
        
        // Popular Tools
        'popular.title': '热门计算器',
        'popular.subtitle': '社区最常用的工具',
        
        // Categories
        'categories.title': '按类别浏览',
        'categories.subtitle': '找到适合您需求的计算器',
        'categories.viewAll': '查看全部',
        
        // Calculator
        'calc.calculate': '计算',
        'calc.reset': '重置',
        'calc.result': '结果',
        'calc.howItWorks': '工作原理',
        'calc.formula': '公式',
        'calc.faq': '常见问题',
        
        // Footer
        'footer.disclaimer': '本网站不提供税务、法律或投资建议。所有计算仅为估算，仅供参考。',
        'footer.copyright': '版权所有',
        'footer.calculators': '计算器',
        'footer.company': '公司',
        'footer.salaryTax': '工资与税务',
        'footer.loansDebt': '贷款与债务',
        'footer.investment': '投资',
        'footer.aboutUs': '关于我们',
        'footer.privacy': '隐私政策',
        'footer.terms': '服务条款',
        
        // Common
        'common.loading': '加载中...',
        'common.error': '错误',
        'common.noResults': '未找到结果',
        'common.readMore': '阅读更多',
        'common.showLess': '收起',
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.calculators': 'Calculadoras',
        'nav.categories': 'Categorías',
        'nav.about': 'Acerca de',
        'nav.contact': 'Contacto',
        'nav.allTools': 'Todas las Herramientas',
        'nav.search': 'Buscar calculadoras...',
        
        // Hero
        'hero.badge': 'Nuevas Herramientas',
        'hero.title1': 'Calculadoras inteligentes para tu',
        'hero.title2': 'futuro financiero.',
        'hero.subtitle': 'Toma mejores decisiones con nuestras herramientas gratuitas, precisas y fáciles de usar. Desde impuestos salariales hasta crecimiento de inversiones.',
        'hero.searchPlaceholder': 'Buscar calculadoras... ej. hipoteca, impuestos',
        'hero.trending': 'Tendencias:',
        
        // Popular Tools
        'popular.title': 'Calculadoras Populares',
        'popular.subtitle': 'Herramientas más utilizadas por nuestra comunidad',
        
        // Categories
        'categories.title': 'Explorar por Categoría',
        'categories.subtitle': 'Encuentra la calculadora adecuada para tus necesidades',
        'categories.viewAll': 'Ver Todo',
        
        // Calculator
        'calc.calculate': 'Calcular',
        'calc.reset': 'Reiniciar',
        'calc.result': 'Resultado',
        'calc.howItWorks': 'Cómo Funciona',
        'calc.formula': 'Fórmula',
        'calc.faq': 'Preguntas Frecuentes',
        
        // Footer
        'footer.disclaimer': 'Este sitio web no proporciona asesoramiento fiscal, legal o de inversión. Todos los cálculos son estimaciones y solo deben usarse con fines informativos.',
        'footer.copyright': 'Todos los derechos reservados.',
        'footer.calculators': 'Calculadoras',
        'footer.company': 'Empresa',
        'footer.salaryTax': 'Salario e Impuestos',
        'footer.loansDebt': 'Préstamos y Deudas',
        'footer.investment': 'Inversión',
        'footer.aboutUs': 'Sobre Nosotros',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',
        
        // Common
        'common.loading': 'Cargando...',
        'common.error': 'Error',
        'common.noResults': 'No se encontraron resultados',
        'common.readMore': 'Leer Más',
        'common.showLess': 'Mostrar Menos',
    },
    ja: {
        // Navigation
        'nav.home': 'ホーム',
        'nav.calculators': '電卓',
        'nav.categories': 'カテゴリー',
        'nav.about': '会社概要',
        'nav.contact': 'お問い合わせ',
        'nav.allTools': 'すべてのツール',
        'nav.search': '電卓を検索...',
        
        // Hero
        'hero.badge': '新ツール追加',
        'hero.title1': 'あなたの',
        'hero.title2': '財務の未来のためのスマート電卓',
        'hero.subtitle': '無料で正確、使いやすいツールでより良い決断を。給与税から投資成長まで、すべてお任せください。',
        'hero.searchPlaceholder': '電卓を検索... 例：住宅ローン、税金、利息',
        'hero.trending': 'トレンド：',
        
        // Popular Tools
        'popular.title': '人気の電卓',
        'popular.subtitle': 'コミュニティで最も使用されているツール',
        
        // Categories
        'categories.title': 'カテゴリで探す',
        'categories.subtitle': 'ニーズに合った電卓を見つけてください',
        'categories.viewAll': 'すべて見る',
        
        // Calculator
        'calc.calculate': '計算する',
        'calc.reset': 'リセット',
        'calc.result': '結果',
        'calc.howItWorks': '仕組み',
        'calc.formula': '計算式',
        'calc.faq': 'よくある質問',
        
        // Footer
        'footer.disclaimer': 'このウェブサイトは税務、法律、投資のアドバイスを提供するものではありません。すべての計算は推定値であり、情報提供のみを目的としています。',
        'footer.copyright': '無断複写・転載を禁じます。',
        'footer.calculators': '電卓',
        'footer.company': '会社情報',
        'footer.salaryTax': '給与・税金',
        'footer.loansDebt': 'ローン・債務',
        'footer.investment': '投資',
        'footer.aboutUs': '会社概要',
        'footer.privacy': 'プライバシーポリシー',
        'footer.terms': '利用規約',
        
        // Common
        'common.loading': '読み込み中...',
        'common.error': 'エラー',
        'common.noResults': '結果が見つかりません',
        'common.readMore': '続きを読む',
        'common.showLess': '閉じる',
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.calculators': 'Calculatrices',
        'nav.categories': 'Catégories',
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.allTools': 'Tous les Outils',
        'nav.search': 'Rechercher des calculatrices...',
        
        // Hero
        'hero.badge': 'Nouveaux Outils',
        'hero.title1': 'Des calculatrices intelligentes pour votre',
        'hero.title2': 'avenir financier.',
        'hero.subtitle': 'Prenez de meilleures décisions avec nos outils gratuits, précis et faciles à utiliser. Des impôts sur les salaires à la croissance des investissements.',
        'hero.searchPlaceholder': 'Rechercher... ex. hypothèque, impôts',
        'hero.trending': 'Tendances :',
        
        // Popular Tools
        'popular.title': 'Calculatrices Populaires',
        'popular.subtitle': 'Outils les plus utilisés par notre communauté',
        
        // Categories
        'categories.title': 'Parcourir par Catégorie',
        'categories.subtitle': 'Trouvez la calculatrice adaptée à vos besoins',
        'categories.viewAll': 'Voir Tout',
        
        // Calculator
        'calc.calculate': 'Calculer',
        'calc.reset': 'Réinitialiser',
        'calc.result': 'Résultat',
        'calc.howItWorks': 'Comment ça marche',
        'calc.formula': 'Formule',
        'calc.faq': 'FAQ',
        
        // Footer
        'footer.disclaimer': 'Ce site ne fournit pas de conseils fiscaux, juridiques ou d\'investissement. Tous les calculs sont des estimations à titre informatif uniquement.',
        'footer.copyright': 'Tous droits réservés.',
        'footer.calculators': 'Calculatrices',
        'footer.company': 'Entreprise',
        'footer.salaryTax': 'Salaire et Impôts',
        'footer.loansDebt': 'Prêts et Dettes',
        'footer.investment': 'Investissement',
        'footer.aboutUs': 'À propos',
        'footer.privacy': 'Politique de Confidentialité',
        'footer.terms': 'Conditions d\'Utilisation',
        
        // Common
        'common.loading': 'Chargement...',
        'common.error': 'Erreur',
        'common.noResults': 'Aucun résultat trouvé',
        'common.readMore': 'Lire Plus',
        'common.showLess': 'Voir Moins',
    },
};

export const languageNames: Record<Language, string> = {
    en: 'English',
    zh: '中文',
    es: 'Español',
    ja: '日本語',
    fr: 'Français',
};

export const languageFlags: Record<Language, string> = {
    en: '🇺🇸',
    zh: '🇨🇳',
    es: '🇪🇸',
    ja: '🇯🇵',
    fr: '🇫🇷',
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Try to get language from localStorage or browser
        const saved = localStorage.getItem('language') as Language;
        if (saved && translations[saved]) return saved;
        
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'zh') return 'zh';
        if (browserLang === 'es') return 'es';
        if (browserLang === 'ja') return 'ja';
        if (browserLang === 'fr') return 'fr';
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

