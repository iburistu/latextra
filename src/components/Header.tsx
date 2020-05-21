import React from 'react';
import Link from 'next/link';
import katex from '../katex';

const Header = () => (
    <div id="title">
        <Link href="/">
            <h1>
                <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\LaTeX tRa') }}></span>
            </h1>
        </Link>
        <h2>Create transparent images of your equations, live.</h2>
        <h2>Start typing down below to get started!</h2>
    </div>
);

export default Header;
