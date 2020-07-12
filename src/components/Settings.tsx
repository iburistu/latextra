import React from 'react';
import { CompactPicker } from 'react-color';

interface SettingsItemOptions {
    text: string;
    value: string;
}

export interface SettingsItem {
    text: string;
    value: any;
    exp: boolean;
    type: string;
    options?: Array<SettingsItemOptions>;
    id: string;
}

export type SettingsProps = {
    settings: Array<SettingsItem>;
    exp: any;
    onChangeSetting: any;
};

const Settings = ({ settings, exp, onChangeSetting }: SettingsProps) => (
    <div id="settings-modal">
        {settings.map((e) => {
            if (e.exp && exp !== true) return <React.Fragment key={e.id}></React.Fragment>;
            let control;
            switch (e.type) {
                case 'check':
                    control = (
                        <input
                            type={'checkbox'}
                            checked={e.value}
                            onChange={(event) => onChangeSetting(event.target.checked, e.id)}
                        />
                    );
                    break;
                case 'number':
                    control = (
                        <input
                            type={'number'}
                            value={e.value}
                            onChange={(event) => onChangeSetting(event.target.value, e.id)}
                        />
                    );
                    break;
                case 'color':
                    control = (
                        <CompactPicker
                            className={'settings-color-picker'}
                            color={e.value}
                            onChange={(color) => onChangeSetting(color.hex, e.id)}
                        />
                    );
                    break;
                default:
                    control = (
                        <select onChange={(event) => onChangeSetting(event.target.value, e.id)}>
                            {e.options?.map((el) => (
                                <option key={el.text} value={el.value}>
                                    {el.text}
                                </option>
                            ))}
                        </select>
                    );
                    break;
            }

            return (
                <div className={e.type === 'check' ? 'settings-item' : 'settings-item-number'} key={e.text}>
                    {control}
                    <span>{e.text}</span>
                </div>
            );
        })}
    </div>
);

export default Settings;
