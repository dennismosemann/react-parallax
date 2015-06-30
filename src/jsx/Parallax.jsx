import React from 'react';

export default class Parallax extends React.Component {

	constructor(props) {
		super(props);

		this.node = null;
		this.windowHeight = this.getWindowHeight();
		this.childStyle = this.getChildStyle();
		this.state = {
			top: 0,
			height: 0
		};
		this.autobind();
	}

	autobind() {
		this.onScroll = this.onScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	render() {
		return (
			<div className="react-parallax" style={this.getParallaxStyle()}>
				<div style={this.childStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}

	componentWillMount() {
		document.addEventListener('scroll', this.onScroll, false);
		window.addEventListener("resize", this.onWindowResize, false);
	}

	componentDidMount() {
		this.node = React.findDOMNode(this);
		this.updatePosition();
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll, false);
		window.removeEventListener("resize", this.onWindowResize, false);
	}

	onScroll(event) {
		this.updatePosition();
	}

	updatePosition() {
		let rect = this.node.getBoundingClientRect();
		if (rect) {
			this.setState({
				top: this.node.getBoundingClientRect().top,
				height: this.node.getBoundingClientRect().height
			});
		}
	}

	onWindowResize() {
		this.windowHeight = this.getWindowHeight();
	}

	getParallaxStyle() {
		let backPos = ((this.state.top + this.state.height) / this.windowHeight) * this.props.strength;
		let style = {
			position: 'relative',
			background: this.props.bgImage ? ('url(' + this.props.bgImage + ')') : this.props.bgColor,
			backgroundSize: 'cover',
			backgroundPosition: '0px -' + backPos + 'px',
			height: this.props.height
		};
		return style;
	}

	getChildStyle() {
		return {
			position: 'absolute',
			top: '50%',
			left: '50%',
			WebkitTransform: 'translate(-50%, -50%)',
			msTransform: 'translate(-50%, -50%)',
			transform: 'translate(-50%, -50%)'
		};
	}

	getWindowHeight() {
		let w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0];
		
		return w.innerHeight || e.clientHeight || g.clientHeight;
	}

	log() {
		if(this.props.log) {
			console.log(arguments);
		}
	}
}
Parallax.propTypes = {
	backgroundImage: React.PropTypes.string,
	bgColor: React.PropTypes.string,
	height: React.PropTypes.number,
	strength: React.PropTypes.number,
	log: React.PropTypes.bool
};
Parallax.defaultProps = {
	bgColor: '#fff',
	height: 300,
	strength: 100,
	log: false
};