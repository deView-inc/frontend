import React from 'react';
import { cn } from '~&/shared/lib/utils';
import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

interface Props {
    title: string;
    description: string;
    sideElement?: React.ReactNode;
    className?: string;
}

export const PracticeInterviewHeader = ({ title, description, sideElement, className }: Props) => (
    <>
        <div className={cn('grid grid-cols-1  place-items-start', className)}>
            <Title>{title}</Title>
            {sideElement}
            <Description>{description}</Description>
        </div>
    </>
);
