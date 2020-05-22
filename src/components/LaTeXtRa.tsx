import React from 'react';
import katex from '../katex';

export const LaTeXtRa = () => <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\LaTeX tRa') }}></span>;

export const LaTeX = () => <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\LaTeX') }}></span>;
