import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import Latex from './components/Latex';
import Header from './components/Header';
import Footer from './components/Footer';
import ColorPicker from './components/ColorPicker';
import Settings from './components/Settings';
import katex from './katex';

const eqns = [
    `a^2 + b^2 = c^2`,
    `\\log(xy) = \\log(x) + \\log(y)`,
    String.raw`\frac{df}{dt} = \lim_{h\to0 } = \frac{f(t + h) - f(t)}{h}`,
    String.raw`F = G\frac{m_1m_2}{r^2}`,
    `i^2 = -1`,
    String.raw`f(\omega) = \int_{\infty}^{\infty}f(x)e^{-2\pi ix\omega}dx`,
    String.raw`dS \geq 0`,
    String.raw`\nabla \cdot D= \rho_{v}`,
    String.raw`\nabla \cdot B = 0`,
    String.raw`\nabla \times E = -\frac{\partial B}{\partial t}`,
    String.raw`\nabla \times H = \frac{\partial D}{\partial t} + J`,
];

const randomEqn = ~~(Math.random() * eqns.length);

const defaultSettings = [
    /*     {
        text: 'Preserve settings and input history',
        value: true,
        exp: false,
        type: 'check',
        id: 'preserve'
    }, */
    {
        text: 'Enable display mode',
        value: false,
        exp: false,
        type: 'check',
        id: 'display',
    },
    /*  {
        text: 'Enable experimental settings and features',
        value: false,
        exp: false,
        type: 'check',
        id: 'experimental'
    },
    {
        text: 'Set default font size',
        value: 0,
        exp: true,
        type: 'number',
        id: 'font-size'
    },
    {
        text: 'Set maximum output image height',
        value: 0,
        exp: true,
        type: 'number',
        id: 'output-height'
    },
    {
        text: 'Select renderer',
        value: 'charts',
        exp: true,
        type: 'select',
        id: 'renderer',
        options: [
            {
                text: 'Google Charts API (default)',
                value: 'charts'
            },
            {
                text: 'texlive.js -> PDF.js -> *.png (experimental)',
                value: 'pdf'
            },
            {
                text: 'html2canvas -> *.png (janky)',
                value: 'canvas'
            }
        ]
    } */
];

const App = () => {
    const [input, setInput] = useState(eqns[randomEqn]);
    const [fontSize, setFontSize] = useState(36);
    const [fontColor, setFontColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState({ r: 236, g: 232, b: 236, a: 0 });
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [displayBackgroundPicker, setDisplayBackgroundPicker] = useState(false);
    const [copying, setCopying] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        if (!settingsOpen)
            katex.render(String.raw`${input}`, document.getElementById('latex'), {
                throwOnError: false,
                displayMode: settings.find((e) => e.id === 'display')?.value,
                maxExpand: 1,
                maxSize: 50,
                trust: false,
                output: 'html',
            });
    }, [input, settingsOpen, settings]);

    const handleColorChange = (color: any): void => {
        setFontColor(`${color.hex}`);
    };

    const handleBackgroundChange = (color: any): void => {
        setBackgroundColor(color.rgb);
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newFontSize = parseInt(e.target.value);
        if (newFontSize > 80) setFontSize(80);
        else if (newFontSize < 4) setFontSize(4);
        else setFontSize(newFontSize);
    };

    const handleColorPickerClick = () => {
        setDisplayColorPicker((c) => !c);
    };

    const handleBackgroundPickerClick = () => {
        setDisplayBackgroundPicker((c) => !c);
    };

    const rgbaToHex = (r: number, g: number, b: number, a: number) =>
        [r, g, b, a]
            .map((x) => {
                const hex = x.toString(16).toUpperCase();
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('');

    const generateImage = () => {
        setCopying(true);
        const { r, g, b, a } = backgroundColor;
        const backgroundColorHex = rgbaToHex(r, g, b, a * 255);
        const fontColorHex = fontColor.slice(1);
        fetch(
            `https://chart.googleapis.com/chart?cht=tx&chl=${encodeURIComponent(input)}&chs=${
                fontSize * 4
            }&chf=bg,s,${backgroundColorHex}&chco=${fontColorHex}`
        )
            // @ts-ignore
            .then((response) =>
                response.blob().then((blob) => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
            )
            .finally(() => setCopying(false))
            .catch((error) => alert(error));
    };

    const handleSettingChange = (e: any, id: string) => {
        const value = e.target.checked ?? e.target.value;
        setSettings((c) => {
            const objIndex = c.findIndex((el) => el.id === id);
            const updatedObj = { ...c[objIndex], value };
            return [...c.slice(0, objIndex), updatedObj, ...c.slice(objIndex + 1)];
        });
    };

    return (
        <>
            <Header />
            <div id="app">
                <div id="control-wrapper">
                    <div id="font-size-wrapper">
                        <span className="emoji" aria-label="Font size" role="img">
                            🗚
                        </span>
                        <input id="font-size" type="number" value={fontSize} onChange={handleFontSizeChange}></input>
                    </div>
                    <ColorPicker
                        wrapperId={'color-picker-wrapper'}
                        emoji={'🎨'}
                        emojiLabel={'Artist pallette'}
                        colorPickerId={'color-picker-button'}
                        colorPickerColor={fontColor}
                        onClick={handleColorPickerClick}
                    />
                    {displayColorPicker && (
                        <div id="popover">
                            <SketchPicker
                                color={fontColor}
                                onChange={handleColorChange}
                                width={'1fr'}
                                disableAlpha={true}
                            />
                        </div>
                    )}
                    <ColorPicker
                        wrapperId={'background-picker-wrapper'}
                        emoji={'🖼️'}
                        emojiLabel={'Painting'}
                        colorPickerId={'background-picker-button'}
                        colorPickerColor={`rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`}
                        onClick={handleBackgroundPickerClick}
                    />
                    {displayBackgroundPicker && (
                        <div id="background-popover">
                            <SketchPicker color={backgroundColor} onChange={handleBackgroundChange} width={'1fr'} />
                        </div>
                    )}
                    <div id="export-wrapper">
                        {copying ? (
                            <span className="emoji" style={{ fontSize: 'large' }} role="img" aria-label="Printer">
                                🖨️
                            </span>
                        ) : (
                            <span className="emoji" role="img" aria-label="Clipboard">
                                📋
                            </span>
                        )}
                        <button id="export" onClick={() => generateImage()}>
                            {copying ? <span>Copying...</span> : <span>Copy to Clipboard</span>}
                        </button>
                    </div>
                    <div
                        id="settings-wrapper"
                        style={{
                            color: settingsOpen ? 'white' : 'black',
                            backgroundColor: settingsOpen ? 'black' : 'white',
                            border: settingsOpen ? '2px solid white' : '2px solid black',
                        }}
                    >
                        <span className="emoji" role="img" aria-label="Gear">
                            ⚙️
                        </span>
                        <button
                            id="settings"
                            onClick={() => setSettingsOpen((c) => !c)}
                            style={{
                                color: settingsOpen ? 'white' : 'black',
                                backgroundColor: settingsOpen ? 'black' : 'white',
                                borderLeft: settingsOpen ? '2px solid white' : '2px solid black',
                            }}
                        >
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
                {settingsOpen ? (
                    <Settings
                        settings={settings}
                        exp={settings?.find((e) => e.id === 'experimental')?.value}
                        onChangeSetting={handleSettingChange}
                    />
                ) : (
                    <Latex
                        inputValue={input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        fontSize={fontSize}
                        fontColor={fontColor}
                        backgroundColor={backgroundColor}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default App;
