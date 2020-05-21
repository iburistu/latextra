import React from 'react';

type ColorPickerProps = {
    wrapperId: string;
    emojiLabel: string;
    emoji: string;
    colorPickerId: string;
    colorPickerColor: string;
    onClick: any;
};

const ColorPicker = ({ wrapperId, emojiLabel, emoji, colorPickerId, colorPickerColor, onClick }: ColorPickerProps) => (
    <div id={wrapperId}>
        <span className="emoji" role="img" aria-label={emojiLabel}>
            {emoji}
        </span>
        <div
            id={colorPickerId}
            style={{
                background: colorPickerColor,
            }}
            onClick={onClick}
        ></div>
    </div>
);

export default ColorPicker;
