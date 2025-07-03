import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const App = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [populationChartType, setPopulationChartType] = useState('top');
    const [densityChartType, setDensityChartType] = useState('top');
    const [literacyChartType, setLiteracyChartType] = useState('top');
    const [sexRatioChartType, setSexRatioChartType] = useState('top');

    const populationChartRef = useRef(null);
    const densityChartRef = useRef(null);
    const literacyChartRef = useRef(null);
    const sexRatioChartRef = useRef(null);
    const ruralUrbanChartRef = useRef(null);
    const religionChartRef = useRef(null);
    const scstChartRef = useRef(null);

    const populationChartInstance = useRef(null);
    const densityChartInstance = useRef(null);
    const literacyChartInstance = useRef(null);
    const sexRatioChartInstance = useRef(null);
    const ruralUrbanChartInstance = useRef(null);
    const religionChartInstance = useRef(null);
    const scstChartInstance = useRef(null);

    const censusData = {
        population: {
            top: [
                { state: 'Uttar Pradesh', value: 199.8, info: 'Most populous state, accounting for 16.5% of India.' },
                { state: 'Maharashtra', value: 112.4, info: 'Second most populous, a major economic hub.' },
                { state: 'Bihar', value: 104.1, info: 'Third most populous, with the highest density.' },
                { state: 'West Bengal', value: 91.3, info: 'Fourth most populous, strategically located.' },
                { state: 'Madhya Pradesh', value: 72.6, info: 'Fifth most populous, in the heart of India.' }
            ],
            bottom: [
                { state: 'Sikkim', value: 0.61, info: 'Least populous state in India.' },
                { state: 'Mizoram', value: 1.10, info: 'Second least populous, high literacy.' },
                { state: 'Arunachal Pradesh', value: 1.38, info: 'Sparsely populated with lowest density.' },
                { state: 'Goa', value: 1.46, info: 'Smallest state by area, highly urbanized.' },
                { state: 'Nagaland', value: 1.98, info: 'Recorded negative population growth.' }
            ]
        },
        density: {
            top: [
                { state: 'Delhi (UT)', value: 11297, info: 'Highest density UT, a megacity.' },
                { state: 'Bihar', value: 1106, info: 'Highest density among states.' },
                { state: 'West Bengal', value: 1028, info: 'Very high density, fertile plains.' },
                { state: 'Kerala', value: 860, info: 'High density despite coastal and hilly terrain.' },
                { state: 'Uttar Pradesh', value: 829, info: 'High density due to large population.' }
            ],
            bottom: [
                { state: 'Arunachal Pradesh', value: 17, info: 'Lowest density in India due to terrain.' },
                { state: 'Andaman & Nicobar', value: 46, info: 'Island territory with sparse population.' },
                { state: 'Mizoram', value: 52, info: 'Low density, hilly northeastern state.' },
                { state: 'Sikkim', value: 86, info: 'Mountainous state with low population density.' },
                { state: 'Nagaland', value: 119, info: 'Low density, hilly terrain.' }
            ]
        },
        literacy: {
            top: [
                { state: 'Kerala', value: 94.0, male: 96.1, female: 92.1, info: 'Highest literacy for overall, male, and female.' },
                { state: 'Lakshadweep (UT)', value: 91.8, male: 95.6, female: 87.9, info: 'Highest literacy UT.' },
                { state: 'Mizoram', value: 91.3, male: 93.3, female: 89.3, info: 'Very high literacy in the Northeast.' },
                { state: 'Goa', value: 88.7, male: 92.6, female: 84.7, info: 'High literacy, popular tourist state.' },
                { state: 'Tripura', value: 87.2, male: 91.5, female: 82.7, info: 'Another high literacy state from the Northeast.' }
            ],
            bottom: [
                { state: 'Bihar', value: 61.8, male: 71.2, female: 51.5, info: 'Lowest literacy state, significant gender gap.' },
                { state: 'Arunachal Pradesh', value: 65.4, male: 72.6, female: 57.7, info: 'Low literacy, challenging terrain.' },
                { state: 'Rajasthan', value: 66.1, male: 79.2, female: 52.1, info: 'Low female literacy is a key issue.' },
                { state: 'Jharkhand', value: 66.4, male: 76.8, female: 55.4, info: 'Faces challenges in educational outreach.' },
                { state: 'Andhra Pradesh', value: 67.0, male: 74.9, female: 59.1, info: 'Literacy below the national average.' }
            ]
        },
        sexRatio: {
            top: [
                { state: 'Kerala', value: 1084, child: 964, info: 'Only state with more women than men.' },
                { state: 'Puducherry (UT)', value: 1037, child: 967, info: 'Highest sex ratio among UTs.' },
                { state: 'Tamil Nadu', value: 996, child: 943, info: 'Healthy sex ratio in the south.' },
                { state: 'Andhra Pradesh', value: 993, child: 939, info: 'Balanced sex ratio.' },
                { state: 'Chhattisgarh', value: 991, child: 969, info: 'High sex ratio in central India.' }
            ],
            bottom: [
                { state: 'Daman & Diu (UT)', value: 618, child: 904, info: 'Alarmingly low sex ratio, lowest in India.' },
                { state: 'Dadra & Nagar Haveli', value: 774, child: 926, info: 'Very low sex ratio.' },
                { state: 'Chandigarh (UT)', value: 818, child: 880, info: 'Low sex ratio in a planned city.' },
                { state: 'Delhi (NCT)', value: 868, child: 871, info: 'Low sex ratio in the national capital.' },
                { state: 'Haryana', value: 879, child: 834, info: 'Lowest sex ratio among states, also lowest child sex ratio.' }
            ]
        },
        scst: {
            labels: ['Punjab (SC %)', 'Mizoram (ST %)', 'UP (Highest SC Pop.)', 'MP (Highest ST Pop.)'],
            sc_percent: [31.9, 0, 20.7, 15.6],
            st_percent: [0, 94.4, 0.6, 21.1],
        },
        ruralUrban: {
            labels: ['Rural Population', 'Urban Population'],
            data: [68.84, 31.16],
        },
        religion: {
            labels: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Others'],
            data: [79.8, 14.2, 2.3, 1.7, 0.7, 0.4, 0.9],
        }
    };

    const renderPopulationChart = (type) => {
        if (populationChartInstance.current) {
            populationChartInstance.current.destroy();
        }
        const data = censusData.population[type];
        const ctx = populationChartRef.current.getContext('2d');
        populationChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.state),
                datasets: [{
                    label: 'Population (in millions)',
                    data: data.map(d => d.value),
                    backgroundColor: '#14B8A6',
                    borderColor: '#0F766E',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw.toFixed(2)} million`
                        }
                    }
                },
                onHover: (event, chartElement) => {
                    const infoP = document.getElementById('populationChartInfo');
                    if (chartElement.length) {
                        const index = chartElement[0].index;
                        infoP.textContent = data[index].info;
                    } else {
                        infoP.textContent = "Hover over a bar to see details.";
                    }
                },
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    };

    const renderDensityChart = (type) => {
        if (densityChartInstance.current) {
            densityChartInstance.current.destroy();
        }
        const data = censusData.density[type];
        const ctx = densityChartRef.current.getContext('2d');
        densityChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.state),
                datasets: [{
                    label: 'Persons / km²',
                    data: data.map(d => d.value),
                    backgroundColor: '#F97316',
                    borderColor: '#B45309',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                 plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw} persons/km²`
                        }
                    }
                },
                onHover: (event, chartElement) => {
                    const infoP = document.getElementById('densityChartInfo');
                    if (chartElement.length) {
                        const index = chartElement[0].index;
                        infoP.textContent = data[index].info;
                    } else {
                         infoP.textContent = "Hover over a bar to see details.";
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        type: 'logarithmic',
                    }
                }
            }
        });
    };

    const renderLiteracyChart = (type) => {
        if (literacyChartInstance.current) {
            literacyChartInstance.current.destroy();
        }
        const data = censusData.literacy[type];
        const ctx = literacyChartRef.current.getContext('2d');
        literacyChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.state),
                datasets: [
                    {
                        label: 'Male Literacy',
                        data: data.map(d => d.male),
                        backgroundColor: '#3B82F6',
                        borderWidth: 1
                    },
                    {
                        label: 'Female Literacy',
                        data: data.map(d => d.female),
                        backgroundColor: '#F472B6',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { position: 'bottom' },
                     tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}%`
                        }
                    }
                },
                 onHover: (event, chartElement) => {
                    const infoP = document.getElementById('literacyChartInfo');
                    if (chartElement.length) {
                        const index = chartElement[0].index;
                        infoP.textContent = data[index].info;
                    } else {
                        infoP.textContent = "Hover over a bar to see gender-wise breakdown.";
                    }
                },
                scales: {
                    x: {
                        beginAtZero: false,
                        min: 45,
                        max: 100
                    }
                }
            }
        });
    };

    const renderSexRatioChart = (type) => {
        if (sexRatioChartInstance.current) {
            sexRatioChartInstance.current.destroy();
        }
        const data = censusData.sexRatio[type];
        const ctx = sexRatioChartRef.current.getContext('2d');
        sexRatioChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.state),
                datasets: [
                     {
                        label: 'Overall Sex Ratio',
                        data: data.map(d => d.value),
                        backgroundColor: '#10B981',
                        borderWidth: 1
                    },
                    {
                        label: 'Child Sex Ratio (0-6)',
                        data: data.map(d => d.child),
                        backgroundColor: '#EF4444',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}`
                        }
                    }
                },
                onHover: (event, chartElement) => {
                    const infoP = document.getElementById('sexRatioChartInfo');
                    if (chartElement.length) {
                        const index = chartElement[0].index;
                        infoP.textContent = data[index].info;
                    } else {
                        infoP.textContent = "Hover over a bar to see child sex ratio.";
                    }
                },
                 scales: {
                    x: {
                        beginAtZero: false,
                        min: 600
                    }
                }
            }
        });
    };

     const renderRuralUrbanChart = () => {
        if (ruralUrbanChartInstance.current) {
            ruralUrbanChartInstance.current.destroy();
        }
        const ctx = ruralUrbanChartRef.current.getContext('2d');
        ruralUrbanChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: censusData.ruralUrban.labels,
                datasets: [{
                    data: censusData.ruralUrban.data,
                    backgroundColor: ['#16A34A', '#EA580C'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
                }
            }
        });
    };

    const renderReligionChart = () => {
        if (religionChartInstance.current) {
            religionChartInstance.current.destroy();
        }
        const ctx = religionChartRef.current.getContext('2d');
        religionChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: censusData.religion.labels,
                datasets: [{
                    data: censusData.religion.data,
                    backgroundColor: ['#F97316', '#16A34A', '#3B82F6', '#FACC15', '#6366F1', '#A855F7', '#64748B'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 15 } },
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
                }
            }
        });
    };

    const renderScStChart = () => {
        if (scstChartInstance.current) {
            scstChartInstance.current.destroy();
        }
        const data = censusData.scst;
        const ctx = scstChartRef.current.getContext('2d');
        scstChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'SC Population %',
                        data: data.sc_percent,
                        backgroundColor: '#6D28D9',
                    },
                    {
                        label: 'ST Population %',
                        data: data.st_percent,
                        backgroundColor: '#DB2777',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.raw}%` } }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } },
                    x: {}
                }
            }
        });
    };

    useEffect(() => {
        if (activeTab === 'population') {
            renderPopulationChart(populationChartType);
            renderDensityChart(densityChartType);
        } else if (activeTab === 'literacy-gender') {
            renderLiteracyChart(literacyChartType);
            renderSexRatioChart(sexRatioChartType);
        } else if (activeTab === 'socio-economic') {
            renderRuralUrbanChart();
            renderReligionChart();
            renderScStChart();
        }
        // Cleanup charts on tab change or component unmount
        return () => {
            if (populationChartInstance.current) populationChartInstance.current.destroy();
            if (densityChartInstance.current) densityChartInstance.current.destroy();
            if (literacyChartInstance.current) literacyChartInstance.current.destroy();
            if (sexRatioChartInstance.current) sexRatioChartInstance.current.destroy();
            if (ruralUrbanChartInstance.current) ruralUrbanChartInstance.current.destroy();
            if (religionChartInstance.current) religionChartInstance.current.destroy();
            if (scstChartInstance.current) scstChartInstance.current.destroy();
        };
    }, [activeTab, populationChartType, densityChartType, literacyChartType, sexRatioChartType]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const getButtonClasses = (currentType, buttonType) => {
        return `px-4 py-2 rounded-md shadow hover:bg-teal-600 ${currentType === buttonType ? 'bg-teal-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`;
    };

    return (
        <div className="w-screen p-4 md:p-8 bg-white ">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">2011 India Census: Exam Prep Dashboard</h1>
                <p className="text-md text-gray-600 mt-2">An interactive tool to master key data for the SSC CGL Exam.</p>
            </header>

            <nav className="flex justify-center border-b-2 border-gray-200 mb-8">
                <button
                    onClick={() => handleTabClick('overview')}
                    className={`nav-link text-lg font-semibold border-b-4 border-transparent px-4 py-2 hover:text-teal-600 ${activeTab === 'overview' ? 'active text-teal-600 border-teal-500' : 'text-gray-500'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => handleTabClick('population')}
                    className={`nav-link text-lg font-semibold border-b-4 border-transparent px-4 py-2 hover:text-teal-600 ${activeTab === 'population' ? 'active text-teal-600 border-teal-500' : 'text-gray-500'}`}
                >
                    Population
                </button>
                <button
                    onClick={() => handleTabClick('literacy-gender')}
                    className={`nav-link text-lg font-semibold border-b-4 border-transparent px-4 py-2 hover:text-teal-600 ${activeTab === 'literacy-gender' ? 'active text-teal-600 border-teal-500' : 'text-gray-500'}`}
                >
                    Literacy & Gender
                </button>
                <button
                    onClick={() => handleTabClick('socio-economic')}
                    className={`nav-link text-lg font-semibold border-b-4 border-transparent px-4 py-2 hover:text-teal-600 ${activeTab === 'socio-economic' ? 'active text-teal-600 border-teal-500' : 'text-gray-500'}`}
                >
                    Socio-Economic
                </button>
            </nav>

            <main>
                {/* Overview Section */}
                <section id="overview" className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-700">This section provides a snapshot of the most critical national-level figures from the 2011 Census. These are the foundational numbers essential for any exam preparation, offering a high-level view of India's demographic landscape.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Total Population</h3>
                            <p className="text-3xl font-bold text-teal-600 mt-2">1.21 Billion</p>
                            <p className="text-sm text-gray-500 mt-1">(1,210,854,977)</p>
                        </div>
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Decadal Growth (2001-11)</h3>
                            <p className="text-3xl font-bold text-teal-600 mt-2">17.7%</p>
                            <p className="text-sm text-gray-500 mt-1">A decline from 21.5% in the previous decade.</p>
                        </div>
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Population Density</h3>
                            <p className="text-3xl font-bold text-teal-600 mt-2">382 / km²</p>
                            <p className="text-sm text-gray-500 mt-1">One of the highest in the world.</p>
                        </div>
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Overall Sex Ratio</h3>
                            <p className="text-3xl font-bold text-teal-600 mt-2">943</p>
                            <p className="text-sm text-gray-500 mt-1">Females per 1000 males. An improvement from 933 in 2001.</p>
                        </div>
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Overall Literacy Rate</h3>
                            <p className="text-3xl font-bold text-teal-600 mt-2">74.04%</p>
                            <p className="text-sm text-gray-500 mt-1">Male: 82.14%, Female: 65.46%</p>
                        </div>
                        <div className="kpi-card bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-500">Child Sex Ratio (0-6 Yrs)</h3>
                            <p className="text-3xl font-bold text-red-500 mt-2">919</p>
                            <p className="text-sm text-gray-500 mt-1">A decline from 927 in 2001, a key concern.</p>
                        </div>
                    </div>
                    <div className="mt-8 bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-6 rounded-r-lg">
                        <h3 className="text-xl font-bold">Key Officials & Motto</h3>
                        <p className="mt-2 text-lg"><strong>Registrar General & Census Commissioner:</strong> C. Chandra Mouli</p>
                        <p className="mt-1 text-lg"><strong>Motto:</strong> "Our Census, Our Future"</p>
                    </div>
                </section>

                {/* Population Section */}
                <section id="population" className={`tab-content ${activeTab === 'population' ? 'active' : ''}`}>
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-700">Explore India's population distribution and density. This section allows you to interactively compare states, focusing on the rankings for most/least populous and highest/lowest density, which are common exam topics. Note the unique case of Nagaland's negative growth.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">State Population Comparison</h3>
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setPopulationChartType('top')}
                                    className={getButtonClasses(populationChartType, 'top')}
                                >
                                    Most Populous
                                </button>
                                <button
                                    onClick={() => setPopulationChartType('bottom')}
                                    className={getButtonClasses(populationChartType, 'bottom')}
                                >
                                    Least Populous
                                </button>
                            </div>
                            <div className="chart-container"><canvas ref={populationChartRef}></canvas></div>
                            <p id="populationChartInfo" className="text-center text-gray-600 mt-4 h-10">Hover over a bar to see details.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Population Density Comparison (Persons / km²)</h3>
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setDensityChartType('top')}
                                    className={getButtonClasses(densityChartType, 'top')}
                                >
                                    Highest Density
                                </button>
                                <button
                                    onClick={() => setDensityChartType('bottom')}
                                    className={getButtonClasses(densityChartType, 'bottom')}
                                >
                                    Lowest Density
                                </button>
                            </div>
                            <div className="chart-container"><canvas ref={densityChartRef}></canvas></div>
                            <p id="densityChartInfo" className="text-center text-gray-600 mt-4 h-10">Hover over a bar to see details.</p>
                        </div>
                    </div>
                    <div className="mt-8 bg-red-50 border-l-4 border-red-500 text-red-800 p-6 rounded-r-lg">
                        <h3 className="text-xl font-bold">Unique Fact: Negative Growth State</h3>
                        <p className="mt-2 text-lg"><strong>Nagaland</strong> is the only state that recorded a negative decadal population growth rate of <strong>-0.6%</strong> between 2001 and 2011. This is a crucial point for exams.</p>
                    </div>
                </section>

                {/* Literacy & Gender Section */}
                <section id="literacy-gender" className={`tab-content ${activeTab === 'literacy-gender' ? 'active' : ''}`}>
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-700">This section visualizes literacy rates and sex ratios, key indicators of social development. Use the interactive charts to compare states, understand gender gaps, and identify the top and bottom performers—all critical for SSC CGL preparation.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Literacy Rate Comparison (%)</h3>
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setLiteracyChartType('top')}
                                    className={getButtonClasses(literacyChartType, 'top')}
                                >
                                    Highest Literacy
                                </button>
                                <button
                                    onClick={() => setLiteracyChartType('bottom')}
                                    className={getButtonClasses(literacyChartType, 'bottom')}
                                >
                                    Lowest Literacy
                                </button>
                            </div>
                            <div className="chart-container"><canvas ref={literacyChartRef}></canvas></div>
                            <p id="literacyChartInfo" className="text-center text-gray-600 mt-4 h-10">Hover over a bar to see gender-wise breakdown.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Sex Ratio Comparison (Females per 1000 Males)</h3>
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setSexRatioChartType('top')}
                                    className={getButtonClasses(sexRatioChartType, 'top')}
                                >
                                    Highest Sex Ratio
                                </button>
                                <button
                                    onClick={() => setSexRatioChartType('bottom')}
                                    className={getButtonClasses(sexRatioChartType, 'bottom')}
                                >
                                    Lowest Sex Ratio
                                </button>
                            </div>
                            <div className="chart-container"><canvas ref={sexRatioChartRef}></canvas></div>
                            <p id="sexRatioChartInfo" className="text-center text-gray-600 mt-4 h-10">Hover over a bar to see child sex ratio.</p>
                        </div>
                    </div>
                </section>

                {/* Socio-Economic Section */}
                <section id="socio-economic" className={`tab-content ${activeTab === 'socio-economic' ? 'active' : ''}`}>
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-700">Delve into India's socio-economic fabric, including the rural-urban divide, religious composition, and community-wise population stats. These doughnut charts provide a clear, proportional view of key societal structures, which are important for a holistic understanding.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Rural vs. Urban Population Split</h3>
                            <div className="chart-container h-80"><canvas ref={ruralUrbanChartRef}></canvas></div>
                            <div className="mt-4 text-center">
                                <p className="text-lg">Most urbanized state: <strong>Goa (62.2%)</strong></p>
                                <p className="text-lg">Highest rural population %: <strong>Himachal Pradesh (89.97%)</strong></p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Religious Composition (%)</h3>
                            <div className="chart-container h-80"><canvas ref={religionChartRef}></canvas></div>
                            <div className="mt-4 text-center">
                                <p className="text-lg">Largest Tribal Group: <strong>Bhil</strong></p>
                                <p className="text-lg">Most Spoken Language: <strong>Hindi</strong></p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:col-span-2">
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">SC & ST Population (%)</h3>
                            <div className="chart-container"><canvas ref={scstChartRef}></canvas></div>
                            <div className="mt-4 text-center">
                                <p className="text-lg">State with highest SC %: <strong>Punjab (31.9%)</strong> | State with highest ST %: <strong>Mizoram (94.4%)</strong></p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
