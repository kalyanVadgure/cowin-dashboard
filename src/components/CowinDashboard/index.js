import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inFetching: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getCowinDashboardData()
  }

  getupdatedData = fetchedData => ({
    last7DaysVaccination: fetchedData.last_7_days_vaccination.map(eachdata => ({
      vaccineDate: eachdata.vaccine_date,
      dose1: eachdata.dose_1,
      dose2: eachdata.dose_2,
    })),
    vaccinationByAge: fetchedData.vaccination_by_age,
    vaccinationByGender: fetchedData.vaccination_by_gender,
  })

  getCowinDashboardData = async () => {
    this.setState({apiStatus: apiStatusConst.inFetching})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = this.getupdatedData(fetchedData)

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConst.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderCowinDataStats = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = vaccinationData

    return (
      <div>
        <VaccinationCoverage cowinData={last7DaysVaccination} />
        <VaccinationByAge cowinDataAge={vaccinationByAge} />
        <VaccinationByGender cowinDataGender={vaccinationByGender} />
      </div>
    )
  }

  renderLodingView = () => (
    <div data-testId="loader" className="loader_container">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_image_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure_view_image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.success:
        return this.renderCowinDataStats()
      case apiStatusConst.failure:
        return this.renderFailureView()
      case apiStatusConst.inFetching:
        return this.renderLodingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin_dashboard_app_contianer">
        <div className="cowin_dashboard_contianer">
          <div className="logo_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website_logo"
            />
            <h1>Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderViewBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
