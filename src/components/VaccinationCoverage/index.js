import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {cowinData} = props
  console.log(cowinData)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccine_coverage_container">
      <h1>Vaccination Coverage</h1>

      <BarChart data={cowinData} margin={{top: 20}} width={900} height={400}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend />
        <Bar dataKey="dose1" fill="#8884d8" />
        <Bar dataKey="dose2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
