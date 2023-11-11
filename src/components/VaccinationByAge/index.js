import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {cowinDataAge} = props

  return (
    <div className="vaccine_coverage_container">
      <h1>Vaccination by Age"</h1>

      <PieChart width={900} height={400}>
        <Pie
          cx="50%"
          cy="50%"
          data={cowinDataAge}
          startAngle={0}
          endAngle={360}
          outerRadius="70%"
          innerRadius="0%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill=" #a3df9f" />
          <Cell name="Above 60" fill=" #64c2a6" />
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

export default VaccinationByAge
