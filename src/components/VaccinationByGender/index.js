import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {cowinDataGender} = props

  return (
    <div className="vaccine_coverage_container">
      <h1>Vaccination by gender</h1>

      <PieChart width={900} height={400}>
        <Pie
          cx="50%"
          cy="60%"
          data={cowinDataGender}
          startAngle={180}
          endAngle={0}
          outerRadius="60%"
          innerRadius="30%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
