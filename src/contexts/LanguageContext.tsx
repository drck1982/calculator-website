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
        
        // Categories Section
        'categories.title': 'Browse by Category',
        'categories.subtitle': 'Find the right calculator for your needs',
        'categories.viewAll': 'View All',
        
        // Category Names
        'cat.finance': 'Finance',
        'cat.business': 'Business',
        'cat.loansDebt': 'Loans & Debt',
        'cat.investment': 'Investment',
        'cat.health': 'Health',
        'cat.math': 'Math',
        'cat.geometry': 'Geometry',
        'cat.conversion': 'Conversion',
        'cat.everydayLife': 'Everyday Life',
        'cat.biology': 'Biology',
        'cat.chemistry': 'Chemistry',
        'cat.physics': 'Physics',
        'cat.sports': 'Sports',
        'cat.statistics': 'Statistics',
        'cat.other': 'Other',
        
        // Category Descriptions
        'cat.finance.desc': 'Salary, tax, investments, and retirement planning.',
        'cat.business.desc': 'ROI, margin, break-even, and business calculators.',
        'cat.loansDebt.desc': 'Mortgage, auto loans, and amortization calculators.',
        'cat.investment.desc': 'Compound interest, 401k, and inflation calculators.',
        'cat.health.desc': 'BMI, BMR, pregnancy, and fitness trackers.',
        'cat.math.desc': 'Algebra, geometry, statistics, and matrices.',
        'cat.geometry.desc': 'Calculate areas, volumes, and construction needs.',
        'cat.conversion.desc': 'Convert length, weight, volume, temperature, and more.',
        'cat.everydayLife.desc': 'Time, date, shopping, and daily utilities.',
        'cat.biology.desc': 'Genetics, cell biology, and evolution calculators.',
        'cat.chemistry.desc': 'Molarity, pH, periodic table, and reactions.',
        'cat.physics.desc': 'Mechanics, thermodynamics, electricity, and waves.',
        'cat.sports.desc': 'Running pace, cycling power, and scoreboards.',
        'cat.statistics.desc': 'Probability, distributions, and data analysis.',
        'cat.other.desc': 'Miscellaneous tools and fun calculators.',
        
        // Tool Names
        'tool.salaryCalculator': 'Salary Calculator',
        'tool.mortgageCalc': 'Mortgage Calc',
        'tool.investmentReturn': 'Investment Return',
        'tool.roiCalculator': 'ROI Calculator',
        'tool.marginCalc': 'Margin Calc',
        'tool.breakEven': 'Break-Even',
        'tool.autoLoan': 'Auto Loan',
        'tool.amortization': 'Amortization',
        'tool.compoundInterest': 'Compound Interest',
        'tool.401kCalc': '401k Calc',
        'tool.inflation': 'Inflation',
        'tool.bmiCalculator': 'BMI Calculator',
        'tool.calorieCalc': 'Calorie Calc',
        'tool.dueDate': 'Due Date',
        'tool.percentageCalc': 'Percentage Calc',
        'tool.binaryCalc': 'Binary Calc',
        'tool.primeNumbers': 'Prime Numbers',
        'tool.circleCalc': 'Circle Calc',
        'tool.triangleCalc': 'Triangle Calc',
        'tool.paintCalculator': 'Paint Calculator',
        'tool.lengthConverter': 'Length Converter',
        'tool.weightConverter': 'Weight Converter',
        'tool.currency': 'Currency',
        'tool.ageCalculator': 'Age Calculator',
        'tool.dateDifference': 'Date Difference',
        'tool.tipCalculator': 'Tip Calculator',
        'tool.dnaReplication': 'DNA Replication',
        'tool.alleleFrequency': 'Allele Frequency',
        'tool.molarityCalc': 'Molarity Calc',
        'tool.phCalculator': 'pH Calculator',
        'tool.velocityCalculator': 'Velocity Calculator',
        'tool.paceCalculator': 'Pace Calculator',
        'tool.standardDeviation': 'Standard Deviation',
        'tool.randomNumberGenerator': 'Random Number Generator',
        
        // Popular Tools Names & Descriptions
        'popular.paycheck': 'Paycheck Calculator',
        'popular.paycheck.desc': 'Calculate your take-home pay after taxes for any pay period.',
        'popular.mortgage': 'Mortgage Calculator',
        'popular.mortgage.desc': 'Calculate monthly mortgage payments with taxes and insurance.',
        'popular.bmi': 'BMI Calculator',
        'popular.bmi.desc': 'Calculate your Body Mass Index based on height and weight.',
        'popular.tip': 'Tip Calculator',
        'popular.tip.desc': 'Calculate tip amount and split the bill among friends.',
        'popular.gpa': 'GPA Calculator',
        'popular.gpa.desc': 'Calculate your Grade Point Average instantly.',
        'popular.age': 'Age Calculator',
        'popular.age.desc': 'Calculate exact age in years, months, and days.',
        'popular.sleep': 'Sleep Calculator',
        'popular.sleep.desc': 'Find the best time to wake up based on sleep cycles.',
        'popular.password': 'Password Generator',
        'popular.password.desc': 'Create strong, secure passwords instantly.',
        'popular.compound': 'Compound Interest',
        'popular.compound.desc': 'See how your investments grow over time.',
        'popular.bodyFat': 'Body Fat Calculator',
        'popular.bodyFat.desc': 'Estimate your body fat percentage with the Navy method.',
        'popular.homeAfford': 'Home Affordability',
        'popular.homeAfford.desc': 'How much house can you afford based on income?',
        'popular.studentLoan': 'Student Loan Calculator',
        'popular.studentLoan.desc': 'Plan your student loan repayment strategy.',
        
        // Popular Tool Categories
        'popular.cat.salary': 'Salary',
        'popular.cat.loans': 'Loans',
        'popular.cat.health': 'Health',
        'popular.cat.everyday': 'Everyday',
        'popular.cat.education': 'Education',
        'popular.cat.tools': 'Tools',
        'popular.cat.security': 'Security',
        'popular.cat.investment': 'Investment',
        'popular.cat.fitness': 'Fitness',
        'popular.cat.finance': 'Finance',
        
        // Calculator Page
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
        
        // Categories Section
        'categories.title': '按类别浏览',
        'categories.subtitle': '找到适合您需求的计算器',
        'categories.viewAll': '查看全部',
        
        // Category Names
        'cat.finance': '财务',
        'cat.business': '商业',
        'cat.loansDebt': '贷款与债务',
        'cat.investment': '投资',
        'cat.health': '健康',
        'cat.math': '数学',
        'cat.geometry': '几何',
        'cat.conversion': '单位换算',
        'cat.everydayLife': '日常生活',
        'cat.biology': '生物',
        'cat.chemistry': '化学',
        'cat.physics': '物理',
        'cat.sports': '运动',
        'cat.statistics': '统计',
        'cat.other': '其他',
        
        // Category Descriptions
        'cat.finance.desc': '工资、税务、投资和退休规划。',
        'cat.business.desc': '投资回报率、利润率、盈亏平衡点等商业计算。',
        'cat.loansDebt.desc': '房贷、车贷和分期还款计算器。',
        'cat.investment.desc': '复利、401k和通货膨胀计算器。',
        'cat.health.desc': 'BMI、基础代谢率、孕期和健身追踪。',
        'cat.math.desc': '代数、几何、统计和矩阵计算。',
        'cat.geometry.desc': '计算面积、体积和建筑需求。',
        'cat.conversion.desc': '长度、重量、体积、温度等单位转换。',
        'cat.everydayLife.desc': '时间、日期、购物和日常工具。',
        'cat.biology.desc': '遗传学、细胞生物学和进化计算器。',
        'cat.chemistry.desc': '摩尔浓度、pH值、元素周期表和化学反应。',
        'cat.physics.desc': '力学、热力学、电学和波动。',
        'cat.sports.desc': '跑步配速、骑行功率和计分板。',
        'cat.statistics.desc': '概率、分布和数据分析。',
        'cat.other.desc': '杂项工具和趣味计算器。',
        
        // Tool Names
        'tool.salaryCalculator': '工资计算器',
        'tool.mortgageCalc': '房贷计算',
        'tool.investmentReturn': '投资回报',
        'tool.roiCalculator': 'ROI计算器',
        'tool.marginCalc': '利润率计算',
        'tool.breakEven': '盈亏平衡',
        'tool.autoLoan': '车贷',
        'tool.amortization': '分期还款',
        'tool.compoundInterest': '复利',
        'tool.401kCalc': '401k计算',
        'tool.inflation': '通货膨胀',
        'tool.bmiCalculator': 'BMI计算器',
        'tool.calorieCalc': '卡路里计算',
        'tool.dueDate': '预产期',
        'tool.percentageCalc': '百分比计算',
        'tool.binaryCalc': '二进制计算',
        'tool.primeNumbers': '质数计算',
        'tool.circleCalc': '圆形计算',
        'tool.triangleCalc': '三角形计算',
        'tool.paintCalculator': '油漆计算器',
        'tool.lengthConverter': '长度换算',
        'tool.weightConverter': '重量换算',
        'tool.currency': '货币换算',
        'tool.ageCalculator': '年龄计算器',
        'tool.dateDifference': '日期差异',
        'tool.tipCalculator': '小费计算器',
        'tool.dnaReplication': 'DNA复制',
        'tool.alleleFrequency': '等位基因频率',
        'tool.molarityCalc': '摩尔浓度',
        'tool.phCalculator': 'pH计算器',
        'tool.velocityCalculator': '速度计算器',
        'tool.paceCalculator': '配速计算器',
        'tool.standardDeviation': '标准差',
        'tool.randomNumberGenerator': '随机数生成器',
        
        // Popular Tools Names & Descriptions
        'popular.paycheck': '工资单计算器',
        'popular.paycheck.desc': '计算扣税后的实际到手工资。',
        'popular.mortgage': '房贷计算器',
        'popular.mortgage.desc': '计算包含税费和保险的月供金额。',
        'popular.bmi': 'BMI计算器',
        'popular.bmi.desc': '根据身高体重计算身体质量指数。',
        'popular.tip': '小费计算器',
        'popular.tip.desc': '计算小费金额并分摊账单。',
        'popular.gpa': 'GPA计算器',
        'popular.gpa.desc': '快速计算您的平均绩点。',
        'popular.age': '年龄计算器',
        'popular.age.desc': '精确计算年龄（年、月、日）。',
        'popular.sleep': '睡眠计算器',
        'popular.sleep.desc': '根据睡眠周期找到最佳起床时间。',
        'popular.password': '密码生成器',
        'popular.password.desc': '即时创建强壮、安全的密码。',
        'popular.compound': '复利计算器',
        'popular.compound.desc': '查看您的投资随时间增长情况。',
        'popular.bodyFat': '体脂计算器',
        'popular.bodyFat.desc': '使用海军方法估算体脂百分比。',
        'popular.homeAfford': '购房能力',
        'popular.homeAfford.desc': '根据收入计算您能负担的房价。',
        'popular.studentLoan': '学生贷款计算器',
        'popular.studentLoan.desc': '规划您的学生贷款还款策略。',
        
        // Popular Tool Categories
        'popular.cat.salary': '工资',
        'popular.cat.loans': '贷款',
        'popular.cat.health': '健康',
        'popular.cat.everyday': '日常',
        'popular.cat.education': '教育',
        'popular.cat.tools': '工具',
        'popular.cat.security': '安全',
        'popular.cat.investment': '投资',
        'popular.cat.fitness': '健身',
        'popular.cat.finance': '财务',
        
        // Calculator Page
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
        
        // Categories Section
        'categories.title': 'Explorar por Categoría',
        'categories.subtitle': 'Encuentra la calculadora adecuada para tus necesidades',
        'categories.viewAll': 'Ver Todo',
        
        // Category Names
        'cat.finance': 'Finanzas',
        'cat.business': 'Negocios',
        'cat.loansDebt': 'Préstamos y Deudas',
        'cat.investment': 'Inversión',
        'cat.health': 'Salud',
        'cat.math': 'Matemáticas',
        'cat.geometry': 'Geometría',
        'cat.conversion': 'Conversión',
        'cat.everydayLife': 'Vida Diaria',
        'cat.biology': 'Biología',
        'cat.chemistry': 'Química',
        'cat.physics': 'Física',
        'cat.sports': 'Deportes',
        'cat.statistics': 'Estadística',
        'cat.other': 'Otros',
        
        // Category Descriptions
        'cat.finance.desc': 'Salario, impuestos, inversiones y planificación de jubilación.',
        'cat.business.desc': 'ROI, margen, punto de equilibrio y calculadoras empresariales.',
        'cat.loansDebt.desc': 'Hipoteca, préstamos de auto y calculadoras de amortización.',
        'cat.investment.desc': 'Interés compuesto, 401k y calculadoras de inflación.',
        'cat.health.desc': 'IMC, TMB, embarazo y rastreadores de fitness.',
        'cat.math.desc': 'Álgebra, geometría, estadística y matrices.',
        'cat.geometry.desc': 'Calcula áreas, volúmenes y necesidades de construcción.',
        'cat.conversion.desc': 'Convierte longitud, peso, volumen, temperatura y más.',
        'cat.everydayLife.desc': 'Tiempo, fecha, compras y utilidades diarias.',
        'cat.biology.desc': 'Calculadoras de genética, biología celular y evolución.',
        'cat.chemistry.desc': 'Molaridad, pH, tabla periódica y reacciones.',
        'cat.physics.desc': 'Mecánica, termodinámica, electricidad y ondas.',
        'cat.sports.desc': 'Ritmo de carrera, potencia de ciclismo y marcadores.',
        'cat.statistics.desc': 'Probabilidad, distribuciones y análisis de datos.',
        'cat.other.desc': 'Herramientas misceláneas y calculadoras divertidas.',
        
        // Tool Names
        'tool.salaryCalculator': 'Calculadora de Salario',
        'tool.mortgageCalc': 'Calc. Hipoteca',
        'tool.investmentReturn': 'Retorno de Inversión',
        'tool.roiCalculator': 'Calculadora ROI',
        'tool.marginCalc': 'Calc. Margen',
        'tool.breakEven': 'Punto de Equilibrio',
        'tool.autoLoan': 'Préstamo Auto',
        'tool.amortization': 'Amortización',
        'tool.compoundInterest': 'Interés Compuesto',
        'tool.401kCalc': 'Calc. 401k',
        'tool.inflation': 'Inflación',
        'tool.bmiCalculator': 'Calculadora IMC',
        'tool.calorieCalc': 'Calc. Calorías',
        'tool.dueDate': 'Fecha de Parto',
        'tool.percentageCalc': 'Calc. Porcentaje',
        'tool.binaryCalc': 'Calc. Binario',
        'tool.primeNumbers': 'Números Primos',
        'tool.circleCalc': 'Calc. Círculo',
        'tool.triangleCalc': 'Calc. Triángulo',
        'tool.paintCalculator': 'Calc. Pintura',
        'tool.lengthConverter': 'Convertidor de Longitud',
        'tool.weightConverter': 'Convertidor de Peso',
        'tool.currency': 'Moneda',
        'tool.ageCalculator': 'Calculadora de Edad',
        'tool.dateDifference': 'Diferencia de Fechas',
        'tool.tipCalculator': 'Calculadora de Propina',
        'tool.dnaReplication': 'Replicación ADN',
        'tool.alleleFrequency': 'Frecuencia Alélica',
        'tool.molarityCalc': 'Calc. Molaridad',
        'tool.phCalculator': 'Calculadora pH',
        'tool.velocityCalculator': 'Calc. Velocidad',
        'tool.paceCalculator': 'Calc. Ritmo',
        'tool.standardDeviation': 'Desviación Estándar',
        'tool.randomNumberGenerator': 'Generador de Números Aleatorios',
        
        // Popular Tools Names & Descriptions
        'popular.paycheck': 'Calculadora de Nómina',
        'popular.paycheck.desc': 'Calcula tu salario neto después de impuestos.',
        'popular.mortgage': 'Calculadora de Hipoteca',
        'popular.mortgage.desc': 'Calcula pagos mensuales con impuestos y seguro.',
        'popular.bmi': 'Calculadora de IMC',
        'popular.bmi.desc': 'Calcula tu Índice de Masa Corporal según altura y peso.',
        'popular.tip': 'Calculadora de Propina',
        'popular.tip.desc': 'Calcula la propina y divide la cuenta entre amigos.',
        'popular.gpa': 'Calculadora GPA',
        'popular.gpa.desc': 'Calcula tu Promedio de Calificaciones al instante.',
        'popular.age': 'Calculadora de Edad',
        'popular.age.desc': 'Calcula la edad exacta en años, meses y días.',
        'popular.sleep': 'Calculadora de Sueño',
        'popular.sleep.desc': 'Encuentra el mejor momento para despertar según los ciclos de sueño.',
        'popular.password': 'Generador de Contraseñas',
        'popular.password.desc': 'Crea contraseñas fuertes y seguras al instante.',
        'popular.compound': 'Interés Compuesto',
        'popular.compound.desc': 'Ve cómo crecen tus inversiones con el tiempo.',
        'popular.bodyFat': 'Calculadora de Grasa Corporal',
        'popular.bodyFat.desc': 'Estima tu porcentaje de grasa corporal con el método Navy.',
        'popular.homeAfford': 'Asequibilidad de Vivienda',
        'popular.homeAfford.desc': '¿Cuánta casa puedes permitirte según tus ingresos?',
        'popular.studentLoan': 'Calculadora de Préstamo Estudiantil',
        'popular.studentLoan.desc': 'Planifica tu estrategia de pago de préstamos estudiantiles.',
        
        // Popular Tool Categories
        'popular.cat.salary': 'Salario',
        'popular.cat.loans': 'Préstamos',
        'popular.cat.health': 'Salud',
        'popular.cat.everyday': 'Diario',
        'popular.cat.education': 'Educación',
        'popular.cat.tools': 'Herramientas',
        'popular.cat.security': 'Seguridad',
        'popular.cat.investment': 'Inversión',
        'popular.cat.fitness': 'Fitness',
        'popular.cat.finance': 'Finanzas',
        
        // Calculator Page
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
        
        // Categories Section
        'categories.title': 'カテゴリで探す',
        'categories.subtitle': 'ニーズに合った電卓を見つけてください',
        'categories.viewAll': 'すべて見る',
        
        // Category Names
        'cat.finance': '財務',
        'cat.business': 'ビジネス',
        'cat.loansDebt': 'ローン・債務',
        'cat.investment': '投資',
        'cat.health': '健康',
        'cat.math': '数学',
        'cat.geometry': '幾何学',
        'cat.conversion': '単位変換',
        'cat.everydayLife': '日常生活',
        'cat.biology': '生物学',
        'cat.chemistry': '化学',
        'cat.physics': '物理学',
        'cat.sports': 'スポーツ',
        'cat.statistics': '統計',
        'cat.other': 'その他',
        
        // Category Descriptions
        'cat.finance.desc': '給与、税金、投資、退職計画。',
        'cat.business.desc': 'ROI、利益率、損益分岐点などのビジネス計算。',
        'cat.loansDebt.desc': '住宅ローン、自動車ローン、返済計画。',
        'cat.investment.desc': '複利、401k、インフレ計算。',
        'cat.health.desc': 'BMI、基礎代謝、妊娠、フィットネス追跡。',
        'cat.math.desc': '代数、幾何学、統計、行列計算。',
        'cat.geometry.desc': '面積、体積、建築ニーズの計算。',
        'cat.conversion.desc': '長さ、重量、体積、温度などの単位変換。',
        'cat.everydayLife.desc': '時間、日付、ショッピング、日常ツール。',
        'cat.biology.desc': '遺伝学、細胞生物学、進化の計算。',
        'cat.chemistry.desc': 'モル濃度、pH、周期表、化学反応。',
        'cat.physics.desc': '力学、熱力学、電気、波動。',
        'cat.sports.desc': 'ランニングペース、サイクリングパワー、スコアボード。',
        'cat.statistics.desc': '確率、分布、データ分析。',
        'cat.other.desc': 'その他のツールと楽しい電卓。',
        
        // Tool Names
        'tool.salaryCalculator': '給与計算',
        'tool.mortgageCalc': '住宅ローン計算',
        'tool.investmentReturn': '投資リターン',
        'tool.roiCalculator': 'ROI計算',
        'tool.marginCalc': '利益率計算',
        'tool.breakEven': '損益分岐点',
        'tool.autoLoan': '自動車ローン',
        'tool.amortization': '返済計画',
        'tool.compoundInterest': '複利',
        'tool.401kCalc': '401k計算',
        'tool.inflation': 'インフレ',
        'tool.bmiCalculator': 'BMI計算',
        'tool.calorieCalc': 'カロリー計算',
        'tool.dueDate': '出産予定日',
        'tool.percentageCalc': '割合計算',
        'tool.binaryCalc': '2進数計算',
        'tool.primeNumbers': '素数計算',
        'tool.circleCalc': '円計算',
        'tool.triangleCalc': '三角形計算',
        'tool.paintCalculator': 'ペンキ計算',
        'tool.lengthConverter': '長さ変換',
        'tool.weightConverter': '重量変換',
        'tool.currency': '通貨',
        'tool.ageCalculator': '年齢計算',
        'tool.dateDifference': '日付差計算',
        'tool.tipCalculator': 'チップ計算',
        'tool.dnaReplication': 'DNA複製',
        'tool.alleleFrequency': '対立遺伝子頻度',
        'tool.molarityCalc': 'モル濃度',
        'tool.phCalculator': 'pH計算',
        'tool.velocityCalculator': '速度計算',
        'tool.paceCalculator': 'ペース計算',
        'tool.standardDeviation': '標準偏差',
        'tool.randomNumberGenerator': '乱数生成',
        
        // Popular Tools Names & Descriptions
        'popular.paycheck': '給与計算機',
        'popular.paycheck.desc': '税引き後の手取り給与を計算します。',
        'popular.mortgage': '住宅ローン計算機',
        'popular.mortgage.desc': '税金と保険を含む月々の支払いを計算。',
        'popular.bmi': 'BMI計算機',
        'popular.bmi.desc': '身長と体重からBMIを計算します。',
        'popular.tip': 'チップ計算機',
        'popular.tip.desc': 'チップ金額を計算し、友人と割り勘。',
        'popular.gpa': 'GPA計算機',
        'popular.gpa.desc': 'GPA（成績平均点）を即座に計算。',
        'popular.age': '年齢計算機',
        'popular.age.desc': '年、月、日で正確な年齢を計算。',
        'popular.sleep': '睡眠計算機',
        'popular.sleep.desc': '睡眠サイクルに基づく最適な起床時間を発見。',
        'popular.password': 'パスワード生成',
        'popular.password.desc': '強力で安全なパスワードを即座に作成。',
        'popular.compound': '複利計算機',
        'popular.compound.desc': '投資が時間とともにどう成長するか確認。',
        'popular.bodyFat': '体脂肪計算機',
        'popular.bodyFat.desc': 'ネイビー法で体脂肪率を推定。',
        'popular.homeAfford': '住宅購入能力',
        'popular.homeAfford.desc': '収入に基づいていくらの家を買えるか？',
        'popular.studentLoan': '学生ローン計算機',
        'popular.studentLoan.desc': '学生ローンの返済戦略を計画。',
        
        // Popular Tool Categories
        'popular.cat.salary': '給与',
        'popular.cat.loans': 'ローン',
        'popular.cat.health': '健康',
        'popular.cat.everyday': '日常',
        'popular.cat.education': '教育',
        'popular.cat.tools': 'ツール',
        'popular.cat.security': 'セキュリティ',
        'popular.cat.investment': '投資',
        'popular.cat.fitness': 'フィットネス',
        'popular.cat.finance': '財務',
        
        // Calculator Page
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
        
        // Categories Section
        'categories.title': 'Parcourir par Catégorie',
        'categories.subtitle': 'Trouvez la calculatrice adaptée à vos besoins',
        'categories.viewAll': 'Voir Tout',
        
        // Category Names
        'cat.finance': 'Finance',
        'cat.business': 'Entreprise',
        'cat.loansDebt': 'Prêts et Dettes',
        'cat.investment': 'Investissement',
        'cat.health': 'Santé',
        'cat.math': 'Mathématiques',
        'cat.geometry': 'Géométrie',
        'cat.conversion': 'Conversion',
        'cat.everydayLife': 'Vie Quotidienne',
        'cat.biology': 'Biologie',
        'cat.chemistry': 'Chimie',
        'cat.physics': 'Physique',
        'cat.sports': 'Sports',
        'cat.statistics': 'Statistiques',
        'cat.other': 'Autres',
        
        // Category Descriptions
        'cat.finance.desc': 'Salaire, impôts, investissements et planification retraite.',
        'cat.business.desc': 'ROI, marge, point mort et calculatrices entreprise.',
        'cat.loansDebt.desc': 'Hypothèque, prêt auto et calculatrices amortissement.',
        'cat.investment.desc': 'Intérêts composés, 401k et calculatrices inflation.',
        'cat.health.desc': 'IMC, métabolisme, grossesse et suivi fitness.',
        'cat.math.desc': 'Algèbre, géométrie, statistiques et matrices.',
        'cat.geometry.desc': 'Calculer surfaces, volumes et besoins construction.',
        'cat.conversion.desc': 'Convertir longueur, poids, volume, température et plus.',
        'cat.everydayLife.desc': 'Temps, date, shopping et utilitaires quotidiens.',
        'cat.biology.desc': 'Génétique, biologie cellulaire et calculatrices évolution.',
        'cat.chemistry.desc': 'Molarité, pH, tableau périodique et réactions.',
        'cat.physics.desc': 'Mécanique, thermodynamique, électricité et ondes.',
        'cat.sports.desc': 'Allure course, puissance cyclisme et tableaux scores.',
        'cat.statistics.desc': 'Probabilité, distributions et analyse données.',
        'cat.other.desc': 'Outils divers et calculatrices amusantes.',
        
        // Tool Names
        'tool.salaryCalculator': 'Calc. Salaire',
        'tool.mortgageCalc': 'Calc. Hypothèque',
        'tool.investmentReturn': 'Retour Investissement',
        'tool.roiCalculator': 'Calculatrice ROI',
        'tool.marginCalc': 'Calc. Marge',
        'tool.breakEven': 'Point Mort',
        'tool.autoLoan': 'Prêt Auto',
        'tool.amortization': 'Amortissement',
        'tool.compoundInterest': 'Intérêts Composés',
        'tool.401kCalc': 'Calc. 401k',
        'tool.inflation': 'Inflation',
        'tool.bmiCalculator': 'Calc. IMC',
        'tool.calorieCalc': 'Calc. Calories',
        'tool.dueDate': 'Date Accouchement',
        'tool.percentageCalc': 'Calc. Pourcentage',
        'tool.binaryCalc': 'Calc. Binaire',
        'tool.primeNumbers': 'Nombres Premiers',
        'tool.circleCalc': 'Calc. Cercle',
        'tool.triangleCalc': 'Calc. Triangle',
        'tool.paintCalculator': 'Calc. Peinture',
        'tool.lengthConverter': 'Convertisseur Longueur',
        'tool.weightConverter': 'Convertisseur Poids',
        'tool.currency': 'Devise',
        'tool.ageCalculator': 'Calculatrice Âge',
        'tool.dateDifference': 'Différence Dates',
        'tool.tipCalculator': 'Calc. Pourboire',
        'tool.dnaReplication': 'Réplication ADN',
        'tool.alleleFrequency': 'Fréquence Allélique',
        'tool.molarityCalc': 'Calc. Molarité',
        'tool.phCalculator': 'Calculatrice pH',
        'tool.velocityCalculator': 'Calc. Vitesse',
        'tool.paceCalculator': 'Calc. Allure',
        'tool.standardDeviation': 'Écart-type',
        'tool.randomNumberGenerator': 'Générateur Nombres Aléatoires',
        
        // Popular Tools Names & Descriptions
        'popular.paycheck': 'Calculatrice Salaire',
        'popular.paycheck.desc': 'Calculez votre salaire net après impôts.',
        'popular.mortgage': 'Calculatrice Hypothèque',
        'popular.mortgage.desc': 'Calculez les paiements mensuels avec taxes et assurance.',
        'popular.bmi': 'Calculatrice IMC',
        'popular.bmi.desc': 'Calculez votre IMC selon taille et poids.',
        'popular.tip': 'Calculatrice Pourboire',
        'popular.tip.desc': 'Calculez le pourboire et partagez la note entre amis.',
        'popular.gpa': 'Calculatrice GPA',
        'popular.gpa.desc': 'Calculez votre moyenne générale instantanément.',
        'popular.age': 'Calculatrice Âge',
        'popular.age.desc': 'Calculez l\'âge exact en années, mois et jours.',
        'popular.sleep': 'Calculatrice Sommeil',
        'popular.sleep.desc': 'Trouvez le meilleur moment pour se réveiller selon les cycles de sommeil.',
        'popular.password': 'Générateur Mot de Passe',
        'popular.password.desc': 'Créez des mots de passe forts et sécurisés instantanément.',
        'popular.compound': 'Intérêts Composés',
        'popular.compound.desc': 'Voyez comment vos investissements croissent dans le temps.',
        'popular.bodyFat': 'Calculatrice Graisse Corporelle',
        'popular.bodyFat.desc': 'Estimez votre pourcentage de graisse corporelle avec la méthode Navy.',
        'popular.homeAfford': 'Capacité d\'Achat Immobilier',
        'popular.homeAfford.desc': 'Quelle maison pouvez-vous vous permettre selon vos revenus?',
        'popular.studentLoan': 'Calculatrice Prêt Étudiant',
        'popular.studentLoan.desc': 'Planifiez votre stratégie de remboursement de prêt étudiant.',
        
        // Popular Tool Categories
        'popular.cat.salary': 'Salaire',
        'popular.cat.loans': 'Prêts',
        'popular.cat.health': 'Santé',
        'popular.cat.everyday': 'Quotidien',
        'popular.cat.education': 'Éducation',
        'popular.cat.tools': 'Outils',
        'popular.cat.security': 'Sécurité',
        'popular.cat.investment': 'Investissement',
        'popular.cat.fitness': 'Fitness',
        'popular.cat.finance': 'Finance',
        
        // Calculator Page
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
        if (typeof window === 'undefined') return 'en';
        const saved = localStorage.getItem('language') as Language;
        if (saved && translations[saved]) return saved;
        
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
