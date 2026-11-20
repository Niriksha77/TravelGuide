import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {
    packagesList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTravelPackages()
  }

  getTravelPackages = async () => {
    this.setState({isLoading: true})
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(travelGuidePackagesApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))
      this.setState({
        packagesList: formattedData,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPackagesListView = () => {
    const {packagesList} = this.state
    return (
      <ul className="packages-list">
        {packagesList.map(eachItem => (
          <li key={eachItem.id} className="package-item">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="package-image"
            />
            <div className="package-details">
              <h1 className="package-name">{eachItem.name}</h1>
              <p className="package-description">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Travel Guide</h1>
        <div className="content-container">
          {isLoading ? this.renderLoadingView() : this.renderPackagesListView()}
        </div>
      </div>
    )
  }
}

export default TravelGuide
