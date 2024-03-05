const SimilarJobs = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = similarJobs
  return (
    <div>
      <img src={companyLogoUrl} />
      <p>{employementType}</p>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{packagePerAnnum}</p>
      <p>{rating}</p>
    </div>
  )
}

export default SimilarJobs
