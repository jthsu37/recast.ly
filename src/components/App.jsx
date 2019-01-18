import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {video: exampleVideoData[0], videos: exampleVideoData};
    this.handleChange = _.debounce(this.handleChange, 500);
  }
  onClick(video) {
    this.setState({video: video});
  }
  componentDidMount() {
    let options = {
      key: YOUTUBE_API_KEY,
      q: 'react',
      maxResults: 5
    };
    this.props.searchYouTube(options, (data) => {
      if (Array.isArray(data)) {
        this.setState({video: data[0], videos: data});
      } else {
        this.setState({video: data.items[0], videos: data.items});
      }
    });
  }
  handleChange(event) {
    let options = {
      key: YOUTUBE_API_KEY,
      q: event,
      maxResults: 5
    };
    this.props.searchYouTube(options, (data) => {
      if (Array.isArray(data)) {
        this.setState({video: data[0], videos: data});
      } else {
        this.setState({video: data.items[0], videos: data.items});
      }
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onChange={this.handleChange.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} onClick={this.onClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
