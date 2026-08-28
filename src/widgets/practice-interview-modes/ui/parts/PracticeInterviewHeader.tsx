import React from 'react';
import { cn } from '~&/shared/lib/utils';
import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

interface Props {
    title: string;
    description: string;
    sideElement?: React.ReactNode;
}

export const PracticeInterviewHeader = ({ title, description, sideElement }: Props) => (
    <>
        <div className="inline-flex place-items-center">
            <Title>{title}</Title>
            {sideElement}
        </div>

        <Description>{description}</Description>
    </>
);
