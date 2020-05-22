import React from 'react';
import Link from 'next/link';

const Footer = () => (
    <div id="footer">
        <div id="link-wrapper">
            <Link href="/">
                <a>home</a>
            </Link>
            <Link href="/about">
                <a>about</a>
            </Link>
            <a href="https://github.com/iburistu/latextra/issues">issues?</a>
            <a href="https://github.com/iburistu/latextra/blob/master/CHANGELOG.md">changelog</a>
            <a href="https://github.com/iburistu/latextra">source</a>
        </div>
        <span id="copyright">
            made with{' '}
            <span aria-label="Heart" role="img">
                ❤️
            </span>{' '}
            by z. linkletter {new Date().getFullYear()}
        </span>
        <span>v1.0.2</span>
    </div>
);

export default Footer;
