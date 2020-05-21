import React from 'react';

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

            return (
                <div className={e.type === 'check' ? 'settings-item' : 'settings-item-number'} key={e.text}>
                    {e.type === 'check' ? (
                        <input type={'checkbox'} checked={e.value} onChange={(event) => onChangeSetting(event, e.id)} />
                    ) : e.type === 'number' ? (
                        <input type={'number'} value={e.value} onChange={(event) => onChangeSetting(event, e.id)} />
                    ) : (
                        <select onChange={(event) => onChangeSetting(event, e.id)}>
                            {e.options?.map((el) => (
                                <option key={el.text} value={el.value}>
                                    {el.text}
                                </option>
                            ))}
                        </select>
                    )}
                    <span>{e.text}</span>
                </div>
            );
        })}
    </div>
);

export default Settings;
