import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

interface Props {
    title: string;
    description: string;
}

export const PracticeInterviewHeader = ({ title, description }: Props) => (
    <>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </>
);
