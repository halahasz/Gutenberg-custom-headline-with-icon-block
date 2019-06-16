const { Component } = wp.element;

import "./style.scss";
import "./editor.scss";

import icons from "./icons";

const {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload
} = wp.editor;

const { Button, PanelBody } = wp.components;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const backgroundColors = [
			{ color: "#00d1b2", name: "teal" },
			{ color: "#3373dc", name: "royal blue" },
			{ color: "#209cef", name: "sky blue" },
			{ color: "#22d25f", name: "green" },
			{ color: "#ffdd57", name: "yellow" },
			{ color: "#ff3860", name: "pink" },
			{ color: "#7941b6", name: "purple" },
			{ color: "#392F43", name: "black" }
		];
		const {
			setAttributes,
			attributes: { text_color }
		} = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<PanelColorSettings
						title={__("Text Color")}
						initialOpen={true}
						colorSettings={[
							{
								value: text_color,
								colors: backgroundColors,
								onChange: value => setAttributes({ text_color: value }),
								label: __("Text Color")
							}
						]}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

class HeadlineBlock extends Component {
	render() {
		const {
			attributes: { headline, iconUrl, iconId, text_color },
			setAttributes
		} = this.props;

		return [
			<Inspector {...{ setAttributes, ...this.props }} />,
			<div
				id="custom-headline"
				className="custom-headline"
				style={{
					color: text_color,
					padding: "20px"
				}}
			>
				<MediaUpload
					buttonProps={{
						className: "change-image"
					}}
					onSelect={img =>
						setAttributes({
							iconUrl: img.url,
							iconId: img.id
						})
					}
					type="image"
					value={iconId}
					render={({ open }) => (
						<Button onClick={open}>
							{!iconId ? (
								<div className="icon">{icons.upload}</div>
							) : (
								<img
									className="custom-headline-icon"
									src={iconUrl}
									alt="avatar"
								/>
							)}
						</Button>
					)}
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={__("Add headline text...")}
					keepPlaceholderOnFocus
					value={headline}
					formattingControls={["bold", "italic", "strikethrough", "link"]}
					className="custom-headline-text"
					style={{
						color: text_color
					}}
					onChange={value => setAttributes({ headline: value })}
				/>
			</div>
		];
	}
}

registerBlockType("custom/headline", {
	title: __("Custom Headline with Icon"),
	icon: "shield",
	category: "common",
	keywords: [__("testimonial"), __("create guten block Example"), __("cgb")],
	attributes: {
		headline: {
			type: "string"
		},
		iconUrl: {
			type: "string",
			default: "https://unsplash.it/30/30"
		},
		iconId: {
			type: "int",
			default: null
		},
		text_color: {
			type: "string",
			default: "black"
		}
	},
	edit: HeadlineBlock,
	save: function(props) {
		const {
			attributes: { headline, iconUrl, text_color }
		} = props;
		return (
			<div
				id="custom-headline"
				className="custom-headline"
				style={{
					color: text_color
				}}
			>
				<img src={iconUrl} />
				{headline && !!headline.length && (
					<RichText.Content
						tagName="div"
						className="custom-headline-text"
						style={{
							color: text_color
						}}
						value={headline}
					/>
				)}
			</div>
		);
	}
});
