import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// see here: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=youtube-search-227004

// dev api
// const API_KEY = 'AIzaSyDcNacCGsBgU8Tbbzo7nIezG_QuAyFkau4';

// live api
const API_KEY = 'AIzaSyCjxzEB-WOVnfobi_Qn3ElvKXOc8ebKUbM';

// const App = () => {
// 	return (
// 	<div>
// 		<SearchBar />
// 	</div>
// 	);
// }

class App extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({ 
				videos: videos, 
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { 
			this.videoSearch(term) 
		}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch } />
				<VideoDetail video={ this.state.selectedVideo } />
				<VideoList onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } 
				videos={ this.state.videos } />
			</div>
		);
	}

}

ReactDOM.render(<App />, document.querySelector('.container'));