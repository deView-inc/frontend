'use client';

import { Description } from '~&/shared/ui/description';
import { Section } from '~&/shared/ui/section';
import { Title } from '~&/shared/ui/title';

import { practiceModes } from '../lib';
import { PracticeModeCard } from './PracticeModeCard';

export function PracticeInterviewModes() {
    return (
        <Section className="max-w-[1400]">
            <Title>Режимы собеседований</Title>
            <Description>
                7 форматов практики — от живого 1-to-1 до соревновательной арены. Выберите то, что
                нужно прямо сейчас.
            </Description>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {practiceModes.map((practiceMode) => (
                    <PracticeModeCard
                        key={practiceMode.href}
                        {...practiceMode}
                    />
                ))}
            </div>
        </Section>
    );
}
