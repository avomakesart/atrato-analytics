import React from 'react'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export const Container: React.FC<ContainerProps> = (props) => {
    return (<div className='container' {...props} />);
}
