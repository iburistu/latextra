import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LaTeX, LaTeXtRa } from '../components/LaTeXtRa';

const About = () => (
    <>
        <Header />
        <div id="about">
            <h2 style={{ textDecoration: 'underline' }}>About:</h2>
            <p>
                <LaTeXtRa /> aims to be a feature-filled <LaTeX /> to image converter. It's a WYSIWYG live <LaTeX />{' '}
                editor!
            </p>
            <p>
                Other <LaTeX /> to image converters exist, like latex2png, but I'm not super comfortable with putting
                potentially sensitive equations into a system where I don't know where it goes or who can see it.
            </p>
            <p>
                Full disclosure: under the hood, <LaTeXtRa /> uses the Google Charts API to generate its images, but I'm
                working on an offline solution. Check back soon! The entire source code can be found{' '}
                <a href="https://github.com/iburistu/latextra">here</a>.
            </p>
            <p>
                Please keep in mind that <LaTeXtRa /> is currently in development! If you run into bugs or want to see a
                feature added, please open an issue on Github!
            </p>
        </div>
        <Footer />
    </>
);

export default About;
