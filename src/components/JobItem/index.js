import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <h1>{title}</h1>
          <div>
            <img src="" alt="star" />
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <br />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
