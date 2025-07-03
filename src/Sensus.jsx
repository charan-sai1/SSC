import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// --- Data ---
// The main data object for the census. In a larger app, this would be fetched from an API.
const censusData = {
    population: {
        most: {
            labels: ['Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Madhya Pradesh'],
            data: [199.8, 112.4, 104.1, 91.3, 72.6],
            info: 'Uttar Pradesh was the most populous state with nearly 200 million people.'
        },
        least: {
            labels: ['Nagaland', 'Goa', 'Arunachal Pradesh', 'Mizoram', 'Sikkim'],
            data: [1.97, 1.45, 1.38, 1.09, 0.61],
            info: 'Sikkim was the least populous state. Notably, Nagaland recorded a negative population growth rate.'
        },
        densityHigh: {
            labels: ['Delhi (UT)', 'Chandigarh (UT)', 'Puducherry (UT)', 'Bihar (State)', 'West Bengal (State)'],
            data: [11320, 9258, 2547, 1106, 1028],
            info: 'Among states, Bihar had the highest population density, while the NCT of Delhi had the highest overall.'
        },
        densityLow: {
            labels: ['Ladakh (UT)', 'A & N Islands (UT)', 'Mizoram', 'Sikkim', 'Arunachal Pradesh'].reverse(),
            data: [4.6, 46, 52, 86, 17].reverse(),
            info: 'Arunachal Pradesh had the lowest population density with just 17 persons per square kilometer.'
        }
    },
    genderLiteracy: {
        sexRatio: {
            labels: ['Daman & Diu', 'Haryana', 'Gujarat', 'Bihar', 'Puducherry', 'Kerala'],
            data: [618, 879, 919, 918, 1038, 1084],
            info: 'Kerala had the highest sex ratio (1084), while Daman & Diu had the lowest (618). Haryana was the lowest among states.'
        },
        childSexRatio: {
            labels: ['Haryana', 'Punjab', 'J&K', 'Delhi', 'Meghalaya', 'Mizoram'],
            data: [830, 846, 862, 871, 970, 971],
            info: 'The national child sex ratio declined to 914. Mizoram had the highest (971) while Haryana had the lowest (830).'
        },
        literacyRate: {
            labels: ['Bihar', 'Arunachal Pradesh', 'Rajasthan', 'Goa', 'Mizoram', 'Kerala'],
            data: [61.8, 65.4, 66.1, 88.7, 91.3, 94.0],
            info: 'Kerala achieved the highest literacy rate (94%), whereas Bihar had the lowest (61.8%).'
        },
        maleFemaleLiteracy: {
            labels: ['India', 'Kerala', 'Bihar', 'Rajasthan'],
            datasets: [
                { label: 'Male Literacy %', data: [80.9, 96.1, 71.2, 79.2], backgroundColor: 'rgba(54, 162, 235, 0.7)'},
                { label: 'Female Literacy %', data: [64.6, 92.1, 51.5, 52.1], backgroundColor: 'rgba(255, 99, 132, 0.7)'}
            ],
            info: 'The gender gap in literacy is narrowing but remains significant. The gap is smallest in states like Kerala and widest in states like Bihar and Rajasthan.'
        }
    },
    socioEconomic: {
        religion: {
            labels: ['Hindus', 'Muslims', 'Christians', 'Sikhs', 'Buddhists', 'Jains', 'Others/Not Stated'],
            data: [79.8, 14.2, 2.3, 1.7, 0.7, 0.4, 0.9]
        },
        language: {
            labels: ['Hindi', 'Bengali', 'Marathi', 'Telugu', 'Tamil'],
            data: [43.63, 8.03, 6.86, 6.70, 5.70]
        }
    },
    ruralUrban: {
        labels: ['Rural Population', 'Urban Population'],
        data: [68.8, 31.2]
    }
};

// --- Reusable Components ---

// A wrapper for the main content sections to keep the code DRY
const ContentSection = ({ title, description, children }) => (
    <div>
        <h2 className="text-3xl font-bold mb-2 text-stone-700">{title}</h2>
        <p className="text-stone-600 mb-6">{description}</p>
        {children}
    </div>
);

