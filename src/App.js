import React from "react";
import {
	compose,
	lifecycle,
	setDisplayName,
	withProps,
	withStateHandlers
} from "recompose";

import "./App.css";

const state = {
	value: 1
};

const stateHandlers = {
	handleTouchStart: state => () => ({
			value: state.value + 1
	}),
	handleTouchEnd: state => () => ({
			value: state.value - 1
	})
};

export const enhance = compose(
	setDisplayName("App"),
	withProps(props => ({
			bookNode: React.createRef()
	})),
	withStateHandlers(state, stateHandlers),
	lifecycle({
			componentDidMount() {
					this.props.bookNode.current.ontouchstart = this.props.handleTouchStart;
					this.props.bookNode.current.ontouchend = this.props.handleTouchEnd;
			}
	})
);

export const App = ({ value, bookNode }) => (
	<div>
			<h3>Value: {value}</h3>
			<button ref={bookNode}>Submit</button>
	</div>
);

export default enhance(App);

// class App extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.node = React.createRef();
// 		this.state = {
// 			value: 1
// 		};
// 	}

// 	handleTouchStart = e => {
// 		e.preventDefault();
// 		this.setState({ value: this.state.value + 1 });
// 	};

// 	handleTouchEnd = e => {
// 		e.preventDefault();
// 		this.setState({ value: this.state.value - 1 });
// 	};

// 	componentDidMount() {
// 		this.node.current.ontouchstart = this.handleTouchStart;
// 		this.node.current.ontouchend = this.handleTouchEnd;
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h3>Value: {this.state.value}</h3>
// 				<button ref={this.node}>Submit</button>
// 			</div>
// 		);
// 	}
// }

// export default App;
