import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    changeSearchInput: '',
    isLoading: true,
    profileDetails: {},
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileDetails()
  }

  onChangingSearchInput = event => {
    this.setState({
      changeSearchInput: event.target.value,
    })
  }

  convertProfileDetails = data => ({
    name: data.name,
    imageUrl: data.profile_image_url,
    bio: data.short_bio,
  })

  getProfileDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/profile')
    const data = await response.json()
    const formattedDataProfile = {
      profileDetails: this.convertProfileDetails(data.profile_details),
    }
    this.setState({profileDetails: formattedDataProfile, isLoading: false})
  }

  getJobsData = async () => {
    const response = await fetch('https://apis.ccbp.in/jobs')
    if (response.ok) {
      const data = await response.json()
      const formattedDatajobsList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: formattedDatajobsList, isLoading: false})
    }
  }

  render() {
    const {changeSearchInput, profileDetails, isLoading, jobsList} = this.state
    const searchResults = jobsList.filter(eachItem =>
      eachItem.title.includes(changeSearchInput),
    )
    const {name, imageUrl, bio} = profileDetails
    return (
      <div>
        <Header />
        <div>
          <div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <div>
                <img src={imageUrl} alt="profile" />
                <h1>{name}</h1>
                <p>{bio}</p>
              </div>
            )}
          </div>
          <div>
            <p>Type of Employment</p>
            <ul>
              {employmentTypesList.map(eachItem => (
                <div>
                  <li>
                    <input type="checkbox" id={eachItem.employmentTypeId} />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <p>Salary Range</p>
            <ul>
              {salaryRangesList.map(eachItem => (
                <div>
                  <li>
                    <input type="radio" id={eachItem.salaryRangeId} />
                    <label htmlFor={eachItem.salaryRangeId}>
                      {eachItem.label}
                    </label>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <input
            type="search"
            onChange={this.onChangingSearchInput}
            value={changeSearchInput}
          />
          <ul>
            {jobsList.map(eachItem => (
              <JobItem jobData={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Jobs
