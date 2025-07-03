import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const App = () => {
    const planData = [
        { id: 1, name: 'First Plan', duration: '1951-56', target: 2.1, actual: 3.6, focus: 'Agriculture & Primary Sector', model: 'Harrod-Domar', initiatives: ['Rehabilitation of refugees', 'Inflation control', 'Bhakra-Nangal & Hirakud dams initiated', 'Five IITs established'], success: 'Exceeded growth target, boosted agricultural output, and stabilized the post-partition economy.', failure: 'Success was heavily reliant on good monsoons rather than structural changes alone.' },
        { id: 2, name: 'Second Plan', duration: '1956-61', target: 4.5, actual: 4.27, focus: 'Rapid Industrialization (Heavy Industry)', model: 'Mahalanobis Model', initiatives: ['Steel plants at Bhilai, Durgapur, Rourkela', 'Industrial Policy of 1956', 'Atomic Energy Commission formed'], success: 'Successfully laid the foundation for India\'s heavy industrial base.', failure: 'Led to a severe foreign exchange crisis and rising inflation due to import-heavy strategy.' },
        { id: 3, name: 'Third Plan', duration: '1961-66', target: 5.6, actual: 2.4, focus: 'Self-Reliant & Self-Generating Economy', model: 'Sandy-Chakraborty', initiatives: ['Panchayat elections initiated', 'State Electricity Boards formed'], success: 'Decentralization efforts like Panchayat elections were a key political reform.', failure: 'Considered a "miserable failure" due to Sino-Indian War (1962), Indo-Pak War (1965), and severe droughts.' },
        { id: 'h1', name: 'Plan Holidays', duration: '1966-69', target: null, actual: null, focus: 'Crisis Management & Agriculture', model: 'N/A', initiatives: ['Three annual plans instead of a Five-Year plan', 'Devaluation of the Rupee (1966)', 'Focus on high-yielding variety seeds'], success: 'Helped the economy absorb the shocks of the Third Plan failure and stabilized food security efforts.', failure: 'Represented a pause in long-term strategic planning due to severe crises.' },
        { id: 4, name: 'Fourth Plan', duration: '1969-74', target: 5.6, actual: 3.3, focus: 'Growth with Stability & Self-Reliance', model: 'Gadgil Formula', initiatives: ['Nationalization of 14 major banks (1969)', 'Green Revolution advanced', 'Drought Prone Area Programme (DPAP)'], success: 'The Green Revolution made India self-sufficient in food grains, a monumental achievement.', failure: 'Growth targets missed due to Indo-Pak War (1971) and the 1973 oil crisis.' },
        { id: 5, name: 'Fifth Plan', duration: '1974-78', target: 4.4, actual: 4.8, focus: 'Poverty Alleviation (Garibi Hatao) & Employment', model: 'D.P. Dhar (MNP)', initiatives: ['Minimum Needs Programme (MNP)', 'Twenty-Point Programme', 'Indian National Highway System introduced'], success: 'Exceeded growth target and made a direct, focused attack on poverty.', failure: 'Plan was prematurely terminated in 1978 by the new Janata Party government.' },
        { id: 'h2', name: 'Rolling Plan', duration: '1978-80', target: null, actual: null, focus: 'Interim Period', model: 'N/A', initiatives: ['An intervening period of political change after the Fifth Plan was terminated.'], success: 'N/A', failure: 'Further disrupted planning continuity.' },
        { id: 6, name: 'Sixth Plan', duration: '1980-85', target: 5.2, actual: 5.7, focus: 'Poverty Reduction & Economic Liberalization', model: 'N/A', initiatives: ['NABARD established (1982)', 'Integrated Rural Development Programme (IRDP)', 'Beginning of the end of "Nehruvian Socialism"'], success: 'Exceeded growth target and laid the groundwork for future economic reforms.', failure: 'Elimination of price controls led to an increase in the cost of living.' },
        { id: 7, name: 'Seventh Plan', duration: '1985-90', target: 5.0, actual: 6.02, focus: 'Foodgrain Production, Employment & Productivity', model: 'N/A', initiatives: ['Jawahar Rozgar Yojana (JRY) launched', 'Focus on modernization and technology'], success: 'High growth achieved despite severe drought conditions in the initial years.', failure: 'Led to a widening current account deficit, sowing the seeds of the 1991 crisis.' },
        { id: 'h3', name: 'Annual Plans', duration: '1990-92', target: null, actual: null, focus: 'Crisis Management & Structural Adjustment', model: 'N/A', initiatives: ['Beginning of major LPG (Liberalization, Privatization, Globalization) reforms'], success: 'Successfully navigated a severe foreign exchange crisis.', failure: 'Marked by extreme economic instability.' },
        { id: 8, name: 'Eighth Plan', duration: '1992-97', target: 5.6, actual: 6.8, focus: 'LPG Reforms & Human Resource Development', model: 'N/A', initiatives: ['Full implementation of LPG reforms', 'India joins the World Trade Organization (WTO) in 1995', 'Focus on decentralization'], success: 'Highest growth rate achieved to date; successful economic stabilization and opening.', failure: 'Benefits of reforms were not equally distributed initially.' },
        { id: 9, name: 'Ninth Plan', duration: '1997-2002', target: 6.5, actual: 5.4, focus: 'Growth with Social Justice & Equality', model: 'N/A', initiatives: ['Special Action Plans (SAP)', 'Emphasis on cooperative federalism', 'Focus on rural development'], success: 'Strong growth in industrial and service sectors; empowered state governments.', failure: 'Missed the overall GDP growth target due to global and domestic factors.' },
        { id: 10, name: 'Tenth Plan', duration: '2002-07', target: 8.0, actual: 8.0, focus: '8% GDP Growth, Poverty & Literacy Reduction', model: 'N/A', initiatives: ['Aim to double per capita income in 10 years', 'Specific targets for social indicators (literacy, gender gap)'], success: 'Achieved record-high 8% growth and met several key social targets.', failure: 'Employment generation did not keep pace with economic growth.' },
        { id: 11, name: 'Eleventh Plan', duration: '2007-12', target: 9.0, actual: 8.0, focus: 'Rapid & More Inclusive Growth', model: 'N/A', initiatives: ['Focus on social sector delivery', 'Empowerment through education and skill development', 'Environmental sustainability'], success: 'Sustained high growth and increased focus on inclusivity and social welfare.', failure: 'Growth was impacted by the 2008 global financial crisis; agriculture and industry slightly underperformed.' },
        { id: 12, name: 'Twelfth Plan', duration: '2012-17', target: 8.0, actual: 6.7, focus: 'Faster, More Inclusive & Sustainable Growth', model: 'N/A', initiatives: ['Focus on infrastructure investment (US$1 trillion target)', 'Direct benefit transfer using Aadhaar', 'Emphasis on renewable energy'], success: 'Poverty decline continued; focus on sustainable practices.', failure: 'Final plan of the commission; growth impacted by global slowdown. Actual growth rate hovered around 6.7%.' },
    ];

    const [selectedPlanId, setSelectedPlanId] = useState(1);
    const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
    const individualPlanChartRef = useRef(null);
    const overviewChartRef = useRef(null);

    const getPlanColor = (plan) => {
        if (typeof plan.id === 'string' && plan.id.startsWith('h')) return 'bg-custom-gray';
        if (plan.actual === null) return 'bg-custom-blue';
        if (plan.actual >= plan.target) return 'bg-custom-green';
        return 'bg-custom-red';
    };

    const createOverviewChart = () => {
        const numericPlans = planData.filter(p => typeof p.id === 'number');
        const labels = numericPlans.map(p => `${p.name} (${p.duration})`);
        const targetData = numericPlans.map(p => p.target);
        const actualData = numericPlans.map(p => p.actual);

        const ctx = document.getElementById('overview-chart');
        if (ctx) {
            if (overviewChartRef.current) {
                overviewChartRef.current.destroy();
            }
            overviewChartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Target Growth',
                        data: targetData,
                        borderColor: 'rgba(243, 156, 18, 1)',
                        backgroundColor: 'rgba(243, 156, 18, 0.2)',
                        fill: false,
                        tension: 0.1,
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }, {
                        label: 'Actual Growth',
                        data: actualData,
                        borderColor: 'rgba(52, 152, 219, 1)',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        fill: false,
                        tension: 0.1,
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'GDP Growth Rate (%)'
                            }
                        },
                        x: {
                           ticks: {
                                callback: function(value, index, values) {
                                    const label = this.getLabelForValue(value);
                                    return label.split(' ')[0];
                                }
                           }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    }
                }
            });
        }
    };

    const updatePlanDetails = (id) => {
        const plan = planData.find(p => p.id === id);
        if (!plan) return;

        // Directly set the plan details, removing the setTimeout for immediate update
        setCurrentPlanDetails(plan);
    };

    const handleTimelineItemClick = (id) => {
        setSelectedPlanId(id);
        updatePlanDetails(id); // Ensure details are updated when a timeline item is clicked
    };

    // Initial setup and cleanup
    useEffect(() => {
        createOverviewChart();
        updatePlanDetails(selectedPlanId); // Load initial plan details

        return () => {
            if (overviewChartRef.current) {
                overviewChartRef.current.destroy();
            }
            if (individualPlanChartRef.current) {
                individualPlanChartRef.current.destroy();
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    // Effect for individual plan chart rendering when currentPlanDetails changes
    useEffect(() => {
        if (currentPlanDetails && typeof currentPlanDetails.id === 'number' && currentPlanDetails.target !== null) {
            const ctx = document.getElementById('individual-plan-chart');
            if (ctx) {
                if (individualPlanChartRef.current) {
                    individualPlanChartRef.current.destroy();
                }
                individualPlanChartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['GDP Growth'],
                        datasets: [{
                            label: 'Target',
                            data: [currentPlanDetails.target],
                            backgroundColor: 'rgba(243, 156, 18, 0.6)',
                            borderColor: 'rgba(243, 156, 18, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Actual',
                            data: [currentPlanDetails.actual],
                            backgroundColor: 'rgba(52, 152, 219, 0.6)',
                            borderColor: 'rgba(52, 152, 219, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Growth Rate (%)'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.raw}%`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } else if (individualPlanChartRef.current) {
            // Destroy chart if it's a holiday plan or no target
            individualPlanChartRef.current.destroy();
            individualPlanChartRef.current = null;
        }
    }, [currentPlanDetails]); // Re-run when currentPlanDetails changes

    return (
        <div className="bg-custom-beige w-screen">
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #fdfcf9;
                    color: #4a4a4a;
                }
                .timeline-item {
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                }
                .timeline-item.active {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .timeline-item:hover {
                    transform: translateY(-4px);
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 300px;
                    max-height: 40vh;
                }
                @media (min-width: 768px) {
                    .chart-container {
                        height: 400px;
                    }
                }
                .bg-custom-beige { background-color: #fdfcf9; }
                .bg-custom-card { background-color: #ffffff; }
                .text-custom-title { color: #2c3e50; }
                .text-custom-subtitle { color: #34495e; }
                .text-custom-body { color: #595959; }
                .border-custom-accent { border-color: #e67e22; }
                .bg-custom-accent { background-color: #e67e22; }
                .bg-custom-accent-light { background-color: #f39c12; }
                .bg-custom-blue { background-color: #3498db; }
                .bg-custom-green { background-color: #2ecc71; }
                .bg-custom-red { background-color: #e74c3c; }
                .bg-custom-gray { background-color: #95a5a6; }
                .section-fade-in {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeIn 0.8s forwards;
                }
                @keyframes fadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <header className="text-center mb-12 section-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-custom-title mb-2">The Journey of India's Five-Year Plans</h1>
                    <p className="text-lg text-custom-body max-w-3xl mx-auto">An interactive exploration of India's post-independence economic strategy, from centralized planning to a market-oriented future.</p>
                </header>

                <main>
                    <section id="overview-dashboard" className="mb-16 section-fade-in" style={{ animationDelay: '0.2s' }}>
                         <h2 className="text-2xl md:text-3xl font-bold text-custom-title text-center mb-4">Era of Planning: A 66-Year Overview</h2>
                         <p className="text-center text-custom-body mb-8 max-w-4xl mx-auto">This chart provides a macro-level view of the entire planning era, plotting the targeted GDP growth against the actual growth achieved for each of the twelve plans. It reveals the ambitions, successes, and challenges of India's economic journey over more than six decades. Hover over any point to see the specifics for that plan period.</p>
                        <div className="bg-custom-card p-4 sm:p-6 rounded-2xl shadow-lg">
                            <div className="chart-container">
                                <canvas id="overview-chart"></canvas>
                            </div>
                        </div>
                    </section>
                    
                    <section id="interactive-timeline" className="mb-16 section-fade-in" style={{ animationDelay: '0.4s' }}>
                        <h2 className="text-2xl md:text-3xl font-bold text-custom-title text-center mb-4">Interactive Timeline</h2>
                        <p className="text-center text-custom-body mb-8 max-w-3xl mx-auto">Click on any plan below to explore its detailed objectives, key initiatives, and performance. The timeline visually guides you through the chronological progression of India's development strategy, including interruptions like 'Plan Holidays'.</p>
                        <div id="timeline-container" className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
                            {planData.map(plan => (
                                <div
                                    key={plan.id}
                                    className={`timeline-item flex-grow text-center p-3 rounded-lg text-white shadow-md ${getPlanColor(plan)} ${selectedPlanId === plan.id ? 'active' : ''}`}
                                    onClick={() => handleTimelineItemClick(plan.id)}
                                >
                                    <h3 className="font-bold text-sm md:text-base">{plan.name}</h3>
                                    <p className="text-xs md:text-sm">{plan.duration}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="plan-details-section" className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl min-h-[500px] section-fade-in" style={{ animationDelay: '0.6s' }}>
                        {currentPlanDetails && (
                            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${currentPlanDetails ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}>
                                <div>
                                    <h2 className="text-3xl font-bold text-custom-title mb-1">{currentPlanDetails.name} <span className="text-2xl font-medium text-custom-subtitle">({currentPlanDetails.duration})</span></h2>
                                    <p className="text-lg text-custom-body font-semibold mb-6">Focus: {currentPlanDetails.focus}</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-custom-subtitle">Economic Model:</h4>
                                            <p className="text-custom-body">{currentPlanDetails.model}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-custom-subtitle">Key Initiatives & Features:</h4>
                                            <p className="text-custom-body">{currentPlanDetails.initiatives.join(', ')}.</p>
                                        </div>
                                         <div>
                                            <h4 className="font-bold text-custom-subtitle">Successes:</h4>
                                            <p className="text-green-700">{currentPlanDetails.success}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-custom-subtitle">Shortcomings/Failures:</h4>
                                            <p className="text-red-700">{currentPlanDetails.failure}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    {typeof currentPlanDetails.id === 'number' && currentPlanDetails.target !== null ? (
                                        <>
                                            <h3 className="text-xl font-semibold text-custom-subtitle text-center mb-4">GDP Growth Performance (%)</h3>
                                            <div className="w-full h-64 md:h-80">
                                                <canvas id="individual-plan-chart"></canvas>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center bg-gray-100 p-8 rounded-xl h-full flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold text-custom-subtitle">Planning Interruption</h3>
                                            <p className="text-custom-body mt-2">This was a period of annual plans focused on short-term crisis management rather than a long-term five-year strategy. Therefore, no fixed growth targets were set.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    <section id="thematic-sections" className="mt-16">
                        <div id="philosophy" className="mb-12 section-fade-in" style={{ animationDelay: '0.8s' }}>
                            <h2 className="text-2xl md:text-3xl font-bold text-custom-title text-center mb-4">The Guiding Philosophy</h2>
                            <p className="text-center text-custom-body mb-8 max-w-3xl mx-auto">While specific priorities shifted, a set of core objectives consistently underpinned India's planning efforts. This section introduces the foundational pillars that guided the nation's development strategy for over half a century, shaping policies across all sectors.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-custom-card p-6 rounded-xl shadow-md">
                                    <h3 className="font-bold text-xl text-custom-subtitle mb-2">📈 Growth</h3>
                                    <p className="text-custom-body">To increase the country's GDP and productive capacity, aiming to raise the overall standard of living for the population.</p>
                                </div>
                                <div className="bg-custom-card p-6 rounded-xl shadow-md">
                                    <h3 className="font-bold text-xl text-custom-subtitle mb-2">🔬 Modernization</h3>
                                    <p className="text-custom-body">Adopting new technologies in industry and agriculture, alongside fostering progressive changes in social outlook, like gender equality.</p>
                                </div>
                                <div className="bg-custom-card p-6 rounded-xl shadow-md">
                                    <h3 className="font-bold text-xl text-custom-subtitle mb-2">🇮🇳 Self-Reliance</h3>
                                    <p className="text-custom-body">Reducing dependence on foreign countries for essential goods, capital, and technology to safeguard national sovereignty.</p>
                                </div>
                                 <div className="bg-custom-card p-6 rounded-xl shadow-md">
                                    <h3 className="font-bold text-xl text-custom-subtitle mb-2">⚖️ Equity & Social Justice</h3>
                                    <p className="text-custom-body">Ensuring the benefits of economic growth were distributed inclusively to reduce inequality and improve the lives of the poorest citizens.</p>
                                </div>
                            </div>
                        </div>

                        <div id="niti-aayog" className="section-fade-in" style={{ animationDelay: '1s' }}>
                            <h2 className="text-2xl md:text-3xl font-bold text-custom-title text-center mb-4">A Paradigm Shift: The Transition to NITI Aayog</h2>
                            <p className="text-center text-custom-body mb-8 max-w-4xl mx-auto">In 2015, the era of the Five-Year Plans concluded with the dissolution of the Planning Commission. This section illustrates the fundamental shift in India's governance model to NITI Aayog, moving from a centralized, top-down planning system to a collaborative, 'bottom-up' approach focused on cooperative federalism and functioning as a policy think tank.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-custom-card p-8 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-custom-subtitle mb-4">Planning Commission (1950-2014)</h3>
                                    <ul className="text-left space-y-3 text-custom-body">
                                        <li className="flex items-start"><span className="bg-custom-red text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">-</span> <span>Top-Down, centralized planning model.</span></li>
                                        <li className="flex items-start"><span className="bg-custom-red text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">-</span> <span>Had powers to allocate funds to states.</span></li>
                                        <li className="flex items-start"><span className="bg-custom-red text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">-</span> <span>Followed a rigid "one-size-fits-all" approach.</span></li>
                                         <li className="flex items-start"><span className="bg-custom-red text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">-</span> <span>Created fixed Five-Year Plans.</span></li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-semibold text-custom-subtitle mb-4">NITI Aayog (2015-Present)</h3>
                                     <ul className="text-left space-y-3 text-custom-body">
                                        <li className="flex items-start"><span className="bg-custom-green text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">+</span> <span>Bottom-Up, cooperative federalism model.</span></li>
                                        <li className="flex items-start"><span className="bg-custom-green text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">+</span> <span>Acts as a policy think tank with no financial powers.</span></li>
                                        <li className="flex items-start"><span className="bg-custom-green text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">+</span> <span>Flexible, state-specific strategies.</span></li>
                                        <li className="flex items-start"><span className="bg-custom-green text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold flex-shrink-0">+</span> <span>Creates long-term vision & strategy documents.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="text-center mt-16 py-6 border-t border-gray-200">
                    <p className="text-custom-body">An interactive visualization based on the comprehensive overview of India's Five-Year Plans.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
