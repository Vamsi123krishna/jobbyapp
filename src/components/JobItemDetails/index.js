import {Component} from 'react'

import Loader from 'react-loader-spinner'

import SimilarJobs from '../SimilarJobs'

class JobItemDetails extends Component {
  state = {jobsData: {}, isLoading: true}

  componentDidMount() {
    this.getJobItemData()
  }

  getjobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employementType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getSimilarJobItem = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employement_type: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`)
    const data = await response.json()
    const formattedData = {
      jobDetails: this.getjobDetails(data.job_details),
      similarJobs: data.similar_jobs.map(eachJob =>
        this.getSimilarJobItem(eachJob),
      ),
    }

    this.setState({jobsData: formattedData, isLoading: false})
  }

  renderJobDetails = () => {
    const {jobsData} = this.state
    const {jobDetails, similarJobs} = jobsData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employementType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    return (
      <div>
        <div>
          <img src={companyLogoUrl} />
          <p>{rating}</p>
          <div>
            <p>{employementType}</p>
            <p>{location}</p>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <h1>Descriptioin</h1>
          <p>{companyWebsiteUrl}</p>
          <p>{jobDescription}</p>
        </div>
        <h1>Skills</h1>
        <h1>Life at Company</h1>
        <div>
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobs similarJobs={eachSimilarJob} key={eachSimilarJob.id} />
          ))}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <>{isLoading ? this.renderLoader() : this.renderJobDetails()}</>
  }
}
export default JobItemDetails
