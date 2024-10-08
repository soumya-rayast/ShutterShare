import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import ExpenseCard from './ExpenseCard';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import axios from "axios";

const Analytics = () => {
    const { pathname } = useLocation();

    const [tillNow, setTillNow] = useState([]);
    const [thisYear, setThisYear] = useState([]);
    const [thisMonth, setThisMonth] = useState([]);
    const [thisWeek, setThisWeek] = useState([]);

    const getPostsByDateRange = async () => {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/post/date-range", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            withCredentials: true,
        });
        const { data } =  res.data;

        setTillNow(data.tillNow);
        setThisYear(data.thisYear);
        setThisMonth(data.thisMonth);
        setThisWeek(data.thisWeek);
    };

    useEffect(() => {
        getPostsByDateRange();
    }, []);

    const calculateTotalForSeller = (data) => {
        const value = data.reduce((acc, curr) => {
            const price = curr.price || 0;
            const purchases = curr.purchasedBy ? curr.purchasedBy.length : 0;
            return acc + (price * purchases);
        }, 0);
        return value;
    };

    const calculateTotalForBuyer = (data) => {
        return data.reduce((acc, curr) => acc + (curr.price || 0), 0); 
    };

    return (
        <div>
            <DashboardHeader />
            <h1 className='text-2xl font-semibold mb-5 ml-8 text-[#012641]'>Analytics</h1>
            <h2 className='text-2xl font-semibold my-5 ml-8 text-[#012641]'>
                {pathname === '/seller/profile' ? "Uploaded" : "Purchased"} This Year
            </h2>
            <div>
                <div className='w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-2xl shadow-md flex flex-col justify-between shadow-[#012641] items-center gap-5'>
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                            margin={{
                                top: 20,
                                bottom: -50,
                                left: -61,
                            }}
                            data={thisYear}
                        >
                            <XAxis dataKey="title" hide />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#000000"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <p>Total {pathname === "/seller/profile" ? "Earned" : "Spent"} : {pathname === "/seller/profile" ? calculateTotalForSeller(thisYear) : calculateTotalForBuyer(thisYear)}</p>
                </div>
                {
                    !thisMonth?.length ? (
                        <h1 className='text-2xl font-semibold m-5 ml-8'>No Data Available</h1>
                    ) : (
                        <div className='flex flex-col sm:flex-row justify-between mb-10 gap-2'>
                            <ExpenseCard
                                data={thisWeek}
                                title={`${pathname === "/seller/profile" ? "Earned" : "Spent"} This Week`}
                                dataKey="price"
                                value={pathname === "/seller/profile" ? calculateTotalForSeller(thisWeek) : calculateTotalForBuyer(thisWeek)}
                            />
                            <ExpenseCard
                                data={thisMonth}
                                title={`${pathname === "/seller/profile" ? "Earned" : "Spent"} This Month`}
                                dataKey="price"
                                value={pathname === "/seller/profile" ? calculateTotalForSeller(thisMonth) : calculateTotalForBuyer(thisMonth)}
                            />
                            <ExpenseCard
                                data={tillNow}
                                title={`${pathname === "/seller/profile" ? "Earned" : "Spent"} Till Now`}
                                dataKey="price"
                                value={pathname === "/seller/profile" ? calculateTotalForSeller(tillNow) : calculateTotalForBuyer(tillNow)}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Analytics;