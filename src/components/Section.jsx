import React from 'react';

const Section = ({children}) => {
    return (
        <section className='mb-12 mt-8 lg:mb-24 lg:mt-12'>
            {children}
        </section>
    );
};

export default Section;