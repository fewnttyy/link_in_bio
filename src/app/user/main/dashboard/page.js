'use client'
import styles from '@/app/user/styles/Dashboard.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {

  const data = [
    { month: '01', traffic: 700, sales: 310, newClients: 1500, newOrders: 12000 },
    { month: '02', traffic: 500, sales: 290, newClients: 1400, newOrders: 11800 },
    { month: '03', traffic: 550, sales: 350, newClients: 1300, newOrders: 12100 },
    { month: '04', traffic: 780, sales: 450, newClients: 1200, newOrders: 12500 },
    { month: '05', traffic: 620, sales: 390, newClients: 1100, newOrders: 12800 },
    { month: '06', traffic: 700, sales: 440, newClients: 1000, newOrders: 13000 },
    { month: '07', traffic: 800, sales: 480, newClients: 900, newOrders: 13200 },
    { month: '08', traffic: 750, sales: 460, newClients: 800, newOrders: 13000 },
    { month: '09', traffic: 580, sales: 400, newClients: 700, newOrders: 12800 }
  ];

  const tableData = [
    { link: 'https://example.com/abc', clicks: 1200, revenue: '$1,200', ctr: '3.5%' },
    { link: 'https://example.com/xyz', clicks: 950, revenue: '$800', ctr: '4.1%' },
    { link: 'https://example.com/123', clicks: 780, revenue: '$600', ctr: '2.8%' },
    { link: 'https://example.com/456', clicks: 450, revenue: '$400', ctr: '3.2%' },
    { link: 'https://example.com/789', clicks: 300, revenue: '$250', ctr: '2.5%' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* <h2 className={styles.dashboardTitle}>Sales Dashboard</h2> */}

      {/* Key Metrics Section */}
      <div className={styles.cardGrid4}>
        <div className={styles.card}>
          <p className={styles.metricValue}>{data[data.length - 1].sales.toLocaleString()}</p>
          <p className={styles.metricLabel}>Total Links</p>
          <p className={styles.metricChangePositive}>+30%</p>
        </div>
        <div className={styles.card}>
          <p className={styles.metricValue}>{data[data.length - 1].newClients.toLocaleString()}</p>
          <p className={styles.metricLabel}>Links Active</p>
          <p className={styles.metricChangeNegative}>-20%</p>
        </div>
        <div className={styles.card}>
          <p className={styles.metricValue}>{data[data.length - 1].traffic.toLocaleString()}</p>
          <p className={styles.metricLabel}>Total Category</p>
          <p className={styles.metricChangePositive}>+20%</p>
        </div>
        <div className={styles.card}>
          <p className={styles.metricValue}>{data[data.length - 1].newOrders.toLocaleString()}</p>
          <p className={styles.metricLabel}>View Count</p>
          <p className={styles.metricChangePositive}>+10%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.cardGrid2}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>View Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="traffic" stroke="#8884d8" />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Click Count (Links)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="newClients" fill="#8884d8" />
              <Bar dataKey="newOrders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* My Top Links Section */}
      <div className={styles.card} style={{ marginTop: '20px' }}>
  <h3 className={styles.cardTitle}>My Top Links</h3>
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Link</th>
          <th>Clicks</th>
          <th>Revenue</th>
          <th>CTR</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {row.link}
              </a>
            </td>
            <td>{row.clicks}</td>
            <td>{row.revenue}</td>
            <td>{row.ctr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}
