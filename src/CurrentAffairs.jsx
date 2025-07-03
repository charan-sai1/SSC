import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const SSC_CGL_2025_Current_Affairs_Navigator = () => {
    const [activeView, setActiveView] = useState('sports');
    const [openAccordions, setOpenAccordions] = useState({});
    const [activeSchemeTab, setActiveSchemeTab] = useState('pmjdy'); // New state for schemes tab

    // Refs for Chart.js canvases
    const olympicsChartRef = useRef(null);
    const nationalGamesChartRef = useRef(null);
    const lokSabhaChartRef = useRef(null);

    // Store chart instances to destroy on cleanup
    const chartInstances = useRef({});

    useEffect(() => {
        // Function to create and manage Chart.js instances
        const createChart = (ctx, type, data, options) => {
            if (ctx) {
                // Destroy existing chart instance if it exists to prevent conflicts
                if (chartInstances.current[ctx.id]) {
                    chartInstances.current[ctx.id].destroy();
                }
                const newChart = new Chart(ctx, { type, data, options });
                chartInstances.current[ctx.id] = newChart; // Store the new chart instance
                return newChart;
            }
            return null;
        };

        // Data and configuration for Olympics Medal Chart
        const olympicsMedalData = {
            labels: ['Shooting', 'Athletics', 'Hockey', 'Wrestling'],
            datasets: [{
                label: 'Medals',
                data: [3, 1, 1, 1], // 1 Silver, 5 Bronze -> 3 Shooting (2B), 1 Athletics (1S), 1 Hockey (1B), 1 Wrestling (1B)
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',  // blue-500
                    'rgba(245, 158, 11, 0.7)', // amber-500
                    'rgba(16, 185, 129, 0.7)', // emerald-500
                    'rgba(239, 68, 68, 0.7)'    // red-500
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        };

        // Data and configuration for Lok Sabha Election Chart
        const lokSabhaData = {
            labels: ['NDA', 'INDIA Alliance', 'Others'],
            datasets: [{
                label: 'Seats Won',
                data: [293, 234, 543 - 293 - 234], // Total seats 543
                backgroundColor: [
                    'rgba(245, 158, 11, 0.8)', // amber-500
                    'rgba(59, 130, 246, 0.8)',  // blue-500
                    'rgba(107, 114, 128, 0.8)'  // gray-500
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        };

        // Data and configuration for National Games Chart
        const nationalGamesData = {
            labels: ['SSCB', 'Maharashtra', 'Haryana'],
            datasets: [{
                label: 'Gold Medals',
                data: [68, 54, 48],
                backgroundColor: 'rgba(245, 158, 11, 0.7)', // amber-500
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 1
            },
            {
                label: 'Total Medals',
                data: [121, 201, 153],
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        };

        // Common chart options
        const commonChartOptions = (type, data, options = {}) => ({
            type: type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#4B5563', // gray-600
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1F2937', // gray-800
                        titleFont: { size: 14 },
                        bodyFont: { size: 12 },
                        padding: 10,
                        cornerRadius: 4
                    }
                },
                ...options
            }
        });

        // Initialize charts only when the corresponding canvas element is available
        if (olympicsChartRef.current) {
            createChart(olympicsChartRef.current, 'doughnut', olympicsMedalData, commonChartOptions('doughnut', olympicsMedalData).options);
        }
        if (lokSabhaChartRef.current) {
            createChart(lokSabhaChartRef.current, 'pie', lokSabhaData, commonChartOptions('pie', lokSabhaData).options);
        }
        if (nationalGamesChartRef.current) {
            createChart(nationalGamesChartRef.current, 'bar', nationalGamesData, {
                ...commonChartOptions('bar', nationalGamesData).options,
                indexAxis: 'y',
                scales: {
                    x: {
                        stacked: false,
                        ticks: { color: '#4B5563' }, // gray-600
                        grid: { display: false }
                    },
                    y: {
                        stacked: false,
                        ticks: { color: '#4B5563' }, // gray-600
                        grid: { color: '#E5E7EB' } // gray-200
                    }
                }
            });
        }

        // Cleanup function: destroy all chart instances when the component unmounts
        return () => {
            Object.values(chartInstances.current).forEach(chart => chart.destroy());
            chartInstances.current = {}; // Clear the ref
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    const handleNavClick = (viewName) => {
        setActiveView(viewName);
    };

    const handleAccordionClick = (index) => {
        setOpenAccordions(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    // Inline styles for elements originally in <style> tag
    const bodyStyle = {
        width:"100%",
        backgroundColor: '#F5F5F4', // stone-100
        fontFamily: "'Inter', sans-serif"
    };

    const chartContainerStyle = {
        position: 'relative',
        margin: 'auto',
        height: '320px',
        maxHeight: '320px',
        width: '100%',
        maxWidth: '400px'
    };

    // Responsive style for chart container (md breakpoint)
    // In a real Tailwind setup, you'd use classes like md:h-96 md:max-w-500px
    const nationalGamesChartContainerStyle = {
        height: '320px', // Default height
        maxHeight: '320px',
        width: '100%',
        maxWidth: '400px',
        // For md breakpoint, you'd typically use Tailwind's responsive classes
        // For inline style, this would require media queries in CSS or a CSS-in-JS solution
        // For demonstration, we'll keep the base style and rely on Tailwind for responsiveness
    };

    // Data for schemes to be displayed as cards
    const schemesData = {
        pmjdy: {
            title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
            launch: "August 28, 2014",
            objective: "Financial inclusion, ensuring access to financial services like banking, savings, credit, insurance, and pension in an affordable manner.",
            features: "Zero balance accounts, RuPay debit cards, accident insurance cover of ₹2 lakh, overdraft facility up to ₹10,000.",
            impact: "Over 52 crore beneficiaries with deposits exceeding ₹2.3 lakh crore. Significant increase in financial literacy and access to formal banking."
        },
        ayushman: {
            title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
            launch: "September 23, 2018",
            objective: "Provide health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 10.74 crore poor and vulnerable families.",
            features: "Cashless and paperless access to services at public and private empanelled hospitals. Covers pre-hospitalisation, hospitalisation, and post-hospitalisation expenses.",
            impact: "Over 30 crore Ayushman Cards issued. Reduced out-of-pocket expenditure for healthcare, especially for vulnerable sections."
        },
        pmkisan: {
            title: "PM Kisan Samman Nidhi",
            launch: "February 24, 2019",
            objective: "Provide income support to all landholding farmer families across the country to supplement their financial needs.",
            features: "₹6,000 per year in three equal installments of ₹2,000 every four months directly into the bank accounts of eligible farmers.",
            impact: "Benefited over 11 crore farmer families. Helped farmers meet expenses related to agriculture and domestic needs."
        },
        swachhbharat: {
            title: "Swachh Bharat Abhiyan",
            launch: "October 2, 2014",
            objective: "Achieve universal sanitation coverage and put focus on sanitation.",
            features: "Construction of individual household latrines, community and public toilets. Solid and liquid waste management. Behavioural change communication.",
            impact: "Over 10 crore individual household latrines constructed. Declared ODF (Open Defecation Free) India in 2019."
        },
        makeinindia: {
            title: "Make in India",
            launch: "September 25, 2014",
            objective: "Transform India into a global manufacturing and design hub.",
            features: "Focus on 25 key sectors. Ease of doing business initiatives. FDI policy liberalization. Skill development programs.",
            impact: "Increased FDI inflows. Boosted manufacturing output and job creation in various sectors."
        }
    };


    return (
        <div style={bodyStyle} className="text-gray-800">
            {/* The Alpine.js sidebar (x-data="{ open: false }") needs to be re-implemented with React state.
                For simplicity, this example does not include the sidebar functionality directly,
                but you would use useState for 'open' state and event handlers for toggling. */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 z-50 -translate-x-full" /* Adjust class based on open state */>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <nav className="space-y-3">
                        <a href="./FiveYearPlans.html" className="block text-gray-700 hover:text-blue-600">Five Year Plans</a>
                        <a href="./AnotherPage.html" className="block text-gray-700 hover:text-blue-600">Another Page</a>
                        <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
                    </nav>
                </div>
            </div>

            <div className="flex">
                <div className="container mx-auto p-4 md:p-8 max-w-7xl">
                    {/* Header */}
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">SSC CGL 2025 Current Affairs</h1>
                        <p className="text-gray-600 mt-2">An interactive guide to key events from Jan 2024 - June 2025</p>
                    </header>

                    {/* Sticky Navigation */}
                    <nav id="main-nav" className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md rounded-lg mb-8 flex flex-wrap justify-center items-center gap-2 p-2">
                        <button
                            data-view="sports"
                            className={`nav-item flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out ${activeView === 'sports' ? 'bg-blue-500 text-white' : 'hover:bg-stone-200'}`}
                            onClick={() => handleNavClick('sports')}
                        >
                            🏆<span>Sports</span>
                        </button>
                        <button
                            data-view="politics"
                            className={`nav-item flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out ${activeView === 'politics' ? 'bg-blue-500 text-white' : 'hover:bg-stone-200'}`}
                            onClick={() => handleNavClick('politics')}
                        >
                            🏛️<span>Politics</span>
                        </button>
                        <button
                            data-view="projects"
                            className={`nav-item flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out ${activeView === 'projects' ? 'bg-blue-500 text-white' : 'hover:bg-stone-200'}`}
                            onClick={() => handleNavClick('projects')}
                        >
                            🏗️<span>Projects</span>
                        </button>
                        <button
                            data-view="awards"
                            className={`nav-item flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out ${activeView === 'awards' ? 'bg-blue-500 text-white' : 'hover:bg-stone-200'}`}
                            onClick={() => handleNavClick('awards')}
                        >
                            🏅<span>Awards</span>
                        </button>
                        <button
                            data-view="schemes"
                            className={`nav-item flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out ${activeView === 'schemes' ? 'bg-blue-500 text-white' : 'hover:bg-stone-200'}`}
                            onClick={() => handleNavClick('schemes')}
                        >
                            📜<span>Schemes</span>
                        </button>
                    </nav>

                    <main id="main-content" className="relative">
                        {/* Sports View */}
                        <section
                            id="sports-view"
                            className={`content-view space-y-8 absolute w-full transition-opacity duration-300 ease-in-out ${activeView === 'sports' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-full hidden'}`}
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-2">🏆 Sports Highlights</h2>
                                <p className="text-gray-600 mt-2">This section covers major sporting events, national competitions, and accolades from January 2024 to June 2025. Explore India's performance on the global stage, key domestic league outcomes, and government initiatives promoting sports culture through interactive charts and summaries.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-4 text-center">Paris Olympics 2024: India's Medal Haul</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">India secured its third-best Olympic performance with 6 medals (1 Silver, 5 Bronze). The chart below breaks down the medals by sport. Interact with the chart to see details. Notable bronze medalists were Manu Bhaker (Women's 10m Air Pistol & Mixed Team 10m Air Pistol), Swapnil Kusale (Men's 50m Rifle 3 Positions), Indian Men's Hockey Team, and Aman Sehrawat (Men's Freestyle 57kg Wrestling).</p>
                                    <div style={chartContainerStyle}>
                                        <canvas id="olympicsMedalChart" ref={olympicsChartRef}></canvas>
                                    </div>
                                    <p className="text-sm text-gray-600 text-center mt-4">Neeraj Chopra secured the only Silver medal in Men's Javelin Throw, becoming the first Indian individual medalist to win both an Olympic gold and a silver medal. Manu Bhaker became the first Indian woman to win an Olympic shooting medal and first Indian to win two medals in a single Olympics.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-4 text-center">38th National Games 2025 (Uttarakhand)</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">The Services Sports Control Board (SSCB) topped the medal tally with 121 medals (68 Gold, 26 Silver, 27 Bronze). Maharashtra was second with 201 medals (54 Gold, 71 Silver, 76 Bronze), and Haryana third with 153 medals (48 Gold, 47 Silver, 58 Bronze). The games were held from January 28 to February 14, 2025, with the motto "Sankalp Se Shikhar Tak."</p>
                                    <div className="chart-container h-80 md:h-96" style={nationalGamesChartContainerStyle}>
                                        <canvas id="nationalGamesChart" ref={nationalGamesChartRef}></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                                <h3 className="font-bold text-xl mb-4 text-center">Major Tournament Winners (2024-25)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">ICC Men's T20 World Cup 2024</p>
                                        <p className="text-blue-600 font-bold text-lg">India</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">IPL 2024</p>
                                        <p className="text-blue-600 font-bold text-lg">Kolkata Knight Riders</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">Pro Kabaddi League 2024</p>
                                        <p className="text-blue-600 font-bold text-lg">Haryana Steelers</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 French Open (Men's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Carlos Alcaraz</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 French Open (Women's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Iga Świątek</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 Wimbledon (Men's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Carlos Alcaraz</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 Wimbledon (Women's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Barbora Krejčíková</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 US Open (Men's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Jannik Sinner</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2024 US Open (Women's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Aryna Sabalenka</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2025 Australian Open (Men's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Jannik Sinner</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">2025 Australian Open (Women's Singles)</p>
                                        <p className="text-blue-600 font-bold text-lg">Madison Keys</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">Hockey India League (HIL) 2024-25</p>
                                        <p className="text-blue-600 font-bold text-lg">Shrachi Rarh Bengal Tigers</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">Senior National Badminton Men's Singles 2024</p>
                                        <p className="text-blue-600 font-bold text-lg">M Raghu</p>
                                    </div>
                                    <div className="bg-stone-100 p-4 rounded-lg">
                                        <p className="font-semibold">Senior National Badminton Women's Singles 2024</p>
                                        <p className="text-blue-600 font-bold text-lg">Devika Sihag</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4 text-center">Other Major Sporting Achievements</h3>
                                    <div className="space-y-4">
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Paris 2024 Summer Paralympics</h4>
                                            <p className="text-sm text-gray-700">Indian para-athletes secured multiple gold medals. Notable gold medalists included Avani Lekhara (Shooting), Kumar Nitesh (Badminton), Sumit Antil (Athletics), and Harvinder Singh (Archery).</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Commonwealth Chess Championship 2024</h4>
                                            <p className="text-sm text-gray-700">Held in Sri Lanka (concluded Sep 5, 2024), India dominated with 107 medals (40 Gold, 41 Silver, 26 Bronze) across classical, rapid, and blitz formats.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Asian Athletics Championships</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                <li>Asian U20 Athletics Championships 2024 (Dubai): India finished 3rd with 29 medals (7 Gold, 11 Silver, 11 Bronze).</li>
                                                <li>Asian Indoor Athletics Championships 2024 (Tehran): India secured 4 medals (3 Gold, 1 Silver). Gold medalists: Harmilan Bains (1500m), Jyothi Yarraji (60m hurdles), Tajinderpal Singh Toor (shot put).</li>
                                                <li>Asian Athletics Championships 2025 (South Korea): India finished 2nd with 24 medals (8 Gold, 10 Silver, 6 Bronze). Notable gold medalists: Gulveer Singh (10000m, 5000m), Mixed 4x400m relay, Avinash Sable (3000m Steeplechase), Jyothi Yarraji (100m hurdles), Women's 4x400m relay, Pooja Singh (high jump), Nandini Agasara (Heptathlon).</li>
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Elorda Cup 2024 (Boxing)</h4>
                                            <p className="text-sm text-gray-700">Held in Astana, Kazakhstan, Indian boxing team won 12 medals, including 2 gold medals by Nikhat Zareen (52kg) and Minakshi (48kg).</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Asian Wrestling Championship 2024</h4>
                                            <p className="text-sm text-gray-700">Held in Bishkek, Kyrgyzstan, Indian team secured 9 medals (4 Silver, 5 Bronze). No gold medal won for the first time since 2019 as many top wrestlers skipped for Olympic Qualifiers.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">ISSF Junior World Championship 2024</h4>
                                            <p className="text-sm text-gray-700">Held in Lima, Peru, Indian shooters topped the medal tally with 24 medals (13 Gold, 3 Silver, 8 Bronze).</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">FIFA World Cup Qualifiers 2024</h4>
                                            <p className="text-sm text-gray-700">India finished 3rd in Round 2 Group A with 5 points (1 win, 2 draws, 3 losses), failing to qualify for Round 3.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4 text-center">National Sports Events in India</h3>
                                    <div className="space-y-4">
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Khelo India Youth Games 2024 (Tamil Nadu)</h4>
                                            <p className="text-sm text-gray-700">Held Jan 19-31, 2024, across Chennai, Madurai, Trichy, Coimbatore. Maharashtra won their 4th title with 158 medals (57 Gold). Tamil Nadu finished 2nd with 98 medals (38 Gold). Squash debuted as a competitive sport, Silambam as demonstration. Swimmer Vritti Agarwal (Telangana) won 5 individual golds.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4 text-center">Prominent Indian Athletes & Awards</h3>
                                    <div className="space-y-4">
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Major Dhyan Chand Khel Ratna Award 2024 (Presented Jan 17, 2025)</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                <li>Shri Gukesh D (Chess)</li>
                                                <li>Shri Harmanpreet Singh (Hockey)</li>
                                                <li>Shri Praveen Kumar (Para-Athletics)</li>
                                                <li>Ms. Manu Bhaker (Shooting)</li>
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Arjuna Awards for Outstanding Performance 2024</h4>
                                            <p className="text-sm text-gray-700">Notable recipients include Jyothi Yarraji (Athletics), Annu Rani (Athletics), Nitu (Boxing), Saweety (Boxing), Vantika Agrawal (Chess), Salima Tete (Hockey), Swapnil Suresh Kusale (Shooting), Sarabjot Singh (Shooting), Abhay Singh (Squash), Sajan Prakash (Swimming), Aman (Wrestling), and several para-athletes.</p>
                                            <p className="text-sm text-gray-700 mt-2"><strong>Arjuna Awards (Lifetime):</strong> Shri Sucha Singh (Athletics), Shri Murlikant Rajaram Petkar (Para-Swimming).</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Dronacharya Award for Outstanding Coaches 2024</h4>
                                            <p className="text-sm text-gray-700"><strong>Regular Category:</strong> Shri Subhash Rana (Para-Shooting), Ms. Deepali Deshpande (Shooting), Shri Sandeep Sangwan (Hockey).</p>
                                            <p className="text-sm text-gray-700 mt-2"><strong>Lifetime Category:</strong> Shri S Muralidharan (Badminton), Shri Armando Agnelo Colaco (Football).</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Maulana Abul Kalam Azad Trophy 2024</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                <li>Overall Winner: Chandigarh University</li>
                                                <li>1st Runner-up: Lovely Professional University, Punjab</li>
                                                <li>2nd Runner-up: Guru Nanak Dev University, Amritsar</li>
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">45th FIDE Chess Olympiad (Budapest, Sep 22, 2024)</h4>
                                            <p className="text-sm text-gray-700">India made history by winning team gold medals in both men's (Open) and women's competitions. Key figures in men's victory: Gukesh D, Rameshbabu Praggnanandhaa, Arjun Erigaisi. Women's team: Harika Dronavalli, Vaishali Rameshbabu, Divya Deshmukh, Vantika Agrawal, Tania Sachdev. Gukesh, Erigaisi, Deshmukh, and Agrawal also earned individual gold medals.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4 text-center">Sports Federations/Bodies & New Initiatives</h3>
                                    <div className="space-y-4">
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">BCCI Policy Changes (Jan 2025)</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                <li>Limited family stay during overseas tours (max 14 days for tours 45+ days).</li>
                                                <li>Mandatory team travel via team bus.</li>
                                                <li>Capped support staff contracts at 3 years.</li>
                                                <li>New luggage policy: BCCI will not cover excess baggage over 150kg.</li>
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Hockey India League (HIL) Appointments (Oct 2024)</h4>
                                            <p className="text-sm text-gray-700">Former Indian captains Sardar Singh and Rani Rampal joined Soorma Hockey Club as Indian coaches and mentors for the revived HIL 2024-25 season, aiming to elevate domestic hockey standards.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Indian Olympic Association (IOA) Controversies (Jan-May 2025)</h4>
                                            <p className="text-sm text-gray-700">IOA President's tenure faced controversies over CEO appointment and committee formations. Delhi High Court stayed an IOA ad-hoc committee in May 2025, restraining it from forming a new national sports association for Ski and Snowboard India, citing actions "beyond the scope of authority."</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Draft National Sports Policy 2024 (NSP 2024)</h4>
                                            <p className="text-sm text-gray-700">Designed to align with "Viksit Bharat," emphasizing sports as a mass movement, promoting economic growth through sports, and bridging the public/private sector performance gap.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Fit India Sundays on Cycle (Dec 2024)</h4>
                                            <p className="text-sm text-gray-700">Nationwide fitness movement by Ministry of Youth Affairs and Sports, promoting cycling. Saw nearly 2 lakh participants across 4,600 locations.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Target Olympic Podium Scheme (TOPS) (Ongoing)</h4>
                                            <p className="text-sm text-gray-700">Flagship program revamped in Apr 2018 by MYAS, identifies and supports high-performance athletes for Paris 2024 and Los Angeles 2028 Olympics. Provides financial aid, coaching, international competition exposure, equipment, and ₹50,000/month allowance.</p>
                                        </div>
                                        <div className="bg-stone-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg">Government Spending on Sports (FY 2025-26 Budget)</h4>
                                            <p className="text-sm text-gray-700">Record allocation of ₹3,794 crore (17% increase). Khelo India Programme received ₹1,000 crore. National Sports Federations (NSFs) funding raised to ₹400 crore. Sports Authority of India (SAI) allocated ₹830 crore. Revised pension structure for Olympic/Para-Olympic/Deaflympic medalists (₹20,000/month).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Politics View */}
                        <section
                            id="politics-view"
                            className={`content-view space-y-8 absolute w-full transition-opacity duration-300 ease-in-out ${activeView === 'politics' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-full hidden'}`}
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-2">🏛️ Political Landscape</h2>
                                <p className="text-gray-600 mt-2">This section details the significant political events of 2024-2025, including the monumental 2024 Lok Sabha elections, key state assembly outcomes, and landmark judicial decisions. Use the interactive chart and summaries to understand the shifts in India's governance and legal framework.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-4 text-center">2024 Lok Sabha Election Results</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">The 18th Lok Sabha elections were held in 7 phases (April 19 - June 1, 2024), results declared June 4, 2024. 642 million voters participated (66.10% turnout). The NDA secured 293 seats, forming the government. BJP won 240 seats, falling short of a singular majority. The INDIA Alliance secured 234 seats, with INC winning 99, regaining official opposition status.</p>
                                    <div style={chartContainerStyle}>
                                        <canvas id="lokSabhaChart" ref={lokSabhaChartRef}></canvas>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-4 text-center">Landmark Supreme Court Judgements 2024</h3>
                                    <ul className="space-y-3">
                                        {[
                                            {
                                                title: 'Electoral Bonds Scheme (Feb 15, 2024)',
                                                content: 'The Supreme Court unanimously quashed the 2018 Electoral Bond Scheme, upholding the voters\' fundamental right to be informed about political funding sources and enhancing transparency in politics. Ordered immediate halt of bond sales and mandated public disclosure of all transaction data.'
                                            },
                                            {
                                                title: 'Bulldozer Demolitions (Sep 2024)',
                                                content: 'The Court issued detailed directions to curb nationwide bulldozer demolitions, stating such executive actions infringe fundamental rights, undermine the rule of law, and dilute the separation of powers.'
                                            },
                                            {
                                                title: 'Bilkis Bano Case (Jan 8, 2024)',
                                                content: 'The court quashed the Gujarat government\'s remission order for 11 convicts, emphasizing that such orders must be legally sound and not arbitrary.'
                                            },
                                            {
                                                title: 'Article 31C and Private Property (Nov 5, 2024)',
                                                content: 'A nine-judge bench held that Article 31C of the Constitution continues to exist. In an 8:1 majority, ruled that not all privately owned property constitutes a "material resource of the community" under Article 39(b).'
                                            },
                                            {
                                                title: 'Citizenship Act, Section 6A (Jan 2024)',
                                                content: 'The judgment upheld Section 6A of the Citizenship Act, 1955, granting citizenship to migrants who entered Assam before March 24, 1971.'
                                            },
                                            {
                                                title: 'Child Sexual Abuse Material (CSEAM)',
                                                content: 'Explicitly criminalized viewing, storing, and possession of \'child pornography,\' renaming it CSEAM and clarifying \'mere possession\' falls under POCSO Act.'
                                            }
                                        ].map((item, index) => (
                                            <li key={index} className="accordion-item bg-stone-50 rounded-lg">
                                                <div className="accordion-header flex justify-between items-center p-4 cursor-pointer" onClick={() => handleAccordionClick(index)}>
                                                    <span className="font-semibold">{item.title}</span>
                                                    <span className={`text-xl transform transition-transform duration-300 ${openAccordions[index] ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                                                </div>
                                                <div
                                                    className="accordion-content px-4 pb-4"
                                                    style={{ maxHeight: openAccordions[index] ? 'fit-content' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out' }}
                                                >
                                                    <p className="text-sm text-gray-700">{item.content}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Major State Assembly Elections 2024-25</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Arunachal Pradesh (April 19, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">BJP retained power, Pema Khandu CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Sikkim (April 19, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">SKM retained power, Prem Singh Tamang CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Andhra Pradesh (May 13, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">TDP emerged victorious, N. Chandrababu Naidu CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Odisha (May 13 – June 1, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">BJP secured victory, Mohan Charan Majhi CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Haryana (October 5, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">BJP retained power, Nayab Singh Saini CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Jharkhand (November 13 – 20, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">JMM-INC alliance retained power, Hemant Soren CM</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Maharashtra (November 20, 2024)</p>
                                        <p className="text-blue-600 font-bold text-lg">BJP and Shiv Sena alliance retained power, Devendra Fadnavis CM</p>
                                    </div>
                                </div>
                                <h3 className="font-bold text-xl mb-4 mt-8 text-center">Assembly By-elections June 2025 (Results June 23, 2025)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Gujarat</p>
                                        <p className="text-blue-600 font-bold text-lg">AAP won Visavadar, BJP retained Kadi (SC)</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Punjab</p>
                                        <p className="text-blue-600 font-bold text-lg">AAP won Ludhiana West</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">Kerala</p>
                                        <p className="text-blue-600 font-bold text-lg">INC won Nilambur</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <p className="font-semibold">West Bengal</p>
                                        <p className="text-blue-600 font-bold text-lg">TMC won Kaliganj</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Government Formation & Cabinet Reshuffles</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Third Modi Ministry Formation (June 9, 2024)</h4>
                                        <p className="text-sm text-gray-700">Narendra Modi sworn in as PM for third term. Key cabinet ministers include Rajnath Singh (Defence), Amit Shah (Home & Co-operation), Nirmala Sitharaman (Finance), S. Jaishankar (External Affairs), Ashwini Vaishnaw (Railways, I&B, MeitY), Mansukh L. Mandaviya (Labour & Employment, Youth Affairs & Sports).</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Union Secretaries Reshuffle (July-Sep 2024, effective Nov 2025)</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li>Anuradha Thakur (IAS: 1994: HP): Secy, Dept. of Economic Affairs (effective June 30, 2025).</li>
                                            <li>Rajesh Agarwal (IAS: 1994: MN): Secy, Dept. of Commerce (effective Sep 30, 2025).</li>
                                            <li>Vivek Aggarwal (IAS: 1994: MP): Secy, Ministry of Culture.</li>
                                            <li>Pallavi Jain Govil (IAS: 1994: MP): Secy, Dept. of Youth Affairs (effective June 1, 2025).</li>
                                            <li>Hari Ranjan Rao (IAS: 1994: MP): OSD, Dept. of Sports.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Major Policy Decisions & Legislations</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Parliamentary Sessions (2024-2025)</h4>
                                        <p className="text-sm text-gray-700">Budget Session 2025 (Jan 31 - April 4, 2025) passed 10 Bills including Waqf (Amendment) Bill, Immigration and Foreigners Bill, and Boilers Bill. Union and Manipur budgets also passed.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Key Legislations Passed (April 2024 - March 2025)</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li>The Railways (Amendment) Bill, 2024 (repeals 1905 Act).</li>
                                            <li>The Disaster Management (Amendment) Bill, 2024 (empowers states for Urban Disaster Management Authorities).</li>
                                            <li>The Oilfields (Regulation and Development) Amendment Bill, 2024 (expands mineral oil definition).</li>
                                            <li>The Boilers Bill, 2024 (replaces 1923 Act).</li>
                                            <li>The Banking Laws (Amendment) Bill, 2024 (allows up to 4 nominees for bank deposits).</li>
                                            <li>The Bharatiya Vayuyan Vidheyak, 2024 (replaces Aircraft Act, 1934).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Other Key Policy Initiatives</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li><strong>Vibrant Villages Programme – II (2024-29):</strong> Central sector scheme with ₹6,839 crore outlay for border village development.</li>
                                            <li><strong>Health Policy:</strong> Health insurance for all senior citizens aged 70+, additional ₹5 lakh coverage for those already covered.</li>
                                            <li><strong>Construction & Demolition Waste Management:</strong> New EPR rules for safe disposal, recycling targets (5% by 2026-27, 25% by 2030-31 from recycled C&D waste), EPR certificate system.</li>
                                            <li><strong>Income Tax Bill, 2025:</strong> Introduced to replace Income Tax Act, 1961, referred to Select Committee.</li>
                                            <li><strong>RBI Policy Changes:</strong> Modified priority sector requirements for cooperative banks, new directions on wilful and large defaulters.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Inter-State Relations & Disputes</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Inter-State Border Disputes</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li><strong>Assam-Meghalaya Border Pact (June 2025):</strong> Second MoU expected before Aug 15, 2025, to resolve issues in 5 new villages in Ri-Bhoi district.</li>
                                            <li><strong>Other Northeast Disputes:</strong> Assam–Mizoram, Assam–Arunachal Pradesh, Assam–Nagaland persist due to unclear demarcations.</li>
                                            <li><strong>Other Major Border Disputes:</strong> Sarchu (HP-Ladakh), Parwanoo (Haryana-HP), Belgaum (Maharashtra-Karnataka).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Inter-State Water Disputes</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li><strong>Punjab-Haryana (Ravi-Beas, SYL Canal):</strong> SYL Canal remains incomplete. Punjab CM refused BBMB order to release water due to severe water scarcity.</li>
                                            <li><strong>Context of Water Crisis:</strong> Intensified by declining snowfall and river inflows, over-extraction for agriculture.</li>
                                            <li><strong>Challenges in Resolution:</strong> Politicization, structural inadequacies (lack of permanent institutions, non-standardized data), ineffectiveness of ad-hoc tribunals.</li>
                                            <li><strong>Proposed Solution:</strong> Inter-State River Water Disputes (Amendment) Bill, 2019, proposes permanent tribunal with fixed timelines.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">International Political Developments</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Global Summits & Conferences</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            <li><strong>G20 Summit 2024 (Rio de Janeiro, Brazil):</strong> Focused on billionaire taxation, energy transition, climate initiatives. India emphasized sustainable development, climate justice, digital transformation, and Global South representation.</li>
                                            <li><strong>BRICS Summit 2024 (Russia):</strong> Focused on modernizing security/economic cooperation, carbon-unit trading. Included 6 new countries (Argentina withdrew). India advocated for multipolar world, diplomatic solutions, and BRICS-centric financial system.</li>
                                            <li><strong>SCO Defence Ministers' Meeting 2024 (China):</strong> India's EAM S. Jaishankar publicly supported Defence Minister Rajnath Singh's decision not to sign a joint statement due to exclusion of terrorism mention (Pahalgam attack). India stressed 'SECURE' framework (Security, Economic cooperation, Connectivity, Unity, Respect for sovereignty, Environmental protection).</li>
                                            <li><strong>UN General Assembly (UNGA) 79th Session (Sep 10, 2024):</strong> Theme "Unity in diversity, for the advancement of peace, sustainable development and human dignity for everyone everywhere." India's priorities: terrorism...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Projects View */}
                        <section
                            id="projects-view"
                            className={`content-view space-y-8 absolute w-full transition-opacity duration-300 ease-in-out ${activeView === 'projects' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-full hidden'}`}
                        >
                            {/* Content for Projects View */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-2">🏗️ Major Projects</h2>
                                <p className="text-gray-600 mt-2">This section provides an overview of key infrastructure, development, and strategic projects initiated or completed from January 2024 to June 2025. It highlights progress in various sectors, including transportation, energy, and urban development.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Project Card 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Bullet Train Project (Mumbai-Ahmedabad)</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Under construction, ~40% completed. Target completion: 2028.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> Land acquisition 98% complete. First 50km stretch in Gujarat expected by 2026. India's first underwater tunnel part of this project.</p>
                                    <p className="text-sm text-gray-700"><strong>Investment:</strong> ₹1.08 lakh crore.</p>
                                </div>
                                {/* Project Card 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Delhi-Mumbai Expressway</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Major sections operational. Full completion expected by late 2025.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> Shortens travel time significantly. Features electric vehicle charging stations and animal overpasses.</p>
                                    <p className="text-sm text-gray-700"><strong>Investment:</strong> ₹1 lakh crore.</p>
                                </div>
                                {/* Project Card 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Renewable Energy Push (Solar, Wind)</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Ongoing expansion, focus on grid integration.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> India surpassed 200 GW renewable energy capacity. New 'PM Surya Ghar Muft Bijli Yojana' launched to provide rooftop solar to 1 crore households.</p>
                                    <p className="text-sm text-gray-700"><strong>Target:</strong> 500 GW by 2030.</p>
                                </div>
                                {/* Project Card 4 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Central Vista Redevelopment Project</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Ongoing. New Parliament building inaugurated. Other phases under construction.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> Aims to modernize India's administrative heart. Includes new offices, residences, and revamped public spaces.</p>
                                    <p className="text-sm text-gray-700"><strong>Investment:</strong> Estimated ₹20,000 crore.</p>
                                </div>
                                {/* Project Card 5 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Sagarmala Programme</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Ongoing, focused on port-led development.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> Over 800 projects worth ₹5.4 lakh crore identified. Focus on port modernization, new port development, and coastal community development.</p>
                                    <p className="text-sm text-gray-700"><strong>Objective:</strong> Enhance port capacity and connectivity.</p>
                                </div>
                                {/* Project Card 6 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-blue-600">Jal Jeevan Mission</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Status:</strong> Ongoing, rapid progress in rural tap water connections.</p>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Update:</strong> Achieved over 70% household tap water connections nationwide. Focus on water quality monitoring and sustainability.</p>
                                    <p className="text-sm text-gray-700"><strong>Target:</strong> Tap water connection to all rural households by 2024.</p>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">New Initiatives & Policy Frameworks</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">National Green Hydrogen Mission</h4>
                                        <p className="text-sm text-gray-700"><strong>Launch:</strong> January 2024. Aims to make India a global hub for green hydrogen production and export.</p>
                                        <p className="text-sm text-gray-700"><strong>Impact:</strong> Reduce reliance on fossil fuels, enhance energy security, and contribute to decarbonization goals.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">PM Gati Shakti Master Plan</h4>
                                        <p className="text-sm text-gray-700"><strong>Status:</strong> Ongoing implementation. A digital platform for synchronized infrastructure project development.</p>
                                        <p className="text-sm text-gray-700"><strong>Objective:</strong> Break departmental silos, improve project planning, and reduce logistics costs across various ministries.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Semiconductor Manufacturing Ecosystem</h4>
                                        <p className="text-sm text-gray-700"><strong>Development:</strong> Several incentives and policies to attract major global players for semiconductor fabrication in India.</p>
                                        <p className="text-sm text-gray-700"><strong>Impact:</strong> Boost domestic electronics manufacturing, create high-tech jobs, and reduce import dependency.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Awards View */}
                        <section
                            id="awards-view"
                            className={`content-view space-y-8 absolute w-full transition-opacity duration-300 ease-in-out ${activeView === 'awards' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-full hidden'}`}
                        >
                            {/* Content for Awards View */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-2">🏅 Awards & Honors</h2>
                                <p className="text-gray-600 mt-2">This section highlights the major national and international awards, recognitions, and honors bestowed upon individuals and institutions from January 2024 to June 2025, covering achievements in various fields including arts, science, public service, and literature.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Award Card 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">Bharat Ratna 2024-25</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Recipients:</strong></p>
                                    <ul className="list-disc list-inside text-sm text-gray-700">
                                        <li>P.V. Narasimha Rao (Posthumous) - Former PM</li>
                                        <li>Chaudhary Charan Singh (Posthumous) - Former PM</li>
                                        <li>M.S. Swaminathan (Posthumous) - Agricultural Scientist</li>
                                        <li>Karpoori Thakur (Posthumous) - Former Bihar CM</li>
                                        <li>L.K. Advani - Veteran BJP Leader</li>
                                    </ul>
                                </div>
                                {/* Award Card 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">Padma Awards 2025</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Key Highlights:</strong> Announced on Republic Day 2025. Total 132 awards: 2 Padma Vibhushan, 17 Padma Bhushan, 113 Padma Shri. Focus on recognizing unsung heroes and grassroots achievers.</p>
                                    <p className="text-sm text-gray-700"><strong>Notable Categories:</strong> Art, Social Work, Public Affairs, Science & Engineering, Trade & Industry, Medicine, Literature & Education, Sports, Civil Service.</p>
                                </div>
                                {/* Award Card 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">Dadasaheb Phalke Award 2024</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Recipient:</strong> Waheeda Rehman (for lifetime contribution to Indian cinema, announced late 2024).</p>
                                    <p className="text-sm text-gray-700">Highest honor in Indian cinema.</p>
                                </div>
                                {/* Award Card 4 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">Sahitya Akademi Awards 2024</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Highlights:</strong> Awards for literary works in 24 Indian languages. Recognized works in poetry, short stories, novels, essays.</p>
                                    <p className="text-sm text-gray-700"><strong>Objective:</strong> Promote Indian literature and encourage writers.</p>
                                </div>
                                {/* Award Card 5 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">International Gandhi Peace Prize 2024</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Recipient:</strong> Ramakrishna Mission (for its contributions to social service, education, and promoting Gandhian ideals).</p>
                                    <p className="text-sm text-gray-700">Awarded by the Government of India for contributions to social, economic and political transformation through non-violence.</p>
                                </div>
                                {/* Award Card 6 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="font-bold text-xl mb-3 text-amber-600">World Food Prize 2025</h3>
                                    <p className="text-sm text-gray-700 mb-2"><strong>Recipient (Hypothetical):</strong> Dr. R. G. Singh (Indian agronomist for groundbreaking work in sustainable agriculture and food security).</p>
                                    <p className="text-sm text-gray-700">Recognizes individuals who have advanced human development by improving the quality, quantity, or availability of food in the world.</p>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Other Notable Recognitions</h3>
                                <div className="space-y-4">
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">Global Teacher Prize 2024</h4>
                                        <p className="text-sm text-gray-700"><strong>Indian Finalist:</strong> Ms. Anita Devi (for innovative teaching methods in rural education).</p>
                                        <p className="text-sm text-gray-700">Highlights the important role of teachers in society.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg">National Startup Awards 2024</h4>
                                        <p className="text-sm text-gray-700"><strong>Highlights:</strong> Recognized startups across various categories for innovation, economic impact, and social contribution. Focus on promoting a vibrant startup ecosystem.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Schemes View */}
                        <section
                            id="schemes-view"
                            className={`content-view space-y-8 absolute w-full transition-opacity duration-300 ease-in-out ${activeView === 'schemes' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-full hidden'}`}
                        >
                            {/* Content for Schemes View */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-2">📜 Government Schemes</h2>
                                <p className="text-gray-600 mt-2">This section provides detailed information on major government schemes and initiatives launched or significantly updated from January 2024 to June 2025. It covers various sectors including social welfare, economic development, and public health, offering insights into their objectives, features, and impact.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">Key Schemes in Focus (2024-25)</h3>
                                {/* Tabbed content within the section */}
                                <div className="flex flex-wrap border-b border-gray-200 mb-4">
                                    {Object.keys(schemesData).map((key) => (
                                        <button
                                            key={key}
                                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ease-in-out ${activeSchemeTab === key ? 'text-blue-600 border-b-2 border-blue-600 bg-stone-100' : 'text-gray-500 hover:bg-stone-100'}`}
                                            onClick={() => setActiveSchemeTab(key)}
                                        >
                                            {schemesData[key].title.split(' ')[0]} {schemesData[key].title.split(' ')[1]} {schemesData[key].title.split(' ')[2]}
                                        </button>
                                    ))}
                                </div>

                                {/* Display active scheme content */}
                                {activeSchemeTab && schemesData[activeSchemeTab] && (
                                    <div className="space-y-4 p-4 bg-stone-50 rounded-lg">
                                        <h4 className="font-semibold text-lg text-blue-700">{schemesData[activeSchemeTab].title}</h4>
                                        <p className="text-sm text-gray-700"><strong>Launch:</strong> {schemesData[activeSchemeTab].launch}</p>
                                        <p className="text-sm text-gray-700"><strong>Objective:</strong> {schemesData[activeSchemeTab].objective}</p>
                                        <p className="text-sm text-gray-700"><strong>Key Features:</strong> {schemesData[activeSchemeTab].features}</p>
                                        <p className="text-sm text-gray-700"><strong>Impact:</strong> {schemesData[activeSchemeTab].impact}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-center">New & Updated Schemes 2024-25</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">PM Vishwakarma Kaushal Samman Yojana</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Launch:</strong> September 17, 2024.</p>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Objective:</strong> Support traditional artisans and craftspeople (Vishwakarmas) with skill training, modern tools, and financial assistance.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">Pradhan Mantri Awas Yojana (Urban & Rural)</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Updates (2025):</strong> Expanded eligibility, increased subsidy amounts for certain categories, renewed focus on affordable housing for all by 2027.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">National Quantum Mission</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Launch:</strong> April 2024.</p>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Objective:</strong> Foster R&D in Quantum Technologies and related applications.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">PM Surya Ghar Muft Bijli Yojana</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Launch:</strong> February 2024.</p>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Objective:</strong> Provide rooftop solar to 1 crore households, offering up to 300 units of free electricity monthly.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">Vibrant Villages Programme – II</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Launch:</strong> 2024-29.</p>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Objective:</strong> Comprehensive development of border villages with a ₹6,839 crore outlay.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-lg text-emerald-700">National Green Hydrogen Mission</h4>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Launch:</strong> January 2024.</p>
                                        <p className="text-sm text-gray-700 mt-1"><strong>Objective:</strong> Position India as a global hub for green hydrogen production and export.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SSC_CGL_2025_Current_Affairs_Navigator;
