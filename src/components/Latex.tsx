import React from 'react';

interface backgroundColor {
    r: number;
    b: number;
    g: number;
    a: number;
}

type LatexProps = {
    inputValue: string;
    onChange: any;
    fontSize: number;
    fontColor: string;
    backgroundColor: backgroundColor;
};

const Latex = ({ inputValue, onChange, fontSize, fontColor, backgroundColor }: LatexProps) => (
    <>
        <input
            id="input"
            type="text"
            value={inputValue}
            onChange={onChange}
            style={{
                fontSize: 'large',
                fontFamily: 'inherit',
            }}
        ></input>
        <div
            id="latex"
            style={{
                fontSize: `${fontSize / 16}em`,
                color: fontColor,
                backgroundColor: `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
            }}
        ></div>
    </>
);

export default Latex;
