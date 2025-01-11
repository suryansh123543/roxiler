import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Pie, PieChart, ResponsiveContainer, Cell, Label} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Home.css'

function Home(){
    const [data, setData] = useState([])
    const [statData, setStatData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [pieGraphData, setPieGraphData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(2)
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'All Months']
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    let pageLength = data.length
    let resultData
    let rawData
    let statResultData
    let graphResultData
    let pieResultData
    let totalSoldItem = 0, totalNotSoldItem = 0
    let range1 = 0, range2 = 0, range3 = 0, range4 = 0, range5 = 0
    let range6 = 0, range7 = 0, range8 = 0, range9 = 0, range10 = 0
    let menClothing = 0, womenClothing = 0, electronics = 0, jewelery = 0

    // Load Data at Beginning
    const loadData = async () => {
        const results = await axios.get("http://localhost:8000/home")
        setData(results.data.allResult)
        setStatData(results.data.statResult)
        setGraphData(results.data.barChartResult)
        setPieGraphData(results.data.pieChartResult)
    }

    // Initializing loadData Function
    useEffect(() => {
        loadData()
    }, [])

    function getMonthName(value){
        return monthArr[value]
    }

    // ***************************************************************************** Table Data**********
    // Search and Sort Filter
    if(selectedMonth == 12){

        // Search for All Months
        resultData = data.filter((element) => {
            return search.toLowerCase() === '' 
            ? element 
            : (element.title.toLowerCase().includes(search) ||
                element.description.toLowerCase().includes(search) ||
                element.price.$numberDecimal.toLowerCase().includes(search))
        })
    }else{
        // Sort by Month
        rawData = data.filter((element) => {
            let date = new Date(element.dateOfSale)
            let monthnum = date.getMonth()
            if(selectedMonth == monthnum){
                return element
            }
        })
        resultData = rawData.filter((element) => {
            return search.toLowerCase() === '' 
            ? element 
            : (element.title.toLowerCase().includes(search) ||
                element.description.toLowerCase().includes(search) ||
                element.price.$numberDecimal.toLowerCase().includes(search))
        })
    }

    // Pagination
    pageLength = resultData.length

    const recordsPerPage = 10
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const npage = Math.ceil(pageLength / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const records = resultData.slice(firstIndex, lastIndex)

    // Pagination Change Handlers
    const handlePrevClick = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if(currentPage < numbers.length){
            setCurrentPage(currentPage + 1)
        }
    }

    function changeCurrPage(id){
        setCurrentPage(id)
    }

    function checkValue(value){
        if(value == true){
            return 'Yes'
        }else{
            return 'No'
        }
    }

    // ************************************************************************ Statistics Data**********
    statResultData = statData.filter((element) => {
        let date = new Date(element.dateOfSale)
        let monthnum = date.getMonth()
        if(selectedMonth == monthnum){
            return element
        }
        if(selectedMonth == 12){
            return element
        }
    })

    statResultData.filter((element) => {
        if(element.sold == true){
            totalSoldItem = totalSoldItem + 1
        }
        if(element.sold == false){
            totalNotSoldItem = totalNotSoldItem + 1
        }
    })

    // *************************************************************************** Graph Data**********
    graphResultData = graphData.filter((element) => {
        let date = new Date(element.dateOfSale)
        let monthnum = date.getMonth()
        if(selectedMonth == monthnum){
            return element
        }
        if(selectedMonth == 12){
            return element
        }
    })

    graphResultData.filter((element) => {
        if(element.price.$numberDecimal > 0 && element.price.$numberDecimal <= 100){
            range1 = range1 + 1
        }else
        if(element.price.$numberDecimal > 100 && element.price.$numberDecimal <= 200){
            range2 = range2 + 1
        }else
        if(element.price.$numberDecimal > 200 && element.price.$numberDecimal <= 300){
            range3 = range3 + 1
        }else
        if(element.price.$numberDecimal > 300 && element.price.$numberDecimal <= 400){
            range4 = range4 + 1
        }else
        if(element.price.$numberDecimal > 400 && element.price.$numberDecimal <= 500){
            range5 = range5 + 1
        }else
        if(element.price.$numberDecimal > 500 && element.price.$numberDecimal <= 600){
            range6 = range6 + 1
        }else
        if(element.price.$numberDecimal > 600 && element.price.$numberDecimal <= 700){
            range7 = range7 + 1
        }else
        if(element.price.$numberDecimal > 700 && element.price.$numberDecimal <= 800){
            range8 = range8 + 1
        }else
        if(element.price.$numberDecimal > 800 && element.price.$numberDecimal <= 900){
            range9 = range9 + 1
        }else
        if(element.price.$numberDecimal > 900){
            range10 = range10 + 1
        }
    })

    const barData = [
        {
            "range" : "1-100",
            "result" : range1
        },
        {
            "range" : "101-200",
            "result" : range2
        },
        {
            "range" : "201-300",
            "result" : range3
        },
        {
            "range" : "301-400",
            "result" : range4
        },
        {
            "range" : "401-500",
            "result" : range5
        },
        {
            "range" : "501-600",
            "result" : range6
        },
        {
            "range" : "601-700",
            "result" : range7
        },
        {
            "range" : "701-800",
            "result" : range8
        },
        {
            "range" : "801-900",
            "result" : range9
        },
        {
            "range" : "900 <",
            "result" : range10
        }
    ]

    // *************************************************************************** Pie Data**********
    pieResultData = pieGraphData.filter((element) => {
        let date = new Date(element.dateOfSale)
        let monthnum = date.getMonth()
        if(selectedMonth == monthnum){
            return element
        }
        if(selectedMonth == 12){
            return element
        }
    })

    pieResultData.filter((element) => {
        if(element.category === `men's clothing`){
            menClothing = menClothing + 1
        }else
        if(element.category === `women's clothing`){
            womenClothing = womenClothing + 1
        }else
        if(element.category === `electronics`){
            electronics = electronics + 1
        }else
        if(element.category === `jewelery`){
            jewelery = jewelery + 1
        }
    })

    const pieData = [
        {
            "category": `Men's Clothing`,
            "value": menClothing,
            "fill":"#0413ca"
        },
        {
            "category": `Women's Clothing`,
            "value": womenClothing,
            "fill":"#02bd08"
        },
        {
            "category": `Electronics`,
            "value": electronics,
            "fill" : "#f91212"
        },
        {
            "category": `Jewelery`,
            "value": jewelery,
            "fill" : "#01b6fc"
        }
    ]

    return(
        <div>
            {/* Operation Structure */}
            <div className='heading-container'>
                {/* Search Bar */}
                <input className="search-bar" type='text' placeholder='Search' onChange={(e) => {
                        setCurrentPage(1)
                        setSearch(e.target.value.toLowerCase())
                    }}
                />
                    
                {/* Select Month */}
                <select className='select-menu' onChange={(e) => {setSelectedMonth(e.target.value)}}>
                    <option value="12">All Months</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2" selected>March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
            </div>

        <div className='body-container'>
            <div className='table-structure'>
            <h1><b>Transaction table -</b> {getMonthName(selectedMonth)}</h1>
                {/* Pagination */}
                <nav>
                    <ul className='pagination'>
                        <a href="#" onClick={handlePrevClick}>
                            <li>&laquo;</li>
                        </a>
                        {
                            numbers.map((n,i) => (
                                <a href='#' onClick={() => changeCurrPage(n)}>
                                    <li key={i} className={n === currentPage ? 'active' : ''}>
                                        {n}
                                    </li>
                                </a>
                            ))
                        }<a href="#" onClick={handleNextClick}>
                            <li>&raquo;</li>
                        </a>
                    </ul>
                </nav>

                {/* Table Structure */}
                <table border={1}>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </thead>
                    {
                        records.map((element, i) => (
                            <tbody key={element._id}>
                                <td>{element.id}</td>
                                <td>{element.title}</td>
                                <td>{element.description}</td>
                                <td>{parseFloat(element.price.$numberDecimal).toFixed(2)}</td>
                                <td>{element.category}</td>
                                <td>{checkValue(element.sold)}</td>
                                <td>
                                    <img src={element.image} width={50} height={50}/>
                                </td>
                            </tbody>
                        ))
                    }
                </table>&nbsp;

                {/* Pagination */}
                <nav>
                    <ul className='pagination'>
                        <a href="#" onClick={handlePrevClick}>
                            <li>&laquo;</li>
                        </a>
                        {
                            numbers.map((n,i) => (
                                <a href='#' onClick={() => changeCurrPage(n)}>
                                    <li key={i} className={n === currentPage ? 'active' : ''}>
                                        {n}
                                    </li>
                                </a>
                            ))
                        }<a href="#" onClick={handleNextClick}>
                            <li>&raquo;</li>
                        </a>
                    </ul>
                </nav>
            </div>

            {/* Statistics */}
            <div className='row'>

                {/* Transaction Statistics */}
                <div className='col-md-2 container-box left'>
                    <h1><b>Transaction Statistics - </b>{getMonthName(selectedMonth)}</h1>&nbsp;
                    <div className='statDiv'>
                        <label>Total Sales</label>
                        <p>{totalSoldItem + totalNotSoldItem}</p>
                    </div>
                    <div className='statDiv'>
                        <label>Total Sold Items</label>
                        <p>{totalSoldItem}</p>
                    </div>
                    <div className='statDiv'>
                        <label>Total NOT Sold Items</label>
                        <p>{totalNotSoldItem}</p>
                    </div>
                </div>

                {/* Bar Graph Operations */}
                <div className='col-md-5 container-box check'>
                    <h1><b>Bar Chart Stats -</b> {getMonthName(selectedMonth)}</h1>
                    <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={barData} margin={{ top: 0, right: 0, left: 4, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" fontSize={"15px"} textAnchor="end" tick={{ angle: -55 }} height={15}/>
                            <YAxis width={15} fontSize={"12px"} domain={[0, 20]}/>
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Bar dataKey="result" fill="#1002A2" radius={5} >
                                <LabelList dataKey="result" position="top"/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                    
                {/* Pie Graph Operations */}
                <div className='col-md-4 container-box right'>
                    <h1><b>Pie Chart Stats - </b>{getMonthName(selectedMonth)}</h1>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={250} height={250}>
                            <Pie dataKey="value" isAnimationActive={true} data={pieData} cx="50%" cy="50%" outerRadius={80} fill="fill" label={({
                                                                                                cx,
                                                                                                cy,
                                                                                                midAngle,
                                                                                                innerRadius,
                                                                                                outerRadius,
                                                                                                value,
                                                                                                index
                                                                                            }) => {
                                                                                                    const RADIAN = Math.PI / 180;
                                                                                                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                                                                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                                                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                                                                                    return (
                                                                                                    <text x={x} y={y} fill={pieData[index].fill} textAnchor={x > cx ? "start" : "end"}  dominantBaseline="central">
                                                                                                        {pieData[index].category} ({value})
                                                                                                    </text>
                                                                                                    );
                                                                                                }
                                                                                            }
                             />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home