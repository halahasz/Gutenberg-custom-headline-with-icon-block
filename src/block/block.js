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

const { Button, PanelBody, SelectControl } = wp.components;

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

class CGBTestimonialBlock extends Component {
	render() {
		const {
			attributes: { testimonial, avatarUrl, avatarId, name, text_color },
			setAttributes
		} = this.props;

		return [
			<Inspector {...{ setAttributes, ...this.props }} />,
			<div
				id="cgb-testimonial"
				className="cgb-testimonial"
				style={{
					color: text_color,
					padding: "30px"
				}}
			>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={__("Add testimonial text...")}
					keepPlaceholderOnFocus
					value={testimonial}
					formattingControls={["bold", "italic", "strikethrough", "link"]}
					className="cgb-testimonial-text"
					style={{
						color: text_color
					}}
					onChange={value => setAttributes({ testimonial: value })}
				/>
				<div className="cgb-testimonial-info">
					<div className="cgb-testimonial-avatar-wrap">
						<MediaUpload
							buttonProps={{
								className: "change-image"
							}}
							onSelect={img =>
								setAttributes({
									avatarUrl: img.url,
									avatarId: img.id
								})
							}
							type="image"
							value={avatarId}
							render={({ open }) => (
								<Button onClick={open}>
									{!avatarId ? (
										<div className="icon">{icons.upload}</div>
									) : (
										<img
											className="cgb-testimonial-avatar"
											src={avatarUrl}
											alt="avatar"
										/>
									)}
								</Button>
							)}
						/>
					</div>
					<h2 className="cgb-testimonial-avatar-name">
						<RichText
							tagName="h2"
							placeholder={__("Add name...")}
							keepPlaceholderOnFocus
							value={name}
							formattingControls={["bold", "italic", "strikethrough", "link"]}
							className="cgb-testimonial-avatar-name"
							style={{
								color: text_color
							}}
							onChange={value => setAttributes({ name: value })}
						/>
					</h2>
				</div>
			</div>
		];
	}
}

registerBlockType("cgb/testimonial", {
	title: __("Testimonial - CGB"),
	icon: "shield",
	category: "common",
	keywords: [__("testimonial"), __("create guten block Example"), __("cgb")],
	attributes: {
		testimonial: {
			type: "string",
			default: "This is a testimonial"
		},
		avatarUrl: {
			type: "string",
			default: "https://placehold.it/100x100"
		},
		avatarId: {
			type: "int",
			default: null
		},
		name: {
			type: "string",
			default: "Citation Name"
		},
		text_color: {
			type: "string",
			default: "black"
		}
	},
	edit: CGBTestimonialBlock,
	save: function(props) {
		const {
			attributes: {
				testimonial,
				avatarUrl,
				name,
				text_color,
			}
		} = props;
		return (
			<div
				id="cgb-testimonial"
				className="cgb-testimonial"
				style={{
					color: text_color
				}}
			>
				{testimonial && !!testimonial.length && (
					<RichText.Content
						tagName="div"
						className="cgb-testimonial-text"
						style={{
							color: text_color
						}}
						value={testimonial}
					/>
				)}
				<div className="cgb-testimonial-info">
					<div className="cgb-testimonial-avatar-wrap">
						<img src={avatarUrl} />
					</div>
					{name && !!name.length && (
						<RichText.Content
							tagName="h2"
							className="cgb-testimonial-avatar-name"
							style={{
								color: text_color
							}}
							value={name}
						/>
					)}
				</div>
			</div>
		);
	}
});
