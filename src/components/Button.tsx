import React from 'react';

type ButtonProps = {
    wrapperId: string;
    buttonId: string;
    onClick: any;
    emoji: string;
    emojiLabel: string;
    buttonText: string;
    emojiStyle: object;
    buttonStyle: object;
};

const Button = ({
    wrapperId,
    buttonId,
    onClick,
    emoji,
    emojiLabel,
    buttonText,
    emojiStyle,
    buttonStyle,
}: ButtonProps) => (
    <div id={wrapperId}>
        <span className="emoji" role="img" aria-label={emojiLabel} style={emojiStyle}>
            {emoji}
        </span>
        <button onClick={onClick} id={buttonId} style={buttonStyle}>
            {buttonText}
        </button>
    </div>
);

export default Button;
