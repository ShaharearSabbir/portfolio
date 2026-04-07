"use client";

import React from 'react';
import { Element } from 'react-scroll';

const ScrollElement = ({name, children, className}: { name: string; children: React.ReactNode, className?: string }) => {
    return (
        <Element name={name} className={className? className : ""}>
            {children}
        </Element>
    );
};

export default ScrollElement;