// A reusable card component for displaying key stats
const StatCard = ({ title, value, subtext, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-500">{title}</h3>
        <p className={`text-4xl font-bold ${colorClass}`}>{value}</p>
        <p className="text-sm text-stone-500 mt-2">{subtext}</p>
    </div>
);

// --- Main Section Components ---

const OverviewSection = () => (
    <ContentSection
        title="National Overview"
        description="This section provides a snapshot of India's key demographic figures from the 2011 Census. These are the most fundamental and frequently tested numbers, forming the foundation of your census knowledge."
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Population" value="1.21 Billion" subtext="17.64% decadal growth" colorClass="text-teal-600" />
            <StatCard title="Population Density" value="382" subtext="persons per sq. km." colorClass="text-amber-600" />
            <StatCard title="Overall Sex Ratio" value="940" subtext="females per 1000 males" colorClass="text-rose-600" />
            <StatCard title="Literacy Rate" value="74.04%" subtext="Up from 64.83% in 2001" colorClass="text-sky-600" />
        </div>
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold mb-4 text-stone-700">Administrative Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-lg font-semibold text-stone-500">Census Commissioner</p>
                    <p className="text-xl font-bold text-teal-600">Shri C. Chandramouli</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-stone-500">Motto</p>
                    <p className="text-xl font-bold text-teal-600">Our Census, Our Future</p>
                </div>
                <div>
                    <p className="text-lg font-semibold text-stone-500">Phases</p>
                    <p className="text-xl font-bold text-teal-600">Two Phases</p>
                    <p className="text-sm text-stone-500">(Houselisting & Population Enumeration)</p>
                </div>
            </div>
        </div>
    </ContentSection>
);

const PopulationSection = () => {
    const [chartType, setChartType] = useState('most');
    const chartData = censusData.population[chartType];

    const data = {
        labels: chartData.labels,
        datasets: [{
            label: 'Population (in millions for pop., per sq.km for density)',
            data: chartData.data,
            backgroundColor: 'rgba(13, 148, 136, 0.7)',
            borderColor: 'rgba(13, 148, 136, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
    };

    const tabs = [
        { key: 'most', label: 'Most Populous' },
        { key: 'least', label: 'Least Populous' },
        { key: 'densityHigh', label: 'Highest Density' },
        { key: 'densityLow', label: 'Lowest Density' }
    ];

    return (
        <ContentSection
            title="Population Dynamics"
            description="Explore the distribution of India's population. This section visualizes the states with the highest and lowest populations and population densities, highlighting the significant regional disparities across the nation."
        >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex justify-center mb-4 border border-stone-200 rounded-lg p-1 w-max mx-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setChartType(tab.key)}
                            className={`tab-button px-4 py-2 text-sm font-semibold rounded-md ${chartType === tab.key ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="chart-container">
                    <Bar data={data} options={options} />
                </div>
                <p className="text-center text-stone-600 mt-4 text-sm">{chartData.info}</p>
            </div>
        </ContentSection>
    );
};

const GenderLiteracySection = () => {
    const [metric, setMetric] = useState('sexRatio');
    const chartConfig = useMemo(() => {
        const selectedData = censusData.genderLiteracy[metric];
        if (metric === 'maleFemaleLiteracy') {
            return {
                type: 'bar',
                data: {
                    labels: selectedData.labels,
                    datasets: selectedData.datasets
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, suggestedMax: 100, title: { display: true, text: 'Literacy Rate (%)'} }, x: { title: { display: true, text: 'Region'} } },
                    plugins: { legend: { position: 'top' } }
                },
                info: selectedData.info
            };
        }
        return {
            type: 'bar',
            data: {
                labels: selectedData.labels,
                datasets: [{
                    label: metric,
                    data: selectedData.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: false } }
            },
            info: selectedData.info
        };
    }, [metric]);


    return (
        <ContentSection
            title="Gender & Literacy"
            description="Analyze key social indicators like sex ratio and literacy rates. Use the dropdown to switch between different metrics and compare state-wise performance. This section highlights progress and persistent challenges, like the declining child sex ratio."
        >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-center mb-4">
                    <label htmlFor="genderLiteracySelector" className="mr-2 text-sm font-semibold">Select Metric:</label>
                    <select
                        id="genderLiteracySelector"
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                        className="p-2 border border-stone-300 rounded-lg text-sm"
                    >
                        <option value="sexRatio">Overall Sex Ratio</option>
                        <option value="childSexRatio">Child Sex Ratio (0-6 Yrs)</option>
                        <option value="literacyRate">Overall Literacy Rate</option>
                        <option value="maleFemaleLiteracy">Male vs Female Literacy</option>
                    </select>
                </div>
                <div className="chart-container">
                    <Bar data={chartConfig.data} options={chartConfig.options} />
                </div>
                <p className="text-center text-stone-600 mt-4 text-sm">{chartConfig.info}</p>
            </div>
        </ContentSection>
    );
};

const SocioEconomicSection = () => {
    const religionData = {
        labels: censusData.socioEconomic.religion.labels,
        datasets: [{
            data: censusData.socioEconomic.religion.data,
            backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#64748b', '#a8a29e']
        }]
    };
    const languageData = {
        labels: censusData.socioEconomic.language.labels,
        datasets: [{
            label: '% of Population',
            data: censusData.socioEconomic.language.data,
            backgroundColor: 'rgba(59, 130, 246, 0.7)'
        }]
    };

    return (
        <ContentSection
            title="Socio-Economic Fabric"
            description="Delve into the socio-economic composition of India, including religious and linguistic diversity, the distribution of Scheduled Castes (SC) and Scheduled Tribes (ST), and worker participation rates. These charts illustrate the complex tapestry of Indian society."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold text-center mb-2">Religious Composition (%)</h3>
                    <div className="chart-container h-80 max-h-[35vh]">
                        <Doughnut data={religionData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold text-center mb-2">Top 5 Spoken Languages</h3>
                    <div className="chart-container h-80 max-h-[35vh]">
                        <Bar data={languageData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 col-span-1 lg:col-span-2">
                    <h3 className="text-lg font-bold text-center mb-2">SC & ST Population Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
                        {/* Data points are hardcoded as they are static facts */}
                        <div><p className="font-semibold text-stone-500">Highest SC Population</p><p className="text-xl font-bold text-teal-600">Uttar Pradesh</p><p className="text-xs text-stone-500">(in numbers)</p></div>
                        <div><p className="font-semibold text-stone-500">Highest SC Population</p><p className="text-xl font-bold text-teal-600">Punjab (31.9%)</p><p className="text-xs text-stone-500">(in %)</p></div>
                        <div><p className="font-semibold text-stone-500">Highest ST Population</p><p className="text-xl font-bold text-amber-600">Madhya Pradesh</p><p className="text-xs text-stone-500">(in numbers)</p></div>
                        <div><p className="font-semibold text-stone-500">Highest ST Population</p><p className="text-xl font-bold text-amber-600">Lakshadweep (94.8%)</p><p className="text-xs text-stone-500">(in %)</p></div>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

const RuralUrbanSection = () => {
    const ruralUrbanData = {
        labels: censusData.ruralUrban.labels,
        datasets: [{
            data: censusData.ruralUrban.data,
            backgroundColor: ['#f59e0b', '#10b981']
        }]
    };
    
    const deprivationFacts = [
        "10.74 crore households (out of 17.97 cr) were considered deprived.",
        "29.97% of rural households were landless and earned from manual labor.",
        "74.5% of rural households had a highest earner with a monthly income under ₹5,000.",
        "51.14% of rural households depended on manual casual labor for income.",
        "Only 4.6% of rural households paid income tax."
    ];

    return (
        <ContentSection
            title="Rural-Urban Divide"
            description="Understand the distribution of India's population between rural and urban areas. This section also presents stark findings from the Socio-Economic and Caste Census (SECC) 2011, revealing the extent of deprivation in rural India."
        >
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-center mb-2">Population Split: Rural vs Urban</h3>
                    <div className="chart-container h-80 max-h-[35vh]">
                        <Pie data={ruralUrbanData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                    </div>
                    <div className="flex justify-around mt-4 text-center">
                        <div><p className="font-bold text-teal-600 text-lg">Goa</p><p className="text-sm text-stone-500">Most Urbanized State</p></div>
                        <div><p className="font-bold text-amber-600 text-lg">Bihar</p><p className="text-sm text-stone-500">Most Rural State</p></div>
                    </div>
                </div>
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold mb-4">SECC 2011: Rural Deprivation Facts</h3>
                    <ul className="space-y-3 text-stone-700">
                        {deprivationFacts.map((fact, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-rose-500 font-bold text-xl mr-3">●</span>
                                <div dangerouslySetInnerHTML={{ __html: fact.replace(/(\d+(\.\d+)?%?)/g, '<strong class="font-semibold">$1</strong>') }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ContentSection>
    );
};

const ExamCornerSection = () => (
    <ContentSection
        title="⭐ Exam Corner: Key Facts to Remember"
        description="This is your quick-revision hub. It consolidates the most critical rankings and unique facts from the 2011 Census that are frequently asked in the SSC CGL exam. Focus on memorizing these points."
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h3 className="text-lg font-bold mb-3 text-teal-700">Population</h3>
                <ul className="space-y-2 text-sm list-disc list-inside">
                    <li><strong>Most Populous State:</strong> Uttar Pradesh</li>
                    <li><strong>Least Populous State:</strong> Sikkim</li>
                    <li><strong>Highest Density (UT):</strong> Delhi</li>
                    <li><strong>Highest Density (State):</strong> Bihar</li>
                    <li><strong>Lowest Density:</strong> Arunachal Pradesh</li>
                    <li><strong>Negative Growth:</strong> Nagaland</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h3 className="text-lg font-bold mb-3 text-rose-700">Sex Ratio</h3>
                <ul className="space-y-2 text-sm list-disc list-inside">
                    <li><strong>India's Overall:</strong> 940</li>
                    <li><strong>Highest (State):</strong> Kerala (1084)</li>
                    <li><strong>Lowest (State):</strong> Haryana (879)</li>
                    <li><strong>India's Child (0-6):</strong> 914 (Declined)</li>
                    <li><strong>Highest Child (State):</strong> Mizoram (971)</li>
                    <li><strong>Lowest Child (State):</strong> Haryana (830)</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h3 className="text-lg font-bold mb-3 text-sky-700">Literacy</h3>
                <ul className="space-y-2 text-sm list-disc list-inside">
                    <li><strong>India's Overall:</strong> 74.04%</li>
                    <li><strong>Highest (State):</strong> Kerala (94%)</li>
                    <li><strong>Lowest (State):</strong> Bihar (61.8%)</li>
                    <li><strong>Highest Female Literacy:</strong> Kerala (92.1%)</li>
                    <li><strong>Lowest Female Literacy:</strong> Bihar (51.5%)</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-bold mb-3 text-amber-700">Social & Economic</h3>
                <ul className="space-y-2 text-sm list-disc list-inside grid grid-cols-1 md:grid-cols-2">
                    <li><strong>Most Urbanized State:</strong> Goa</li>
                    <li><strong>Most Rural State:</strong> Bihar</li>
                    <li><strong>Highest SC %:</strong> Punjab</li>
                    <li><strong>Highest ST %:</strong> Lakshadweep / Mizoram</li>
                    <li><strong>Largest Tribal Group:</strong> Bhil</li>
                    <li><strong>Most Spoken Language:</strong> Hindi</li>
                    <li><strong>Second Most Spoken:</strong> Bengali</li>
                    <li><strong>New Religion Category:</strong> "No Religion"</li>
                </ul>
            </div>
        </div>
    </ContentSection>
);


// --- Main App Component ---
export default function App() {
    // State to manage which section is currently visible
    const [activeSection, setActiveSection] = useState('overview');

    // A map to easily render the correct component based on state
    const sections = {
        overview: <OverviewSection />,
        population: <PopulationSection />,
        'gender-literacy': <GenderLiteracySection />,
        'socio-economic': <SocioEconomicSection />,
        'rural-urban': <RuralUrbanSection />,
        'exam-corner': <ExamCornerSection />,
    };

    const navItems = [
        { id: 'overview', label: '📋 National Overview' },
        { id: 'population', label: '📊 Population Dynamics' },
        { id: 'gender-literacy', label: '♀️♂️ Gender & Literacy' },
        { id: 'socio-economic', label: '🏗️ Socio-Economic' },
        { id: 'rural-urban', label: '🏘️ Rural-Urban Divide' },
        { id: 'exam-corner', label: '⭐ Exam Corner' }
    ];

    return (
        <>
            {/* Injecting CSS styles directly for self-containment */}
            <style>{`
                body { font-family: 'Inter', sans-serif; }
                .chart-container { position: relative; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto; height: 350px; max-height: 45vh; }
                @media (max-width: 768px) { .chart-container { height: 300px; max-height: 50vh; } }
                .nav-link { transition: all 0.2s ease-in-out; }
                .nav-link.active { background-color: #0d9488; color: white; transform: translateX(4px); }
                .tab-button { transition: all 0.2s ease-in-out; }
                .tab-button.active { background-color: #0d9488; color: white; }
            `}</style>
            
            <div className="flex min-h-screen bg-stone-50 text-stone-800">
                {/* Sidebar Navigation */}
                <nav className="w-64 bg-white p-4 shadow-lg fixed h-full">
                    <h1 className="text-xl font-bold text-teal-700 mb-2">Census 2011</h1>
                    <p className="text-sm text-stone-500 mb-6">SSC CGL Exam Prep</p>
                    <ul className="space-y-2">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveSection(item.id);
                                    }}
                                    className={`nav-link flex items-center p-2 rounded-lg hover:bg-teal-50 ${activeSection === item.id ? 'active' : ''}`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="absolute bottom-4 text-xs text-stone-400 px-2">
                        <p>Motto: "Our Census, Our Future"</p>
                        <p>Commissioner: C. Chandramouli</p>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="ml-64 flex-1 p-4 sm:p-6 lg:p-8">
                    {sections[activeSection]}
                </main>
            </div>
        </>
    );
}
